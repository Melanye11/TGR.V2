import { getRematesActivos } from "@/services/tgr/rematesService";
import { mapearRemate } from "@/services/tgr/rematesMapper";
import { upsertRemates } from "@/services/supabase/rematesRepo";

export async function syncRematesTGR() {
    const raw = await getRematesActivos();
    const mapeados = raw.map(mapearRemate);
    await upsertRemates(mapeados);
    return { sincronizados: mapeados.length };
}