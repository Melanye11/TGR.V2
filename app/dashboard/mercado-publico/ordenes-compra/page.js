import OrdenesCompraVisualizer from "@/components/apis/mercado-publico/OrdenesCompraVisualizer";
import ErrorBanner from "@/components/shared/ErrorBanner";
import { getOrdenesCompra } from "@/services/mercado-publico/ordenesCompraService";

export const revalidate = 1800;

export default async function OrdenesCompraPage() {
    try {
        const resultado = await getOrdenesCompra({ tamanoPagina: 50 });

        return (
            <OrdenesCompraVisualizer
                data={resultado?.filas ?? []}
                meta={resultado}
            />
        );
    } catch (error) {
        return (
            <ErrorBanner
                title="Órdenes de compra no disponibles"
                message={error?.message || "No se pudieron cargar las órdenes de compra."}
            />
        );
    }
}