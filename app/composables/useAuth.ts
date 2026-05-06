import type { User } from '#shared/types/user'

export const useAuth = () => {
    const user = useState<User | null>('auth_user', () => null)
    const isAuthenticated = computed(() => !!user.value)

    async function login(email: string, password: string) {
        const data = await $fetch<{ user: User }>('/api/auth/login', {
            method: 'POST',
            body: { email, password },
        })
        user.value = data.user
    }

    async function fetchMe() {
        try {
            user.value = await $fetch<User>('/api/auth/me')
        }
        catch {
            user.value = null
        }
    }

    async function logout() {
        try {
            await $fetch('/api/auth/logout', { method: 'POST' })
        }
        catch (err) {
            console.error('[useAuth.logout]', err)
        }
        user.value = null
        await navigateTo('/login')
    }

    return { user, isAuthenticated, login, logout, fetchMe }
}
