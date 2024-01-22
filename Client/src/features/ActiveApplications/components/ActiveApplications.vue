<template>
    <div v-if="participants.length > 0">
        <referenceItem
            v-for="participant in participants"
            :participant="participant"
            @change="changePeoples"
            :selectedParticipants="selectedPeoples"
            :key="participant.id"
        />
    </div>
    <h2 v-else>Заявок нет...</h2>
</template>
<script setup>
import { computed, ref } from 'vue';
import { referenceItem } from '@entities/ReferencesPeoples/components';
const emit = defineEmits(['change']);
const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
});

const changePeoples = (CheckedUser, UserId) => {
    emit('change', CheckedUser, UserId);
};
</script>
