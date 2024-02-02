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
    <p v-else>Заявок нет...</p>
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

    emit('change', CheckedUser, UserId);
    console.log('UserId', UserId)
};
</script>
