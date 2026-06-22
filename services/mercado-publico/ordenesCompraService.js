import { fetchMercadoPublico } from "@/services/mercado-publico/mercadoPublicoClient";
import { mapOrdenCompra } from "@/services/mercado-publico/mercadoPublicoMapper";

function getFechaHoy() {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, "0");
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const yyyy = hoy.getFullYear();
    return `${dd}${mm}${yyyy}`;
}

export async function getOrdenesCompra({
    codigo = "",
    pagina = 1,
    tamanoPagina = 50,
} = {}) {
    const json = await fetchMercadoPublico("OrdenCompra", {
        ...(codigo ? { codigo } : { fecha: getFechaHoy() }),
    });

    const lista = Array.isArray(json?.Listado)
        ? json.Listado
        : Array.isArray(json?.ListadoOrdenesCompra)
            ? json.ListadoOrdenesCompra
            : Array.isArray(json?.data)
                ? json.data
                : Array.isArray(json)
                    ? json
                    : json
                        ? [json]
                        : [];

    const filas = lista.map(mapOrdenCompra);
    const inicio = (pagina - 1) * tamanoPagina;

    return {
        filas: filas.slice(inicio, inicio + tamanoPagina),
        totalRegistros: filas.length,
        paginaActual: pagina,
        tamanoPagina,
        paginacion: Math.max(1, Math.ceil(filas.length / tamanoPagina)),
        fechaUsada: getFechaHoy(),
    };
}