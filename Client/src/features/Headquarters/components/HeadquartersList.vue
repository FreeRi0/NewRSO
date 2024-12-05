<template>
    <div :class="{'top' : isLoading || !headquarters.length, 'headquarters-wrapper' : !isLoading && headquarters.length}">
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="headquarters.length">
                <educationItem v-for="headquarter in headquarters" :headquarter="headquarter" :key="headquarter.id" />
            </template>
            <p v-else>Ничего не найдено</p>
        </template>
    </div>
</template>
<script setup>
import { educationItem } from '@entities/HeadquartersData';
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
