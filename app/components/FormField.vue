<script setup lang="ts">
type Validation = {
    $error: boolean
    $errors: Array<{ $message: string }>
    $touch: () => void
    $pending?: boolean
}

const value = defineModel<string | number>({ default: '' })

defineProps<{
    label: string
    type?: string
    placeholder?: string
    autocomplete?: string
    validation?: Validation
}>()

const inputId = useId()
</script>

<template>
    <div class="form-field" :class="{ 'has-error': validation?.$error }">
        <label :for="inputId">{{ label }}</label>
        <input
            :id="inputId"
            v-model="value"
            :type="type ?? 'text'"
            :placeholder="placeholder"
            :autocomplete="autocomplete"
            :aria-invalid="validation?.$error"
            class="form-field__control"
            @blur="validation?.$touch()"
        />
        <small v-if="validation?.$pending" class="form-field__pending">
            Vérification…
        </small>
        <small v-else-if="validation?.$error" class="form-field__error">
            {{ validation.$errors[0].$message }}
        </small>
    </div>
</template>

<style scoped>
.form-field {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-size: 0.875rem;
}

.form-field label {
    color: var(--text-muted);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.form-field__control {
    width: 100%;
    font-size: 0.95rem;
}

.form-field.has-error .form-field__control {
    border-color: #b91c1c;
}

.form-field__error {
    color: #fca5a5;
    font-size: 0.8rem;
}

.form-field__pending {
    color: var(--text-muted);
    font-size: 0.8rem;
}
</style>
