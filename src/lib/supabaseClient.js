import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://veomvakausemmsvthfwu.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlb212YWthdXNlbW1zdnRoZnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkyNjU2MTQsImV4cCI6MjAwNDg0MTYxNH0.3NR2mAXqWPQSHOszNZ4Y8Z-1DuloURrSqHS2ZQdhdFY"
export const supabase = createClient(supabaseUrl, supabaseKey)