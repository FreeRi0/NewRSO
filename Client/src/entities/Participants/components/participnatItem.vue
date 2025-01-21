<template>
    <div :class="containerClass" @click="goToUserPage">
        <div :class="imageClass">
            <img :src="participantAvatar" :alt="participantName" />
        </div>
        <div :class="contentClass">
            <template v-if="!horizontal">
                <p class="participants-wrapper__item-name">
                    {{ participantName }}
                </p>
                <p v-if="!isVerified" class="participants-wrapper__item-position">
                    {{ participantPosition }}
                </p>
            </template>
            <template v-else>
                <div class="d-flex">
                    <p v-for="name in participantFullName" :key="name" class="horizontallso-item__list-full">
                        {{ name }}
                    </p>
                </div>
                <div class="horizontallso-item__list-date">
                    <span class="date-separator"></span>
                    <p>{{ participant.user.date_of_birth }}</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@features/store';
import defaultAvatar from '@app/assets/user-avatar.png';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    patronymic_name: string;
    date_of_birth: string;
    avatar?: {
        photo?: string;
    };
}

interface Participant {
    user: User;
    position?: {
        name: string;
    };
}

const props = defineProps<{
    participant: Participant;
    isVerified: boolean;
    horizontal: boolean;
}>();

const router = useRouter();
const userStore = useUserStore();

const containerClass = computed(() => ({
    'participants-wrapper__item list': !props.horizontal,
    'horizontallso-item__wrapper': props.horizontal
}));

const imageClass = computed(() => ({
    'round-img': !props.horizontal,
    'horizontallso-img': props.horizontal
}));

const contentClass = computed(() => ({
    'container-participants': !props.horizontal,
    'containerHorizontal': props.horizontal
}));

const participantAvatar = computed(() =>
    props.participant.user.avatar?.photo || defaultAvatar
);

const participantName = computed(() =>
    props.participant.user.first_name
);

const participantFullName = computed(() => [
    props.participant.user.last_name,
    props.participant.user.first_name,
    props.participant.user.patronymic_name
]);

const participantPosition = computed(() =>
    props.participant.position?.name || ''
);

const goToUserPage = () => {
    const route = props.participant.user.id === (userStore.currentUser as User).id
        ? { name: 'mypage' }
        : { name: 'userpage', params: { id: props.participant.user.id } };

    router.push(route);
};
</script>

<style lang="scss" scoped>
.round-img img {
    width: 120px;
    height: 120px;
    display: block;
    margin: 0 auto;
    border-radius: 100%;
    object-fit: cover;
    overflow: hidden;

    @media screen and (max-width: 575px) {
        width: 60px;
        height: 60px;
    }
}

.participants-wrapper__item {
    margin: 0 auto;
    width: 170px;

    @media screen and (max-width: 575px) {
        width: 104px;
    }

    &-name {
        margin-top: 10px;
        margin-bottom: 5px;
        text-align: center;
        font-size: 28px;
        font-family: 'Akrobat', sans-serif;
        color: #1e1e1e;

        @media screen and (max-width: 575px) {
            font-size: 18px;
        }
    }

    &-position {
        text-align: center;
        font-size: 16px;
        font-family: 'Akrobat', sans-serif;
        color: #676767;

        @media screen and (max-width: 575px) {
            font-size: 12px;
        }
    }
}

.horizontallso-img img {
    width: 36px;
    height: 36px;
    border-radius: 100%;
}

.horizontallso-item {
    &__list-full {
        color: #35383f;
        font-family: 'BertSans', sans-serif;
        font-size: 16px;
        font-weight: 400;
        margin-left: 7px;
    }

    &__list-date p {
        color: #1c5c94;
        font-family: 'BertSans', sans-serif;
        font-size: 16px;
        font-weight: 400;
    }

    &__wrapper {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        padding: 4px 20px;
        border-radius: 10px;
        border: 1px solid #b6b6b6;
        background: #fff;
        margin-bottom: 12px;
    }
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.date-separator {
    border-left: 2px solid #b6b6b6;
    padding-right: 8px;
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