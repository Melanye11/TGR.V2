"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
    {
        grupo: "TGR",
        items: [
            {
                href: "/dashboard/remates",
                label: "Remates TGR",
                icon: (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                ),
                badge: true,
            },
        ],
    },
    {
        grupo: "MERCADO PÚBLICO",
        items: [
            {
                href: "/dashboard/mercado-publico/compra-agil",
                label: "Compra Ágil",
                icon: (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                ),
            },
            {
                href: "/dashboard/mercado-publico/licitaciones",
                label: "Licitaciones",
                icon: (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                    </svg>
                ),
            },
            {
                href: "/dashboard/mercado-publico/ordenes-compra",
                label: "Órdenes de Compra",
                icon: (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                        <rect x="9" y="3" width="6" height="4" rx="1" />
                        <path d="M9 12h6M9 16h4" />
                    </svg>
                ),
            },
        ],
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="
      flex h-full w-56 flex-col border-r
      border-gray-200 bg-white
      dark:border-slate-800 dark:bg-slate-950
    ">
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
                {nav.map((grupo) => (
                    <div key={grupo.grupo}>
                        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">
                            {grupo.grupo}
                        </p>
                        <ul className="space-y-0.5">
                            {grupo.items.map((item) => {
                                const active =
                                    pathname === item.href ||
                                    pathname.startsWith(item.href + "/");

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`
                        flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition
                        ${active
                                                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200"
                                                }
                      `}
                                        >
                                            <span className={active ? "text-blue-600 dark:text-blue-400" : ""}>
                                                {item.icon}
                                            </span>
                                            <span>{item.label}</span>
                                            {item.badge && (
                                                <span className="ml-auto h-2 w-2 rounded-full bg-blue-500" />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
}