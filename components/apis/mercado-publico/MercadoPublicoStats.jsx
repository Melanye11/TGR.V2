export default function MercadoPublicoStats({ meta = {} }) {
    const cards = [
        {
            label: "Registros",
            value: meta?.totalRegistros ?? 0,
            color: "text-cyan-300",
            border: "border-cyan-500/30",
        },
        {
            label: "Página actual",
            value: meta?.paginaActual ?? 1,
            color: "text-emerald-300",
            border: "border-emerald-500/30",
        },
        {
            label: "Tamaño página",
            value: meta?.tamanoPagina ?? 50,
            color: "text-amber-300",
            border: "border-amber-500/30",
        },
        {
            label: "Total páginas",
            value: meta?.paginacion ?? 1,
            color: "text-fuchsia-300",
            border: "border-fuchsia-500/30",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
                <div
                    key={card.label}
                    className={`rounded-2xl border bg-slate-950/70 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] ${card.border}`}
                >
                    <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                        {card.label}
                    </p>
                    <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                </div>
            ))}
        </div>
    );
}