<template>
    <v-textarea
        clearable
        :name="name"
        :id="name"
        :value="value"
        :maxlength="maxLength"
        :placeholder="placeholder"
        counter
        @input="updateValue"

        variant="outlined"
    ></v-textarea>
</template>
<script setup>
import { ref } from 'vue';
const emit = defineEmits(['update:value']);
const props = defineProps({
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
        required: false,
    },
    maxLength: {
        type: Number,
    },
});

const updateValue = (e) => {
    emit('update:value', e.target.value);
};
</script>
<style lang="scss"></style>
// :model-value="value"