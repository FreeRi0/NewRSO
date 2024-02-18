<template>
    <div class="container">
        <div
            class="active-app"
            v-if="
                roles.roles.value.detachment_commander ||
                roles.roles.value.regionalheadquarter_commander
            "
        >
            <h2 class="profile-title">Активные заявки</h2>

            <div class="d-flex mt-9 mb-9">
                <button
                    class="contributorBtn"
                    :class="{ active: picked === tab.name }"
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="picked = tab.name"
                >
                    {{ tab.name }}
                </button>
            </div>
            <div v-if="picked == 'Верификация аккаунтов' || picked == ''">
                <activeApplications />
            </div>
            <div v-else-if="picked == 'Заявка на вступление в отряд'">
                <ActiveSquads />
            </div>

            <div v-else-if="picked == 'Заявка на участие в мероприятии'">
                <p>Блок в разработке....</p>
                <!-- <div
                    class="contributor-sort__all mb-8"
                    v-if="events?.length > 0"
                >
                    <input
                        type="checkbox"
                        @click="selectEvents"
                        v-model="checkboxAllEvents"
                    />
                </div>
                <ActiveEventsApp
                    @change="changeEvents"
                    :events="events"
                    :selected-events="selectedEvents"
                    v-if="!isLoading"
                />
                <v-progress-circular
                    class="circleLoader"
                    v-else
                    indeterminate
                    color="blue"
                ></v-progress-circular> -->
            </div>

            <div v-else-if="picked == 'Конкурсы'">
                <active-competitions />
            </div>
        </div>
        <div v-else>
            Доступно только командирам отрядов и региональных штабов.
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';
import { Button } from '@shared/components/buttons';
import { activeApplications } from '@features/ActiveApplications/components';
import { ActiveSquads } from '@features/ActiveApplications/components';
import { ActiveCompetitions } from '@features/ActiveCompetitions';
import { useRoleStore } from '@layouts/store/role';

import { storeToRefs } from 'pinia';

const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);

// const isLoading = ref(false);
const picked = ref('Верификация аккаунтов');
const tabs = ref([
    {
        id: '1',
        name: 'Верификация аккаунтов',
    },
    {
        id: '2',
        name: 'Заявка на вступление в отряд',
    },
    {
        id: '3',
        name: 'Заявка на участие в мероприятии',
    },
    {
        id: '4',
        name: 'Конкурсы',
    },
]);

const pages = ref([
    { pageTitle: 'Личный кабинет', href: '#' },
    { pageTitle: 'Активные заявки', href: '#' },
]);


watch(
    () => roles.roles.value,

    (newRole) => {
        if (Object.keys(roles.roles.value).length === 0) {
            return;
        }
    },
);
</script>

<style lang="scss" scoped>
.profile-title {
    font-size: 40px;
    margin-bottom: 40px;
}

.contributorBtn {
    border-radius: 30px;
    background-color: white;
    color: #1c5c94;
    border: 1px solid #1c5c94;
    margin: 0px;
    padding: 10px 24px;
    margin: 7px;
}

.active {
    background-color: #1c5c94;
    color: white;
}

.contributor-sort__all {
    padding: 11px 12px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    height: 48px;
    width: 48px;
    input {
        width: 24px;
        height: 24px;
    }
}

.classes {
    margin-left: 68px;
    margin-bottom: 12px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    p {
        font-size: 16px;
        color: #35383f;
    }
}

.selectedItems {
    padding-top: 60px;
    padding-bottom: 80px;
    h3 {
        margin-bottom: 20px;
    }
}
</style>
