<template>
    <div class="container">
        <div
            class="active-app"
            v-if="
                roles.roles.value.regionalheadquarter_commander ||
                roles.roles.value.detachment_commander
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
                <div
                    class="contributor-sort__all mb-8"
                    v-if="participants.length > 0"
                >
                    <input
                        type="checkbox"
                        @click="select"
                        v-model="checkboxAll"
                    />
                </div>
                <activeApplications
                    @change="changePeoples"
                    :participants="participants"
                    :selected-peoples="selectedPeoples"
                />
                <!-- <Button
                    @click="participantsVisible += step"
                    v-if="participantsVisible < participants.length && participants.length > 0"
                    label="Показать еще"
                ></Button>
                <Button
                    @click="participantsVisible -= step"
                    v-else
                    label="Свернуть все"
                ></Button> -->
                <div class="selectedItems" v-if="selectedPeoples.length > 0">
                    <h3>Итого: {{ selectedPeoples.length }}</h3>

                    <checkedAppList
                        @change="changePeoples"
                        :participants="selectedPeoples"
                    ></checkedAppList>
                </div>
            </div>
            <div v-else-if="picked == 'Заявка на вступление в отряд'">
                <div
                    class="contributor-sort__all mb-8"
                    v-if="detachments.length > 0"
                >
                    <input
                        type="checkbox"
                        @click="selectSquads"
                        v-model="checkboxAllSquads"
                    />
                </div>
                <div class="classes" v-if="detachments.length > 0">
                    <div>Боец</div>
                    <div>Отряд</div>
                </div>
                <ActiveSquads
                    @change="changeSquads"
                    :detachments="detachments"
                    :selected-detch="selectedDetch"
                />
                <div class="selectedItems" v-if="selectedDetch.length > 0">
                    <h3>Итого: {{ selectedDetch.length }}</h3>

                    <CheckedSquadsList
                        @change="changeSquads"
                        :detachments="selectedDetch"
                    ></CheckedSquadsList>
                </div>
            </div>

            <div v-else-if="picked == 'Заявка на участие в мероприятии'">
                <p class="text-h3">Блок в разработке.....</p>
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
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { Button } from '@shared/components/buttons';
import { activeApplications } from '@features/ActiveApplications/components';
import { checkedAppList } from '@features/ActiveApplications/components';
import { CheckedSquadsList } from '@features/ActiveApplications/components';
import { ActiveSquads } from '@features/ActiveApplications/components';
import { ActiveCompetitions } from '@features/ActiveCompetitions';
import { useRoleStore } from '@layouts/store/role';

import { storeToRefs } from 'pinia';

const roleStore = useRoleStore();
roleStore.getRoles();
const roles = storeToRefs(roleStore);

// let regComId = roles.roles.value.regionalheadquarter_commander;
// let detComId = roles.roles.value.detachment_commander;
const picked = ref('');
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

const participants = ref([]);
const detachments = ref([]);
const checkboxAll = ref(false);
const checkboxAllSquads = ref(false);
const participantsVisible = ref(12);
const selectedPeoples = ref([]);
const selectedDetch = ref([]);
const step = ref(12);

// let tempParticipants = participants.value;

// tempParticipants = tempParticipants.slice(0, participantsVisible.value);

const viewParticipants = async () => {
    // let id = regComId ?? detComId;
    console.log('roles', roles.roles.value);
    let id = roles.roles.value.regionalheadquarter_commander ?? roles.roles.value.regionalheadquarter_commander;
    if (roles.roles.value.regionalheadquarter_commander) {
        await HTTP.get(`/regionals/${id}/verifications/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        })
            .then((response) => {
                participants.value = response.data;
                console.log(response);
            })
            .catch(function (error) {
                console.log('an error occured ' + error);
            });
    } else if (roles.roles.value.regionalheadquarter_commander) {
        await HTTP.get(`/detachments/${id}/verifications/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        })
            .then((response) => {
                participants.value = response.data;
                console.log(response);
            })
            .catch(function (error) {
                console.log('an error occured ' + error);
            });
    }
};

const viewDetachments = async () => {
    let id = roles?.roles?.value?.detachment_commander;
    console.log('roles', roles.roles.value);
    console.log('id', id);
    await HTTP.get(`/detachments/${id}/applications/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            detachments.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

onMounted(() => {
    viewParticipants();
    viewDetachments();
});

watch(
    () => roles.roles.value,

    (newRole, oldRole) => {
        if (Object.keys(roles.roles.value).length === 0) {
            return;
        }
        viewParticipants();
        viewDetachments();
    },
);

const select = (event) => {
    selectedPeoples.value = [];
    console.log('fffss', checkboxAll.value, event);
    if (event.target.checked) {
        console.log('fffss', checkboxAll.value, event);
        for (let index in participants.value) {
            console.log('arr', selectedPeoples.value);
            selectedPeoples.value.push(participants.value[index]);
        }
    }
};

const selectSquads = (event) => {
    selectedDetch.value = [];
    console.log('fffss', checkboxAll.value, event);
    if (event.target.checked) {
        console.log('fffss', checkboxAll.value, event);
        for (let index in detachments.value) {
            console.log('arr', selectedDetch.value);
            selectedDetch.value.push(detachments.value[index]);
        }
    }
};

const changePeoples = (CheckedUser, UserId) => {
    let participant = {};
    console.log('fffUser', CheckedUser, UserId);
    if (CheckedUser) {
        participant = participants.value.find((item) => item.user.id == UserId);
        selectedPeoples.value.push(participant);
    } else {
        selectedPeoples.value = selectedPeoples.value.filter(
            (item) => item.user.id !== UserId,
        );
    }
};

const changeSquads = (CheckedSquad, SquadId) => {
    let detachment = {};
    console.log('fffSquad', CheckedSquad, SquadId);
    if (CheckedSquad) {
        detachment = detachments.value.find((item) => item.id == SquadId);
        selectedDetch.value.push(detachment);
    } else {
        selectedDetch.value = selectedDetch.value.filter(
            (item) => item.id !== SquadId,
        );
    }
};
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
