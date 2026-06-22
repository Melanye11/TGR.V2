"use client";

export default function TablaBase({ columnas, datos, vacia = "Sin datos disponibles" }) {
  if (!datos || datos.length === 0) {
    return (
      <div
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        className="flex items-center justify-center h-40 rounded-xl"
      >
        <p style={{ color: "var(--text-muted)" }} className="text-sm font-mono">
          // {vacia}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      className="rounded-xl overflow-auto"
    >
      <table className="min-w-full text-sm">
        <thead>
          <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
            {columnas.map((col) => (
              <th
                key={col.key}
                style={{ color: "var(--accent)", fontFamily: "monospace" }}
                className="text-left px-4 py-3 font-semibold whitespace-nowrap text-xs uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, i) => (
            <tr
              key={i}
              style={{ borderBottom: "1px solid var(--border)" }}
              className="hover:opacity-80 transition-opacity"
            >
              {columnas.map((col) => (
                <td
                  key={col.key}
                  style={{ color: "var(--text-secondary)", fontFamily: "monospace" }}
                  className="px-4 py-3"
                >
                  {col.render ? col.render(fila[col.key], fila) : fila[col.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}