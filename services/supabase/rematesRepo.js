import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function getAllRemates() {
    const { data, error } = await supabaseAdmin
        .from("remates")
        .select("*")
        .order("fecha_remate", { ascending: true });
    if (error) throw error;
    return data;
}

export async function upsertRemates(remates) {
    const { error } = await supabaseAdmin
        .from("remates")
        .upsert(remates, { onConflict: "rol" });
    if (error) throw error;
}