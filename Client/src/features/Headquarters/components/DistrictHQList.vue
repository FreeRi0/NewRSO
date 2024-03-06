<template>
    <div class="headquarters-wrapper">
        <districtItem
            v-for="districtHeadquarter in districtHeadquarters"
            :district-headquarter="districtHeadquarter"
            :key="districtHeadquarter.id"
        ></districtItem>
    </div>
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
