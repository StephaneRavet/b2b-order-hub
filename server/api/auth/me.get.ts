import type { User } from '#shared/types/user'

export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  // En production, on vérifierait la signature du JWT.
  // Ici on accepte n'importe quel Bearer pour la formation.
  return {
    id: 1,
    email: 'demo@equation.fr',
    name: 'Demo User',
    roles: ['ROLE_USER'],
  } satisfies User
})
