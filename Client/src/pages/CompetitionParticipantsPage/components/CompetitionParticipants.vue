<template>
    <div class="container">
        <div class="squads">
            <h2 class="squads-title">Участники конкурса</h2>
            <div class="squads-tabs">
                <v-btn class="squads-tabs__item" :class="{ active: picked === '' }" @click="picked = ''">Все
                </v-btn>
                <v-btn class="squads-tabs__item" :class="{ active: picked === area.name }"
                    v-for="area in squadsStore.areas" :key="area" @click="picked = area.name">{{ area.name }}
                </v-btn>
            </div>
            <div class="squads-search">
                <input type="text" id="search" class="squads-search__input" @keyup="searchCompetitions" v-model="name"
                    placeholder="Поищем отряд?" />
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18.511 19.0914L24 24.8M21 12.84C21 14.5884 20.5015 16.2975 19.5675 17.7512C18.6335 19.205 17.306 20.338 15.7528 21.0071C14.1997 21.6762 12.4906 21.8512 10.8417 21.5101C9.1929 21.169 7.67835 20.3271 6.4896 19.0908C5.30085 17.8545 4.4913 16.2794 4.16333 14.5646C3.83535 12.8498 4.00368 11.0724 4.64703 9.45708C5.29037 7.84178 6.37984 6.46116 7.77766 5.48981C9.17548 4.51846 10.8189 4 12.5 4C14.7544 4 16.9164 4.93135 18.5104 6.58918C20.1045 8.247 21 10.4955 21 12.84Z"
                        stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>

            <div class="squads-sort">
                <div class="sort-filters">
                    <!-- <div class="sort-select">
                        <educInstitutionDropdown
                            class="form__select filter-district sortedEducation"
                            name="select_education"
                            id="select-education"
                            v-model="education"
                            placeholder="Образовательная организация"
                            :SortDropdown="true"
                        ></educInstitutionDropdown>
                    </div> -->
                    <div class="sort-select">
                        <sortByEducation variant="outlined" clearable v-model="sortBy" :options="sortOptionss"
                            :sorts-boolean="false" class="sort-alphabet" placeholder="Выберите фильтр">
                        </sortByEducation>
                    </div>

                    <Button type="button" class="ascend" icon="switch" @click="ascending = !ascending"
                        color="white"></Button>
                </div>
            </div>
            <div class="d-flex mt-5">
                <button type="button" class="contributorBtn" :class="{ active: switched == true }"
                    @click="switched = true">
                    Тандем
                </button>

                <button type="button" class="contributorBtn ml-2" :class="{ active: switched == false }"
                    @click="switched = false">
                    Дебют
                </button>
            </div>
            <div class="horizontal">
                <horizontalCompetitionList :members="sortedSquads"></horizontalCompetitionList>
                <v-progress-circular class="circleLoader" v-if="isLoading" indeterminate
                    color="blue"></v-progress-circular>
                <p v-else-if="!isLoading && !sortedSquads.length">
                    Ничего не найдено
                </p>
            </div>
            <template v-if="detachments.count && detachments.count > limit">
                <Button @click="next" v-if="sortedSquads.length < detachments.count" label="Показать еще"></Button>
                <Button @click="prev" v-else label="Свернуть все"></Button>
            </template>
        </div>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import {
    competitionList,
    horizontalCompetitionList,
} from '@features/Squads/components';
import {
    sortByEducation,
    educInstitutionDropdown,
} from '@shared/components/selects';
import { ref, computed, onMounted, watch } from 'vue';
import { useSquadsStore } from '@features/store/squads';
import { storeToRefs } from 'pinia';
import { HTTP } from '@app/http';

const squadsStore = useSquadsStore();
// const categories = storeToRefs(squadsStore);
const name = ref('');
const isLoading = ref(false);
const detachments = ref({});
const isTandem = ref(true);
const limit = 24;
const sortBy = ref('detachment__copy_ranking_main_detachment__place');
// if (isTandem.value) {
//     sortBy.value = 'detachment__overalltandemranking_main_detachment__place';
// } else {
//     sortBy.value = 'junior_detachment__overallranking__place';
// }

const education = ref(null);
const next = () => {
    getCompetitons('next');
};
const prev = () => {
    if (switched.value) {
        getCompetitons();
    } else {
        getCompetitons();
    }
};
const ascending = ref(true);
const picked = ref('');
const switched = ref(true);
const timerSearch = ref(null);
const selectedSort = ref(null);
const sortedSquads = ref([]);
const sortOptionss = ref([]);
sortOptionss.value = [
    {
        value: 'detachment__name',
        name: 'Алфавиту от А - Я',
    },
    { value: 'created_at', name: 'Дате создания отряда' },
    {
        value: 'detachment__copy_ranking_main_detachment__place',
        name: 'Рейтингу',
    },
];

