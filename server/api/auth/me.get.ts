import type { User } from '#shared/types/user'

export default defineEventHandler((event) => {
    const token = getCookie(event, 'auth_token')
    if (!token) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    // En production, on vérifierait la signature du JWT.
    // Ici on accepte n'importe quelle valeur de cookie pour la formation.
    return {
        id: 1,
        email: 'demo@equation.fr',
        name: 'Demo User',
        roles: ['ROLE_USER'],
    } satisfies User
})
