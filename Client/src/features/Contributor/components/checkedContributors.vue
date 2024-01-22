<template>
    <checkedContributorsItem
        v-for="participant in participants"
        @change="changeSelected"
        :participant="participant"
        :selectedParticipants="selectedPeoples"
        :key="participant.id"
    />
</template>
<script setup>
import { ref} from 'vue';
import { checkedContributorsItem } from '@entities/ReferencesPeoples';

const emit = defineEmits(['change']);
const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
});

const changeSelected = (changeUser, UserId) => {
    emit('change', changeUser, UserId)
};



</script>
