const pool = require("../config/db");
const {
  calculateTakeOffPromotion,
  isTakeOffCollection,
  money,
} = require("./takeOffPromotion");

const UAE_EMIRATES = [
  "Abu Dhabi",
  "Ajman",
  "Dubai",
  "Fujairah",
  "Ras Al Khaimah",
  "Sharjah",
  "Umm Al Quwain",
];

const FREE_SHIPPING_THRESHOLD = 300;
const STANDARD_SHIPPING_AED = 25;
const WHATSAPP_GUEST_EMAIL = "whatsapp.orders@saaqperfume.com";

let orderColumnsReady = false;

class CheckoutError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function getDeliveryCharge(subtotal) {
  if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }

  return STANDARD_SHIPPING_AED;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value) {
  const digits = value.replace(/\D/g, "");

  if (!/^[\d+\s()-]+$/.test(value)) {
    return false;
  }

  if (digits.startsWith("971")) {
    return digits.length === 12;
  }

  if (digits.startsWith("05") || digits.startsWith("5")) {
    return digits.length === 9 || digits.length === 10;
  }

  return digits.length >= 9 && digits.length <= 15;
}

async function ensureOrderColumns(connection = pool) {
  if (orderColumnsReady) {
    return;
  }

  const statements = [
    "ALTER TABLE orders ADD COLUMN channel VARCHAR(32) NOT NULL DEFAULT 'checkout'",
    "ALTER TABLE orders ADD COLUMN notes TEXT NULL",
  ];

  for (const sql of statements) {
    try {
      await connection.query(sql);
    } catch (error) {
      if (error?.code !== "ER_DUP_FIELDNAME") {
        throw error;
      }
    }
  }

  orderColumnsReady = true;
}

function isWhatsAppChannel(body) {
  return String(body?.channel ?? "").trim().toLowerCase() === "whatsapp";
}

function whatsappGuestCustomer() {
  return {
    name: "WhatsApp customer",
    email: WHATSAPP_GUEST_EMAIL,
    phone: "WhatsApp",
    address: "To be confirmed on WhatsApp",
    city: "Dubai",
    state: "Dubai",
    country: "United Arab Emirates",
    shippingAddress: "WhatsApp order — delivery details to be confirmed",
  };
}

function buildWhatsAppNotes(orderItems, productsById, promotion) {
  const lines = orderItems.map((item, index) => {
    const product = productsById.get(item.productId);
    const name = product?.name || `Product #${item.productId}`;

    return `${index + 1}. ${name} × ${item.quantity} — AED ${item.subtotal.toFixed(2)}`;
  });

  return [
    "WhatsApp order",
    "",
    ...lines,
    "",
    `Subtotal: AED ${promotion.subtotal.toFixed(2)}`,
    `Total: AED ${promotion.subtotal.toFixed(2)}`,
    "",
    "Customer and delivery details to be confirmed on WhatsApp.",
  ].join("\n");
}

function readCustomer(body) {
  const source = body?.customer && typeof body.customer === "object" ? body.customer : body;
  const name = String(source?.name ?? source?.fullName ?? "").trim();
  const email = String(source?.email ?? "").trim().toLowerCase();
  const phone = String(source?.phone ?? "").trim();
  const address = String(source?.address ?? "").trim();
  const apartment = String(source?.apartment ?? "").trim();
  const city = String(source?.city ?? "").trim();
  const emirate = String(source?.emirate ?? source?.state ?? "").trim();
  const country = String(source?.country ?? "United Arab Emirates").trim();

  if (!name || name.length > 255) {
    throw new CheckoutError(400, "Enter your full name.");
  }

  if (!email || !isEmail(email) || email.length > 255) {
    throw new CheckoutError(400, "Enter a valid email address.");
  }

  if (!phone || !isPhone(phone) || phone.length > 50) {
    throw new CheckoutError(400, "Enter a valid phone number.");
  }

  if (!address) {
    throw new CheckoutError(400, "Enter your address.");
  }

  if (!city || city.length > 100) {
    throw new CheckoutError(400, "Enter your city.");
  }

  if (!UAE_EMIRATES.includes(emirate)) {
    throw new CheckoutError(400, "Select a valid emirate.");
  }

  if (!country || country.length > 100) {
    throw new CheckoutError(400, "Enter your country.");
  }

  const fullAddress = apartment ? `${address}, ${apartment}` : address;

  return {
    name,
    email,
    phone,
    address: fullAddress,
    city,
    state: emirate,
    country,
    shippingAddress: `${fullAddress}, ${city}, ${emirate}, ${country}`,
  };
}

function readItems(body) {
  const rawItems = Array.isArray(body?.items) ? body.items : [];

  if (!rawItems.length) {
    throw new CheckoutError(400, "Your cart is empty.");
  }

  const quantities = new Map();

  for (const item of rawItems) {
    const productId = Number(item?.productId ?? item?.id);
    const quantity = Number(item?.quantity);

    if (!Number.isInteger(productId) || productId <= 0) {
      throw new CheckoutError(400, "One or more products are invalid.");
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new CheckoutError(400, "Quantity must be at least 1.");
    }

    quantities.set(productId, (quantities.get(productId) || 0) + quantity);
  }

  return quantities;
}

