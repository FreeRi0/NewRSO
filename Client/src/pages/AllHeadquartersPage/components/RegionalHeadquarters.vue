<template>
    <div class="container">
        <div class="headquarters">
            <bannerCreate desc="Находим крутых работодателей. Стань частью большой команды, для которой «Труд Крут»!"
                label="Создать штаб" name="CreationOfRS" :button="false" :reg-com="true"></bannerCreate>
            <h2 class="headquarters-title">Региональные штабы</h2>
            <div class="headquarters-search">
                <input type="text" id="search" class="headquarters-search__input" v-model="name" @keyup="searchReg"
                    placeholder="Начните вводить название штаба." />
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18.511 19.0914L24 24.8M21 12.84C21 14.5884 20.5015 16.2975 19.5675 17.7512C18.6335 19.205 17.306 20.338 15.7528 21.0071C14.1997 21.6762 12.4906 21.8512 10.8417 21.5101C9.1929 21.169 7.67835 20.3271 6.4896 19.0908C5.30085 17.8545 4.4913 16.2794 4.16333 14.5646C3.83535 12.8498 4.00368 11.0724 4.64703 9.45708C5.29037 7.84178 6.37984 6.46116 7.77766 5.48981C9.17548 4.51846 10.8189 4 12.5 4C14.7544 4 16.9164 4.93135 18.5104 6.58918C20.1045 8.247 21 10.4955 21 12.84Z"
                        stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div class="headquarters-sort">
                <div class="sort-layout">
                    <div>
                        <Button v-if="vertical" type="button" class="dashboard" icon="icon" color="white"
                            @click="showVertical">
                        </Button>
                        <Button v-else type="button" class="dashboardD" icon="icon" color="white" @click="showVertical">
                        </Button>
                    </div>
                    <div>
                        <Button v-if="!vertical" type="button" class="menuuA" icon="icon" color="white"
                            @click="showVertical"></Button>
                        <Button v-else type="button" class="menuu" icon="icon" color="white"
                            @click="showVertical"></Button>
                    </div>
                </div>

                <div class="sort-filters">
                    <div class="sort-select">
                        <v-select class="form__select filter-district" :items="districtsStore.districts" clearable
                            variant="outlined" name="select_district" id="select-district"
                            v-model="selectedSortDistrict" item-title="name" placeholder="Окружной штаб">
                            <template #selection="{ item }">
                                <pre>{{ item.title }}</pre>
                            </template>
                        </v-select>
                    </div>
                    <div class="sort-select">
                        <sortByEducation variant="outlined" clearable v-model="sortBy" :options="sortOptionss"
                            class="sort-alphabet" :sorts-boolean="false" placeholder="Выберите фильтр">
                        </sortByEducation>
                    </div>

                    <Button type="button" class="ascend" @click="ascending = !ascending" iconn="iconn"
                        color="white"></Button>
                </div>
            </div>

            <div class="mt-10" v-show="vertical">
                <RegionalHQList :regionalHeadquarters="sortedRegionalHeadquarters"></RegionalHQList>
                <v-progress-circular class="circleLoader" v-if="isLoading" indeterminate
                    color="blue"></v-progress-circular>
                <p v-else-if="
                    !isLoading &&
                    !sortedRegionalHeadquarters.length
                ">
                    Ничего не найдено
                </p>
            </div>

            <div class="horizontal" v-show="!vertical">
                <HorizontalRegionalHQs :regionalHeadquarters="sortedRegionalHeadquarters"></HorizontalRegionalHQs>
                <v-progress-circular class="circleLoader" v-if="isLoading" indeterminate
                    color="blue"></v-progress-circular>
                <p v-else-if="
                    !isLoading &&
                    !sortedRegionalHeadquarters.length
                ">
                    Ничего не найдено
                </p>
            </div>
            <template v-if='regionals.count && regionals.count > limit'>
                <Button @click="next" v-if="
                    sortedRegionalHeadquarters.length <
                    regionals.count
                " label="Показать еще"></Button>
                <Button @click="prev" v-else label="Свернуть все"></Button>
            </template>
        </div>
    </div>
