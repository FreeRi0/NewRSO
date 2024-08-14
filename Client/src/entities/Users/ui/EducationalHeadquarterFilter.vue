<template>
    <UiAccordion>
        <template #header="{ toggle }">
            <UiHeading class="filter-heading" @click="toggle" variant="h4"
                >Штаб СО ОО</UiHeading
            >
        </template>
        <template #content>
            <div class="input-wrapper">
                <slot :educationalHeadquarters="educationalHeadquarters" />
            </div>
        </template>
    </UiAccordion>
</template>
<script setup lang="ts">
import { educationalHeadquarterApi } from '@shared/api';
import { UiAccordion, UiHeading } from '@shared/ui';
import { ref, watchEffect } from 'vue';

type Props = {
    localHeadquarterName?: string;
    regionalHeadquarterName?: string;
    districtHeadquarterName?: string;
};

const educationalHeadquarters = ref<string[]>([]);

const props = defineProps<Props>();

const fetchEducationalHeadquarters = ({
    localHeadquarterName,
    districtHeadquarterName,
    regionalHeadquarterName,
}: Props) => {
    if (
        !localHeadquarterName &&
        !districtHeadquarterName &&
        !regionalHeadquarterName
    ) {
        return;
    }
    educationalHeadquarterApi
        .getEducationalHeadquarters({
            local_headquarter__name: localHeadquarterName,
            district_headquarter__name: districtHeadquarterName,
            regional_headquarter__name: regionalHeadquarterName,
        })
        .then((res) => {
            educationalHeadquarters.value = res.data.map(({ name }) => name);
        });
};

watchEffect(() => {
    fetchEducationalHeadquarters(props);
});

fetchEducationalHeadquarters(props);
</script>
<style scoped>
.input-wrapper {
    padding: 8px 0;
}
</style>
