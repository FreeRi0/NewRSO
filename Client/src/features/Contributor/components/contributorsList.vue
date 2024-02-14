<template>
    <contributorItem
        v-for="participant in participants"
        :participant="participant"
        @change="changePeoples"
        :selectedParticipants="selectedPeoples"
        :key="participant.id"
        :reference="false"
        v-if="participants.length > 0"
    />
    <h2 v-else>Пользователи не найдены...</h2>
</template>

<script setup>
import { ref } from 'vue';
import { contributorItem } from '@entities/ReferencesPeoples';
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
};
</script>
