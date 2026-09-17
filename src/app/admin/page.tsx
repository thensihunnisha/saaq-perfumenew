import Link from "next/link";
import {
  Layers,
  Mail,
  Package,
  PackagePlus,
  ShoppingBag,
  Tags,
  Users,
} from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { getApiProducts } from "@/lib/api";
import {
  formatAdminDate,
  formatAed,
  formatChannel,
  formatStatus,
  getAdminCustomers,
  getAdminOrders,
} from "@/lib/admin-commerce";

const CATALOG_LINKS = [
  {
    href: "/admin/products",
    title: "Products",
    label: "Manage products",
    icon: Package,
  },
  {
    href: "/admin/categories",
    title: "Categories",
    label: "Manage product categories",
    icon: Tags,
  },
  {
    href: "/admin/collections",
    title: "Collections",
    label: "Manage perfume collections",
    icon: Layers,
  },
] as const;

const SALES_LINKS = [
  {
    href: "/admin/orders",
    title: "Orders",
    label: "Manage customer orders",
    icon: ShoppingBag,
  },
  {
    href: "/admin/customers",
    title: "Customers",
    label: "Manage customer accounts",
    icon: Users,
  },
  {
    href: "/admin/messages",
    title: "Messages",
    label: "Read customer messages",
    icon: Mail,
  },
] as const;

const QUICK_ACTIONS = [
  { label: "Add Product", icon: PackagePlus, href: "/admin/products/new" },
  { label: "Categories", icon: Tags, href: "/admin/categories" },
  { label: "Collections", icon: Layers, href: "/admin/collections" },
] as const;

const ORDER_COLUMNS = [
  "Order",
  "Customer",
  "Channel",
  "Date",
  "Amount",
  "Status",
] as const;

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [orders, customers, products] = await Promise.all([
    getAdminOrders().catch(() => []),
    getAdminCustomers().catch(() => []),
    getApiProducts().catch(() => []),
  ]);

  const salesTotal = orders.reduce(
    (sum, order) => sum + Number(order.total_amount ?? 0),
    0
  );
  const recentOrders = orders.slice(0, 6);
  const stats = [
    {
      value: String(products.length),
      title: "Total Products",
      label: "Products in catalog",
    },
    {
      value: String(orders.length),
      title: "Total Orders",
      label: "Orders received",
    },
    {
      value: String(customers.length),
      title: "Total Customers",
      label: "Registered customers",
    },
    {
      value: formatAed(salesTotal),
      title: "Total Sales",
      label: "Total revenue",
    },
  ];

  const today = new Intl.DateTimeFormat("en-AE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="flex flex-col gap-4 border-b border-saaq-gold/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="saaq-eyebrow">SAAQ Perfume</p>
          <h1 className="mt-3 font-display text-3xl text-saaq-ivory sm:text-4xl lg:text-5xl">
            Dashboard
          </h1>
          <p className="saaq-body mt-4 max-w-xl">
            Welcome to your SAAQ Perfume administration panel.
          </p>
        </div>

        <div className="border border-saaq-gold/20 bg-saaq-black px-5 py-4">
          <p className="saaq-eyebrow text-[9px]">Today</p>
          <p className="mt-2 font-display text-lg text-saaq-ivory">{today}</p>
          <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold">
            Panel ready
          </p>
        </div>
      </div>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.title}
            className="border border-saaq-gold/15 bg-saaq-black p-6"
          >
            <p className="saaq-eyebrow text-[9px]">{stat.title}</p>
            <p className="mt-4 font-display text-4xl text-saaq-ivory">
              {stat.value}
            </p>
            <p className="saaq-body mt-3">{stat.label}</p>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <p className="saaq-eyebrow">Catalog</p>
        <h2 className="mt-3 font-display text-3xl text-saaq-ivory">
          Manage catalog
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {CATALOG_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="saaq-transition border border-saaq-gold/20 bg-saaq-black p-6 hover:border-saaq-gold"
              >
                <span className="flex h-11 w-11 items-center justify-center border border-saaq-gold/30 text-saaq-gold">
                  <Icon size={18} strokeWidth={1.4} />
                </span>
                <h3 className="mt-5 font-display text-2xl text-saaq-ivory">
                  {item.title}
                </h3>
                <p className="saaq-body mt-2">{item.label}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <p className="saaq-eyebrow">Sales</p>
        <h2 className="mt-3 font-display text-3xl text-saaq-ivory">
          Manage sales
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {SALES_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="saaq-transition border border-saaq-gold/20 bg-saaq-black p-6 hover:border-saaq-gold"
              >
                <span className="flex h-11 w-11 items-center justify-center border border-saaq-gold/30 text-saaq-gold">
                  <Icon size={18} strokeWidth={1.4} />
                </span>
                <h3 className="mt-5 font-display text-2xl text-saaq-ivory">
                  {item.title}
                </h3>
                <p className="saaq-body mt-2">{item.label}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <p className="saaq-eyebrow">Shortcuts</p>
        <h2 className="mt-3 font-display text-3xl text-saaq-ivory">
          Quick Actions
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="saaq-transition flex items-center gap-4 border border-saaq-gold/20 bg-saaq-black px-5 py-5 text-left hover:border-saaq-gold hover:bg-saaq-gold/5"
              >
                <span className="flex h-11 w-11 items-center justify-center border border-saaq-gold/30 text-saaq-gold">
                  <Icon size={18} strokeWidth={1.4} />
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-ivory">
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <p className="saaq-eyebrow">Activity</p>
        <h2 className="mt-3 font-display text-3xl text-saaq-ivory">
          Recent Orders
        </h2>

        <div className="mt-8 overflow-x-auto border border-saaq-gold/15 bg-saaq-black">
          <table className="min-w-[640px] w-full text-left">
            <thead>
              <tr className="border-b border-saaq-gold/15">
                {ORDER_COLUMNS.map((column) => (
                  <th
                    key={column}
                    className="px-5 py-4 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <p className="font-display text-2xl text-saaq-ivory/80">
                      No orders yet.
                    </p>
                    <p className="saaq-body mx-auto mt-3 max-w-sm">
                      Checkout and WhatsApp orders will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr
                    key={String(order.id)}
                    className="border-b border-white/5 last:border-b-0"
                  >
                    <td className="px-5 py-4 font-sans text-sm text-saaq-ivory">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="saaq-transition text-saaq-gold hover:text-saaq-ivory"
                      >
                        #{order.id}
                      </Link>
                    </td>
                    <td className="px-5 py-4 font-display text-lg text-saaq-ivory">
                      {order.customer_name || "—"}
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                      {formatChannel(order.channel)}
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                      {formatAdminDate(order.created_at)}
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                      {formatAed(order.total_amount)}
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                      {formatStatus(order.status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
