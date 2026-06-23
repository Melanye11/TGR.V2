"use client";

import { useState, useEffect } from "react";

export function useMercadoPublico(modulo) {
    const [estado, setEstado] = useState({
        data: [],
        loading: true,
        error: null,
        fecha: null,
        total: 0,
    });

    useEffect(() => {
        if (!modulo) return;
        let cancelado = false;

        setEstado((e) => ({ ...e, loading: true, error: null }));

        fetch(`/api/mercado-publico/${modulo}`)
            .then((r) => r.json())
            .then((json) => {
                if (cancelado) return;
                setEstado({
                    data: json.data ?? [],
                    loading: false,
                    error: json.ok === false ? json.mensaje : null,
                    fecha: json.fecha,
                    total: json.total ?? 0,
                });
            })
            .catch((err) => {
                if (cancelado) return;
                setEstado({ data: [], loading: false, error: err.message, fecha: null, total: 0 });
            });

        return () => { cancelado = true; };
    }, [modulo]);

    return estado;
}