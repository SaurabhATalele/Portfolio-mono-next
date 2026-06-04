import { NextResponse } from 'next/server'

export async function GET() {
  const response = NextResponse.redirect(new URL('/testimonials/add/new', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'))
  response.cookies.delete('google_user_session')
  return response
}
