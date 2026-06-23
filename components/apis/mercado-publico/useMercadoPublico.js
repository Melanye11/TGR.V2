"use client";

import { useEffect, useState } from "react";

export function useMercadoPublico(modulo) {
    const [state, setState] = useState({
        data: [],
        loading: true,
        error: null,
        fecha: null,
        total: 0,
    });

    useEffect(() => {
        if (!modulo) return;

        let cancelado = false;

        async function cargar() {
            try {
                setState((prev) => ({
                    ...prev,
                    loading: true,
                    error: null,
                }));

                const res = await fetch(`/api/mercado-publico/${modulo}`, {
                    method: "GET",
                    cache: "no-store",
                });

                const json = await res.json();

                if (cancelado) return;

                if (!res.ok) {
                    setState({
                        data: [],
                        loading: false,
                        error: json?.error || json?.mensaje || "No se pudieron cargar los datos.",
                        fecha: json?.fecha || null,
                        total: 0,
                    });
                    return;
                }

                setState({
                    data: Array.isArray(json?.data) ? json.data : [],
                    loading: false,
                    error: json?.ok === false ? json?.mensaje || "Sin datos disponibles." : null,
                    fecha: json?.fecha || null,
                    total: Number(json?.total || 0),
                });
            } catch (error) {
                if (cancelado) return;

                setState({
                    data: [],
                    loading: false,
                    error: error?.message || "Error inesperado al consultar Mercado Público.",
                    fecha: null,
                    total: 0,
                });
            }
        }

        cargar();

        return () => {
            cancelado = true;
        };
    }, [modulo]);

    return state;
}