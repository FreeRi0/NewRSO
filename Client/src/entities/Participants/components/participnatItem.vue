<template>
    <div class="participants-wrapper__item list">
        <router-link :to="{ name: 'userpage', params: { id: participant.user.id } }">
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
                    {{ participant.user.first_name }}
                </p>
                <p class="participants-wrapper__item-position">
                    {{ participant.position }}
                </p>
            </div>
        </router-link>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { HTTP } from '@app/http';
const props = defineProps({
    participant: {
        type: Object,
        required: true,
    },
    position: {
        type: Object,
    },
});

// const position = ref({});

// const aboutPosition = async () => {
//     let id = props.participant.position;
//     console.log('id', id)

//     await HTTP.get(`/positions/${id}/`, {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token ' + localStorage.getItem('Token'),
//         },
//     })
//         .then((response) => {
//             position.value = response.data;
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log('an error occured ' + error);
//         });
// };

// onMounted(() => {
//     aboutPosition();
// });

// watch(
//     () => props.participant,

//     (newParticipant, oldParticipant) => {
//         if (Object.keys(props.participant).length === 0) {
//             return;
//         }
//         aboutPosition();
//     },
// );
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

.list {
    @media screen and (max-width: 768px) {
        width: 160px;
    }
    @media screen and (max-width: 575px) {
        width: 100px;
    }
}
</style>
