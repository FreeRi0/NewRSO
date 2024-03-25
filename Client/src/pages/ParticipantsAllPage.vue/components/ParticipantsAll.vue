<template>
    <keep-alive>
    <div class="container">
        <div class="participants">
            <h2 class="participants-title">Участники ЛСО</h2>
            <div class="participants-tabs">
                <div class="d-flex">
                    <Button
                        type="button"
                        label="Уже в отряде"
                        class="contributorBtn"
                        :class="{ active: picked === true }"
                        @click="picked = true"
                    ></Button>

                    <Button
                        type="button"
                        label="Ожидают одобрение"
                        class="contributorBtn"
                        :class="{ active: picked === false }"
                        @click="picked = false"
                    ></Button>
                </div>
            </div>
            <div class="participants-search">
                <input
                    type="text"
                    id="search"
                    class="participants-search__input"
                    v-model="name"
                    @keyup="searchMembers"
                    placeholder="Иванов Иван"
                />
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18.511 19.0914L24 24.8M21 12.84C21 14.5884 20.5015 16.2975 19.5675 17.7512C18.6335 19.205 17.306 20.338 15.7528 21.0071C14.1997 21.6762 12.4906 21.8512 10.8417 21.5101C9.1929 21.169 7.67835 20.3271 6.4896 19.0908C5.30085 17.8545 4.4913 16.2794 4.16333 14.5646C3.83535 12.8498 4.00368 11.0724 4.64703 9.45708C5.29037 7.84178 6.37984 6.46116 7.77766 5.48981C9.17548 4.51846 10.8189 4 12.5 4C14.7544 4 16.9164 4.93135 18.5104 6.58918C20.1045 8.247 21 10.4955 21 12.84Z"
                        stroke="#898989"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <div class="participants-sort">
                <div class="sort-layout">
                    <Button
                        v-if="vertical"
                        type="button"
                        class="dashboard"
                        icon="icon"
                        color="white"
                        @click="showVertical"
                    >
                    </Button>
                    <Button
                        v-else
                        type="button"
                        class="dashboardD"
                        icon="icon"
                        color="white"
                        @click="showVertical"
                    >
                    </Button>
                    <Button
                        v-if="!vertical"
                        type="button"
                        class="menuuA"
                        icon="icon"
                        color="white"
                        @click="showVertical"
                    ></Button>
                    <Button
                        v-else
                        type="button"
                        class="menuu"
                        icon="icon"
                        color="white"
                        @click="showVertical"
                    ></Button>
                </div>
                <div class="sort-filters">
                    <div class="sort-select">
                        <sortByEducation
                            variant="outlined"
                            clearable
                            v-model="sortBy"
                            :options="sortOptionss"
                            class="sort-alphabet"
                            :sorts-boolean="false"
                        ></sortByEducation>
                    </div>

                    <Button
                        class="ascend"
                        @click="ascending = !ascending"
                        iconn="iconn"
                        color="white"
                    ></Button>
                </div>
            </div>

            <div class="participants-wrapper" v-show="vertical">
                <ParticipantsList
                    v-if="picked"
                    :participants="sortedParticipants"
                ></ParticipantsList>
                <VerifiedList v-else :verified="verified"></VerifiedList>
            </div>

            <div class="horizontallso" v-show="!vertical">
                <horizontalParticipantsList
                    v-if="picked"
                    :participants="sortedParticipants"
                ></horizontalParticipantsList>
                <VerifiedHorizontal
                    v-else
                    :verified="verified"
                ></VerifiedHorizontal>
            </div>
            <template v-if="peoples.count && peoples.count > limit">
                <Button
                    @click="next"
                    v-if="sortedParticipants.length < peoples.count"
                    label="Показать еще"
                ></Button>
                <Button @click="prev" v-else label="Свернуть все"></Button>
            </template>
        </div>
    </div>
    </keep-alive>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import {
    ParticipantsList,
    horizontalParticipantsList,
    VerifiedList,
    VerifiedHorizontal,
} from '@features/Participants/components';
import { sortByEducation } from '@shared/components/selects';
import { useSquadsStore } from '@features/store/squads';
import { ref, computed, onMounted, watch, onActivated } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';

const squadsStore = useSquadsStore();
const picked = ref(true);
const route = useRoute();
const verified = ref([]);

const isLoading = ref(false);
const limit = 10;
const timerSearch = ref(null);

