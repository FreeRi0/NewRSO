<template>
    <div>
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="regionalHeadquarters.length">
                <regionalHorizontalItem v-for="regionalHeadquarter in regionalHeadquarters"
                    :regional-headquarter="regionalHeadquarter" :key="regionalHeadquarter.id"></regionalHorizontalItem>
            </template>
        </template>
    </div>
</template>
<script setup>
import { regionalHorizontalItem } from '@entities/HeadquartersData';
const props = defineProps({
    regionalHeadquarters: {
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
