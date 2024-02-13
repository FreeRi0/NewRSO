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
                        <!-- <Select
                            clearable
                            variant="outlined"
                            name="select_district"
                            id="select-district"
                            v-model="selectedSortDistrict"
                            class="filter-district"
                            address="/districts/"
                            placeholder="Окружные штабы"
                        ></Select> -->
                        <v-select
                            class="form__select filter-district"
                            :items="districts"
                            clearable
                            variant="outlined"
                            name="select_district"
                            id="select-district"
                            v-model="SelectedSortDistrict"
                            item-title="name"
                            placeholder="Окружной штаб"
                        >
                            <template #selection="{ item }">
                                <pre>{{ item.title }}</pre>
                            </template>
                        </v-select>
                    </div>
                    <div class="sort-select">
                        <!-- <Select
                            clearable
                            variant="outlined"
                            name="select_region"
                            id="select-region"
                            v-model="selectedSortRegion"
                            class="filter-region"
                            address="/regionals/"
                            placeholder="Региональные штабы"
                        ></Select> -->
                        <v-select
                            class="form__select filter-district"
                            :items="regionals"
                            clearable
                            variant="outlined"
                            name="select_region"
                            id="select-region"
                            v-model="SelectedSortRegional"
                            item-title="name"
                            placeholder="Региональные штабы"
                        >
                            <template #selection="{ item }">
                                <pre>{{ item.title }}</pre>
                            </template>
                        </v-select>
                    </div>
                    <div class="sort-select">
                        <!-- <Select
                            clearable
                            variant="outlined"
                            name="select_local"
                            id="select-local"
                            v-model="selectedSortLocal"
                            class="filter-local"
                            address="/locals/"
                            placeholder="Местные штабы"
                        ></Select> -->
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
                            v-model="sortBy"
                            :options="sortOptionss"
                            class="sort-alphabet"
                        ></sortByEducation>
                    </div>

                    <Button
                        type="button"
                        class="ascend"
                        @click="ascending = !ascending"
                        icon="icon"
                        color="white"
                    ></Button>
                </div>
            </div>

            <div v-show="vertical" class="mt-10">
                <HeadquartersList
                    :headquarters="sortedHeadquarters"
                    v-if="!isLoading.isLoading.value"
                ></HeadquartersList>
                <v-progress-circular
                    class="circleLoader"
                    v-else
                    indeterminate
                    color="blue"
                ></v-progress-circular>
            </div>

            <div class="horizontal" v-show="!vertical">
                <horizontalHeadquarters
                    :headquarters="sortedHeadquarters"
                ></horizontalHeadquarters>
            </div>
            <Button
                @click="headquartersVisible += step"
                v-if="
                    headquartersVisible < headquarters.educationals.value.length
                "
                label="Показать еще"
            ></Button>
            <Button
                @click="headquartersVisible -= step"
                v-else
                label="Свернуть все"
            ></Button>
        </div>
    </div>
</template>
<script setup>
import { bannerCreate } from '@shared/components/imagescomp';
import { Input, Search } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import {
    HeadquartersList,
    horizontalHeadquarters,
} from '@features/Headquarters/components';
import { sortByEducation, Select } from '@shared/components/selects';
import { ref, computed, onMounted } from 'vue';
import { HTTP } from '@app/http';
import { onBeforeRouteLeave } from 'vue-router';
import { useCrosspageFilter } from '@shared';
import { useEducationalsStore } from '@features/store/educationals';
import { storeToRefs } from 'pinia';
import { onActivated } from 'vue';

const educationalsStore = useEducationalsStore();

const crosspageFilters = useCrosspageFilter();

const headquarters = storeToRefs(educationalsStore);

const headquartersVisible = ref(20);
const isLoading =  storeToRefs(educationalsStore);

const step = ref(20);

const ascending = ref(true);
const sortBy = ref('alphabetically');

const vertical = ref(true);

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
const districts = ref([]);
const regionals = ref([]);

/*const filtersDistricts = computed(() =>
    SelectedSortDistrict.value
        ? districts.value.find(
              (district) => district.name === SelectedSortDistrict.value,
          )?.AllHeadquarters ?? []
        : headquarters.educationals.value,
);
const filtersRegionals = computed(() => {
    let idRegional = SelectedSortRegional.value
        ? regionals.value.find(
        (regional) => regional.name === SelectedSortRegional.value,
    )?.id ?? false : false;

     return SelectedSortRegional.value ?
         (idRegional ? headquarters.educationals.value.find((item) => item.regional_headquarter == idRegional) : []) :
        headquarters.educationals.value
});
const filtersLocals = computed(() =>
    SelectedSortLocal.value
        ? locals.value.find((local) => local.name === SelectedSortLocal.value)
              ?.AllHeadquarters ?? []
        : headquarters.educationals.value,
);*/

