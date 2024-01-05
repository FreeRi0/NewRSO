<template>
    <!-- <div
        class="participants-wrapper__item"
        v-for="participant in participants"
        v-if="participants.length > 0"
    >
        <router-link :to="{ name: 'userpage', params: { id: participant.id } }">
            <div class="round-img">
                <img
                    :src="participant.user.avatar.photo"
                    alt="photo"
                    v-if="participant.user.avatar"
                />
                <img
                    src="@app/assets/foto-leader-squad/foto-leader-squad-01.png"
                    alt="photo"
                    v-else
                />
            </div>
            <div class="container-participants">
                <p class="participants-wrapper__item-name">
                    {{ participant.user.last_name }}
                </p>
                <p class="participants-wrapper__item-position">
                    {{ position.name }}
                </p>
            </div>
        </router-link>
    </div> -->

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
.round-img {
    img {
        width: 120px;
        height: 120px;
        display: block;
        margin: 0px auto;
        border-radius: 100%;
        @media screen and (max-width: 575px) {
            width: 60px;
            height: 60px;
        }
    }
}
.participants-wrapper__item {
    margin: 0px auto;
    width: 170px;
    @media screen and (max-width: 575px) {
        width: 104px;
    }
    &-name {
        margin-top: 10px;
        margin-bottom: 5px;
        text-align: center;
        font-size: 28px;
        font-family: 'Akrobat';
        color: #1e1e1e;
        @media screen and (max-width: 575px) {
            font-size: 18px;
        }
    }
    &-position {
        text-align: center;
        font-size: 16px;
        font-family: 'Akrobat';
        color: #676767;
        @media screen and (max-width: 575px) {
            font-size: 12px;
        }
    }
}
</style>
