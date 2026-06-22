import { fetchMercadoPublico } from "@/services/mercado-publico/mercadoPublicoClient";
import { mapCompraAgil } from "@/services/mercado-publico/mercadoPublicoMapper";

function getFechaHoy() {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, "0");
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const yyyy = hoy.getFullYear();
    return `${dd}${mm}${yyyy}`;
}

// Todos los endpoints posibles de Compra Ágil según documentación ChileCompra
const ENDPOINTS_CANDIDATOS = [
    "comprasagiles",
    "compra-agil",
    "compraagil",
];

async function fetchConFallback(params) {
    for (const endpoint of ENDPOINTS_CANDIDATOS) {
        try {
            const json = await fetchMercadoPublico(endpoint, params);

            const lista = Array.isArray(json?.ListadoComprasAgiles)
                ? json.ListadoComprasAgiles
                : Array.isArray(json?.Listado)
                    ? json.Listado
                    : Array.isArray(json?.data)
                        ? json.data
                        : Array.isArray(json)
                            ? json
                            : null;

            if (lista !== null) return lista;
        } catch {
            // intenta el siguiente endpoint
            continue;
        }
    }

    // ningún endpoint funcionó — devuelve vacío sin romper la UI
    return [];
}

export async function getComprasAgiles({
    estado = "",
    region = "",
    textoBusqueda = "",
    pagina = 1,
    tamanoPagina = 50,
} = {}) {
    const lista = await fetchConFallback({
        fecha: getFechaHoy(),
        estado,
        region,
        ...(textoBusqueda ? { nombre: textoBusqueda } : {}),
        cantidad: 1000,
        pagina: 1,
    });

    const filas = lista.map(mapCompraAgil);
    const inicio = (pagina - 1) * tamanoPagina;

    return {
        filas: filas.slice(inicio, inicio + tamanoPagina),
        totalRegistros: filas.length,
        paginaActual: pagina,
        tamanoPagina,
        paginacion: Math.max(1, Math.ceil(filas.length / tamanoPagina)),
        fechaUsada: getFechaHoy(),
        desdeCache: false,
    };
}

export async function listarComprasAgiles(opciones = {}) {
    return getComprasAgiles(opciones);
}