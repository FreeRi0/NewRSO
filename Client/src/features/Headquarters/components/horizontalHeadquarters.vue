<template>
    <div>
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="headquarters.length">
                <educationItemHorizontal v-for="headquarter in headquarters" :headquarter="headquarter"
                    :key="headquarter.id"></educationItemHorizontal>
            </template>
        </template>
    </div>
</template>

<script setup>
import { educationItemHorizontal } from '@entities/HeadquartersData';
const props = defineProps({
    headquarters: {
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
