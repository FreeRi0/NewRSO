<template>
    <contributorItem
        v-for="participant in participants"
        :participant="participant"
        @change="changePeoples"
        :selectedParticipants="selectedPeoples"
        :key="participant.id"
        :reference="true"
    />

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

