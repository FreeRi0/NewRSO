<template>
    <div class="form-input" :style="{ width: width }">
        <input
            :name="name"
            :id="name"
            :placeholder="placeholder"
            :value="value"
            @input="updateValue"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            variant="outlined"
            class="mb-2 password-field"
        />

        <!-- <TransitionGroup>
            <div
                class="error-wrapper"
                v-for="element of error"
                :key="element.$uid"
            >
                <div class="form-error__message">{{ element.$message }}</div>
            </div>
        </TransitionGroup> -->
    </div>
</template>
<script setup>
import { ref } from 'vue';

const showPassword = ref(false);
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

.v-field {
    border-radius: 10px !important;
    display: block;
    font-size: 12px;
    height: 42px;
    width: 100%;
    --v-field-input-padding-top: 0px;
    --v-field-input-padding-bottom: 11px;
}

.v-input {
    --v-input-chips-margin-top: 11px;
}
.v-field__input {
    min-height: 42px;
    padding-top: 0px;
}
.form-error__message {
    color: var(--danger);
    font-size: 12px;
}
</style>
