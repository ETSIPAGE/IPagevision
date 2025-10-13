
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// To use this client, you'll need a table in your Supabase project.
// The app is now designed to work with the following schema.
// NOTE: `conversation_ids` stores an array of Flowise session IDs.
//
// CREATE TABLE "chat_conversations" (
//   user_session_id TEXT PRIMARY KEY,
//   conversation_ids TEXT[], -- This should be an array of strings
//   updated_at TIMESTAMPTZ DEFAULT NOW()
// );
//

export const supabase = createClient(supabaseUrl, supabaseAnonKey);