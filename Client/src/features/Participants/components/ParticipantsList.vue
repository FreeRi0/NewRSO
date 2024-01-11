<template>
    <participantItem
        v-for="participant in participants"
        :participant="participant"
        :position="position"
        :key="participant.id"
        v-if="participants.length > 0"
    />

    <h2 v-else>Участники не найдены...</h2>
</template>
<script setup>
import { participantItem } from '@entities/Participants';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { HTTP } from '@app/http';
const position = ref({});
const route = useRoute();
const id = route.params.id;

const aboutPosition = async () => {
    await HTTP.get(`/positions/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            position.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

onMounted(() => {
    aboutPosition();
});

const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss" scoped>

</style>
