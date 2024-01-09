<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>
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
            <div class="contributor-sort__all mb-8">
                <input type="checkbox" @click="select" v-model="checkboxAll" />
            </div>
            <activeApplications
                :participants="participants"
                @change="changePeoples"
            />
            <Button
                @click="participantsVisible += step"
                v-if="participantsVisible < participants.length"
                label="Показать еще"
            ></Button>
            <Button
                @click="participantsVisible -= step"
                v-else
                label="Свернуть все"
            ></Button>
            <div class="selectedItems" v-if="selectedPeoples.length > 0">
                <h3>Итого: {{ selectedPeoples.length }}</h3>

                <checkedAppList
                    @change="changeSelected"
                    :participants="selectedPeoples"
                ></checkedAppList>
            </div>
        </div>
        <div v-else-if="picked == 'Заявка на вступление в отряд'">
            <div class="contributor-sort__all mb-8"></div>
            <ActiveSquads
                :detachments="detachments"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { HTTP } from '@app/http';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { Button } from '@shared/components/buttons';
import { activeApplications } from '@features/ActiveApplications/components';
import { checkedAppList } from '@features/ActiveApplications/components';
import { ActiveSquads } from '@features/ActiveApplications/components';

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
]);

const pages = ref([
    { pageTitle: 'Личный кабинет', href: '#' },
    { pageTitle: 'Активные заявки', href: '#' },
]);

const participants = ref([]);
const detachments = ref([]);
const checkboxAll = ref(false);
const participantsVisible = ref(12);
const selectedPeoples = ref([]);
const step = ref(12);

let tempParticipants = participants.value;

tempParticipants = tempParticipants.slice(0, participantsVisible.value);

const viewParticipants = async () => {
    await HTTP.get('/rsousers/', {
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
};

const viewDetachments = async () => {
    await HTTP.get('/detachments/', {
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

const changePeoples = (selectedHumans) => {
    console.log('fff', selectedHumans);
    selectedPeoples.value = selectedHumans;
};

const changeSelected = (changePeoples) => {
    console.log('fff', changePeoples);
    selectedPeoples.value = changePeoples;
};

// const changeDetachments = (selectedHumans) => {
//     selecte
// }

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
</script>

<style lang="scss">
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
</style>
