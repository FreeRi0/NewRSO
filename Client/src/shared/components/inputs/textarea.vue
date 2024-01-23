<template>
    <textarea
        class="textareaUser"
        :name="name"
        :id="name"
        :value="value"
        :maxlength="maxLength"
        :placeholder="placeholder"
        @input="updateValue"
    ></textarea>
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
<style lang="scss">
.textareaUser {
    margin-top: 12px;
    padding: 16px 60px 16px 16px;
    border-radius: 10px;
    width: 100%;
    height: 116px;
    border: 1px solid #0000001A;
}
</style>
