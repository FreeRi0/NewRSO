<template>
    <div class="container">
        <div class="headquarters">
            <bannerCreate></bannerCreate>
            <h2 class="headquarters-title">Штабы СО ОО</h2>
            <div class="headquarters-search">
                <input
                    type="text"
                    id="search"
                    class="headquarters-search__input"
                    v-model="searchHeadquartes"
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
                    <Button icon="icon" color="white" @click="showVertical">
                    </Button>
                    <Button
                        icon="icon"
                        color="white"
                        @click="showVertical"
                    ></Button>
                </div>

                <div class="sort-filters">
                    <div class="sort-select">
                        <sortByEducation
                            v-model="selectedSortDistrict"
                            :options="district"
                            class="filter-district"
                        ></sortByEducation>
                    </div>
                    <div class="sort-select">
                        <sortByEducation
                            v-model="selectedSortRegion"
                            :options="region"
                            class="filter-region"
                        ></sortByEducation>
                    </div>
                    <div class="sort-select">
                        <sortByEducation
                            v-model="selectedSortLocal"
                            :options="local"
                            class="filter-local"
                        ></sortByEducation>
                    </div>
                    <div class="sort-select">
                        <sortByEducation
                            v-model="sortBy"
                            :options="sortOptionss"
                            class="sort-alphabet"
                        ></sortByEducation>
                    </div>

                    <Button
                        @click="ascending = !ascending"
                        icon="icon"
                        color="white"
                    ></Button>
                </div>
            </div>

            <div class="headquarters-wrapper" v-show="vertical">
                <HeadquartersList
                    :headquarters="sortedHeadquarters"
                ></HeadquartersList>
            </div>

            <div class="horizontal" v-show="!vertical">
                <horizontalHeadquarters
                    :headquarters="sortedHeadquarters"
                ></horizontalHeadquarters>
            </div>
            <Button
                @click="headquartersVisible += step"
                v-if="headquartersVisible < headquarters.length"
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
import { sortByEducation } from '@shared/components/selects';
import { ref, computed } from 'vue';
// import headquarters from '@entities/HeadquartersData/headquarters';

const headquarters = ref([]);

const headquartersVisible = ref(12);

const step = ref(10);

const ascending = ref(true);
const sortBy = ref('alphabetically');

const vertical = ref(true);

const searchHeadquartes = ref('');

const showVertical = () => {
    vertical.value = !vertical.value;
};

const local = ref([
    {
        value: 'Дальневосточный федеральный округ',
        name: 'Дальневосточный федеральный округ',
    },
    {
        value: 'Приволжский федеральный округ',
        name: 'Приволжский федеральный округ',
    },
    {
        value: 'Северо-Западный федеральный округ',
        name: 'Северо-Западный федеральный округ',
    },
    {
        value: 'Северо-Кавказский федеральный округ',
        name: 'Северо-Кавказский федеральный округ',
    },
    {
        value: 'Сибирский федеральный округ',
        name: 'Сибирский федеральный округ',
    },
    {
        value: 'Уральский федеральный округ',
        name: 'Уральский федеральный округ',
    },
    {
        value: 'Центральный федеральный округ',
        name: 'Центральный федеральный округ',
    },
    { value: 'Южный федеральный округ', name: 'Южный федеральный округ' },
]);

const selectedSort = ref(0);

const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    { value: 'createdAt', name: 'Дате создания отряда' },
    { value: 'peoples', name: 'Количеству участников' },
]);

const sortedHeadquarters = computed(() => {
    let tempHeadquartes = headquarters.value;

    tempHeadquartes = tempHeadquartes.slice(0, headquartersVisible.value);

    // tempSquads = tempSquads.filter((item) => {
    //     return selectedSort.value == 0 || item.education == selectedSort.value;
    // });

    tempHeadquartes = tempHeadquartes.filter((item) => {
        return item.desc
            .toUpperCase()
            .includes(searchHeadquartes.value.toUpperCase());
    });

    tempHeadquartes = tempHeadquartes.sort((a, b) => {
        if (sortBy.value == 'alphabetically') {
            let fa = a.desc.toLowerCase(),
                fb = b.desc.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        } else if (sortBy.value == 'createdAt') {
            let fc = a.createdAt,
                fn = b.createdAt;

            if (fc < fn) {
                return -1;
            }
            if (fc > fn) {
                return 1;
            }
            return 0;
        } else if (sortBy.value == 'peoples') {
            return a.peoples - b.peoples;
        }
    });

    if (!ascending.value) {
        tempHeadquartes.reverse();
    }

    return tempHeadquartes;
});
</script>
<style lang="scss" scoped>
.headquarters {
    padding: 60px 0px 60px 0px;
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

.horizontal {
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 16px;
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
