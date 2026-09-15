import { expressAdminRequest } from "@/lib/express-admin";

export type AdminOrderListItem = {
  id: number | string;
  customer_id?: number | string | null;
  customer_name?: string | null;
  customer_email?: string | null;
  total_amount?: number | string | null;
  status?: string | null;
  payment_status?: string | null;
  payment_method?: string | null;
  channel?: string | null;
  created_at?: string | null;
};

export type AdminOrderItem = {
  id: number | string;
  product_id?: number | string | null;
  quantity?: number | null;
  price?: number | string | null;
  subtotal?: number | string | null;
  product_name?: string | null;
  product_image?: string | null;
  product_collection?: string | null;
};

export type AdminOrderDetail = AdminOrderListItem & {
  shipping_address?: string | null;
  notes?: string | null;
  customer?: {
    id?: number | string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    postal_code?: string | null;
  } | null;
  items?: AdminOrderItem[];
  payments?: Array<{
    id: number | string;
    payment_method?: string | null;
    amount?: number | string | null;
    status?: string | null;
    created_at?: string | null;
  }>;
};

export type AdminCustomerListItem = {
  id: number | string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  created_at?: string | null;
  order_count?: number | string | null;
  total_spent?: number | string | null;
};

export type AdminCustomerDetail = AdminCustomerListItem & {
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;
  orders?: AdminOrderListItem[];
};

export type AdminContactMessage = {
  id: number | string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  message?: string | null;
  created_at?: string | null;
};

async function readAdminJson<T>(path: string): Promise<T | null> {
  const response = await expressAdminRequest(path, "GET");

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to load admin data");
  }

  return (await response.json()) as T;
}

export function getAdminOrders() {
  return readAdminJson<AdminOrderListItem[]>("/api/orders").then((rows) =>
    Array.isArray(rows) ? rows : []
  );
}

export function getAdminOrder(id: string) {
  return readAdminJson<AdminOrderDetail>(`/api/orders/${id}`);
}

export function getAdminCustomers() {
  return readAdminJson<AdminCustomerListItem[]>("/api/customers").then((rows) =>
    Array.isArray(rows) ? rows : []
  );
}

export function getAdminCustomer(id: string) {
  return readAdminJson<AdminCustomerDetail>(`/api/customers/${id}`);
}

export function getAdminMessages() {
  return readAdminJson<AdminContactMessage[]>("/api/contact").then((rows) =>
    Array.isArray(rows) ? rows : []
  );
}

export function getAdminMessage(id: string) {
  return readAdminJson<AdminContactMessage>(`/api/contact/${id}`);
}

export function formatAed(value?: number | string | null) {
  const amount = Number(value ?? 0);
  return `AED ${Number.isFinite(amount) ? amount.toFixed(2) : "0.00"}`;
}

export function formatAdminDate(value?: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-AE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatStatus(value?: string | null) {
  if (!value) {
    return "—";
  }

  if (value.toLowerCase() === "whatsapp") {
    return "WhatsApp";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatChannel(value?: string | null) {
  const channel = String(value ?? "").toLowerCase();

  if (channel === "whatsapp") {
    return "WhatsApp";
  }

  if (channel === "checkout") {
    return "Checkout";
  }

  return value ? formatStatus(value) : "Checkout";
}

export function formatPaymentMethod(order: {
  channel?: string | null;
  payment_method?: string | null;
  payment_status?: string | null;
}) {
  const channel = String(order.channel ?? "").toLowerCase();
  const method = String(order.payment_method ?? "").toLowerCase();

  if (channel === "whatsapp" || method === "whatsapp") {
    return "WhatsApp";
  }

  if (method && method !== "checkout") {
    return formatStatus(method);
  }

  return formatStatus(order.payment_status);
}
