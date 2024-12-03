<template>
    <div class="container">
        <div class="squads">
            <h2 class="members__title">Победители конкурса</h2>
            <div class="d-flex mt-5">
                <button class="contributorBtn" :class="{ active: toggle === tab.name }" v-for="tab in tabs" :key="tab.id"
                    @click="toggle = tab.name">
                    {{ tab.name }}
                </button>
            </div>
            <ul class="members__list header-table">
                <li class="members__item members__item--title">Название отряда</li>
                <li class="members__item">Регион</li>
                <li class="members__item">Место</li>
            </ul>
            <div>
                <div class="horizontals" v-if="toggle === 'Тандем'">
                    <ul class="members__list" v-for="winner in winnersTandem" :key="winner.id">
                        <li class="members__item" v-if="winner.detachment">
                            {{ winner.detachment }}
                        </li>
                        <li class="members__item">
                            {{ winner.junior_detachment }}
                        </li>
                        <li class="members__item">
                            {{ winner.region }}
                        </li>
                        <li class="members__item">
                            {{ winner.place }}
                        </li>
                    </ul>
                </div>
                <div class="horizontals" v-if="toggle === 'Дебют'">
                    <ul class="members__list" v-for="winner in winnersDebut" :key="winner.id">
                        <li :class="['members__item', toggle === 'Дебют' ? 'members__item--title' : '']">
                            {{ winner.junior_detachment }}
                        </li>
                        <li class="members__item">
                            {{ winner.region }}
                        </li>
                        <li class="members__item">
                            {{ winner.place }}
                        </li>
                    </ul>
                </div>                
                <v-progress-circular class="circleLoader" v-if="isLoading" indeterminate
                    color="blue"></v-progress-circular>
                <p v-else-if="!isLoading && !sortedSquads.length">
                    Ничего не найдено
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
// import { Button } from '@shared/components/buttons';
import {
    // competitionList,
    horizontalCompetitionList,
} from '@features/Squads/components';
// import {
//     sortByEducation,
//     educInstitutionDropdown,
// } from '@shared/components/selects';
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

const toggle = ref('Тандем');
const tabs = ref([
  {
    id: '1',
    name: 'Тандем',
  },
  {
    id: '2',
    name: 'Дебют',
  },
//   {
//     id: '3',
//     name: 'Общий рейтинг',
//   },
]);

const winnersTandem = ref([
    {
        id: 1,
        detachment: 'Сервисный отряд «Нова»',
        junior_detachment: 'Сервисный отряд «Астер»',
        region: 'Республика Крым',
        place: 'Гран-при',
    },
    {
        id: 2,
        detachment: 'Медицинский отряд «Потенциал»',
        junior_detachment: 'Медицинский отряд «Санитас»',
        region: 'Ростовская область',
        place: '1',
    },
    {
        id: 3,
        detachment: 'Медицинский отряд «Лёд»',
        junior_detachment: 'Медицинский отряд «Луч»',
        region: 'Новгородская область',
        place: '2',
    },
    {
        id: 4,
        detachment: 'Медицинский отряд «Адаптация»',
        junior_detachment: 'Медицинский отряд «Астерион»',
        region: 'Ростовская область',
        place: '3',
    },
    {
        id: 5,
        detachment: 'Отряд проводников «Адреналин»',
        junior_detachment: 'Отряд проводников «Арбат»',
        region: 'Удмуртская Республика',
        place: '1',
    },
    {
        id: 6,
        detachment: 'Отряд проводников «Ночная Смена»',
        junior_detachment: 'Отряд проводников «Смена»',
        region: 'Омская область',
        place: '2',
    },
    {
        id: 7,
        detachment: 'Педагогический отряд «Легенда»',
        junior_detachment: 'Педагогический отряд «Смысл»',
        region: 'Омская область',
        place: '1',
    },
    {
        id: 8,
        detachment: 'Педагогический отряд «Щербет»',
        junior_detachment: 'Педагогический отряд «Висмут»',
        region: 'Забайкальский край',
        place: '2',
    },
    {
        id: 9,
        detachment: 'Педагогический отряд «Парус»',
        junior_detachment: 'Сельскохозяйственный отряд «Зелёнка»',
        region: 'Удмуртская Республика',
        place: '3',
    },
    {
        id: 10,
        detachment: 'Сервисный отряд «СмоKING»',
        junior_detachment: 'Сервисный отряд «BARракуда»',
        region: 'Ростовская область',
        place: '1',
    },
    {
        id: 11,
        detachment: 'Сервисный отряд «Лисы»',
        junior_detachment: 'Сервисный отряд «Розмарин»',
        region: 'Кемеровская область',
        place: '2',
    },
    {
        id: 12,
        detachment: 'Сельскохозяйственный отряд «Викинг»',
        junior_detachment: 'Сельскохозяйственный отряд «Серафим»',
        region: 'Краснодарский край',
        place: '1',
    },
]);

