<template>
    <checkedReferencesItem
        v-for="participant in participants"
        @change="changePeoples"
        @approve="approveParticipant"
        @reject="rejectParticipant"
        :participant="participant"
        :key="participant.user.id"
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

    emit('approve', approved);

};
const rejectParticipant = (rejected) => {
    emit('reject', rejected);

};

const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
});
</script>
