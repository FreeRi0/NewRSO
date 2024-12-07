<template>
    <div>
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="regionalHeadquarters.length">
                <headquarterItem v-for="regionalHeadquarter in regionalHeadquarters" :headquarter="regionalHeadquarter"
                    :name="'RegionalHQ'" :horizontal="true" :key="regionalHeadquarter.id" />
            </template>
        </template>
    </div>
</template>
<script setup>
import { headquarterItem } from '@entities/HeadquartersData';
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
