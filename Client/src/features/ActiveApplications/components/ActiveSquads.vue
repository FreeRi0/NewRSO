<template>
    <div v-if="detachments.length > 0">
        <enteredSquad
            v-for="detachment in detachments"
            :detachment="detachment"
            :squad="squad"
            @change="changeSquads"
            :selectedSquads="selectedDetch"
            :key="detachment.id"
        />
    </div>
    <h2 v-else>Заявок нет...</h2>
</template>
<script setup>
import { ref } from 'vue';
import { enteredSquad } from '@entities/Squads/components';

const emit = defineEmits(['change']);
const props = defineProps({
    detachments: {
        type: Array,
        required: true,
    },
});

const changeSquads = (CheckedSquad, SquadId) => {
    emit('change', CheckedSquad, SquadId);
};
</script>
