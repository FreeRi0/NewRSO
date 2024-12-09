<template>
    <div
        :class="{ 'top': isLoading || !squads.length, 'squads-wrapper': !isLoading && squads.length && !horizontal, 'horizontal': !isLoading && squads.length && horizontal }">
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="squads.length && !horizontal">
                <squadItem v-for="squad in squads" :squad="squad" :key="squad.id" />
            </template>
            <template v-else-if="squads.length && horizontal">
                <squadItem v-for="squad in squads" :squad="squad" :horizontal="true" :key="squad.id" />
            </template>
            <p v-else>Ничего не найдено</p>
        </template>
    </div>
</template>

<script setup>
import { squadItem } from '@entities/Squads';
const props = defineProps({
    squads: {
        type: Array,
        required: true,
    },
    isLoading: {
        type: Boolean,
        required: false,
    },
    horizontal: {
        type: Boolean,
        default: false,
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

.horizontal {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr;
}


.circleLoader {
    width: 60px;
    height: 60px;
    display: block;
    margin: 30px auto;
}
</style>