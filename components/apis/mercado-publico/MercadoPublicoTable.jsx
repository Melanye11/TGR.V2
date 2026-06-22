export default function MercadoPublicoTable({
    columns = [],
    rows = [],
    emptyMessage = "No hay datos disponibles.",
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-slate-200">
                    <thead className="bg-slate-900/80">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-4 py-3 text-left text-xs uppercase tracking-[0.16em] text-slate-400"
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-4 py-10 text-center text-slate-400"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, index) => (
                                <tr
                                    key={row.id ?? index}
                                    className="border-t border-slate-800/80"
                                >
                                    {columns.map((column) => (
                                        <td key={column.key} className="px-4 py-3 align-top">
                                            {column.render ? column.render(row) : row[column.key] ?? "—"}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}