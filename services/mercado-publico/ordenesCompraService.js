import { fetchMercadoPublico } from "@/services/mercado-publico/mercadoPublicoClient";
import { mapOrdenCompra } from "@/services/mercado-publico/mercadoPublicoMapper";
import { extraerListado } from "@/lib/mercado-publico/extraerListado";

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
    const json = await fetchMercadoPublico("/ordenesdecompra.json", {
        ...(codigo ? { codigo } : { fecha: getFechaHoy() }),
    });

    const lista = extraerListado(json, [
        "ListadoOC",
        "ListadoOrdenesCompra",
        "Listado",
    ]);
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