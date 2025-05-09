import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseAnonKey = 'process.env.SUPABASE_KEY'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)