<template>
    <div :class="{ 'top': isLoading || !participants.length, 'headquarters-wrapper': !isLoading && participants }">
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="participants.length">
                <contributorItem v-for="participant in participants" :participant="participant" @change="changePeoples"
                    :selectedParticipants="selectedPeoples" :key="participant.id" :reference="true" />
            </template>
            <p v-else>Ничего не найдено</p>
        </template>
    </div>
</template>

<script setup>
import { contributorItem } from '@entities/ReferencesPeoples';
const emit = defineEmits(['change']);
const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
    selectedPeoples: {
        type: Array,
    },
    isLoading: {
        type: Boolean,
        required: false,
    },
});
const changePeoples = (CheckedUser, UserId) => {
    emit('change', CheckedUser, UserId);
};
</script>