async function upsertCustomer(connection, customer) {
  const [existing] = await connection.query(
    "SELECT id FROM customers WHERE email = ? LIMIT 1",
    [customer.email]
  );

  if (existing.length) {
    await connection.query(
      `UPDATE customers
       SET name = ?, phone = ?, address = ?, city = ?, state = ?, country = ?
       WHERE id = ?`,
      [
        customer.name,
        customer.phone,
        customer.address,
        customer.city,
        customer.state,
        customer.country,
        existing[0].id,
      ]
    );
    return existing[0].id;
  }

  const [result] = await connection.query(
    `INSERT INTO customers
      (name, email, phone, address, city, state, country)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      customer.name,
      customer.email,
      customer.phone,
      customer.address,
      customer.city,
      customer.state,
      customer.country,
    ]
  );

  return result.insertId;
}

async function createStorefrontOrder(body) {
  const channel = isWhatsAppChannel(body) ? "whatsapp" : "checkout";
  const customer =
    channel === "whatsapp" ? whatsappGuestCustomer() : readCustomer(body);
  const quantities = readItems(body);
  const productIds = [...quantities.keys()];

  await ensureOrderColumns();

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const placeholders = productIds.map(() => "?").join(", ");
    const [products] = await connection.query(
      `SELECT id, name, price, stock, collection
       FROM products
       WHERE id IN (${placeholders})
       FOR UPDATE`,
      productIds
    );

    if (products.length !== productIds.length) {
      throw new CheckoutError(400, "One or more products are unavailable.");
    }

    const productsById = new Map(products.map((row) => [row.id, row]));
    const promotionItems = [];

    for (const productId of productIds) {
      const product = productsById.get(productId);
      const quantity = quantities.get(productId);
      const available = Number(product.stock ?? 0);

      if (!Number.isInteger(available) || available < quantity) {
        throw new CheckoutError(
          400,
          `${product.name} does not have enough stock.`
        );
      }

      promotionItems.push({
        id: String(productId),
        collection: product.collection || "",
        price: money(product.price),
        quantity,
      });
    }

    const promotion = calculateTakeOffPromotion(promotionItems);
    const takeOffPayable = new Map(
      promotion.lines.map((line) => [line.id, line.payableLineTotal])
    );
    const orderItems = [];

    for (const productId of productIds) {
      const product = productsById.get(productId);
      const quantity = quantities.get(productId);
      const price = money(product.price);
      const lineTotal = isTakeOffCollection(product.collection)
        ? money(takeOffPayable.get(String(productId)) || 0)
        : money(price * quantity);

      orderItems.push({
        productId,
        quantity,
        price,
        subtotal: lineTotal,
      });
    }

    const subtotal = promotion.subtotal;
    const delivery = channel === "checkout" ? getDeliveryCharge(subtotal) : 0;
    const totalAmount = money(subtotal + delivery);
    const notes =
      channel === "whatsapp"
        ? buildWhatsAppNotes(orderItems, productsById, promotion)
        : null;
    const customerId = await upsertCustomer(connection, customer);

    const [orderResult] = await connection.query(
      `INSERT INTO orders
        (customer_id, total_amount, status, payment_status, shipping_address, channel, notes)
       VALUES (?, ?, 'pending', 'pending', ?, ?, ?)`,
      [customerId, totalAmount, customer.shippingAddress, channel, notes]
    );

    const orderId = orderResult.insertId;

    for (const item of orderItems) {
      await connection.query(
        `INSERT INTO order_items
          (order_id, product_id, quantity, price, subtotal)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.productId, item.quantity, item.price, item.subtotal]
      );

      if (channel === "checkout") {
        const [stockUpdate] = await connection.query(
          `UPDATE products
           SET stock = stock - ?
           WHERE id = ? AND stock >= ?`,
          [item.quantity, item.productId, item.quantity]
        );

        if (!stockUpdate.affectedRows) {
          throw new CheckoutError(
            400,
            "One or more products do not have enough stock."
          );
        }
      }
    }

    await connection.query(
      `INSERT INTO payments (order_id, payment_method, amount, status)
       VALUES (?, ?, ?, 'pending')`,
      [orderId, channel === "whatsapp" ? "whatsapp" : "checkout", totalAmount]
    );

    await connection.commit();

    return {
      orderId,
      customerName: customer.name,
      totalAmount,
      status: "pending",
      paymentStatus: "pending",
      channel,
    };
  } catch (error) {
    try {
      await connection.rollback();
    } catch {
      // Connection may already be closed.
    }

    if (error instanceof CheckoutError) {
      throw error;
    }

    if (error && error.code === "ER_DUP_ENTRY") {
      throw new CheckoutError(400, "Unable to save customer details. Please try again.");
    }

    console.error("Unable to create storefront order", error);
    throw new CheckoutError(500, "Unable to place order.");
  } finally {
    connection.release();
  }
}

module.exports = {
  CheckoutError,
  createStorefrontOrder,
  ensureOrderColumns,
};
