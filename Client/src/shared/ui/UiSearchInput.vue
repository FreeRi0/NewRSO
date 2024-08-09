<template>
    <label :class="['wrapper', variant]">
        <SvgIcon
            v-if="variant === 'default'"
            :width="28"
            :height="28"
            icon-name="search"
            class="icon"
        />
        <SvgIcon
            v-if="variant === 'small'"
            :width="16"
            :height="16"
            icon-name="search"
            class="icon"
        />
        <input
            ref="inputRef"
            v-model="model"
            @input="onInput"
            @focus="onFocus"
            v-bind="$attrs"
            class="input"
        />
        <Teleport to="#modal">
            <div
                v-show="showAutoComplete"
                class="autocomplete-wrapper"
                :style="autocompleteStyle"
            >
                <ul class="autocomplete-list">
                    <li
                        v-for="item in sortedAutoCompleteValues"
                        :key="item"
                        @click="selectItem(item)"
                    >
                        {{ item }}
                    </li>
                </ul>
            </div>
        </Teleport>
    </label>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { computed, defineProps, ref, watch, withDefaults } from 'vue';
import { SvgIcon } from './SvgIcon';

const model = ref('');
const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
    defineProps<{
        autoCompleteValues?: string[];
        variant?: 'default' | 'small';
        modelValue?: string;
    }>(),
    {
        autoCompleteValues: () => [],
        variant: 'default',
    },
);

const sortedAutoCompleteValues = computed(() => {
    if (!model.value) return props.autoCompleteValues;
    return props.autoCompleteValues
        .slice()
        .sort(
            (a, b) =>
                b.toLowerCase().indexOf(model.value.toLowerCase()) -
                a.toLowerCase().indexOf(model.value.toLowerCase()),
        );
});

watch(
    () => props.modelValue,
    (newValue) => {
        model.value = newValue ?? '';
    },
);

const showAutoComplete = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const autocompleteStyle = ref({ top: '0px', left: '0px', width: '0px' });

const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emit('update:modelValue', target.value);
    showAutoComplete.value = sortedAutoCompleteValues.value.length > 0;
    updateAutocompleteStyle();
};

const onFocus = () => {
    showAutoComplete.value = sortedAutoCompleteValues.value.length > 0;
    updateAutocompleteStyle();
};

const updateAutocompleteStyle = () => {
    if (inputRef.value) {
        const rect = inputRef.value.getBoundingClientRect();
        autocompleteStyle.value = {
            top: `${rect.bottom + window.scrollY}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
        };
    }
};

const selectItem = (item: string) => {
    model.value = item;
    emit('update:modelValue', item);
    showAutoComplete.value = false;
};

onClickOutside(inputRef, () => {
    showAutoComplete.value = false;
});
</script>

<style scoped>
.wrapper {
    position: relative;
    display: flex;
}
.input {
    width: 100%;
    border: 1px solid rgb(182, 182, 182);
    border-radius: 10px;
    padding: 8px 16px;
    font-size: 18px;
    padding-left: 60px;
}
.small .input {
    padding-left: 48px;
    font-size: 16px;
}
.icon {
    position: absolute;
    top: 12px;
    left: 16px;
}
.autocomplete-wrapper {
    position: absolute;
    background: white;
    border: 1px solid rgb(182, 182, 182);
    border-top: none;
    z-index: 1000;
    display: block;
}
.autocomplete-list {
    list-style: none;
    margin: 0;
    padding: 0;
}
.autocomplete-list li {
    padding: 8px;
    cursor: pointer;
}
.autocomplete-list li:hover {
    background-color: #f0f0f0;
}
</style>
