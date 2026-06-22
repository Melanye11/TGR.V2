import LoadingState from "@/components/shared/LoadingState";

export default function Loading() {
    return (
        <LoadingState
            title="Cargando Órdenes de Compra"
            description="Se está consultando la información de órdenes de compra."
        />
    );
}