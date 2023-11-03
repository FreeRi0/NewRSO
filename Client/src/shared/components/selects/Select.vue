<template>
    <v-select :items="items" @change="changeOption">
        <template #item:item="{ props }">
            <v-list-item v-bind="props"> </v-list-item>
        </template>
    </v-select>
</template>

<script setup>
// import { ref } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    items: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['update:modelValue']);

const changeOption = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>

<style lang="scss" scoped></style>
