<template>
    <div>
        <regionalHorizontalItem
            v-for="regionalHeadquarter in regionalHeadquarters"
            :regional-headquarter="regionalHeadquarter"
            :key="regionalHeadquarter.id"
        ></regionalHorizontalItem>
    </div>
</template>
<script setup>
import { regionalHorizontalItem } from '@entities/HeadquartersData';
const props = defineProps({
    regionalHeadquarters: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss"></style>
