<template>
    <select
        class="sort-select__input"
        :value="modelValue"
        @change="changeOption"
    >
        <option value="0" disabled>Выберите из списка</option>
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>
<script setup>
const props = defineProps({
    modelValue: {
        type: String,
    },
    options: {
        type: Array,
        default: () => [],
    },
    selected: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

const changeOption = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>
<style lang="scss" scoped>
.sort-select__input {
    border: 2px solid #a3a3a3;
    border-radius: 10px;
    display: block;
    font-size: 16px;
    padding: 6px 0px 7px 16px;
    margin-right: 8px;
    background: url(@app/assets/icon/arrow-down.svg) no-repeat right;
    appearance: none;
    background-position-x: calc(100% - 16px);
}
</style>
