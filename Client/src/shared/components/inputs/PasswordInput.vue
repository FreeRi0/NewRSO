<template>
    <div class="form-input" :style="{ width: width }">
        <v-text-field
            :name="name"
            :id="name"
            :placeholder="placeholder"
            :value="value"
            @input="updateValue"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            variant="outlined"
            class="mb-2 text-field"
        ></v-text-field>
        <TransitionGroup>
            <div
                class="error-wrapper"
                v-for="element of error"
                :key="element.$uid"
            >
                <div class="form-error__message">{{ element.$message }}</div>
            </div>
        </TransitionGroup>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:value']);
const props = defineProps({
    error: {
        type: Array,
        required: false,
    },
    value: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        required: false,
    },
    width: {
        type: String,
        default: '',
    },

});
const updateValue = (e) => {
    emit('update:value', e.target.value);
};
</script>
<style lang="scss" scoped>
.error-wrapper {
    margin-bottom: 5px;
}
.form-error__message {
    color: var(--danger);
    font-size: 12px;
}

.v-field {
    display: grid;
    grid-template-areas: 'prepend-inner field clear append-inner';
    grid-template-columns: min-content minmax(0, 1fr) min-content min-content;
    font-size: 14px;
    padding: 10px;
    letter-spacing: 0.009375em;
    max-width: 100%;
    border-radius: 10px;
    contain: layout;
    flex: 1 0;
    grid-area: control;
    position: relative;
    --v-field-padding-start: 16px;
    --v-field-padding-end: 16px;
    --v-field-padding-top: 0px;
    --v-field-padding-bottom: 0px;

    --v-field-input-padding-top: calc(var(0px) + var());
    --v-field-input-padding-bottom: var(0px);
}
</style>
