export function mapCompraAgil(item = {}) {
    return {
        id: item.CodigoExterno ?? item.ID ?? null,
        codigo: item.CodigoExterno ?? null,
        nombre: item.Nombre ?? item.NombreProducto ?? "Sin nombre",
        estado: item.Estado ?? "Sin estado",
        fechaCreacion: item.FechaCreacion ?? null,
        fechaCierre: item.FechaCierre ?? null,
        organismo: item.NombreOrganismo ?? item.Organismo ?? "Sin organismo",
        region: item.Region ?? "Sin región",
        monto: item.MontoEstimado ?? item.Monto ?? 0,
        moneda: item.Moneda ?? "CLP",
        descripcion: item.Descripcion ?? null,
        _raw: item,
    };
}

export function mapLicitacion(item = {}) {
    return {
        id: item.CodigoExterno ?? item.ID ?? null,
        codigo: item.CodigoExterno ?? null,
        nombre: item.Nombre ?? "Sin nombre",
        estado: item.Estado ?? "Sin estado",
        fechaCierre: item.FechaCierre ?? null,
        fechaCreacion: item.FechaCreacion ?? null,
        organismo: item.NombreOrganismo ?? item.Organismo ?? "Sin organismo",
        descripcion: item.Descripcion ?? null,
        _raw: item,
    };
}

export function mapOrdenCompra(item = {}) {
    return {
        id: item.Codigo ?? item.ID ?? null,
        codigo: item.Codigo ?? null,
        proveedor: item.NombreProveedor ?? "Sin proveedor",
        comprador: item.NombreOrganismo ?? item.Organismo ?? "Sin organismo",
        montoTotal: item.MontoTotal ?? 0,
        moneda: item.Moneda ?? "CLP",
        fecha: item.FechaEmision ?? item.Fecha ?? null,
        estado: item.Estado ?? "Sin estado",
        _raw: item,
    };
}