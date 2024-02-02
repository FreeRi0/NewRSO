<template>
    <checkedReferencesItem
        v-for="participant in participants"
        @change="changePeoples"
        @approve="approveParticipant"
        @reject="rejectParticipant"
        :participant="participant"
        :key="participant.id"
    />
</template>
<script setup>
import { ref } from 'vue';
import { checkedReferencesItem } from '@entities/ReferencesPeoples';
const emit = defineEmits(['change', 'approve']);
const changePeoples = (CheckedUser, UserId) => {
    emit('change', CheckedUser, UserId);
};
const approveParticipant = (approved) => {
    console.log('user', approved);
    emit('approve', approved);
    console.log('approved');
};
const rejectParticipant = (rejected) => {
    console.log('user', rejected);
    emit('reject', rejected);
    console.log('rejected');
};

const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
});
</script>