</template>
<script setup>
import { bannerCreate } from '@shared/components/imagescomp';
import { Input, Search } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import {
    RegionalHQList,
    HorizontalRegionalHQs,
} from '@features/Headquarters/components';
import { sortByEducation, Select } from '@shared/components/selects';
import { ref, computed, onMounted, onActivated, watch } from 'vue';
import { HTTP } from '@app/http';
import { useRegionalsStore } from '@features/store/regionals';
import { storeToRefs } from 'pinia';
import { onBeforeRouteLeave } from 'vue-router';
import { useDistrictsStore } from '@features/store/districts';
import { useCrosspageFilter } from '@shared';

const regionalsStore = useRegionalsStore();
const crosspageFilters = useCrosspageFilter();
const districtsStore = useDistrictsStore();
const isLoading = ref(false);

const ascending = ref(true);
const sortBy = ref('name');
const limit = 20;

const vertical = ref(true);

const name = ref('');
const regionals = ref({});

const timerSearch = ref(null);


const next = () => {
    getRegionals('next')
};

const prev = () => {
    getRegionals();
};

const showVertical = () => {
    vertical.value = !vertical.value;
};
const selectedSortDistrict = ref(
    JSON.parse(localStorage.getItem('regionalHeadquarters_filters'))
        ?.districtName ?? '',
);

const sortedRegionalHeadquarters = ref([]);


const searchReg = (event) => {
    clearTimeout(timerSearch.value);
    timerSearch.value = setTimeout(() => {
        getRegionals()
    }, 400);
};

// const filtersDistricts = computed(() =>
//     selectedSortDistrict.value
//         ? districts.value.find(
//               (district) => district.name === selectedSortDistrict.value,
//           )?.regional_headquarters ?? []
//         : regionalHeadquarters.regionals.value,
// );

// const getDistrictsHeadquartersForFilters = async () => {
//     try {
//         const { data } = await HTTP.get('/districts/');
//         districts.value = data.results;
//     } catch (e) {
//         console.log('error request districts headquarters');
//     }
// };

// const selectedSort = ref(0);

const sortOptionss = ref([
    {
        value: 'name',
        name: 'Алфавиту от А - Я',
    },
    { value: 'founding_date', name: 'Дате создания штаба' },
]);

const getRegionals = async (pagination, orderLimit) => {
    try {
        isLoading.value = true;
        let data = [];
        let url = '/regionals/?';
        if (orderLimit) data.push('limit=' + orderLimit);
        else if (!pagination) data.push('limit=' + limit);
        else if (pagination == 'next') url = regionals.value.next.replace('http', 'https');
        if (name.value) data.push('search=' + name.value)
        if (selectedSortDistrict.value) data.push('district_headquarter__name=' + selectedSortDistrict.value)
        if (sortBy.value && !pagination) data.push('ordering=' + (ascending.value ? '' : '-') + sortBy.value)
        const viewHeadquartersResponse = await HTTP.get(url + data.join('&'),);
        isLoading.value = false;

        let response = viewHeadquartersResponse.data;
        if (pagination) {
            response.results = [...regionals.value.results, ...response.results];
        }
        regionals.value = response;
        sortedRegionalHeadquarters.value = response.results
    } catch (error) {
        console.log('an error occured ' + error);
    }
};


onBeforeRouteLeave(async (to, from) => {
    const pageName = 'regionalHeadquarters';
    const filtersPropertiesToRemove = ['districtName'];

    // console.log('leave regional');

    crosspageFilters.removeFilters(pageName, filtersPropertiesToRemove);
});

onActivated(() => {
    selectedSortDistrict.value =
        JSON.parse(localStorage.getItem('regionalHeadquarters_filters'))
            ?.districtName ?? null;

    localStorage.removeItem('regionalHeadquarters_filters');
});

watch(
    () => selectedSortDistrict.value,
    () => {
        getRegionals();
    },
);

watch(
    () => sortBy.value,
    () => {
        getRegionals('', sortedRegionalHeadquarters.value.length);
    },
);
watch(
    () => ascending.value,
    () => {
        getRegionals('', sortedRegionalHeadquarters.value.length);
    },
);

onMounted(() => {
    districtsStore.getDistricts();
    getRegionals();
});
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

.v-select__selection {
    span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
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
