"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
    { href: "/dashboard/mercado-publico/compra-agil", label: "Compra Ágil" },
    { href: "/dashboard/mercado-publico/licitaciones", label: "Licitaciones" },
    { href: "/dashboard/mercado-publico/ordenes-compra", label: "Órdenes de Compra" },
];

export default function MpSubnav() {
    const pathname = usePathname();

    return (
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {items.map((item) => {
                const active = pathname === item.href;
                return (
                    <Link key={item.href} href={item.href} style={{
                        padding: "0.4rem 1rem",
                        borderRadius: "0.5rem",
                        border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                        background: active ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "var(--surface-2)",
                        color: active ? "var(--accent)" : "var(--text-secondary)",
                        fontSize: "0.8rem",
                        fontWeight: active ? 600 : 400,
                        textDecoration: "none",
                        transition: "all 150ms ease",
                    }}>
                        {item.label}
                    </Link>
                );
            })}
        </div>
    );
}