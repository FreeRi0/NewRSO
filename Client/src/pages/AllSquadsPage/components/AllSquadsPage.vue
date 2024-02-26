<template>
    <div class="container">
        <div class="squads">
            <bannerCreate
                desc="Студенческие отряды — это больше, чем работа. Километры впечатлений, тысячи друзей и лето с пользой!"
                label="Создать отряд"
                name="CreateLSO"
                :button="true"
            ></bannerCreate>
            <h2 class="squads-title">Студенческие отряды</h2>
            <div class="squads-tabs">
                <v-btn
                    class="squads-tabs__item"
                    :class="{ active: picked === '' }"
                    @click="picked = ''"
                    >Все
                </v-btn>
                <v-btn
                    class="squads-tabs__item"
                    :class="{ active: picked === area.name }"
                    v-for="area in categories.areas.value"
                    :key="area"
                    @click="picked = area.name"
                    >{{ area.name }}
                </v-btn>
            </div>
            <div class="squads-search">
                <input
                    type="text"
                    id="search"
                    class="squads-search__input"
                    v-model="name"
                    placeholder="Поищем отряд?"
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
            <div class="squads-sort">
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
                    <div class="squads-sort">
                        <div class="sort-filters">
                            <div class="sort-select sort-select--width">
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
                                        <pre>{{ item.title }}</pre>
                                    </template>
                                </v-select>
                            </div>
                            <div class="sort-select sort-select--width">
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
                                        <pre>{{ item.title }}</pre>
                                    </template>
                                </v-select>
                            </div>
                            <div class="sort-select sort-select--width">
                                <educInstitutionDropdown
                                    class="form__select filter-district sortedEducation"
                                    name="select_education"
                                    id="select-education"
                                    v-model="education"
                                    placeholder="Образовательная организация"
                                    :SortDropdown="true"
                                ></educInstitutionDropdown>
                            </div>
                            <div class="sort-select">
                                <sortByEducation
                                    variant="outlined"
                                    clearable
                                    v-model="sortBy"
                                    :options="sortOptionss"
                                    :sorts-boolean="false"
                                ></sortByEducation>
                            </div>

                            <Button
                                type="button"
                                class="ascend"
                                icon="switch"
                                @click="ascending = !ascending"
                                color="white"
                            ></Button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-show="vertical">
                <squadsList
                    :squads="sortedSquads"
                    v-if="!isLoading.isLoading.value"
                ></squadsList>
                <v-progress-circular
                    class="circleLoader"
                    v-else
                    indeterminate
                    color="blue"
                ></v-progress-circular>
            </div>

            <div class="horizontal" v-show="!vertical">
                <horizontalList :squads="sortedSquads"></horizontalList>
            </div>
            <Button
                @click="squadsVisible += step"
                v-if="squadsVisible < squads.squads.value.length"
                label="Показать еще"
            ></Button>
            <Button
                @click="squadsVisible -= step"
                v-else
                label="Свернуть все"
            ></Button>
        </div>
    </div>
</template>
<script setup>
import { bannerCreate } from '@shared/components/imagescomp';
import { Button } from '@shared/components/buttons';
import { squadsList, horizontalList } from '@features/Squads/components';
import {
    sortByEducation,
    educInstitutionDropdown,
} from '@shared/components/selects';
import { ref, computed, onMounted, onActivated } from 'vue';
import { useSquadsStore } from '@features/store/squads';
import { storeToRefs } from 'pinia';
import { HTTP } from '@app/http';
import { useDistrictsStore } from '@features/store/districts';
import { useRegionalsStore } from '@features/store/regionals';
const squadsStore = useSquadsStore();
const districtsStore = useDistrictsStore();
const regionalsStore = useRegionalsStore();
const squads = storeToRefs(squadsStore);
const isLoading = storeToRefs(squadsStore);

const categories = storeToRefs(squadsStore);
const name = ref('');
const timerSearch = ref(null);
const education = ref(null);

const SelectedSortDistrict = ref(
    JSON.parse(localStorage.getItem('AllHeadquarters_filters'))?.districtName,
);
const SelectedSortRegional = ref(
    JSON.parse(localStorage.getItem('AllHeadquarters_filters'))?.regionalName,
);

