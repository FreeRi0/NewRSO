<template>
    <div
        :class="{ 'top': isLoading || !regionalHeadquarters.length, 'headquarters-wrapper': !isLoading && regionalHeadquarters.length }">
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="regionalHeadquarters.length">
                <headquarterItem v-for="regionalHeadquarter in regionalHeadquarters"
                    :headquarter="regionalHeadquarter" :name="'RegionalHQ'" :key="regionalHeadquarter.id" />
            </template>
            <p v-else>Ничего не найдено</p>
        </template>
    </div>
</template>
<script setup>
import { headquarterItem  } from '@entities/HeadquartersData/components';
const props = defineProps({
    regionalHeadquarters: {
        type: Array,
        required: true,
    },
    isLoading: {
        type: Boolean,
        required: false,
    }
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
