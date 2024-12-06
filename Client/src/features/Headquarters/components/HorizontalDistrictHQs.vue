<template>
    <div>
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="districtHeadquarters.length">
                <districtHorizontalItem v-for="districtHeadquarter in districtHeadquarters"
                    :district-headquarter="districtHeadquarter" :key="districtHeadquarter.id"></districtHorizontalItem>
            </template>
        </template>
    </div>
</template>
<script setup>
import { districtHorizontalItem } from '@entities/HeadquartersData';
const props = defineProps({
    districtHeadquarters: {
        type: Array,
        required: true,
    },
    isLoading: {
        type: Boolean,
        required: false,
    },
});
</script>
<style lang="scss"></style>
