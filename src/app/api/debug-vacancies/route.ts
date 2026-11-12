import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Temporary debug route — remove after fixing
export async function GET() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET'
  const key  = process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET (' + process.env.SUPABASE_SERVICE_ROLE_KEY.slice(0, 20) + '...)' : 'NOT SET'

  const { data, error, count } = await supabase
    .from('vacancies')
    .select('*', { count: 'exact' })

  return NextResponse.json({
    supabase_url: url,
    service_key: key,
    row_count: count,
    error: error ? { message: error.message, code: error.code, details: error.details } : null,
    data: data,
  })
}
