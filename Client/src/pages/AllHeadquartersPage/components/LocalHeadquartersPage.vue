<template>
    <div class="container">
        <div class="headquarters">
            <bannerCreate
                desc="Находим крутых работодателей. Стань частью большой команды, для которой «Труд Крут»!"
                :button="false"
                :loc-com="true"
                label="Создать штаб"
            ></bannerCreate>
            <h2 class="headquarters-title">Местные штабы</h2>
            <div class="headquarters-search">
                <input
                    type="text"
                    id="search"
                    class="headquarters-search__input"
                    v-model="name"
                    placeholder="Начните вводить название штаба."
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
                    <div>
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
                </div>

                <div class="sort-filters">
                    <div class="sort-select">
                        <!-- <Select
                            variant="outlined"
                            clearable
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
                            v-model="selectedSortdistrict"
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
                            variant="outlined"
                            clearable
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
                            v-model="selectedSortRegional"
                            item-title="name"
                            placeholder="Региональные штабы"
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
                <LocalHQList
                    :localHeadquarters="sortedLocalHeadquarters"
                    v-if="!isLocalLoading"
                ></LocalHQList>
                <v-progress-circular
                    class="circleLoader"
                    v-else
                    indeterminate
                    color="blue"
                ></v-progress-circular>
            </div>
            <div class="horizontal" v-show="!vertical">
                <HorizontalLocalHQs
                    :localHeadquarters="sortedLocalHeadquarters"
                    v-if="!isLocalLoading"
                ></HorizontalLocalHQs>
                <v-progress-circular
                    class="circleLoader"
                    v-else
                    indeterminate
                    color="blue"
                ></v-progress-circular>
            </div>
            <Button
                @click="headquartersVisible += step"
                v-if="headquartersVisible < localHeadquarters.length"
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
    LocalHQList,
    HorizontalLocalHQs,
} from '@features/Headquarters/components';
import { sortByEducation, Select } from '@shared/components/selects';
import { ref, computed, onMounted } from 'vue';
import { HTTP } from '@app/http';
import { onBeforeRouteLeave } from 'vue-router';
import { useCrosspageFilter } from '@shared';
import { onActivated } from 'vue';

const crosspageFilters = useCrosspageFilter();

const localHeadquarters = ref([]);

const headquartersVisible = ref(20);
const isLocalLoading = ref(false);

const step = ref(20);

const ascending = ref(true);
const sortBy = ref('alphabetically');

const vertical = ref(true);

const name = ref('');

const showVertical = () => {
    vertical.value = !vertical.value;
};
const selectedSortdistrict = ref(
    JSON.parse(localStorage.getItem('LocalHeadquarters_filters'))?.districtName,
);
const selectedSortRegional = ref(
    JSON.parse(localStorage.getItem('LocalHeadquarters_filters'))?.regionalName,
);

const districts = ref([]);
const regionals = ref([]);

const getLocalHeadquarters = async () => {
    try {
        isLocalLoading.value = true;
        setTimeout(async () => {
            const localsResponse = await HTTP.get(`/locals/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            localHeadquarters.value = localsResponse.data;
            isLocalLoading.value = false;
        }, 1000);
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const searchLocal = async (name) => {
    try {
        const filteredLocals = await HTTP.get(`/locals/?search=${name}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        localHeadquarters.value = filteredLocals.data;
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const searchLocals = computed(() => {
    return searchLocal(name.value);
});

const filtersDistricts = computed(() =>
    selectedSortDistrict.value
        ? districts.value.find(
              (district) => district.name === selectedSortDistrict.value,
          )?.local_headquarters ?? []
        : localHeadquarters.value,
);
const filtersRegionals = computed(() =>
    selectedSortRegional.value
        ? regionals.value.find(
              (regional) => regional.name === selectedSortRegional.value,
          )?.local_headquarters ?? []
        : localHeadquarters.value,
);

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
onMounted(() => {
    getDistrictsHeadquartersForFilters();
    getLocalHeadquarters();
    getRegionalsHeadquartersForFilters();
});

const selectedSort = ref(0);
const selectedSortRegion = ref(null);
const selectedSortDistrict = ref(null);

const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    { value: 'founding_date', name: 'Дате создания штаба' },
    { value: 'members_count', name: 'Количеству участников' },
]);

const sortedLocalHeadquarters = computed(() => {
    let tempHeadquartes = [];
    if (selectedSortDistrict.value && selectedSortRegional.value) {
        tempHeadquartes = Array.from(
            new Set([...filtersDistricts.value, ...filtersRegionals.value]),
        );
    } else if (selectedSortDistrict.value) {
        tempHeadquartes = [...filtersDistricts.value];
    } else if (selectedSortRegional.value) {
        tempHeadquartes = [...filtersRegionals.value];
    } else {
        tempHeadquartes = [...localHeadquarters.value];
    }

    tempHeadquartes = tempHeadquartes.slice(0, headquartersVisible.value);
    tempHeadquartes = tempHeadquartes.filter((item) => {
        return (
            selectedSortRegion.value == null ||
            item.regional_headquarter == selectedSortRegion.value
        );
    });

    searchLocals.value;

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

    return tempHeadquartes;
});

onBeforeRouteLeave(async (to, from) => {
    const pageName = 'LocalHeadquarters';
    const filtersPropertiesToRemove = ['districtName', 'regionalName'];

    crosspageFilters.removeFilters(pageName, filtersPropertiesToRemove);
});

onActivated(() => {
    selectedSortdistrict.value = JSON.parse(
        localStorage.getItem('LocalHeadquarters_filters'),
    )?.districtName;

    selectedSortRegional.value = JSON.parse(
        localStorage.getItem('LocalHeadquarters_filters'),
    )?.regionalName;
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

.v-select__selection {
    span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

// .v-label {
//     margin-top: 20px;
// }
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
</style>
