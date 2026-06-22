export default function KpiCard({ titulo, valor, subtitulo, tipo = "default" }) {
    const estilos = {
        default: { border: "var(--accent)", glow: "var(--accent)", val: "var(--accent)" },
        success: { border: "var(--success)", glow: "var(--success)", val: "var(--success)" },
        warning: { border: "var(--warning)", glow: "var(--warning)", val: "var(--warning)" },
        danger: { border: "var(--danger)", glow: "var(--danger)", val: "var(--danger)" },
    };

    const s = estilos[tipo] ?? estilos.default;

    return (
        <div
            style={{
                background: "var(--surface)",
                border: `1px solid ${s.border}`,
                boxShadow: `0 0 16px color-mix(in srgb, ${s.glow} 15%, transparent)`,
            }}
            className="rounded-xl p-5"
        >
            <p style={{ color: "var(--text-muted)" }} className="text-xs font-semibold uppercase tracking-widest mb-1">
                {titulo}
            </p>
            <p style={{ color: s.val, fontFamily: "monospace" }} className="text-3xl font-bold">
                {valor}
            </p>
            {subtitulo && (
                <p style={{ color: "var(--text-muted)" }} className="text-xs mt-1">
                    {subtitulo}
                </p>
            )}
        </div>
    );
}