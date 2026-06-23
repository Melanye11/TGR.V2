const MP_COMPRA_AGIL_BETA_BASE =
    process.env.MP_COMPRA_AGIL_BETA_BASE_URL || "";

const MP_COMPRA_AGIL_BETA_PATH =
    process.env.MP_COMPRA_AGIL_BETA_PATH || "/";

const MP_COMPRA_AGIL_BETA_TOKEN =
    process.env.MP_COMPRA_AGIL_BETA_TOKEN || "";

function buildUrl(pathname, params = {}) {
    const base = MP_COMPRA_AGIL_BETA_BASE.replace(/\/+$/, "");
    const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
    const url = new URL(`${base}${path}`);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            url.searchParams.set(key, String(value));
        }
    });

    return url;
}

export async function fetchCompraAgilBeta(params = {}) {
    if (!MP_COMPRA_AGIL_BETA_BASE) {
        throw new Error("Falta MP_COMPRA_AGIL_BETA_BASE_URL en variables de entorno");
    }

    const url = buildUrl(MP_COMPRA_AGIL_BETA_PATH, params);

    const headers = {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; TGR.V2/1.0)",
    };

    if (MP_COMPRA_AGIL_BETA_TOKEN) {
        headers.Authorization = `Bearer ${MP_COMPRA_AGIL_BETA_TOKEN}`;
    }

    const response = await fetch(url.toString(), {
        method: "GET",
        headers,
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(
            `Compra Ágil Beta API: ${response.status} ${response.statusText}`
        );
    }

    return response.json();
}