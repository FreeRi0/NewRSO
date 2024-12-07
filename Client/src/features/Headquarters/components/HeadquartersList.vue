<template>
    <div
        :class="{ 'top': isLoading || !headquarters.length, 'headquarters-wrapper': !isLoading && headquarters.length }">
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="headquarters.length">
                <headquarterItem  v-for="headquarter in headquarters" :headquarter="headquarter" :name="'HQ'" :key="headquarter.id" />
            </template>
            <p v-else>Ничего не найдено</p>
        </template>
    </div>
</template>
<script setup>
import { headquarterItem } from '@entities/HeadquartersData'
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
<style lang="scss" scoped>
.top {
    display: flex;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
}
</style>
