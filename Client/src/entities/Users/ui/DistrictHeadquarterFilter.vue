<template>
    <UiAccordion>
        <template #header="{ toggle }">
            <UiHeading class="filter-heading" @click="toggle" variant="h4"
                >Окружной штаб</UiHeading
            >
        </template>
        <template #content>
            <div class="input-wrapper">
                <slot :districtHeadquarters="districtHeadquarters" />
            </div>
        </template>
    </UiAccordion>
</template>
<script setup lang="ts">
import { districtHeadquarterApi } from '@shared/api';
import { UiAccordion, UiHeading } from '@shared/ui';
import { ref } from 'vue';

const districtHeadquarters = ref<string[]>([]);

districtHeadquarterApi.getDistrictHeadquarters().then((res) => {
    districtHeadquarters.value = res.data.results.map(({ name }) => name);
});
</script>
<style scoped>
.input-wrapper {
    padding: 8px 0;
}
</style>
