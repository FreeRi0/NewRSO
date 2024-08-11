<template>
    <input
        type="checkbox"
        class="checkbox"
        :checked="isChecked"
        @change="handleChange"
    />
</template>
<script setup lang="ts">
import { defineEmits, computed } from 'vue';

const props = defineProps<{
    modelValue: unknown[];
    value: unknown | unknown[];
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: unknown[]): void;
}>();

const isChecked = computed(() => {
    if (Array.isArray(props.value)) {
        return props.value.every((val) => props.modelValue.includes(val));
    }
    return props.modelValue.includes(props.value);
});

const handleChange = (event: Event) => {
    const newValue = [...props.modelValue];
    if ((event.target as HTMLInputElement).checked) {
        if (Array.isArray(props.value)) {
            props.value.forEach((val) => {
                if (!newValue.includes(val)) {
                    newValue.push(val);
                }
            });
        } else {
            newValue.push(props.value);
        }
    } else {
        if (Array.isArray(props.value)) {
            props.value.forEach((val) => {
                const index = newValue.indexOf(val);
                if (index > -1) {
                    newValue.splice(index, 1);
                }
            });
        } else {
            const index = newValue.indexOf(props.value);
            if (index > -1) {
                newValue.splice(index, 1);
            }
        }
    }
    emit('update:modelValue', newValue);
};
</script>
<style scoped>
.checkbox {
    width: 24px;
    height: 24px;
}
</style>
