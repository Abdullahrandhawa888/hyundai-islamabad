"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Armchair, Car, Check, Cpu, MapPin, Minus, Package, Plus, ShieldCheck, ShoppingBag, Trash2, type LucideIcon } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import type { AccessoryProduct } from "@/lib/types";

type Props = {
  products: AccessoryProduct[];
  categories: string[];
  orderNote: string;
  /** Where customers collect their order, e.g. the showroom address. */
  pickupAddress: string;
  /** WhatsApp link of the dealership, e.g. https://wa.me/923331150172 */
  whatsapp: string;
  siteName: string;
};

type Cart = Record<string, number>;

const STORAGE_KEY = "hyundai-islamabad:accessories-cart";
const rs = (value: number) => `Rs ${Math.round(value).toLocaleString("en-PK")}`;

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Exterior: Car,
  Interior: Armchair,
  Technology: Cpu,
  Protection: ShieldCheck,
};

const fieldClass = "w-full border border-line bg-white px-3 py-2.5 text-[14px] outline-none focus:border-accent";

export function AccessoriesShop({ products, categories, orderNote, pickupAddress, whatsapp, siteName }: Props) {
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState<Cart>({});
  const [loaded, setLoaded] = useState(false);
  const [placed, setPlaced] = useState<string | null>(null);

  // Keep the basket if the customer reloads or comes back later.
  useEffect(() => {
    // Read after the first paint so the server and browser render the same page.
    const timer = setTimeout(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Cart;
        setCart(
          Object.fromEntries(
            Object.entries(saved).filter(([id, qty]) => qty > 0 && products.some((p) => p.id === id)),
          ),
        );
      } catch {}
      setLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [products]);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart, loaded]);

  const lines = useMemo(
    () =>
      products
        .filter((product) => cart[product.id] > 0)
        .map((product) => ({ product, qty: cart[product.id], total: product.price * cart[product.id] })),
    [products, cart],
  );
  const itemCount = lines.reduce((sum, line) => sum + line.qty, 0);
  const grandTotal = lines.reduce((sum, line) => sum + line.total, 0);
  const visible = filter === "All" ? products : products.filter((product) => product.category === filter);

  const setQty = (id: string, qty: number) =>
    setCart((current) => {
      const next = { ...current };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, 20);
      return next;
    });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!lines.length) return;
    const form = new FormData(event.currentTarget);
    const value = (name: string) => String(form.get(name) ?? "").trim();
    const message = [
      "*Accessories pick-up request*",
      "",
      ...lines.map((line, index) => `${index + 1}. ${line.product.name} x ${line.qty} = ${rs(line.total)}`),
      "",
      `*Total: ${rs(grandTotal)}* (pay and collect at the dealership)`,
      "",
      `Name: ${value("name")}`,
      `Phone: ${value("phone")}`,
      value("vehicle") ? `Vehicle: ${value("vehicle")}` : "",
      value("notes") ? `Notes: ${value("notes")}` : "",
    ]
      .filter((line, index, all) => line !== "" || all[index - 1] !== "")
      .join("\n")
      .trim();
    const url = `${whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
    setPlaced(url);
    setCart({});
  }

  return (
    <>
      {/* Filters */}
      <div role="tablist" aria-label="Accessory categories" className="mt-8 flex flex-wrap gap-2">
        {["All", ...categories].map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={filter === name}
            onClick={() => setFilter(name)}
            className={`border px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-300 ease-out ${
              filter === name
                ? "border-accent bg-accent text-white"
                : "border-line bg-white text-nav hover:border-accent hover:text-accent"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => {
          const qty = cart[product.id] ?? 0;
          const Icon = CATEGORY_ICONS[product.category] ?? Package;
          return (
            <article
              key={product.id}
              className="group flex flex-col border border-line bg-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_16px_36px_-20px_rgba(0,44,95,0.45)]"
            >
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#f6f7f9]">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <Icon size={54} strokeWidth={1.2} className="text-accent/50" aria-hidden />
                )}
                {!product.inStock ? (
                  <span className="absolute top-3 left-3 bg-foreground px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
                    Out of stock
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">{product.category}</p>
                <h3 className="mt-1 text-[16px] leading-snug font-semibold">{product.name}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-6 text-muted">{product.description}</p>
                {product.fits ? <p className="mt-2 text-[12px] text-muted">Fits: {product.fits}</p> : null}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-[18px] font-semibold text-navy">{rs(product.price)}</p>
                  {qty > 0 ? (
                    <div className="flex items-center border border-line">
                      <button
                        type="button"
                        aria-label={`Remove one ${product.name}`}
                        onClick={() => setQty(product.id, qty - 1)}
                        className="p-2.5 hover:text-accent"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-7 text-center text-[14px] font-semibold" aria-live="polite">
                        {qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`Add one more ${product.name}`}
                        onClick={() => setQty(product.id, qty + 1)}
                        className="p-2.5 hover:text-accent"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={!product.inStock}
                      onClick={() => {
                        setPlaced(null);
                        setQty(product.id, 1);
                      }}
                      className="inline-flex items-center gap-2 bg-accent px-4 py-2.5 text-[13px] font-semibold tracking-wide text-white transition-colors duration-300 ease-out hover:bg-[#1557b0] disabled:cursor-not-allowed disabled:bg-[#c5c9d0]"
                    >
                      <ShoppingBag size={15} aria-hidden />
                      Add to order
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {!visible.length ? <p className="mt-8 text-[14px] text-muted">Nothing in this category yet.</p> : null}

      {/* Order */}
      <section id="order" className="mt-16 scroll-mt-36 border border-line">
        <div className="border-b border-line bg-[#f7f9fc] px-6 py-5 md:px-8">
          <h2 className="text-2xl font-light">Your order</h2>
          <p className="mt-1 text-[13px] text-muted">Reserve online, then pay and collect from our dealership. We do not deliver.</p>
        </div>

        {placed ? (
          <div className="px-6 py-10 text-center md:px-8">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1da851]">
              <Check size={24} aria-hidden />
            </span>
            <p className="mt-4 text-xl font-light">Your request is ready to send</p>
            <p className="mx-auto mt-2 max-w-lg text-[14px] leading-7 text-muted">
              WhatsApp has opened with your order details.{" "}
              <strong className="font-semibold text-foreground">Press Send in WhatsApp</strong> to send your request to{" "}
              {siteName}. We will call you to confirm availability, then you can pay and collect at the dealership.
            </p>
            <a
              href={placed}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-[#25D366] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#1da851]"
            >
              <WhatsAppIcon className="h-4 w-4 fill-current" />
              Open WhatsApp again
            </a>
          </div>
        ) : !lines.length ? (
          <p className="px-6 py-10 text-center text-[14px] text-muted md:px-8">
            Your order is empty. Choose accessories above and press &ldquo;Add to order&rdquo;.
          </p>
        ) : (
          <div className="grid gap-10 px-6 py-8 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <ul className="divide-y divide-line border-y border-line">
                {lines.map(({ product, qty, total }) => (
                  <li key={product.id} className="flex items-center gap-4 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-semibold">{product.name}</p>
                      <p className="text-[12px] text-muted">{rs(product.price)} each</p>
                    </div>
                    <div className="flex items-center border border-line">
                      <button
                        type="button"
                        aria-label={`Remove one ${product.name}`}
                        onClick={() => setQty(product.id, qty - 1)}
                        className="p-2 hover:text-accent"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-6 text-center text-[13px] font-semibold">{qty}</span>
                      <button
                        type="button"
                        aria-label={`Add one more ${product.name}`}
                        onClick={() => setQty(product.id, qty + 1)}
                        className="p-2 hover:text-accent"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <p className="w-24 text-right text-[14px] font-semibold">{rs(total)}</p>
                    <button
                      type="button"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => setQty(product.id, 0)}
                      className="p-1.5 text-muted hover:text-accent"
                    >
                      <Trash2 size={15} />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-[13px] font-semibold tracking-wide uppercase">Total (pay at dealership)</span>
                <span className="text-[22px] font-semibold text-navy">{rs(grandTotal)}</span>
              </div>
              <div className="mt-5 flex gap-3 border border-line bg-[#f7f9fc] p-4">
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <div className="text-[13px] leading-6">
                  <p className="font-semibold">Collect from our dealership</p>
                  <p className="text-muted">{pickupAddress}</p>
                </div>
              </div>
              <p className="mt-4 text-[12.5px] leading-6 text-muted">{orderNote}</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <h3 className="text-lg font-light">Your details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="name" required autoComplete="name" />
                <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
                <Field label="Your Hyundai model" name="vehicle" placeholder="e.g. Elantra Hybrid" />
              </div>
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-semibold tracking-wide">Notes (optional)</span>
                <textarea name="notes" rows={2} className={fieldClass} />
              </label>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 bg-accent px-5 py-3 text-[14px] font-semibold tracking-wide text-white transition-colors duration-300 ease-out hover:bg-[#1557b0]"
              >
                <WhatsAppIcon className="h-4 w-4 fill-current" />
                Reserve for pick-up
              </button>
              <p className="text-center text-[12px] text-muted">
                Opens in WhatsApp. Your request is only sent once you press Send there.
              </p>
            </form>
          </div>
        )}
      </section>

      {/* Floating basket button */}
      {itemCount > 0 && !placed ? (
        <a
          href="#order"
          className="fixed bottom-5 left-5 z-30 inline-flex items-center gap-3 bg-navy px-5 py-3 text-[13px] font-semibold text-white shadow-lg transition-colors duration-300 ease-out hover:bg-[#001f45]"
        >
          <ShoppingBag size={17} aria-hidden />
          View order ({itemCount}) · {rs(grandTotal)}
        </a>
      ) : null}
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold tracking-wide">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={fieldClass}
      />
    </label>
  );
}
