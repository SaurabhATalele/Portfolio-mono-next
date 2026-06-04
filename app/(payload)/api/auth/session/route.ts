import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('google_user_session')

  if (!sessionCookie) {
    return NextResponse.json({ user: null })
  }

  try {
    const user = JSON.parse(sessionCookie.value)
    return NextResponse.json({ user })
  } catch (err) {
    return NextResponse.json({ user: null })
  }
}
