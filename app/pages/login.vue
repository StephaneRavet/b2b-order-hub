<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, minLength, required } from '@vuelidate/validators'

definePageMeta({ layout: 'auth' })

const ALLOWED_DOMAINS = ['equation.fr', 'example.com']

const domainAllowed = helpers.withAsync(async (value: string) => {
    if (!value || !value.includes('@')) return true
    await new Promise((r) => setTimeout(r, 300))
    const domain = value.split('@')[1]
    return ALLOWED_DOMAINS.includes(domain)
})

const form = reactive({
    email: '',
    password: '',
})

const rules = {
    email: {
        required: helpers.withMessage('Email requis', required),
        email: helpers.withMessage('Email invalide', email),
        domainAllowed: helpers.withMessage('Domaine non autorisé', domainAllowed),
    },
    password: {
        required: helpers.withMessage('Mot de passe requis', required),
        minLength: helpers.withMessage('8 caractères minimum', minLength(8)),
    },
}

const v$ = useVuelidate(rules, form)
const submitError = ref<string | null>(null)
const submitting = ref(false)

async function submit() {
    submitError.value = null
    const isValid = await v$.value.$validate()
    if (!isValid) return

    submitting.value = true
    try {
        await $fetch('/api/auth/login', { method: 'POST', body: form })
        await navigateTo('/orders')
    }
    catch (err: unknown) {
        const status = (err as { statusCode?: number }).statusCode
        submitError.value = status === 401
            ? 'Identifiants invalides'
            : 'Une erreur est survenue. Réessayez.'
    }
    finally {
        submitting.value = false
    }
}
</script>

<template>
    <form class="login card" @submit.prevent="submit">
        <h2>🔐 Connexion</h2>

        <FormField
            v-model="form.email"
            label="Email"
            type="email"
            autocomplete="email"
            placeholder="vous@equation.fr"
            :validation="v$.email"
        />

        <FormField
            v-model="form.password"
            label="Mot de passe"
            type="password"
            autocomplete="current-password"
            :validation="v$.password"
        />

        <UiAlert v-if="submitError" :message="submitError" />

        <UiButton type="submit" variant="primary" :disabled="submitting">
            {{ submitting ? 'Connexion…' : 'Se connecter' }}
        </UiButton>
    </form>
</template>

<style scoped>
.login {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.75rem;
    width: 100%;
    max-width: 380px;
    margin-top: 3rem;
}

.login h2 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
}
</style>
