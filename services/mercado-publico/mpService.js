const MP_BASE = "https://api.mercadopublico.cl/servicios/v1/publico";

export async function fetchMP(path) {
    const ticket = process.env.MERCADO_PUBLICO_TICKET;
    if (!ticket) {
        throw new Error(
            "Variable MERCADO_PUBLICO_TICKET no configurada en .env.local"
        );
    }

    const sep = path.includes("?") ? "&" : "?";
    const url = `${MP_BASE}${path}${sep}ticket=${ticket}`;

    const res = await fetch(url, {
        cache: "no-store",
        headers: { Accept: "application/json" },
    });

    if (!res.ok) {
        throw new Error(`Error Mercado Público [${res.status}]: ${path}`);
    }

    return res.json();
}