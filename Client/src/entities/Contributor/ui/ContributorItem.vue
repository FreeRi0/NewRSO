<template>
    <RouterLink
        :to="{ name: 'PersonalDataUserContributor', params: { id } }"
        class="item"
    >
        <div class="content">
            <div class="main-info">
                <div class="image-wrapper">
                    <img
                        :src="avatarUrl"
                        :alt="`Аватар пользователя ${fullName}`"
                    />
                </div>
                <div class="full-name">
                    {{ fullName }}
                </div>
            </div>
            <div v-if="birthday" class="birthday">
                {{ formattedBirthday }}
            </div>
        </div>
        <div class="status" v-if="isFeePayed">Оплачен</div>
        <div class="status" v-else>Не оплачен</div>
    </RouterLink>
</template>
<script setup lang="ts">
import userAvatar from '@app/assets/user-avatar.png';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
const props = withDefaults(
    defineProps<{
        avatarUrl?: string;
        firstName: string;
        lastName: string;
        patronymicName?: string;
        birthday: string | null;
        isFeePayed?: boolean;
        id: number;
    }>(),
    {
        avatarUrl: userAvatar,
        patronymicName: '',
        isFeePayed: false,
    },
);

const fullName = computed(
    () => `${props.lastName} ${props.firstName} ${props.patronymicName}`,
);
const formattedBirthday = computed(() =>
    props.birthday
        ? new Intl.DateTimeFormat().format(new Date(props.birthday))
        : '',
);
</script>

<style scoped>
.item {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 12px;
    transition: transform 0.1s ease-in-out;
}
.main-info {
    display: grid;
    align-items: center;
    gap: 8px;
    flex: 1;
    /* flex-shrink: 1; 
    flex-wrap: nowrap;
    flex-basis: 80%;
    max-width: 250px; */
    grid-template-columns: 36px minmax(200px, 1fr);
}
.content {
    flex: 1 0;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    border: 1px solid rgb(182, 182, 182);
    padding: 4px 20px;
    flex-wrap: wrap;
}
.image-wrapper {
    width: 36px;
    height: 36px;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
}

.full-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 1 1;
    max-width: 100%;
}
.birthday {
    font-size: 16px;
    font-weight: 400;
    padding-left: 8px;
    border-left: 1px solid rgb(182, 182, 182);
    text-align: end;
    color: rgb(28, 92, 148);
    flex: 0 1 80px;
    justify-self: flex-end;
}
.status {
    border-radius: 10px;
    border: 1px solid rgb(182, 182, 182);
    padding: 4px 20px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 150px;
    min-height: 45px;
}

@media screen and (max-width: 640px) {
    .birthday {
        padding-left: 0;
        border-left: none;
        text-align: left;
    }
}
</style>
