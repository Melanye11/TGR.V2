import { fetchCompraAgilBeta } from "@/services/mercado-publico/compraAgilBetaClient";
import { mapCompraAgil } from "@/services/mercado-publico/mercadoPublicoMapper";
import { extraerListado } from "@/lib/mercado-publico/extraerListado";

function getFechaHoy() {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, "0");
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const yyyy = hoy.getFullYear();
    return `${dd}${mm}${yyyy}`;
}

function normalizarRespuestaCompraAgilBeta(json) {
    return extraerListado(json, [
        "items",
        "data",
        "results",
        "ListadoComprasAgiles",
        "Listado",
    ]);
}

export async function getComprasAgiles({
    estado = "",
    region = "",
    textoBusqueda = "",
    pagina = 1,
    tamanoPagina = 50,
} = {}) {
    try {
        const json = await fetchCompraAgilBeta({
            fecha: getFechaHoy(),
            estado,
            region,
            q: textoBusqueda,
            page: pagina,
            limit: tamanoPagina,
        });

        const lista = normalizarRespuestaCompraAgilBeta(json);
        const filas = lista.map(mapCompraAgil);

        const totalRegistros =
            json?.total ??
            json?.totalRegistros ??
            json?.pagination?.total ??
            filas.length;

        const paginacion =
            json?.totalPages ??
            json?.pagination?.totalPages ??
            Math.max(1, Math.ceil(totalRegistros / tamanoPagina));

        return {
            filas,
            totalRegistros,
            paginaActual: pagina,
            tamanoPagina,
            paginacion,
            fechaUsada: getFechaHoy(),
            desdeCache: false,
            fuente: "compra-agil-beta",
        };
    } catch (error) {
        console.warn("Compra Ágil Beta no disponible:", error.message);

        return {
            filas: [],
            totalRegistros: 0,
            paginaActual: pagina,
            tamanoPagina,
            paginacion: 1,
            fechaUsada: getFechaHoy(),
            desdeCache: false,
            fuente: "compra-agil-beta",
            error: "Compra Ágil Beta no disponible",
        };
    }
}

export async function listarComprasAgiles(opciones = {}) {
    return getComprasAgiles(opciones);
}