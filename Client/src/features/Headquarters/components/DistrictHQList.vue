<template>
    <div
        :class="{ 'top': isLoading || !districtHeadquarters.length, 'headquarters-wrapper': !isLoading && districtHeadquarters.length }">
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="districtHeadquarters.length">
                <headquarterItem  v-for="districtHeadquarter in districtHeadquarters"
                    :headquarter="districtHeadquarter" :name="'DistrictHQ'" :key="districtHeadquarter.id"></headquarterItem>
            </template>
            <p v-else>Ничего не найдено</p>
        </template>
    </div>
</template>
<script setup>
import { headquarterItem } from '@entities/HeadquartersData/components';
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
<style lang="scss" scoped>
.top {
    display: flex;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
}
</style>
