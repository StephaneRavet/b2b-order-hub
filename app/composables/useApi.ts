export const useApi = () => {
    const { logout } = useAuth()

    return $fetch.create({
        onResponseError({ response }) {
            if (response.status === 401) {
                logout()
            }
        },
    })
}
