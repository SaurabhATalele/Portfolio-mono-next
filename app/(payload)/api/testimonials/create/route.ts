import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('google_user_session')

  if (!sessionCookie) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let user
  try {
    user = JSON.parse(sessionCookie.value)
  } catch (err) {
    return NextResponse.json({ error: 'Invalid Session' }, { status: 401 })
  }

  try {
    const { content, rating, position, organization } = await req.json()
    if (!content || !rating) {
      return NextResponse.json({ error: 'Content and rating are required' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const testimonial = await payload.create({
      collection: 'testimonials',
      data: {
        name: user.name,
        email: user.email,
        avatar: user.avatar || '',
        content,
        rating: Number(rating),
        position: position || '',
        organization: organization || '',
        approved: true, // Auto approve for display
      }
    })

    return NextResponse.json({ success: true, testimonial })
  } catch (err: any) {
    console.error('Error creating testimonial:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
