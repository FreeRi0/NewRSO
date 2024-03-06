<template>
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
                <VerifiedList v-else :verified="sortedVerified"></VerifiedList>
            </div>

            <div class="horizontallso" v-show="!vertical">
                <horizontalParticipantsList
                    v-if="picked"
                    :participants="sortedParticipants"
                ></horizontalParticipantsList>
                <VerifiedHorizontal
                    v-else
                    :verified="sortedVerified"
                ></VerifiedHorizontal>
            </div>
            <Button
                @click="participantsVisible += step"
                v-if="participantsVisible < squadsStore.members.length"
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
    VerifiedList,
    VerifiedHorizontal,
} from '@features/Participants/components';
import { sortByEducation } from '@shared/components/selects';
import { useSquadsStore } from '@features/store/squads';
import { ref, computed, onMounted, watch } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';

const participantsVisible = ref(12);

const squadsStore = useSquadsStore();
const step = ref(12);
const picked = ref(true);
const route = useRoute();
const verified = ref([]);
const id = route.params.id;

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
    let tempParticipants = squadsStore.members;

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

    if (!ascending.value) {
        tempParticipants.reverse();
    }
    tempParticipants = tempParticipants.slice(0, participantsVisible.value);
    return tempParticipants;
});

const sortedVerified = computed(() => {
    let tempVerified = verified.value;

    tempVerified = tempVerified.filter((item) => {
        return item.user.last_name
            .toUpperCase()
            .includes(searchParticipants.value.toUpperCase());
    });

    tempVerified = tempVerified.sort((a, b) => {
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

    if (!ascending.value) {
        tempVerified.reverse();
    }

    tempVerified = tempVerified.slice(0, participantsVisible.value);
    return tempVerified;
});

watch(
    () => route.params.id,

    async (newId, oldId) => {
        if (!newId || route.name !== 'allparticipants') return;
        await squadsStore.getSquadMembers(newId);
        await aboutVerified();
    },
);
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
