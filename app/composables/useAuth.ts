import type { User } from '#shared/types/user'

export const useAuth = () => {
    const token = useCookie<string | null>('auth_token', {
        default: () => null,
        secure: true,
        sameSite: 'lax',
    })
    const user = useState<User | null>('auth_user', () => null)

    const isAuthenticated = computed(() => !!token.value)

    async function login(email: string, password: string) {
        const data = await $fetch<{ token: string, user: User }>('/api/auth/login', {
            method: 'POST',
            body: { email, password },
        })
        token.value = data.token
        user.value = data.user
    }

    async function fetchMe() {
        if (!token.value) return
        try {
            user.value = await $fetch<User>('/api/auth/me', {
                headers: { Authorization: `Bearer ${token.value}` },
            })
        }
        catch (err) {
            console.error('[useAuth.fetchMe]', err)
            token.value = null
            user.value = null
        }
    }

    function logout() {
        token.value = null
        user.value = null
        navigateTo('/login')
    }

    return { token, user, isAuthenticated, login, logout, fetchMe }
}
