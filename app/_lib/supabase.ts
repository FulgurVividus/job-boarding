import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_CLIENT_KEY!
);

// export const supabaseServer = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_SERVER_KEY!
// );
