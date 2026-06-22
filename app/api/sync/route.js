import { NextResponse } from "next/server";
import { syncRematesTGR } from "@/services/supabase/syncService";

export async function GET(request) {
  const secret = request.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const resultado = await syncRematesTGR();
    return NextResponse.json({ success: true, ...resultado });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}