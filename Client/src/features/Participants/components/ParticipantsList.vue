<template>
    <participantItem
        v-for="participant in participants"
        :participant="participant"
        :position="position"
        :key="participant.id"
        v-if="participants.length > 0"
    />

    <h2 class="notFound" v-else>Участники не найдены...</h2>
</template>
<script setup>
import { participantItem } from '@entities/Participants';

const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
});
</script>

