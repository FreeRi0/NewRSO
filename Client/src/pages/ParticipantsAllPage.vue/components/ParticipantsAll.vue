<template>
    <div class="container">
        <div class="participants">
            <h2 class="participants-title">Участники ЛСО</h2>
            <div class="participants-tabs">
                <v-btn
                    :class="{ active: checked === category }"
                    v-for="category in categories"
                    :key="category"
                    @click="checked = category"
                    >{{ category }}</v-btn
                >
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
                    <Button icon="switch" color="white" @click="showVertical">
                    </Button>
                    <Button
                        icon="switch"
                        color="white"
                        @click="showVertical"
                    ></Button>
                </div>
                <div class="sort-filters">
                    <div class="sort-select">
                        <sortByEducation
                            v-model="sortBy"
                            :options="sortOptionss"
                        ></sortByEducation>
                    </div>

                    <Button
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
                <horizontalParticipantsList :participants="sortedParticipants"></horizontalParticipantsList>
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
import { ParticipantsList, horizontalParticipantsList } from '@features/Participants/components';
import { sortByEducation } from '@shared/components/selects';
import { ref, computed } from 'vue';
import participants from '@entities/Participants/participants';


const participantsVisible = ref(12);

const step = ref(12);

const ascending = ref(true);
const sortBy = ref('alphabetically');

const picked = ref('');

const categories = ref(['В отряде', 'Ожидают одобрения']);

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
    let tempParticipants = participants;

    tempParticipants = tempParticipants.slice(0, participantsVisible.value);

    tempParticipants = tempParticipants.filter((item) => {
        return item.name
            .toUpperCase()
            .includes(searchParticipants.value.toUpperCase());
    });

    tempParticipants = tempParticipants.sort((a, b) => {
        if (sortBy.value == 'alphabetically') {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        } else if (sortBy.value == 'birthdate') {
            let fc = a.birthdate,
                fn = b.birthdate;

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

    // tempParticipants = tempParticipants.filter((item) => item.inSquad === picked.value);

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
    }
    &-wrapper {
        padding: 60px 0px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-row-gap: 40px;
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
            padding: 10px 24px;
            border: 2px solid black;
            border-radius: 30px;
            text-align: center;
            font-size: 20px;
            background-color: white;
            font-family: 'Bert Sans';
            margin: 20px 20px 0px 0px;
            cursor: pointer;
        }
    }

    .active {
        background-color: blue;
    }

    .horizontallso {
      padding-top: 40px;
    }
}
</style>
