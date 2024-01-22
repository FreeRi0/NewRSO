<template>
    <checkedEnteredSquadItem
        v-for="detachment in detachments"
        @change="changeSquads"
        :detachment="detachment"
        :squad="squad"
        :key="detachment.id"
    />
</template>
<script setup>
import { ref, watch } from 'vue';
import { checkedEnteredSquadItem } from '@entities/Squads';

const emit = defineEmits(['change']);
const changeSquads = (CheckedSquad, SquadId) => {
    emit('change', CheckedSquad, SquadId);
};

const props = defineProps({
    detachments: {
        type: Array,
        required: true,
    },
});


</script>
<style lang="scss"></style>
