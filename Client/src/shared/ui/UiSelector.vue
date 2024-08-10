<template>
    <div ref="elemRef" class="selector-wrapper">
        <div class="selector" @click.prevent="handleClick" tabindex="0">
            {{ selectedLabel }}
            <SvgIcon
                color="rgba(0, 0, 0, 0.87)"
                :class="['icon', { open: isOpened }]"
                icon-name="arrow-down"
            />
        </div>
        <ul v-if="isOpened" class="list-options">
            <li
                v-for="option in options"
                :key="option.value"
                @click="selectOption(option)"
                class="list-option"
            >
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { SvgIcon } from '@shared/ui';
import { onClickOutside } from '@vueuse/core';
import { ref, watch } from 'vue';
import { defineEmits, defineProps } from 'vue';

const elemRef = ref<HTMLElement | null>(null);
const isOpened = ref(false);
const handleClickOutside = () => {
    isOpened.value = false;
};
const handleClick = () => (isOpened.value = !isOpened.value);

onClickOutside(elemRef, handleClickOutside);

type Option = { value: string; label: string };

const props = defineProps<{
    modelValue: string;
    options: Option[];
}>();
const emit = defineEmits(['update:modelValue']);

const localModel = ref(props.modelValue);
const selectedLabel = ref('');

const updateSelectedLabel = () => {
    const selectedOption = props.options.find(
        (option: Option) => option.value === localModel.value,
    );
    selectedLabel.value = selectedOption ? selectedOption.label : '';
};

const selectOption = (option: Option) => {
    console.log(selectOption);
    localModel.value = option.value;
    emit('update:modelValue', option.value);
    isOpened.value = false;
    updateSelectedLabel();
};

watch(
    () => props.modelValue,
    (newValue) => {
        localModel.value = newValue;
        updateSelectedLabel();
    },
);

watch(localModel, (newValue) => {
    emit('update:modelValue', newValue);
    updateSelectedLabel();
});

updateSelectedLabel();
</script>

<style scoped>
.selector-wrapper {
    position: relative;
}
.selector {
    border: 1px solid rgb(53, 56, 63);
    border-radius: 10px;
    padding: 4px 16px;
    font-size: 18px;
    padding-right: 56px;
    width: 100%;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.list-options {
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: calc(4 * 40px);
    overflow-y: auto;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    border: 1px solid rgb(53, 56, 63);
    background: white;
    z-index: 10;
}
.list-option {
    padding: 4px;
    cursor: pointer;
}
.list-option.highlighted {
    background-color: #f0f0f0;
}
.list-option:hover {
    background-color: #e0e0e0;
}

.list-options::-webkit-scrollbar {
    width: 3px;
}

.list-options::-webkit-scrollbar-track {
    background: transparent;
}

.list-options::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
}
.icon {
    position: absolute;
    top: 6px;
    right: 16px;
    transition: transform 0.3s ease;
}

.icon.open {
    transform: rotate(-180deg);
}
</style>
