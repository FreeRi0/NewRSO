<template>
    <div>
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="squads.length">
                <horizontalSquadItem v-for="squad in squads" :squad="squad" :key="squad.id" :competition="false" />
            </template>
            <p v-else>Ничего не найдено</p>
        </template>
    </div>
</template>

<script setup>
import { horizontalSquadItem } from '@entities/Squads';
const props = defineProps({
    squads: {
        type: Array,
        required: true,
    },
    isLoading: {
        type: Boolean,
        required: false,
    },
});
</script>
<style lang="scss"></style>
