<template>
    <referenceItem
        v-for="participant in participants"
        :participant="participant"
        @change="changePeoples"
        :selectedParticipants="selectedPeoples"
        :isMembership="false"
        :key="participant.id"
    />
</template>
<script setup>
// import participants from '@entities/user/index';
import { sortByEducation } from '@shared/components/selects';
import { computed, ref } from 'vue';
import { Button } from '@shared/components/buttons';
import { referenceItem } from '@entities/ReferencesPeoples/components';

const emit = defineEmits(['change']);
const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
});

const changePeoples = (selectedHumans) => {
    emit('change', selectedHumans);
};
</script>
<style lang="scss"></style>
