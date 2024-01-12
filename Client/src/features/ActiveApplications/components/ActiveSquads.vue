<template>
    <enteredSquad
        v-for="detachment in detachments"
        :detachment="detachment"
        @change="changeSquads"
        :selectedSquads="selectedDetch"
        :key="detachment.id"
    />
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

