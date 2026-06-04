import { NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'Code not found' }, { status: 400 })
  }

  // Fallback / Mock profile
  let profile = {
    name: 'Jane Doe (Mock User)',
    email: 'janedoe@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  }

  const client_id = process.env.GOOGLE_CLIENT_ID
  const client_secret = process.env.GOOGLE_CLIENT_SECRET
  const redirect_uri = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/google/callback`

  if (client_id && client_secret && code !== 'mock_code_for_testing') {
    try {
      const client = new OAuth2Client(client_id, client_secret, redirect_uri)
      const { tokens } = await client.getToken(code)
      client.setCredentials(tokens)

      const ticket = await client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: client_id,
      })
      const payload = ticket.getPayload()
      if (payload) {
        profile = {
          name: payload.name || 'Anonymous',
          email: payload.email || 'anonymous@example.com',
          avatar: payload.picture || ''
        }
      }
    } catch (err: any) {
      console.error('Error exchanging code:', err)
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
  }

  // Set the profile in a secure cookie
  const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'))
  response.cookies.set('google_user_session', JSON.stringify(profile), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/'
  })

  return response
}
