import { createClient } from "@supabase/supabase-js";

// Solo usar en Server Components / API Routes (nunca en cliente)
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);