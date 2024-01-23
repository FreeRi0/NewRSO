<template>
    <checkedReferencesItem
        v-for="participant in participants"
        @change="changePeoples"
        :participant="participant"
        :key="participant?.user?.id"
    />
</template>
<script setup>
import { ref } from 'vue';
import { checkedReferencesItem } from '@entities/ReferencesPeoples';
const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
});
const emit = defineEmits(['change']);
const changePeoples  = (changeUser, UserId) => {
    emit('change', changeUser, UserId)
};

</script>

