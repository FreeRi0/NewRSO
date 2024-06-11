<template>
    <div class="container">
        <div class="headquarters">
            <bannerCreate
                desc="Находим крутых работодателей. Стань частью большой команды, для которой «Труд Крут»!"
                label="Создать штаб"
                name="createhq"
                :button="false"
                :educ-com="true"
            ></bannerCreate>
            <h2 class="headquarters-title">Штабы СО ОО</h2>
            <div class="headquarters-search">
                <input
                    type="text"
                    id="search"
                    class="headquarters-search__input"
                    v-model="name"
                    @keyup="searchEducational"
                    placeholder="Начните вводить название штаба образовательной организации."
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
            <div class="headquarters-sort">
                <div class="sort-layout">
                    <div>
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
                    </div>
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
                        <v-select
                            class="form__select filter-district"
                            :items="districtsStore.districts"
                            clearable
                            variant="outlined"
                            name="select_district"
                            id="select-district"
                            v-model="SelectedSortDistrict"
                            item-title="name"
                            placeholder="Окружной штаб"
                        >
                            <template #selection="{ item }">
                                        <pre v-if="!districtsStore.isLoading">{{
                                                item.title
                                            }}</pre>
                                <v-progress-circular
                                    class="circleLoader"
                                    v-else
                                    indeterminate
                                    color="blue"
                                ></v-progress-circular>
                            </template>
                        </v-select>
                    </div>
                    <div class="sort-select">
                        <v-select
                            class="form__select filter-district"
                            :items="regionalsStore.regionals"
                            clearable
                            variant="outlined"
                            name="select_region"
                            id="select-region"
                            v-model="SelectedSortRegional"
                            item-title="name"
                            placeholder="Региональные штабы"
                        >
                            <template #selection="{ item }">
                                        <pre v-if="!regionalsStore.isLoading">{{
                                                item.title
                                            }}</pre>
                                <v-progress-circular
                                    class="circleLoader"
                                    v-else
                                    indeterminate
                                    color="blue"
                                ></v-progress-circular>
                            </template>
                        </v-select>
                    </div>
                    <div class="sort-select" v-if='SelectedSortRegional || SelectedSortLocal'>
                        <v-select
                            class="form__select filter-district"
                            :items="locals"
                            clearable
                            variant="outlined"
                            name="select_local"
                            id="select-local"
                            v-model="SelectedSortLocal"
                            item-title="name"
                            placeholder="Местные штабы"
                        >
                            <template #selection="{ item }">
                                <pre>{{ item.title }}</pre>
                            </template>
                        </v-select>
                    </div>
                    <div class="sort-select">
                        <sortByEducation
                            variant="outlined"
                            clearable
                            v-model="sortBy"
                            :options="sortOptionss"
                            class="sort-alphabet"
                            :sorts-boolean="false"
                            placeholder="Выберите фильтр"
                        ></sortByEducation>
                    </div>

                    <Button
                        type="button"
                        class="ascend"
                        @click="ascending = !ascending"
                        iconn="iconn"
                        color="white"
                    ></Button>
                </div>
            </div>

            <div v-show="vertical" class="mt-10">
                <HeadquartersList
                    :headquarters="sortedHeadquarters"
                ></HeadquartersList>

                <v-progress-circular
                    class="circleLoader"
                    v-if="isLoading"
                    indeterminate
                    color="blue"
                ></v-progress-circular>
                <p
                    v-else-if="!isLoading && !sortedHeadquarters.length"
                >
                    Ничего не найдено
                </p>
            </div>

            <div class="horizontal" v-show="!vertical">
                <horizontalHeadquarters
                    :headquarters="sortedHeadquarters"
                ></horizontalHeadquarters>
            </div>
            <template v-if='educationals.count && educationals.count > limit'>
              <Button
                  @click="next"
                  v-if="
                      sortedHeadquarters.length <
                      educationals.count
                  "
                  label="Показать еще"
              ></Button>
              <Button @click="prev" v-else label="Свернуть все"></Button>
            </template>
        </div>
    </div>
</template>
<script setup>
import { bannerCreate } from '@shared/components/imagescomp';
import { Button } from '@shared/components/buttons';
import {
    HeadquartersList,
    horizontalHeadquarters,
} from '@features/Headquarters/components';
import { sortByEducation } from '@shared/components/selects';
import { ref, onMounted, watch } from 'vue';
import { HTTP } from '@app/http';
import { onBeforeRouteLeave } from 'vue-router';
import { useCrosspageFilter } from '@shared';
import { onActivated } from 'vue';
import { useDistrictsStore } from '@features/store/districts';
import { useRegionalsStore } from '@features/store/regionals';

const crosspageFilters = useCrosspageFilter();

const districtsStore = useDistrictsStore();
const regionalsStore = useRegionalsStore();

const next = () => {
    getEducationals('next')
};

const prev = () => {
    getEducationals();
};

const ascending = ref(true);
const sortBy = ref('name');
const timerSearch = ref(null);
const vertical = ref(true);
const isLoading = ref(false);
const educationals = ref({});
const limit = 20;

const name = ref('');

const showVertical = () => {
    vertical.value = !vertical.value;
};
const SelectedSortDistrict = ref(
    JSON.parse(localStorage.getItem('AllHeadquarters_filters'))?.districtName,
);
const SelectedSortRegional = ref(
    JSON.parse(localStorage.getItem('AllHeadquarters_filters'))?.regionalName,
);
const SelectedSortLocal = ref(
    JSON.parse(localStorage.getItem('AllHeadquarters_filters'))?.localName,
);

