<template>
    <checkedEnteredSquadItem
        v-for="detachment in detachments"
        @change="changeSquads"
        @approveMember="approveMember"
        @rejectMember="rejectMember"
        :detachment="detachment"
        :squad="squad"
        :key="detachment.id"
    />
</template>
<script setup>
import { ref} from 'vue';
import { checkedEnteredSquadItem } from '@entities/Squads';

const emit = defineEmits(['change', 'approveMember', 'rejectMember']);
const changeSquads = (CheckedSquad, SquadId) => {
    emit('change', CheckedSquad, SquadId);
};

const approveMember = (approved) => {

    emit('approveMember', approved);

};
const rejectMember = (rejected) => {
  
    emit('rejectMember', rejected);

};

const props = defineProps({
    detachments: {
        type: Array,
        required: true,
    },
});


</script>
