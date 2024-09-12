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
import { ref, watchEffect } from 'vue';

type Props = {
    districtHeadquarterName?: string;
};

const regionalHeadquarters = ref<string[]>([]);

const props = defineProps<Props>();

const fetchRegionalHeadquarters = ({ districtHeadquarterName }: Props) => {
    if (!districtHeadquarterName) {
        return;
    }
    regionalHeadquarterApi
        .getRegionalHeadquarters({
            district_headquarter__name: districtHeadquarterName,
        })
        .then((res) => {
            regionalHeadquarters.value = res.data.results.map(({ name }) => name);
        });
};

watchEffect(() => {
    fetchRegionalHeadquarters(props);
});

fetchRegionalHeadquarters(props);
</script>
<style scoped>
.input-wrapper {
    padding: 8px 0;
}
</style>
