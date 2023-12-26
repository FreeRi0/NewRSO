<template>
    <div class="container">
        <div class="participants">
            <Breadcrumbs :items="pages"></Breadcrumbs>
            <h2 class="participants-title">Участники ЛСО</h2>
            <div class="participants-tabs">
                <!-- <v-btn
                    class="participants-tabs__item"
                    :class="{ active: checked === category }"
                    v-for="category in categories"
                    :key="category"
                    @click="checked = category"
                    >{{ category }}</v-btn
                > -->

                <!-- <div class="d-flex">
                    <Button
                        type="button"
                        label="Уже в отряде"
                        class="contributorBtn"
                        :class="{ active: picked === is_trusted }"
                        @click="picked = is_trusted"
                    ></Button>

                    <Button
                        type="button"
                        label="Ожидают одобрение"
                        class="contributorBtn"
                        :class="{ active: picked === !is_trusted }"
                        @click="picked = !is_trusted"
                    ></Button>
                </div> -->
            </div>
            <div class="participants-search">
                <input
                    type="text"
                    id="search"
                    class="participants-search__input"
                    v-model="searchParticipants"
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
                        v-else="!vertical"
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
                        v-else="vertical"
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
                        ></sortByEducation>
                    </div>

                    <Button
                        class="ascend"
                        @click="ascending = !ascending"
                        icon="icon"
                        color="white"
                    ></Button>
                </div>
            </div>

            <div class="participants-wrapper" v-show="vertical">
                <ParticipantsList
                    :participants="sortedParticipants"
                ></ParticipantsList>
            </div>

            <div class="horizontallso" v-show="!vertical">
                <horizontalParticipantsList
                    :participants="sortedParticipants"
                ></horizontalParticipantsList>
            </div>
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
        </div>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import {
    ParticipantsList,
    horizontalParticipantsList,
} from '@features/Participants/components';
import { sortByEducation, Select } from '@shared/components/selects';
import { ref, computed, onMounted } from 'vue';
import { HTTP } from '@app/http';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { useRoute } from 'vue-router';
// import participants from '@entities/Participants/participants';

const participants = ref([]);
const participantsVisible = ref(12);
// const picked = ref(null);

const step = ref(12);
const position = ref({});
const route = useRoute();
const id = route.params.id;

const aboutMembers = async () => {
    await HTTP.get(`/detachments/${id}/members/`, {
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

onMounted(() => {
    aboutMembers();
});

const pages = [
    { pageTitle: 'Структура', href: '/UserPage' },
    { pageTitle: 'ЛСО', href: '/AllSquads' },
    { pageTitle: 'Отряд', href: '/lso/:id' },
    { pageTitle: 'Участники отряда', href: '#' },
];

const ascending = ref(true);
const sortBy = ref('alphabetically');


const vertical = ref(true);

const searchParticipants = ref('');

const showVertical = () => {
    vertical.value = !vertical.value;
};

const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    { value: 'birthdate', name: 'По дате рождения' },
    { value: 'days', name: 'Количество дней в отряде' },
]);

const sortedParticipants = computed(() => {
    let tempParticipants = participants.value;

    tempParticipants = tempParticipants.slice(0, participantsVisible.value);

    tempParticipants = tempParticipants.filter((item) => {
        return item.user.last_name
            .toUpperCase()
            .includes(searchParticipants.value.toUpperCase());
    });

    tempParticipants = tempParticipants.sort((a, b) => {
        if (sortBy.value == 'alphabetically') {
            let fa = a.user.last_name.toLowerCase(),
                fb = b.user.last_name.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        } else if (sortBy.value == 'date_of_birth') {
            let fc = a.user.date_of_birth,
                fn = b.user.date_of_birth;

            if (fc < fn) {
                return -1;
            }
            if (fc > fn) {
                return 1;
            }
            return 0;
        } else if (sortBy.value == 'days') {
            return a.days - b.days;
        }
    });

    // tempParticipants = tempParticipants.filter((item) => item.is_trusted === picked.value);
    // tempParticipants = tempParticipants.sort((a, b) => a.is_trusted - b.is_trusted);

    if (!ascending.value) {
        tempParticipants.reverse();
    }

    return tempParticipants;
});
</script>
<style lang="scss">
.participants {
    padding: 60px 0px 60px 0px;
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
