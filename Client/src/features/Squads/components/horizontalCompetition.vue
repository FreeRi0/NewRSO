<template>
    <div v-if="squads.length > 0">
        <horizontalSquadItem
            v-for="squad in squads"
            :squad="squad"
            :rating="true"
            :key="squad.id"
            :competition="true"
        />
    </div>

    <h2 v-else>Отряд не найден...</h2>
</template>
<script setup>
import { ref } from 'vue';
import {horizontalSquadItem } from '@entities/Squads';
const props = defineProps({
    squads: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss"></style>
