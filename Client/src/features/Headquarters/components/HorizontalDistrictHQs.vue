<template>
    <div v-if="districtHeadquarters.length > 0">
        <districtHorizontalItem
            v-for="districtHeadquarter in districtHeadquarters"
            :district-headquarter="districtHeadquarter"
            :key="districtHeadquarter.id"
        ></districtHorizontalItem>
    </div>
    <h2 v-else>штаб не найден...</h2>
</template>
<script setup>
import { districtHorizontalItem } from '@entities/HeadquartersData';
const props = defineProps({
    districtHeadquarters: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss">

</style>
