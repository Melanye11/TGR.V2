import Sidebar from "@/components/layout/Sidebar";
import ThemeToggleBtn from "@/components/layout/ThemeToggleBtn";

export default function DashboardShell({ children, titulo, subtitulo }) {
    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg)" }}>
            <Sidebar />

            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <header
                    style={{
                        background: "var(--surface)",
                        borderBottom: "1px solid var(--border)",
                        padding: "0.875rem 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                    }}
                >
                    <div>
                        {titulo && (
                            <h1
                                style={{
                                    color: "var(--text)",
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    fontSize: "1.1rem",
                                }}
                            >
                                {titulo}
                            </h1>
                        )}
                        {subtitulo && (
                            <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "2px" }}>
                                {subtitulo}
                            </p>
                        )}
                    </div>

                    <ThemeToggleBtn />
                </header>

                <main style={{ flex: 1, padding: "1.5rem", overflowX: "auto" }}>
                    {children}
                </main>
            </div>
        </div>
    );
}