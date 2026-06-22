import CompraAgilVisualizer from "@/components/apis/mercado-publico/CompraAgilVisualizer";
import ErrorBanner from "@/components/shared/ErrorBanner";
import { getComprasAgiles } from "@/services/mercado-publico/compraAgilService";

export const revalidate = 1800;

export default async function CompraAgilPage() {
    try {
        const resultado = await getComprasAgiles({ tamanoPagina: 50 });

        return (
            <CompraAgilVisualizer
                data={resultado?.filas ?? []}
                meta={resultado}
            />
        );
    } catch (error) {
        return (
            <ErrorBanner
                title="Compra Ágil no disponible"
                message={error?.message || "No se pudieron cargar datos de Mercado Público."}
            />
        );
    }
}