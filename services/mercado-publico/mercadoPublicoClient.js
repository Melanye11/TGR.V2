const MP_API_BASE = "https://api.mercadopublico.cl/servicios/v1/publico";

export async function fetchMercadoPublico(endpoint, params = {}) {
    const ticket = process.env.MERCADO_PUBLICO_TICKET;

    if (!ticket) {
        throw new Error("MERCADO_PUBLICO_TICKET no configurado en .env.local");
    }

    const url = new URL(`${MP_API_BASE}/${endpoint}`);
    url.searchParams.set("ticket", ticket);
    url.searchParams.set("formato", "json");

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            url.searchParams.set(key, String(value));
        }
    });

    const response = await fetch(url.toString(), {
        cache: "no-store",
        headers: { Accept: "application/json" },
    });

    if (!response.ok) {
        throw new Error(`Mercado Público API: ${response.status} ${response.statusText}`);
    }

    return response.json();
}