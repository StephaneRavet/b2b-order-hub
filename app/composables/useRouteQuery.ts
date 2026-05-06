import type { WritableComputedRef } from 'vue'
import type { LocationQueryRaw } from 'vue-router'

type Options<T> = {
    default: T
    parse?: (raw: string) => T
    resetKeys?: string[]
}

export function useRouteQuery<T extends string | number>(
    key: string,
    opts: Options<T>,
): WritableComputedRef<T> {
    const route = useRoute()
    const router = useRouter()

    const parse = opts.parse
        ?? ((raw: string) => (typeof opts.default === 'number' ? (Number(raw) || opts.default) : raw) as T)

    return computed<T>({
        get: () => {
            const raw = route.query[key]
            if (raw == null || raw === '') return opts.default
            return parse(Array.isArray(raw) ? String(raw[0] ?? '') : String(raw))
        },
        set: (value) => {
            const isDefault = value === opts.default || value === '' || value === 0
            const nextQuery: LocationQueryRaw = {
                ...route.query,
                [key]: isDefault ? undefined : value,
            }
            for (const reset of opts.resetKeys ?? []) {
                nextQuery[reset] = undefined
            }
            router.push({ query: nextQuery })
        },
    })
}
