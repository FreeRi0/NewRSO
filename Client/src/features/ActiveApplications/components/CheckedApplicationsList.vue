<template>
    <checkedReferencesItem
        v-for="participant in participants"
        @change="changePeoples"
        :participant="participant"
        :key="participant.id"
    />
</template>
<script setup>
import { ref } from 'vue';
import { checkedReferencesItem } from '@entities/ReferencesPeoples';
const emit = defineEmits(['change']);
const changePeoples = (CheckedUser, UserId) => {
    emit('change', CheckedUser, UserId);
};

const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
});
</script>
