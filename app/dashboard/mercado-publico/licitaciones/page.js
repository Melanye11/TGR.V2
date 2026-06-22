import LicitacionesVisualizer from "@/components/apis/mercado-publico/LicitacionesVisualizer";
import ErrorBanner from "@/components/shared/ErrorBanner";
import { getLicitaciones } from "@/services/mercado-publico/licitacionesService";

export const revalidate = 1800;

export default async function LicitacionesPage() {
    try {
        const resultado = await getLicitaciones({ tamanoPagina: 50 });

        return (
            <LicitacionesVisualizer
                data={resultado?.filas ?? []}
                meta={resultado}
            />
        );
    } catch (error) {
        return (
            <ErrorBanner
                title="Licitaciones no disponibles"
                message={error?.message || "No se pudieron cargar licitaciones."}
            />
        );
    }
}