export const MP_CONFIG = {
    baseUrl: "https://api.mercadopublico.cl/servicios/v1/publico",
    ticketEnv: "MERCADO_PUBLICO_TICKET",
    cacheTtlMs: 30 * 60 * 1000,
    defaultPageSize: 50,
    maxFetchSize: 1000,
};

export const MP_MODULOS = [
    {
        key: "compra-agil",
        label: "Compra Ágil",
        href: "/dashboard/mercado-publico/compra-agil",
    },
    {
        key: "licitaciones",
        label: "Licitaciones",
        href: "/dashboard/mercado-publico/licitaciones",
    },
    {
        key: "ordenes-compra",
        label: "Órdenes de Compra",
        href: "/dashboard/mercado-publico/ordenes-compra",
    },
];