import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const FAKE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.signature'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = loginSchema.parse(body)

  if (parsed.email !== 'demo@equation.fr' || parsed.password !== 'demo1234') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  return {
    token: FAKE_JWT,
    user: { id: 1, email: parsed.email, name: 'Demo User' },
  }
})
