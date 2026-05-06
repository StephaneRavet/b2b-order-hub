type Violation = { propertyPath: string, message: string }

type ApiError = {
    statusCode?: number
    data?: { violations?: Violation[] }
    response?: { status?: number, _data?: { violations?: Violation[] } }
}

export const useApiErrors = () => {
    const violations = ref<Record<string, string>>({})

    function handle(err: unknown): boolean {
        const e = err as ApiError
        const status = e.statusCode ?? e.response?.status
        const list = e.data?.violations ?? e.response?._data?.violations
        if (status === 422 && Array.isArray(list)) {
            const next: Record<string, string> = {}
            for (const v of list) next[v.propertyPath] = v.message
            violations.value = next
            return true
        }
        return false
    }

    function clear(path: string) {
        if (!violations.value[path]) return
        const next = { ...violations.value }
        delete next[path]
        violations.value = next
    }

    function reset() {
        violations.value = {}
    }

    return { violations, handle, clear, reset }
}
