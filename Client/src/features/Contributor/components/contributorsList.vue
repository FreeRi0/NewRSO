<template>
    <contributorItem
        v-for="participant in participants"
        :participant="participant"
        @change="changePeoples"
        :selectedParticipants="selectedPeoples"
        :isMembership="false"
        :key="participant.id"
    />
</template>

<script setup>
import { ref, watch } from 'vue';
import { contributorItem } from '@entities/ReferencesPeoples';
const emit = defineEmits(['change']);
const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
});

const changePeoples = (selectedHumans) => {
    emit('change', selectedHumans)
};



</script>
