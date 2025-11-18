import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export default async function getUserIdFromRequest(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) {
    return {
      error: NextResponse.json({ success: false, message: 'User Unauthorized' }, { status: 401 }),
    }
  }

  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) {
    return {
      error: NextResponse.json({ success: false, message: 'JWT secret not set' }, { status: 500 }),
    }
  }

  try {
    const secret = new TextEncoder().encode(jwtSecret)
    const { payload } = await jwtVerify(token, secret)
    const userId = payload.id as string
    if (!userId) {
      return {
        error: NextResponse.json({ success: false, message: 'Invalid Token' }, { status: 401 }),
      }
    }
    return { userId }
  } catch (error) {
    console.log(error)
    return {
      error: NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      ),
    }
  }
}
