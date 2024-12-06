<template>
    <div>
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="localHeadquarters.length">
                <localItemHorizontal v-for="localHeadquarter in localHeadquarters" :local-headquarter="localHeadquarter"
                    :key="localHeadquarter.id"></localItemHorizontal>
            </template>
        </template>
    </div>
</template>

<script setup>
import { localItemHorizontal } from '@entities/HeadquartersData';
const props = defineProps({
    localHeadquarters: {
        type: Array,
        required: true,
    },
    isLoading: {
        type: Boolean,
        required: false,
    },
});
</script>
<style lang="scss">
</style>
