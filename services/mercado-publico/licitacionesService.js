import { fetchMercadoPublico } from "@/services/mercado-publico/mercadoPublicoClient";
import { mapLicitacion } from "@/services/mercado-publico/mercadoPublicoMapper";

function getFechaHoy() {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, "0");
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const yyyy = hoy.getFullYear();
    return `${dd}${mm}${yyyy}`;
}

export async function getLicitaciones({
    estado = "",
    textoBusqueda = "",
    pagina = 1,
    tamanoPagina = 50,
} = {}) {
    const json = await fetchMercadoPublico("licitaciones", {
        fecha: getFechaHoy(),
        estado,
        ...(textoBusqueda ? { codigo: textoBusqueda } : {}),
    });

    const lista = Array.isArray(json?.Listado)
        ? json.Listado
        : Array.isArray(json?.ListadoLicitaciones)
            ? json.ListadoLicitaciones
            : Array.isArray(json?.data)
                ? json.data
                : Array.isArray(json)
                    ? json
                    : [];

    const filas = lista.map(mapLicitacion);
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