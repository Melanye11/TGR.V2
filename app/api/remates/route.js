import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 1. Conectamos directamente a TU base de datos Supabase (El reproductor de DVD)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const comuna = searchParams.get("comuna") ?? null;
        const busqueda = searchParams.get("busqueda") ?? null;

        // 2. Extraemos los 470 datos limpios de Supabase
        const { data: datosSupabase, error } = await supabase
            .from("remates")
            .select("*");

        if (error) throw error;

        // 3. EL ADAPTADOR MÁGICO: Traducimos tus columnas limpias a los nombres que espera el diseño
        const datosAdaptados = datosSupabase.map(d => ({
            ...d,
            comunaJuzgado: d.comuna,
            direccionRol: d.direccion,
            nombreDuegno: d.nombre_dueno,
            nombreJuzgado: d.tribunal,
            fechaRemate: d.fecha_remate,
            tasacion: d.monto_minimo,
            avaluo: d.monto_avaluo,
            // Simulamos el objeto _raw por si el botón "Ver" lo está buscando internamente
            _raw: { ...d } 
        }));

        let resultado = datosAdaptados;

        // 4. Mantenemos el buscador y los filtros de tu compañero intactos
        if (comuna && comuna !== "TODAS") {
            resultado = resultado.filter(
                (d) => (d.comunaJuzgado ?? "").toUpperCase() === comuna.toUpperCase()
            );
        }

        if (busqueda && busqueda.trim() !== "") {
            const b = busqueda.toLowerCase().trim();
            resultado = resultado.filter(
                (d) =>
                    (d.direccionRol ?? "").toLowerCase().includes(b) ||
                    (d.nombreDuegno ?? "").toLowerCase().includes(b) ||
                    (d.rol ?? "").toLowerCase().includes(b)
            );
        }

        // 5. Entregamos la respuesta exactamente como el Dashboard la espera
        return NextResponse.json(
            {
                success: true,
                count: resultado.length,
                total: datosAdaptados.length,
                cache: { origen: "Supabase Local", estado: "Limpio" }, // Simula caché para que no de error
                data: resultado,
            },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store",
                },
            }
        );

    } catch (error) {
        console.error("[GET /api/remates] ❌", error.message);
        return NextResponse.json(
            {
                success: false,
                error: "Error al obtener remates desde Supabase",
            },
            { status: 500 }
        );
    }
}
