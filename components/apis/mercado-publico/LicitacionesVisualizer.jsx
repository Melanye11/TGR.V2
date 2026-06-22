"use client";

import { useState, useMemo } from "react";
import MpSubnav from "./MpSubnav";
import MercadoPublicoStats from "./MercadoPublicoStats";
import MercadoPublicoTable from "./MercadoPublicoTable";
import EmptyState from "@/components/shared/EmptyState";

function formatFecha(valor) {
    if (!valor) return "—";
    const fecha = new Date(valor);
    if (isNaN(fecha.getTime())) return valor;
    return fecha.toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

const ESTADO_ESTILOS = {
    Publicada: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    Adjudicada: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    Cerrada: "border-slate-500/40 bg-slate-500/10 text-slate-400",
    Desierta: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    Cancelada: "border-red-500/40 bg-red-500/10 text-red-300",
    Suspendida: "border-orange-500/40 bg-orange-500/10 text-orange-300",
    "En Evaluación": "border-violet-500/40 bg-violet-500/10 text-violet-300",
};

function EstadoBadge({ estado }) {
    const estilo =
        ESTADO_ESTILOS[estado] ||
        "border-slate-600/40 bg-slate-600/10 text-slate-400";

    return (
        <span
            className={`inline-block rounded-full border px-3 py-0.5 text-xs font-medium ${estilo}`}
        >
            {estado || "Sin estado"}
        </span>
    );
}

export default function LicitacionesVisualizer({ data = [], meta = {} }) {
    const [busqueda, setBusqueda] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("");

    const estados = useMemo(() => {
        const set = new Set(data.map((d) => d.estado).filter(Boolean));
        return Array.from(set).sort();
    }, [data]);

    const filasFiltradas = useMemo(() => {
        return data.filter((row) => {
            const textMatch =
                !busqueda ||
                row.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
                row.codigo?.toLowerCase().includes(busqueda.toLowerCase()) ||
                row.organismo?.toLowerCase().includes(busqueda.toLowerCase());

            const estadoMatch = !estadoFiltro || row.estado === estadoFiltro;

            return textMatch && estadoMatch;
        });
    }, [data, busqueda, estadoFiltro]);

    const metaFiltrada = {
        ...meta,
        totalRegistros: filasFiltradas.length,
        paginacion: Math.max(
            1,
            Math.ceil(filasFiltradas.length / (meta?.tamanoPagina ?? 50))
        ),
    };

    const columns = [
        { key: "codigo", label: "Código" },
        {
            key: "nombre",
            label: "Nombre",
            render: (row) => (
                <span className="block max-w-xs truncate" title={row.nombre}>
                    {row.nombre || "—"}
                </span>
            ),
        },
        {
            key: "organismo",
            label: "Organismo",
            render: (row) => (
                <span
                    className="block max-w-xs truncate text-slate-300"
                    title={row.organismo}
                >
                    {row.organismo || "—"}
                </span>
            ),
        },
        {
            key: "estado",
            label: "Estado",
            render: (row) => <EstadoBadge estado={row.estado} />,
        },
        {
            key: "fechaCreacion",
            label: "Publicación",
            render: (row) => (
                <span className="text-slate-300">{formatFecha(row.fechaCreacion)}</span>
            ),
        },
        {
            key: "fechaCierre",
            label: "Cierre",
            render: (row) => (
                <span className="text-slate-300">{formatFecha(row.fechaCierre)}</span>
            ),
        },
    ];

    return (
        <section className="space-y-6">
            <MpSubnav />

            {/* Header */}
            <div className="rounded-2xl border border-violet-500/20 bg-slate-950/70 p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-violet-300">
                    Mercado Público
                </p>
                <h1 className="text-3xl font-bold text-white">Licitaciones</h1>
                <p className="mt-2 max-w-3xl text-slate-400">
                    Procesos de licitación consultados desde la API de Mercado Público.
                    Los datos se actualizan automáticamente cada 30 minutos.
                </p>
            </div>

            {/* KPIs */}
            <MercadoPublicoStats meta={metaFiltrada} />

            {/* Filtros */}
            <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <input
                    type="text"
                    placeholder="Buscar por nombre, código u organismo..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="min-w-[220px] flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30"
                />

                <select
                    value={estadoFiltro}
                    onChange={(e) => setEstadoFiltro(e.target.value)}
                    className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30"
                >
                    <option value="">Todos los estados</option>
                    {estados.map((e) => (
                        <option key={e} value={e}>
                            {e}
                        </option>
                    ))}
                </select>

                {(busqueda || estadoFiltro) && (
                    <button
                        onClick={() => {
                            setBusqueda("");
                            setEstadoFiltro("");
                        }}
                        className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-400 transition hover:border-red-500/40 hover:text-red-300"
                    >
                        Limpiar filtros
                    </button>
                )}
            </div>

            {/* Tabla o empty state */}
            {filasFiltradas.length === 0 ? (
                <EmptyState
                    title="Sin resultados"
                    message={
                        busqueda || estadoFiltro
                            ? "No hay licitaciones que coincidan con los filtros aplicados."
                            : "La API no devolvió licitaciones para la fecha actual o el ticket no está configurado."
                    }
                />
            ) : (
                <MercadoPublicoTable
                    columns={columns}
                    rows={filasFiltradas}
                    emptyMessage="Sin licitaciones disponibles."
                />
            )}

            {/* Pie */}
            {meta?.fechaUsada && (
                <p className="text-right text-xs text-slate-600">
                    Fecha consultada: {meta.fechaUsada}
                    {meta.desdeCache && " · desde caché"}
                </p>
            )}
        </section>
    );
}