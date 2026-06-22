"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function ThemeToggleBtn() {
    const { theme, toggle } = useTheme();

    return (
        <button
            onClick={toggle}
            title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                cursor: "pointer",
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono hover:opacity-80 transition"
        >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            <span>{theme === "dark" ? "light" : "dark"}</span>
            <div
                style={{
                    background: theme === "dark" ? "var(--accent)" : "var(--warning)",
                    boxShadow: `0 0 8px ${theme === "dark" ? "var(--accent)" : "var(--warning)"}`,
                    width: "32px",
                    height: "16px",
                    borderRadius: "999px",
                    position: "relative",
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        background: "var(--bg)",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "2px",
                        left: theme === "dark" ? "2px" : "18px",
                        transition: "left 200ms ease",
                    }}
                />
            </div>
        </button>
    );
}