const getDistrictsHeadquartersForFilters = async () => {
    try {
        const { data } = await HTTP.get('/districts/');
        districts.value = data;
    } catch (e) {
        console.log('error request districts headquarters');
    }
};
const getRegionalsHeadquartersForFilters = async () => {
    try {
        const { data } = await HTTP.get('/regionals/');
        regionals.value = data;
    } catch (e) {
        console.log('error request districts headquarters');
    }
};
const getLocalsHeadquartersForFilters = async () => {
    try {
        const { data } = await HTTP.get('/locals/');
        locals.value = data;
    } catch (e) {
        console.log('error request districts headquarters');
    }
};
onMounted(() => {
    getDistrictsHeadquartersForFilters();
    educationalsStore.getEducationals();
    getRegionalsHeadquartersForFilters();
    getLocalsHeadquartersForFilters();
});


const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    { value: 'founding_date', name: 'Дате создания штаба' },
    { value: 'members_count', name: 'Количеству участников' },
]);

const sortedHeadquarters = computed(() => {
    let tempHeadquartes = [];
    /*const activeFilters = [
        SelectedSortDistrict.value && filtersDistricts.value,
        SelectedSortRegional.value && filtersRegionals && filtersRegionals.value,
        SelectedSortLocal.value && filtersLocals.value,
    ].filter(Boolean);

    if (activeFilters.length > 0) {
        tempHeadquartes = Array.from(new Set(activeFilters.flat()));
    } else if (SelectedSortRegional.value) {
        tempHeadquartes = filtersRegionals.value ? [...filtersRegionals.value] : [];
    } else if (SelectedSortDistrict.value) {
        tempHeadquartes = [...filtersDistricts.value];
    } else if (SelectedSortLocal.value) {
        tempHeadquartes = [...filtersLocals.value];
    } else {
    }*/
    tempHeadquartes = [...headquarters.educationals.value];

    if (SelectedSortRegional.value || SelectedSortDistrict.value || SelectedSortLocal.value) {
        let idRegionals = [];
        if (SelectedSortDistrict.value){
            let districtId = districts.value.find(
                (district) => district.name === SelectedSortDistrict.value,
            )?.id;
            idRegionals = regionals.value.filter((regional) => regional.district_headquarter === districtId).map((reg) => reg.id);
        }
        if (SelectedSortRegional.value){
            idRegionals = [regionals.value.find(
                (regional) => regional.name === SelectedSortRegional.value,
            )?.id];
        }

        tempHeadquartes = tempHeadquartes.filter((item) => {
            return idRegionals.indexOf(item.regional_headquarter) >= 0;
        });
    }

    tempHeadquartes = tempHeadquartes.sort((a, b) => {
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
        } else if (sortBy.value == 'founding_date') {
            let fc = a.founding_date,
                fn = b.founding_date;

            if (fc < fn) {
                return -1;
            }
            if (fc > fn) {
                return 1;
            }
            return 0;
        } else if (sortBy.value == 'members_count') {
            return a.members - b.members;
        }
    });

    if (!ascending.value) {
        tempHeadquartes.reverse();
    }
    
    tempHeadquartes = tempHeadquartes.slice(0, headquartersVisible.value);
    return tempHeadquartes;
});

onBeforeRouteLeave(async (to, from) => {
    const pageName = 'AllHeadquarters';
    const filtersPropertiesToRemove = [
        'districtName',
        'regionalName',
        'localName',
    ];

    crosspageFilters.removeFilters(pageName, filtersPropertiesToRemove);
});
onActivated(() => {
    SelectedSortDistrict.value = JSON.parse(
        localStorage.getItem('AllHeadquarters_filters'),
    )?.districtName;

    SelectedSortRegional.value = JSON.parse(
        localStorage.getItem('AllHeadquarters_filters'),
    )?.regionalName;
    SelectedSortLocal.value = JSON.parse(
        localStorage.getItem('AllHeadquarters_filters'),
    )?.localName;
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
</style>
@shared/components/selects/inputs @shared/components/inputs/imagescomp
