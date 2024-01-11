<template>
    <checkedContributorsItem
        v-for="participant in participants"
        @change="changeSelected"
        :participant="participant"
        :participants="selectedPeoples"
        :key="participant.id"
    />
</template>
<script setup>
import { ref, watch } from 'vue';
import { checkedContributorsItem } from '@entities/ReferencesPeoples';

const emit = defineEmits(['change']);
const changeSelected = (changePeoples) => {
    emit('change', changePeoples)
};


const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
    participant: {
        type: Object,
    }
});


const selectedPeoples = ref(props.participants);
watch(selectedPeoples, (newChecked) => {
    if (!newChecked) return;
    emit('change', selectedPeoples.value);
    console.log(newChecked);
});
</script>
