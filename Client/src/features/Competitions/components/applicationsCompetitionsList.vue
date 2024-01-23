<template>
    <applicationCompetitionItem
        v-for="competition in competitions"
        :competition="competition"
        @change="changeCompetitions"
        :selectedCompetitions="selectedEvents"
        :key="competition.id"
    />
</template>
<script setup>
import { ref } from 'vue';
import { applicationCompetitionItem } from '@entities/Competitions';
const emit = defineEmits(['change']);
const props = defineProps({
    competitions: {
        type: Array,
        required: true,
    },
});

const changeCompetitions = (CheckedCompetition, CompetitionId) => {
    emit('change', CheckedCompetition, CompetitionId);
};
</script>
