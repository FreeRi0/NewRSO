<template>
    <UiAccordion>
        <template #header="{ toggle }">
            <UiHeading class="filter-heading" @click="toggle" variant="h4"
                >Местный штаб</UiHeading
            >
        </template>
        <template #content>
            <div class="input-wrapper">
                <slot :localHeadquarters="localHeadquarters" />
            </div>
        </template>
    </UiAccordion>
</template>
<script setup lang="ts">
import { localHeadquarterApi } from '@shared/api';
import { UiAccordion, UiHeading } from '@shared/ui';
import { ref, watch } from 'vue';

const localHeadquarters = ref<string[]>([]);

const props = defineProps<{
    regionalHeadquarterName?: string;
}>();

watch(
    () => props.regionalHeadquarterName,
    (newVal) => {
        console.log(newVal);
        fetchLocalHeadquarters(newVal);
    },
);

const fetchLocalHeadquarters = (regionalHeadquarterName?: string) => {
    if (!props.regionalHeadquarterName) {
        console.log('return');
        return;
    }
    localHeadquarterApi
        .getLocalHeadquarters({
            regional_headquarter__name: regionalHeadquarterName,
        })
        .then((res) => {
            localHeadquarters.value = res.data.results.map(({ name }) => name);
        });
};

fetchLocalHeadquarters();
</script>
<style scoped>
.input-wrapper {
    padding: 8px 0;
}
</style>
