<template>
    <div>
        <districtHorizontalItem
            v-for="districtHeadquarter in districtHeadquarters"
            :district-headquarter="districtHeadquarter"
            :key="districtHeadquarter.id"
        ></districtHorizontalItem>
    </div>
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