const winnersDebut = ref([
    {
        id: 1,
        junior_detachment: 'Сервисный отряд «Ультра»',
        region: 'Архангельская область',
        place: 'Гран-при',
    },
    {
        id: 2,
        junior_detachment: 'Медицинский отряд «Lux Vitae»',
        region: 'Республика Крым',
        place: '1',
    },
    {
        id: 3,
        junior_detachment: 'Медицинский отряд «Сердце Сибири»',
        region: 'Омская область',
        place: '2',
    },
    {
        id: 4,
        junior_detachment: 'Отряд проводников «Ярославль-Главный»',
        region: 'Ярославская область',
        place: '1',
    },
    {
        id: 5,
        junior_detachment: 'Отряд проводников «Триада»',
        region: 'Омская область',
        place: '2',
    },
    {
        id: 6,
        junior_detachment: 'Отряд проводников «Афина»',
        region: 'Томская область',
        place: '3',
    },
    {
        id: 7,
        junior_detachment: 'Педагогический отряд «Игнис»',
        region: 'Омская область',
        place: '1',
    },
    {
        id: 8,
        junior_detachment: 'Педагогический отряд «Рябина»',
        region: 'Новосибирская область',
        place: '2',
    },
    {
        id: 9,
        junior_detachment: 'Педагогический отряд «Нить»',
        region: 'Нижегородская область',
        place: '3',
    },
    {
        id: 10,
        junior_detachment: 'Строительный отряд «Высота»',
        region: 'Новосибирская область',
        place: '1',
    },
    {
        id: 11,
        junior_detachment: 'Строительный отряд «Поток»',
        region: 'Ростовская область',
        place: '2',
    },
    {
        id: 12,
        junior_detachment: 'Сервисный отряд «Маяк»',
        region: 'Ростовская область',
        place: '1',
    },
    {
        id: 13,
        junior_detachment: 'Сервисный отряд «Романовский Сервис»',
        region: 'Республика Крым',
        place: '2',
    },
    {
        id: 14,
        junior_detachment: 'Информационный отряд «Объектив»',
        region: 'Ростовская область',
        place: '1',
    },
    {
        id: 15,
        junior_detachment: 'Путинный отряд «Ватага»',
        region: 'Воронежская область',
        place: '1',
    },
    {
        id: 16,
        junior_detachment: 'Путинный отряд «Водяной»',
        region: 'Удмуртская Республика',
        place: '2',
    },
    {
        id: 17,
        junior_detachment: 'Сельскохозяйственный отряд «Восток»',
        region: 'Республика Мордовия',
        place: '3',
    },
])

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
.d-flex {
    gap: 8px;
}

.header-table {
    font-weight: 600;
    margin: 20px 0 16px;

    li {
        border: 1px solid #1c5c94;
    }
}
.members {
    &__title {
        font-family: "Akrobat", sans-serif;
        font-size: 52px;
        line-height: 62px;
        font-weight: 700;
    }

    &__list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 176px;
        gap: 12px;
        font-family: "Akrobat", sans-serif;
        font-size: 16px;
        line-height: 21px;
        color: #35383F;
    }

    &__item {
        padding: 12px;
        border: 1px solid #b6b6b6;
        border-radius: 10px;

        &--title {
            grid-column: 1 / 3;
        }
    }
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

.horizontals {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 12px;
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


.horizontalSquad {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 12px;
    // flex-wrap: wrap;
    // align-items: flex-start;
    &-img {
        align-items: center;
        width: 36px;
        height: 36px;
        justify-content: start;
        img {
            display: flex;
            width: 36px;
            height: 36px;
            border-radius: 100%;
            position: relative;
            align-items: center;
        }
    }
    &-info {
        border: 1px solid #b6b6b6;
        border-radius: 10px;
        padding: 11px 20px;
        height: 46px;
        text-align: center;

        width: 185px;
        p {
            display: block;
            font-size: 16px;
            font-weight: 400;
            color: #35383f;
        }
    }
}
.horizontalSquad-item__wrapper {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
    align-items: center;

    padding: 4px 20px;

    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
    margin-bottom: 12px;
    width: 100%;
}
.horizontallso-img {
    img {
        width: 36px;
        height: 36px;
        border-radius: 100%;
    }
}
.horizontalSquad-item img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: cover;
}

.horizontalSquad-item p {
    margin-left: 10px;
}

.horizontallso-item__list-date {
    display: grid;
    grid-template-columns: auto 1fr 0fr;
}

.horizontalSquad-item__list-img {
    margin-right: 13px;
}

.horizontallso-item__list-full {
    color: #35383f;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin-right: 10px;
}

.horizontallso-item__list-date p {
    color: #1c5c94;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
}

.horizontalSquad__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    height: 48px;
    width: 48px;
    input {
        width: 24px;
        height: 24px;
    }
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
}

.error {
    color: #db0000;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Acrobat';
    margin-top: 10px;
    text-align: center;
}

.save {
    // background-color: white;
    // color: #35383f;
    // border: 1px solid black;
    width: 168px;
    height: 48px;
    padding: 12px 32px;
    margin: 0px;
    span {
        font-size: 16px;
    }
}

.v-field {
    border-radius: 10px;
}
.sort-select {
    height: 46px;
    width: 185px;
}

.form__select {
    margin-bottom: 0px;
    border: none;
}
</style>
