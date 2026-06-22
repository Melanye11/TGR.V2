import LoadingState from "@/components/shared/LoadingState";

export default function Loading() {
    return (
        <LoadingState
            title="Cargando Compra Ágil"
            description="Se están consultando registros desde la API de Mercado Público."
        />
    );
}