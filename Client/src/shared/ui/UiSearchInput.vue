<template>
    <label ref="inputRef" :class="['wrapper', variant]">
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
            v-model="model"
            @input="onInput"
            @focus="onFocus"
            @keydown="onKeyDown"
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
                        v-for="(item, index) in sortedAutoCompleteValues"
                        :key="item"
                        :class="{ highlighted: index === highlightedIndex }"
                        @click="selectItem(item)"
                        ref="itemRefs"
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
import { compareStringsBySimilarity } from '@shared/lib';

const emit = defineEmits(['update:modelValue']);

const itemRefs = ref<HTMLLIElement[]>([]);

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

const model = ref(props.modelValue ?? '');

const sortedAutoCompleteValues = computed(() => {
    if (!model.value) return props.autoCompleteValues;
    const inputValue = model.value.toLowerCase();
    return props.autoCompleteValues
        .slice()
        .sort((a, b) => a.localeCompare(b))
        .sort((a, b) => compareStringsBySimilarity(a, b, inputValue));
});

watch(
    () => props.modelValue,
    (newValue) => {
        model.value = newValue ?? '';
    },
);

watch(
    () => model.value,
    (newValue) => {
        emit('update:modelValue', newValue);
    },
);

const showAutoComplete = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const autocompleteStyle = ref({ top: '0px', left: '0px', width: '0px' });
const highlightedIndex = ref(-1);

const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    model.value = target.value;
    showAutoComplete.value = sortedAutoCompleteValues.value.length > 0;
    updateAutocompleteStyle();
    highlightedIndex.value = -1;
};

const onFocus = (e: Event) => {
    const target = e.target as HTMLInputElement;
    target.select();
    showAutoComplete.value = sortedAutoCompleteValues.value.length > 0;
    updateAutocompleteStyle();
};

const onKeyDown = (e: KeyboardEvent) => {
    if (!showAutoComplete.value) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightedIndex.value =
            (highlightedIndex.value + 1) %
            sortedAutoCompleteValues.value.length;
        scrollToHighlightedItem();
        return;
    }
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlightedIndex.value =
            (highlightedIndex.value -
                1 +
                sortedAutoCompleteValues.value.length) %
            sortedAutoCompleteValues.value.length;
        scrollToHighlightedItem();
        return;
    }
    if (e.key === 'Enter' && highlightedIndex.value >= 0) {
        e.preventDefault();
        selectItem(sortedAutoCompleteValues.value[highlightedIndex.value]);
        return;
    }
};

const scrollToHighlightedItem = () => {
    if (itemRefs.value.length === 0) {
        return;
    }

    const target = itemRefs.value[highlightedIndex.value];
    console.log(target);
    target.scrollIntoView({ block: 'nearest' });
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
    highlightedIndex.value = -1;
};

onClickOutside(inputRef, () => {
    console.log('clickOutside');
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
    outline: none;
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
    max-height: calc(4 * 40px);
    overflow-y: auto;
    position: relative;
}
.autocomplete-list li {
    padding: 8px;
    cursor: pointer;
}
.autocomplete-list li.highlighted {
    background-color: #f0f0f0;
}
.autocomplete-list li:hover {
    background-color: #e0e0e0;
}

.autocomplete-list::-webkit-scrollbar {
    width: 3px;
}

.autocomplete-list::-webkit-scrollbar-track {
    background: transparent;
}

.autocomplete-list::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
}
</style>
