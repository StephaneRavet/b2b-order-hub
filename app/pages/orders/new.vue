<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { helpers, minValue, required } from '@vuelidate/validators'

definePageMeta({ middleware: 'auth' })

const api = useApi()
const { violations, handle, clear, reset } = useApiErrors()

interface OrderLine { productId: number, quantity: number }

const form = reactive({
    customerId: 0,
    items: [{ productId: 0, quantity: 1 }] as OrderLine[],
})

const rules = {
    customerId: {
        required: helpers.withMessage('Client requis', required),
        minValue: helpers.withMessage('ID invalide', minValue(1)),
    },
    items: {
        $each: helpers.forEach({
            productId: {
                required: helpers.withMessage('Produit requis', required),
                minValue: helpers.withMessage('ID invalide', minValue(1)),
            },
            quantity: {
                required: helpers.withMessage('Quantité requise', required),
                minValue: helpers.withMessage('Min 1', minValue(1)),
            },
        }),
    },
}

const v$ = useVuelidate(rules, form)
const submitting = ref(false)
const globalError = ref<string | null>(null)

function lineError(idx: number, key: 'productId' | 'quantity') {
    const raw = v$.value.items.$each.$response?.$errors?.[idx]?.[key]
    const errors = Array.isArray(raw) ? raw : []
    return {
        $error: errors.length > 0,
        $errors: errors as Array<{ $message: string }>,
        $touch: () => {},
    }
}

function addLine() {
    form.items.push({ productId: 0, quantity: 1 })
}

function removeLine(idx: number) {
    form.items.splice(idx, 1)
}

async function submit() {
    globalError.value = null
    reset()
    if (!(await v$.value.$validate())) return

    submitting.value = true
    try {
        const order = await api<{ id: number }>('/api/orders', {
            method: 'POST',
            body: form,
        })
        await navigateTo(`/orders/${order.id}`)
    }
    catch (err: unknown) {
        if (!handle(err)) {
            globalError.value = 'Erreur serveur, réessayez.'
        }
    }
    finally {
        submitting.value = false
    }
}
</script>

<template>
    <form class="order-new" @submit.prevent="submit">
        <h1>📝 Nouvelle commande</h1>

        <UiAlert v-if="globalError" :message="globalError" />

        <FormField
            v-model.number="form.customerId"
            label="Client (ID)"
            type="number"
            :validation="v$.customerId"
            :server-error="violations['customerId']"
            @update:model-value="clear('customerId')"
        />

        <h2>Lignes</h2>
        <fieldset
            v-for="(line, i) in form.items"
            :key="i"
            class="order-new__line"
        >
            <FormField
                v-model.number="line.productId"
                label="Produit (ID)"
                type="number"
                :validation="lineError(i, 'productId')"
                :server-error="violations[`items.${i}.productId`]"
                @update:model-value="clear(`items.${i}.productId`)"
            />
            <FormField
                v-model.number="line.quantity"
                label="Quantité"
                type="number"
                :validation="lineError(i, 'quantity')"
                :server-error="violations[`items.${i}.quantity`]"
                @update:model-value="clear(`items.${i}.quantity`)"
            />
            <UiButton
                v-if="form.items.length > 1"
                type="button"
                @click="removeLine(i)"
            >
                Supprimer
            </UiButton>
        </fieldset>

        <div class="order-new__actions">
            <UiButton type="button" @click="addLine">
                + Ajouter une ligne
            </UiButton>
            <UiButton type="submit" variant="primary" :disabled="submitting">
                {{ submitting ? 'Envoi…' : 'Créer la commande' }}
            </UiButton>
        </div>
    </form>
</template>

<style scoped>
.order-new {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 560px;
}

.order-new h1 {
    margin: 0;
    font-size: 1.5rem;
}

.order-new h2 {
    margin: 0.5rem 0 0;
    font-size: 1rem;
    color: var(--text-muted);
}

.order-new__line {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 8px;
}

.order-new__actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
}
</style>
