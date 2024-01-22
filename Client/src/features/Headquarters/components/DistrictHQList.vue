<template>
    <div class="headquarters-wrapper" v-if="districtHeadquarters.length > 0">
        <districtItem
            v-for="districtHeadquarter in districtHeadquarters"
            :district-headquarter="districtHeadquarter"
            :key="districtHeadquarter.id"
        ></districtItem>
    </div>

    <h2 v-else>штаб не найден...</h2>
</template>
<script setup>
import { districtItem } from '@entities/HeadquartersData/components';
const props = defineProps({
    districtHeadquarters: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss" scoped>
.headquarters-wrapper__item {
    margin: 0px auto;
    width: 180px;
    @media screen and (max-width: 575px) {
        width: 150px;
    }
    &-title {
        text-align: center;
        font-size: 20px;
        font-family: 'Akrobat';
        color: #1e1e1e;
        @media screen and (max-width: 575px) {
            font-size: 16px;
        }
    }
}
</style>
