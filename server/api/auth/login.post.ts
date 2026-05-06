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

    setCookie(event, 'auth_token', FAKE_JWT, {
        httpOnly: true,
        secure: !import.meta.dev,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
    })

    return {
        user: { id: 1, email: parsed.email, name: 'Demo User', roles: ['ROLE_USER'] },
    }
})
