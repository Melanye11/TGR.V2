import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function getAllRemates() {
    const supabaseAdmin = getSupabaseAdmin();

    const { data, error } = await supabaseAdmin
        .from("remates")
        .select("*")
        .order("fecha_remate", { ascending: true });

    if (error) throw error;
    return data;
}

export async function upsertRemates(remates) {
    const supabaseAdmin = getSupabaseAdmin();

    const { error } = await supabaseAdmin
        .from("remates")
        .upsert(remates, { onConflict: "rol" });

    if (error) throw error;
}