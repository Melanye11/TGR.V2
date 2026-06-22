import { NextResponse } from "next/server";
import { getComprasAgiles } from "@/services/mercado-publico/compraAgilService";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const resultado = await getComprasAgiles({
            estado: searchParams.get("estado") || "",
            region: searchParams.get("region") || "",
            textoBusqueda: searchParams.get("q") || "",
            pagina: Number(searchParams.get("pagina") || 1),
            tamanoPagina: Number(searchParams.get("tamanoPagina") || 50),
        });

        return NextResponse.json(resultado);
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Error consultando Compra Ágil" },
            { status: 500 }
        );
    }
}