<template>
    <checkedEnteredSquadItem
        v-for="detachment in detachments"
        @change="changeSelected"
        :detachment="detachment"
        :detachments="selectedSquads"
        :key="detachment.id"
    />
</template>
<script setup>
import { ref, watch } from 'vue';
import { checkedEnteredSquadItem } from '@entities/Squads';

const emit = defineEmits(['change']);
const changeSelected = (changeSquads) => {
    emit('change', changeSquads);
};

const props = defineProps({
    detachments: {
        type: Array,
        required: true,
    },
    selectedDetachments: {
        type: Array,
        default: () => [],
    },
});

const selectedSquads = ref(props.detachments);

watch(selectedSquads, (newChecked) => {
    if (!newChecked) return;
    emit('change', selectedSquads.value);
    console.log(newChecked);
});
</script>
<style lang="scss"></style>
