<template>
    <RouterLink
        :to="{ name: 'PersonalDataUserContributor', params: { id } }"
        class="item"
    >
        <div class="content">
            <div class="image-wrapper">
                <img
                    :src="avatarUrl"
                    :alt="`Аватар пользователя ${fullName}`"
                />
            </div>
            <div class="full-name">
                {{ fullName }}
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
    display: grid;
    grid-template-columns: 1fr 150px;
    gap: 12px;
}
.content {
    display: grid;
    align-items: center;
    gap: 10px;
    grid-template-columns: 36px 1fr 85px;
    border-radius: 10px;
    border: 1px solid rgb(182, 182, 182);
    padding: 4px 20px;
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
}
.birthday {
    font-size: 16px;
    font-weight: 400;
    padding-left: 8px;
    border-left: 1px solid rgb(182, 182, 182);
    text-align: end;
}
.status {
    border-radius: 10px;
    border: 1px solid rgb(182, 182, 182);
    padding: 4px 20px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
