import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gcfgbufmtgxqokljpnbr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjZmdidWZtdGd4cW9rbGpwbmJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NzkxNjEsImV4cCI6MjA5NzU1NTE2MX0.czolD-RiONGKAbr9r6p937VxMjgY1OJfv6jrQWDa4jY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);