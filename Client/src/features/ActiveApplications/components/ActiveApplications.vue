<template>
    <div v-if="participants.length > 0">
        <referenceItem
            v-for="participant in participants"
            :participant="participant"
            @change="changePeoples"
            :selectedParticipants="selectedPeoples"
            :key="participant.user.id"
        />
    </div>
    <h2 v-else>Заявок нет...</h2>
</template>
<script setup>
import { ref } from 'vue';
import { referenceItem } from '@entities/ReferencesPeoples/components';
const emit = defineEmits(['change']);
const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
    selectedPeoples: {
        type: Array,
    },
});

const changePeoples = (CheckedUser, UserId) => {
    console.log('UserId', UserId)
    emit('change', CheckedUser, UserId);
};
</script>
