<template>
    <div
        :class="{ 'top': isLoading || !localHeadquarters.length, 'headquarters-wrapper': !isLoading && localHeadquarters.length }">
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="localHeadquarters.length">
                <headquarterItem  v-for="localHeadquarter in localHeadquarters" :name="'LocalHQ'" :headquarter="localHeadquarter"
                    :key="localHeadquarter.id" />
            </template>
            <p v-else>Ничего не найдено</p>
        </template>
    </div>
</template>
<script setup>
import { headquarterItem } from '@entities/HeadquartersData'
const props = defineProps({
    localHeadquarters: {
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
