import { createClient } from '@supabase/supabase-js';
const supabaseUrl =
  'https://bxmaltcawkcfynthgfkk.supabase.co';

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bWFsdGNhd2tjZnludGhnZmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNDU2MjAsImV4cCI6MjA4MjcyMTYyMH0.fWXND4rZnNR7waHMSMBDP9VKPPpMpjb2rwfYmmpTFz8';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
