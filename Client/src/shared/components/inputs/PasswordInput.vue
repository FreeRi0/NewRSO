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
import { ref } from 'vue';
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
    placeholder: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        default: '380px',
    },
});

const updateValue = (e) => {
    emit('update:value', e.target.value);
};

const showPassword = ref(false);
</script>
<style lang="scss" scoped>
.error-wrapper {
    margin-bottom: 5px;
}
.form-error__message {
    color: var(--danger);
    font-size: 12px;
}</style>
