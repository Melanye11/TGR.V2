import Sidebar from "@/components/layout/Sidebar";
import ThemeToggleBtn from "@/components/layout/ThemeToggleBtn";

export default function DashboardShell({ children }) {
    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg)" }}>
            <Sidebar />

            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
                <header
                    style={{
                        background: "var(--surface)",
                        borderBottom: "1px solid var(--border)",
                        padding: "0.875rem 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "1rem",
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                    }}
                >
                    <ThemeToggleBtn />
                </header>

                <main style={{ flex: 1, padding: "1.5rem", overflowX: "auto" }}>
                    {children}
                </main>
            </div>
        </div>
    );
}