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
    <p v-else>Заявок нет...</p>
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
    selectedDetch: {
        type: Array,
    }
});

const changeSquads = (CheckedSquad, SquadId) => {
    emit('change', CheckedSquad, SquadId);
};
</script>
