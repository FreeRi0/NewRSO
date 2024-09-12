<template>
    <div class="participants-wrapper__item list">
        <div class="link" @click="goLink">
            <div class="round-img">
                <img :src="participant.user?.avatar?.photo" alt="photo" v-if="participant.user?.avatar?.photo" />
                <img src="@app/assets/user-avatar.png" alt="photo" v-else />
            </div>
            <div class="container-participants">
                <p class="participants-wrapper__item-name">
                    {{ participant.user.first_name }}
                </p>
                <p class="participants-wrapper__item-position">
                    {{ participant.position?.name }}
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@features/store';
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

const router = useRouter();
const userStore = useUserStore();

const goLink = () => {
    if (props.participant.user.id === userStore.currentUser.id) {
        router.push({ name: 'mypage' })
    } else {
        router.push({ name: 'userpage', params: { id: props.participant.user.id } })
    }
}
</script>
<style lang="scss" scoped>
.round-img {
    img {
        width: 120px;
        height: 120px;
        display: block;
        margin: 0px auto;
        border-radius: 100%;
        object-fit: cover;
        overflow: hidden;

        @media screen and (max-width: 575px) {
            width: 60px;
            height: 60px;
        }
    }
}

.link {
    cursor: pointer;
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
