
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bgnqwbpvuhkrldwyexrn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnbnF3YnB2dWhrcmxkd3lleHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2NDM1MzQsImV4cCI6MjAwNTIxOTUzNH0.WYiDCjMLFWLgTGWG6cI5Ze15b1n9AKos4afLl4DR2vg'
const supabase = createClient(supabaseUrl, supabaseKey, {

  // Không dùng cùng phải thêm Authorization: `Bearer ${supabaseKey}` vào headers :vv mặc dù đã có supabaseKey ở trên rồi @@
  headers: {
    Authorization: `Bearer `,
    "Content-Type": "application/json",
    Accept: "application/json",
  }
})

export default supabase