// const searchDetachments = (event) => {
//     if(name.value ) {
//         squadsStore.getFilteredSquads(name.value)
//     }
//     clearTimeout(timerSearch.value);
//     timerSearch.value = setTimeout(() => {
//     }, 400);
// }

// const searchSquad = async (name) => {
//     try {
//         const { data } = await HTTP.get(`/detachments/?search=${name}`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Token ' + localStorage.getItem('Token'),
//             },
//         });
//         squads.squads.value = data;
//     } catch (error) {
//         console.log('an error occured ' + error);
//     }
// };

// const filteredSquad = async (education) => {
//     try {
//         const { data } = await HTTP.get(
//             `/detachments/?educational_institution__name=${education}`,
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: 'Token ' + localStorage.getItem('Token'),
//                 },
//             },
//         );
//         squads.squads.value = data;
//     } catch (error) {
//         console.log('an error occured ' + error);
//     }
// };

const squadsVisible = ref(20);
const step = ref(20);


const ascending = ref(true);
const sortBy = ref('alphabetically');

const picked = ref('');

const vertical = ref(true);

const showVertical = () => {
    vertical.value = !vertical.value;
};

const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    { value: 'founding_date', name: 'Дате создания отряда' },
    { value: 'members_count', name: 'Количеству участников' },
]);


const sortedSquads = computed(() => {
    // TODO добавляем фильтры по округу и региону
    let tempSquads = squads.squads.value;

    if (SelectedSortRegional.value || SelectedSortDistrict.value) {
        let idRegionals = [];
        if (SelectedSortDistrict.value) {
            let districtId = districtsStore.districts.find(
                (district) => district.name === SelectedSortDistrict.value,
            )?.id;
            idRegionals = regionalsStore.regionals
                .filter(
                    (regional) => regional.district_headquarter === districtId,
                )
                .map((reg) => reg.id);
        }
        if (SelectedSortRegional.value) {
            idRegionals = [
                regionalsStore.regionals.find(
                    (regional) => regional.name === SelectedSortRegional.value,
                )?.id,
            ];
        }

        tempSquads = tempSquads.filter((item) => {
            return idRegionals.indexOf(item.regional_headquarter) >= 0;
        });
    }
    if (education.value) {
        tempSquads = tempSquads.filter((item) => {
            return item.educational_institution.name === education.value;
        });
    }
    if(name.value) {
        tempSquads = tempSquads.filter((item) => {
            return item.name.toLowerCase().indexOf(name.value.toLowerCase()) >= 0;
        });
    }

    tempSquads = tempSquads.sort((a, b) => {
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
        tempSquads.reverse();
    }

    // if(!searchSquads.value && !filteredSquadsByEducation.value) {
    //     return tempSquads;
    // }

    if (!picked.value) {
        return tempSquads.slice(0, squadsVisible.value);
    }

    tempSquads = tempSquads.filter((item) => item.area.name === picked.value);
    tempSquads = tempSquads.slice(0, squadsVisible.value);
    return tempSquads;
});

onMounted(() => {
    squadsStore.getSquads();
})

onActivated(() => {
    SelectedSortDistrict.value = JSON.parse(
        localStorage.getItem('AllHeadquarters_filters'),
    )?.districtName;

    SelectedSortRegional.value = JSON.parse(
        localStorage.getItem('AllHeadquarters_filters'),
    )?.regionalName;

    localStorage.removeItem('AllHeadquarters_filters');
});
</script>
<style lang="scss">
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
    span,
    pre {
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
        justify-content: space-between;
        align-items: flex-end;
    }

    &-tabs {
        margin-top: 20px;
        margin-bottom: 40px;
        display: flex;
        flex-wrap: wrap;

        &__item {
            padding: 3px 24px;
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

.active {
    background-color: #1c5c94;
    color: white;
    border: 1px solid #1c5c94;
}

.circleLoader {
    width: 60px;
    height: 60px;
    display: block;
    margin: 30px auto;
}

.sort-filters {
    flex-wrap: wrap;
    margin-top: 30px;
    align-items: end;
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

.sort-select {
    &--width {
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
