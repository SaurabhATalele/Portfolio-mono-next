import { NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'

export async function GET() {
  const client_id = process.env.GOOGLE_CLIENT_ID
  const client_secret = process.env.GOOGLE_CLIENT_SECRET
  const redirect_uri = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/google/callback`

  // Graceful mockup mode if credentials are missing
  if (!client_id || !client_secret) {
    console.warn("GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set. Falling back to mockup mode.")
    const mockUrl = `/api/auth/google/callback?code=mock_code_for_testing`
    return NextResponse.redirect(new URL(mockUrl, `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/testimonials/add/new`))
  }

  const client = new OAuth2Client(client_id, client_secret, redirect_uri)
  const authorizeUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    prompt: 'consent'
  })

  return NextResponse.redirect(authorizeUrl)
}
