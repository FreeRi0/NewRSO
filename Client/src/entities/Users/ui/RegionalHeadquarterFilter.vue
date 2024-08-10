<template>
    <UiAccordion>
        <template #header="{ toggle }">
            <UiHeading class="filter-heading" @click="toggle" variant="h4"
                >Региональный штаб</UiHeading
            >
        </template>
        <template #content>
            <div class="input-wrapper">
                <slot :regionalHeadquarters="regionalHeadquarters" />
            </div>
        </template>
    </UiAccordion>
</template>
<script setup lang="ts">
import { regionalHeadquarterApi } from '@shared/api';
import { UiAccordion, UiHeading } from '@shared/ui';
import { ref, watch } from 'vue';

const regionalHeadquarters = ref<string[]>([]);

const props = defineProps<{
    districtHeadquarterName?: string;
}>();

watch(
    () => props.districtHeadquarterName,
    (newVal) => {
        fetchRegionalHeadquarters(newVal);
    },
);

const fetchRegionalHeadquarters = (districtHeadquarterName?: string) => {
    if (!props.districtHeadquarterName) {
        return;
    }
    regionalHeadquarterApi
        .getRegionalHeadquarters({
            district_headquarter__name: districtHeadquarterName,
        })
        .then((res) => {
            console.log(res);
            regionalHeadquarters.value = res.data.map(({ name }) => name);
        });
};

fetchRegionalHeadquarters(props.districtHeadquarterName);
</script>
<style scoped>
.input-wrapper {
    padding: 8px 0;
}
</style>
