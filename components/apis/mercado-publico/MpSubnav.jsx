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
        <div className="mb-6 flex flex-wrap gap-3">
            {items.map((item) => {
                const active = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${active
                                ? "border-cyan-400 bg-cyan-500/10 text-cyan-300"
                                : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500 hover:text-white"
                            }`}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </div>
    );
}