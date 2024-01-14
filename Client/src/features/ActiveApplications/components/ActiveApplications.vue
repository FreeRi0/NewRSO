<template>
    <referenceItem
        v-for="participant in participants"
        :participant="participant"
        @change="changePeoples"
        :selectedParticipants="selectedPeoples"
        :key="participant.id"
    />
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
