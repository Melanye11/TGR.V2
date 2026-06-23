import { NextResponse } from "next/server";

const ENDPOINTS_MAP = {
    "compra-agil": {
        paths: ["Comprasagiles", "comprasagiles", "compra-agil"],
        listaKey: ["ListadoComprasAgiles", "Listado", "data"],
    },
    licitaciones: {
        paths: ["licitaciones", "Licitaciones"],
        listaKey: ["Listado", "ListadoLicitaciones", "data"],
    },
    "ordenes-compra": {
        paths: ["OrdenCompra", "ordencompra", "ordenes-compra"],
        listaKey: ["Listado", "ListadoOrdenesCompra", "data"],
    },
};

function getFecha() {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, "0");
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    return `${dd}${mm}${hoy.getFullYear()}`;
}

function extraerLista(json, claves) {
    for (const k of claves) {
        if (Array.isArray(json?.[k])) return json[k];
    }
    if (Array.isArray(json)) return json;
    return null;
}

export async function GET(req, { params }) {
    const modulo = params.modulo;
    const config = ENDPOINTS_MAP[modulo];

    if (!config) {
        return NextResponse.json({ error: `Módulo desconocido: ${modulo}` }, { status: 400 });
    }

    const ticket = process.env.MERCADO_PUBLICO_TICKET;
    if (!ticket) {
        return NextResponse.json({ error: "MERCADO_PUBLICO_TICKET no configurado" }, { status: 500 });
    }

    const fecha = getFecha();
    const base = "https://api.mercadopublico.cl/servicios/v1/publico";

    for (const path of config.paths) {
        try {
            const url = `${base}/${path}?ticket=${ticket}&fecha=${fecha}&formato=json&cantidad=1000`;
            const r = await fetch(url, {
                cache: "no-store",
                headers: { Accept: "application/json" },
                signal: AbortSignal.timeout(10000),
            });

            if (!r.ok) continue;

            const json = await r.json();
            const lista = extraerLista(json, config.listaKey);

            if (lista !== null) {
                return NextResponse.json({
                    ok: true,
                    modulo,
                    fecha,
                    total: lista.length,
                    data: lista,
                });
            }
        } catch {
            continue;
        }
    }

    return NextResponse.json({
        ok: false,
        modulo,
        fecha,
        total: 0,
        data: [],
        mensaje: "La API de Mercado Público no devolvió registros para la fecha de hoy.",
    });
}