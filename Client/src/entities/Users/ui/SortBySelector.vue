<script setup lang="ts">
import { SvgIcon, UiButton, UiSelector } from '@shared/ui';
import { ref, watch } from 'vue';
import { usersApi } from '@shared/api';

type SortByValue = {
    ascValue: usersApi.UsersOrderingQuery;
    descValue: usersApi.UsersOrderingQuery;
    label: string;
    ascLabel: string;
    descLabel: string;
};

type Option = {
    value: string;
    label: string;
};

const SORT_VALUES: SortByValue[] = [
    {
        ascValue: 'last_name',
        descValue: '-last_name',
        label: 'По алфавиту',
        ascLabel: 'А - я',
        descLabel: 'Я - а',
    },
    {
        ascValue: 'date_of_birth',
        descValue: '-date_of_birth',
        label: 'По дате рождения',
        ascLabel: 'По возрастанию',
        descLabel: 'По убыванию',
    },
];

const props = defineProps<{
    modelValue?: string;
    isReversed?: boolean;
    reverseSortOrder: () => void;
}>();
const model = ref(props.modelValue ?? '');
const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

watch(
    () => props.modelValue,
    (newValue) => {
        model.value = newValue ?? '';
    },
);

watch(model, () => {
    emit('update:modelValue', model.value ?? '');
});
</script>

<template>
    <div class="wrapper">
        <UiSelector
            v-model="model"
            :options="
                SORT_VALUES.map(
                    ({ ascLabel, ascValue, descLabel, descValue, label }) =>
                        ({
                            value: isReversed ? descValue : ascValue,
                            label: `${label}: ${
                                isReversed ? descLabel : ascLabel
                            }`,
                        }) as Option,
                )
            "
        >
        </UiSelector>
        <UiButton
            class="reverse-sort-order"
            @click="props.reverseSortOrder"
            variant="tertiary"
        >
            <SvgIcon icon-name="upside-down-arrow" :width="18" :height="18" />
        </UiButton>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    gap: 8px;
    align-items: center;
}

.reverse-sort-order-button {
    width: 32px;
    height: 32px;
}
</style>
