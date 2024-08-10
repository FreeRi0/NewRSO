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
import { ref, watchEffect } from 'vue';

type Props = {
    regionalHeadquarterName?: string;
    districtHeadquarterName?: string;
};

const localHeadquarters = ref<string[]>([]);

const props = defineProps<Props>();

const fetchLocalHeadquarters = ({
    districtHeadquarterName,
    regionalHeadquarterName,
}: Props) => {
    if (!regionalHeadquarterName && !districtHeadquarterName) {
        return;
    }
    localHeadquarterApi
        .getLocalHeadquarters({
            regional_headquarter__name: regionalHeadquarterName,
            district_headquarter__name: districtHeadquarterName,
        })
        .then((res) => {
            localHeadquarters.value = res.data.map(({ name }) => name);
        });
};

watchEffect(() => {
    fetchLocalHeadquarters(props);
});

fetchLocalHeadquarters(props);
</script>
<style scoped>
.input-wrapper {
    padding: 8px 0;
}
</style>