const aboutVerified = async () => {
    await HTTP.get(`/detachments/${id}/applications/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            verified.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const ascending = ref(true);
const sortBy = ref('user__date_of_birth');
const vertical = ref(true);
const peoples = ref({});
const sortedParticipants = ref([]);
const searchParticipants = ref('');

const showVertical = () => {
    vertical.value = !vertical.value;
};
const name = ref('');

const next = () => {
    getMembers('next');
};

const prev = () => {
    getMembers();
};

let id = route.params.id;

const sortOptionss = ref([
    {
        value: 'user__last_name',
        name: 'Алфавиту от А - Я',
    },
    { value: 'user__date_of_birth', name: 'По дате рождения' },
]);

const getMembers = async (pagination, orderLimit) => {
    try {
        let data = [];
        let url = `/detachments/${id}/members/?`;
        if (orderLimit) data.push('limit=' + orderLimit);
        else if (!pagination) data.push('limit=' + limit);
        else if (pagination == 'next')
            url = peoples.value.next.replace('http', 'https');
        if (name.value) data.push('search=' + name.value);
        if (sortBy.value && !pagination)
            data.push(
                'ordering=' + (ascending.value ? '' : '-') + sortBy.value,
            );
        const viewHeadquartersResponse = await HTTP.get(url + data.join('&'), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });


        let response = viewHeadquartersResponse.data;
        if (pagination) {
            response.results = [...peoples.value.results, ...response.results];
        }
        peoples.value = response;
        sortedParticipants.value = response.results;
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const searchMembers = () => {
    clearTimeout(timerSearch.value);
    timerSearch.value = setTimeout(() => {
        getMembers();
    }, 400);
};

watch(
    () => sortBy.value,
    () => {
        getMembers('', sortedParticipants.value.length);
    },
);
watch(
    () => ascending.value,
    () => {
        getMembers('', sortedParticipants.value.length);
    },
);
onActivated(async () => {
    id = route.params.id;
    await getMembers();
    await aboutVerified();
})
</script>
<style lang="scss">
.participants {
    padding: 0px 0px 60px 0px;
    &-title {
        font-size: 52px;
        @media screen and (max-width: 575px) {
            font-size: 40px;
        }
    }
    &-wrapper {
        padding: 60px 0px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-row-gap: 40px;
        @media screen and (max-width: 1024px) {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
        @media screen and (max-width: 768px) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
        @media screen and (max-width: 575px) {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
    &-sort {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    &-search {
        position: relative;
        box-sizing: border-box;
        svg {
            position: absolute;
            top: 10px;
            left: 16px;
        }
        &__input {
            width: 100%;
            padding: 13px 0px 10px 60px;
            border-radius: 10px;
            border: 1px solid black;
        }
    }
    &-tabs {
        margin-top: 20px;
        margin-bottom: 40px;
        display: flex;
        flex-wrap: wrap;
        &__item {
            color: #1c5c94;
            padding: 6px 24px;
            border: 1px solid #1c5c94;
            border-radius: 30px;
            text-align: center;
            font-size: 20px;
            background-color: white;
            font-family: 'Bert Sans';
            margin: 20px 20px 0px 0px;
            cursor: pointer;
            text-transform: none;
            box-shadow: none;
            @media screen and (max-width: 768px) {
                font-size: 14px;
                padding: 8px 8px;
                margin: 20px 8px 0px 0px;
            }
        }
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
        border: 1px solid #1c5c94;
    }

    .v-select__selection {
        span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .form__select {
        margin-bottom: 0px;
        margin-right: 8px;
    }

    .dashboard {
        background-image: url('@app/assets/icon/darhboard-active.svg');
        background-repeat: no-repeat;
        background-size: cover;
    }

    .dashboardD {
        background-image: url('@app/assets/icon/darhboard-disable.svg');
        background-repeat: no-repeat;
        background-size: cover;
    }
    .menuuA {
        background-image: url('@app/assets/icon/MenuA.svg');
        background-repeat: no-repeat;
        background-size: cover;
    }
    .menuu {
        background-image: url('@app/assets/icon/Menu.svg');
        background-repeat: no-repeat;
        background-size: cover;
    }

    .ascend {
        background-image: url('@app/assets/icon/switch.svg');
        background-repeat: no-repeat;
        background-position: center;
    }

    .horizontallso {
        padding-top: 40px;
    }
}
</style>
