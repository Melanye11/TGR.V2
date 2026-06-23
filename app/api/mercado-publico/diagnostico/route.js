import { NextResponse } from "next/server";

export async function GET() {
    const ticket = process.env.MERCADO_PUBLICO_TICKET;

    if (!ticket) {
        return NextResponse.json({ error: "MERCADO_PUBLICO_TICKET no configurado en .env.local" }, { status: 500 });
    }

    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, "0");
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const yyyy = hoy.getFullYear();
    const fecha = `${dd}${mm}${yyyy}`;

    const endpoints = [
        `https://api.mercadopublico.cl/servicios/v1/publico/Comprasagiles?ticket=${ticket}&fecha=${fecha}&formato=json`,
        `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones?ticket=${ticket}&fecha=${fecha}&formato=json`,
        `https://api.mercadopublico.cl/servicios/v1/publico/OrdenCompra?ticket=${ticket}&fecha=${fecha}&formato=json`,
    ];

    const resultados = await Promise.allSettled(
        endpoints.map(async (url) => {
            const r = await fetch(url, { cache: "no-store" });
            const text = await r.text();
            let json = null;
            try { json = JSON.parse(text); } catch { /* no es json */ }
            return { url: url.replace(ticket, "***"), status: r.status, ok: r.ok, preview: text.slice(0, 300), json };
        })
    );

    return NextResponse.json({
        ticket_configurado: true,
        ticket_preview: `${ticket.slice(0, 4)}...${ticket.slice(-4)}`,
        fecha_consultada: fecha,
        resultados: resultados.map((r) => r.status === "fulfilled" ? r.value : { error: r.reason?.message }),
    });
}