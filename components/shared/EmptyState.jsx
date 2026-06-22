export default function EmptyState({
    title = "Sin resultados",
    message = "No hay datos disponibles para mostrar en este momento.",
}) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-6 py-10 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Estado
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">{message}</p>
        </div>
    );
}