import { jwtVerify } from 'jose'

export default async function getUserIdToken(token: string | undefined) {
  if (!token) {
    return { error: 'User Unauthorized' }
  }

  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET
  if (!jwtSecret) {
    return { error: 'JWT secret not set' }
  }

  try {
    const secret = new TextEncoder().encode(jwtSecret)
    const { payload } = await jwtVerify(token, secret)
    const userId = payload.id as string
    if (!userId) {
      return { error: 'Invalid Token' }
    }
    return { userId }
  } catch (error) {
    console.log(error)
    return { error: 'Invalid or expired token' }
  }
}
