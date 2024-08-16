<template>
    <UiAccordion>
        <template #header="{ toggle }">
            <UiHeading class="filter-heading" @click="toggle" variant="h4"
                >ЛСО</UiHeading
            >
        </template>
        <template #content>
            <div class="input-wrapper">
                <slot :educationalHeadquarters="detachmentHeadquarters" />
            </div>
        </template>
    </UiAccordion>
</template>
<script setup lang="ts">
import { detachmentHeadquarterApi } from '@shared/api';
import { UiAccordion, UiHeading } from '@shared/ui';
import { ref, watchEffect } from 'vue';

type Props = {
    localHeadquarterName?: string;
    regionalHeadquarterName?: string;
    districtHeadquarterName?: string;
    educationalHeadquarterName?: string;
};

const detachmentHeadquarters = ref<string[]>([]);

const props = defineProps<Props>();

const fetchDetachmentHeadquarters = ({
    localHeadquarterName,
    districtHeadquarterName,
    regionalHeadquarterName,
    educationalHeadquarterName,
}: Props) => {
    if (
        !localHeadquarterName &&
        !districtHeadquarterName &&
        !regionalHeadquarterName &&
        !educationalHeadquarterName
    ) {
        return;
    }
    detachmentHeadquarterApi
        .getDetachmentHeadquarters({
            local_headquarter__name: localHeadquarterName,
            district_headquarter__name: districtHeadquarterName,
            regional_headquarter__name: regionalHeadquarterName,
            educational_headquarter__name: educationalHeadquarterName,
        })
        .then((res) => {
            detachmentHeadquarters.value = res.data.map(({ name }) => name);
        });
};

watchEffect(() => {
    fetchDetachmentHeadquarters(props);
});

fetchDetachmentHeadquarters(props);
</script>
<style scoped>
.input-wrapper {
    padding: 8px 0;
}
</style>
