<template>
    <div v-if="regionalHeadquarters.length > 0">
        <regionalHorizontalItem
            v-for="regionalHeadquarter in regionalHeadquarters"
            :regional-headquarter="regionalHeadquarter"
            :key="regionalHeadquarter.id"
        ></regionalHorizontalItem>
    </div>

    <h2 v-else>штаб не найден...</h2>
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
<style lang="scss">

</style>
