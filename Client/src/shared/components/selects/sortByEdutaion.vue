<template>
    <!-- <select
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
    </select> -->

    <v-select
        class="form__select"
        :model-value="modelValue"
        @update:model-value="changeOption"
        :items="options"
        item-title="name"
        item-value="value"
    >
        <template #selection="{ item }">
            <span>{{ item.raw.name }}</span>
        </template>

        <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :title="item?.raw?.name"></v-list-item>
        </template>
    </v-select>
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
    emit('update:modelValue', event);
};
</script>
<style lang="scss" scoped>
// .sort-select__input {
//     border: 2px solid #a3a3a3;
//     border-radius: 10px;
//     display: block;
//     font-size: 16px;
//     padding: 6px 0px 7px 16px;
//     margin-right: 8px;
//     background: url(@app/assets/icon/arrow-down.svg) no-repeat right;
//     appearance: none;
//     background-position-x: calc(100% - 16px);
// }
</style>