const getCompetitons = async (pagination, orderLimit) => {
    if (isLoading.value) return false;
    try {
        isLoading.value = true;
        let data = [];
        let url = '/competitions/1/participants/?';
        if (orderLimit) data.push('limit=' + orderLimit);
        else if (!pagination) data.push('limit=' + limit);
        else if (pagination == 'next')
            url = detachments.value.next.replace('http', 'https');
        if (name.value) data.push('search=' + name.value);

        if (picked.value) data.push('area=' + picked.value);

        if (sortBy.value && !pagination) {
            if (isTandem.value) data.push('is_tandem=' + isTandem.value);
            else data.push('is_tandem=' + isTandem.value);
            let sort = sortBy.value;
            if (
                sort ==
                'detachment__copy_ranking_main_detachment__place' &&
                !isTandem.value
            ) {
                sort = 'junior_detachment__copy_ranking_detachment__place';
            }
            data.push('ordering=' + (ascending.value ? '' : '-') + sort);
        }
        const viewHeadquartersResponse = await HTTP.get(url + data.join('&'),);
        isLoading.value = false;

        let response = viewHeadquartersResponse.data;
        if (pagination) {
            response.results = [
                ...detachments.value.results,
                ...response.results,
            ];
        }
        detachments.value = response;
        sortedSquads.value = response.results;
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const searchCompetitions = (event) => {
    clearTimeout(timerSearch.value);
    timerSearch.value = setTimeout(() => {
        getCompetitons();
    }, 400);
};

watch(
    () => switched.value,
    () => {
        if (switched.value) {
            isTandem.value = true;
            getCompetitons();
        } else {
            isTandem.value = false;
            getCompetitons();
        }
    },
);
watch(
    () => picked.value,
    () => {
        getCompetitons();
    },
);
watch(
    () => sortBy.value,
    () => {
        getCompetitons('', sortedSquads.value.length);
    },
);
watch(
    () => ascending.value,
    () => {
        getCompetitons('', sortedSquads.value.length);
    },
);

onMounted(() => {
    getCompetitons();
});
</script>
<style lang="scss" scoped>
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

.v-select__selection {
    span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

.squads {
    padding: 0px 0px 60px 0px;

    &-title {
        font-size: 52px;

        @media screen and (max-width: 575px) {
            font-size: 32px;
        }
    }

    &-wrapper {
        padding: 60px 0px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-row-gap: 40px;

        @media screen and (max-width: 1024px) {
            grid-template-columns: 1fr 1fr 1fr;
        }

        @media screen and (max-width: 575px) {
            grid-template-columns: 1fr 1fr;
        }
    }

    &-sort {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        @media screen and (min-width: 320px) and (max-width:480px) {
            display: block;
            justify-content: start;
            align-items: start;
        }
    }

    &-tabs {
        margin-top: 20px;
        margin-bottom: 40px;
        display: flex;
        flex-wrap: wrap;

        &__item {
            padding: 4px 24px;
            border: 1px solid black;
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
}

.horizontal {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
    margin-top: 40px;
}

.contributorBtn {
    border-radius: 30px;
    background-color: white;
    color: #1c5c94;
    border: 1px solid #1c5c94;
    margin: 0px;
    padding: 10px 24px;
}

.active {
    background-color: #1c5c94;
    color: white;
    border: 1px solid #1c5c94;
}

.squads-search {
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

.education {
    width: 305px;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
}

.form__select {
    margin-bottom: 0px;
    margin-left: 8px;
    border: 1px solid #35383f;
}

@media (max-width: 575px) {
    .squads-sort {
        flex-direction: column-reverse;
    }

    .sort-filters {
        flex-wrap: wrap;
        margin-bottom: 40px;
        align-items: end;
    }

    .sort-select {
        margin-top: 12px;
    }
}
@media screen and (min-width: 320px) and (max-width:480px) {
    .squads-sort {
        flex-direction:column-reverse;
        align-items: start;        
    }

    .sort-filters {
        flex-wrap: wrap;
        margin-bottom: 40px;
        align-items: end;
    }

    .sort-select {
        margin-top: 12px;
        right: 8px;
        width: 83%;
    }
}
</style>
