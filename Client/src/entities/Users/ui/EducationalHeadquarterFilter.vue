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
import { ref, watch } from 'vue';

const educationalHeadquarters = ref<string[]>([]);

const props = defineProps<{
    localHeadquarterName?: string;
}>();

watch(
    () => props.localHeadquarterName,
    (newVal) => {
        console.log(newVal);
        fetchEducationalHeadquarters(newVal);
    },
);

const fetchEducationalHeadquarters = (localHeadquarterName?: string) => {
    if (!props.localHeadquarterName) {
        console.log('retEdu');
        return;
    }
    educationalHeadquarterApi
        .getEducationalHeadquarters({
            local_headquarter__name: localHeadquarterName,
        })
        .then((res) => {
            educationalHeadquarters.value = res.data.map(({ name }) => name);
        });
};

fetchEducationalHeadquarters(props.localHeadquarterName);
</script>
<style scoped>
.input-wrapper {
    padding: 8px 0;
}
</style>