const locals = ref([]);
const sortedHeadquarters = ref([]);

const getLocalsHeadquartersForFilters = async () => {
    if (!SelectedSortRegional.value){
        locals.value = [];
        return false;
    }
    try {
        const { data } = await HTTP.get('/locals/??ordering=' +
                sortBy.value + 'regional_headquarter__name=' + SelectedSortRegional.value);
        locals.value = data.results;
    } catch (e) {
        console.log('error request locals headquarters');
    }
};
const getEducationals = async (pagination, orderLimit) => {
    try {
        isLoading.value = true;
        let data = [];
        let url = '/educationals/?';
        if (orderLimit) data.push('limit='+orderLimit);
        else if (!pagination) data.push('limit='+limit);
        else if (pagination == 'next') url = educationals.value.next.replace('http','https');
        if (name.value) data.push('search='+name.value)
        if (SelectedSortDistrict.value) data.push('district_headquarter__name='+SelectedSortDistrict.value)
        if (SelectedSortRegional.value) data.push('regional_headquarter__name='+SelectedSortRegional.value)
        if (SelectedSortLocal.value) data.push('local_headquarter__name='+SelectedSortLocal.value)
        if (sortBy.value && !pagination) data.push('ordering='+(ascending.value?'':'-')+sortBy.value)
        const viewHeadquartersResponse = await HTTP.get(url + data.join('&'),);
        isLoading.value = false;

        let response = viewHeadquartersResponse.data;
        if (pagination){
            response.results = [...educationals.value.results, ...response.results];
        }
        educationals.value = response;
        sortedHeadquarters.value = response.results
    } catch (error) {
      console.log('an error occured ' + error);
    }
};

const searchEducational = () => {
    clearTimeout(timerSearch.value);
    timerSearch.value = setTimeout(() => {
        getEducationals();
    }, 400);
};

onMounted(() => {
    regionalsStore.getRegionalsForFilters(sortBy.value);
    districtsStore.getDistricts();
    getEducationals();
});

const sortOptionss = ref([
    {
        value: 'name',
        name: 'Алфавиту от А - Я',
    },
    { value: 'founding_date', name: 'Дате создания штаба' },
]);

onBeforeRouteLeave(async () => {
    const pageName = 'AllHeadquarters';
    const filtersPropertiesToRemove = [
        'districtName',
        'regionalName',
        'localName',
    ];

    crosspageFilters.removeFilters(pageName, filtersPropertiesToRemove);
});
onActivated(() => {
    localStorage.removeItem('AllHeadquarters_filters');
});
watch(
    () => SelectedSortDistrict.value,
    () => {
        getEducationals();
    },
);
watch(
    () => SelectedSortRegional.value,
    () => {
        getLocalsHeadquartersForFilters();
      getEducationals();
    },
);
watch(
    () => SelectedSortLocal.value,
    () => {
        getEducationals();
    },
);
watch(
    () => sortBy.value,
    () => {
     getEducationals('', sortedHeadquarters.value.length);
    },
);
watch(
    () => ascending.value,
    () => {
        getEducationals('', sortedHeadquarters.value.length);
    },
);
</script>

<style lang="scss">
.headquarters {
    padding-bottom: 60px;
    &-title {
        margin-bottom: 40px;
        font-size: 52px;
        @media screen and (max-width: 575px) {
            font-size: 40px;
        }
    }
    &-sort {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        @media screen and (max-width: 768px) {
            flex-direction: column-reverse;
            align-items: flex-start;
        }
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

    &-wrapper {
        padding: 60px 0px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-row-gap: 40px;
        /* box-shadow: 1em 2em 2.5em rgba(1, 2, 68, 0.08); */
        @media screen and (max-width: 1024px) {
            grid-template-columns: 1fr 1fr 1fr;
        }
        @media screen and (max-width: 575px) {
            grid-template-columns: 1fr 1fr;
        }
    }
}

pre {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.circleLoader {
    width: 60px;
    height: 60px;
    display: block;
    margin: 30px auto;
}
.headquarters-wrapper__item {
    margin: 0px auto;
    width: 180px;
    &-category {
        margin-top: 10px;
        margin-bottom: 5px;
        text-align: center;
        text-transform: uppercase;
        font-size: 20px;
        font-family: 'Akrobat';
        color: #1e1e1e;
        &-full {
            text-align: center;
            font-size: 20px;
            font-family: 'Akrobat';
            margin-left: 20px;
            margin-right: 5px;
            color: #1e1e1e;
        }
    }
    &-title {
        text-align: center;
        font-size: 20px;
        font-family: 'Akrobat';
        color: #1e1e1e;
    }
}

.v-select__selection {
    span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

.horizontal {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
}
.form__select {
    margin-bottom: 0px;
    margin-right: 8px;
    border: 1px solid #35383f;
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

.sort-filters {
    @media screen and (max-width: 768px) {
        margin-top: 40px;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 60px;
    }
}

.filter {
    &-local {
        width: 186px;
    }
    &-region {
        width: 227px;
    }

    &-district {
        width: 193px;
    }
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

.option-select .v-field__input input::placeholder,
.form__select .v-field__input input::placeholder {
    color: #35383f;
    opacity: revert;
}

.v-field--variant-outlined .v-field__outline__end,
.v-field--variant-outlined .v-field__outline__start {
    border: none;
}
</style>
@shared/components/selects/inputs @shared/components/inputs/imagescomp
