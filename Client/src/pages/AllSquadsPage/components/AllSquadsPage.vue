<template>
    <div class="container">
        <div class="squads">
            <bannerCreate
                desc="Студенческие отряды — это больше, чем работа. Километры впечатлений, тысячи друзей и лето с пользой!"
                label="Создать отряд" name="CreateLSO" :button="true"></bannerCreate>
            <h2 class="squads-title">Студенческие отряды</h2>
            <div class="squads-tabs">
                <v-btn class="squads-tabs__item" :class="{ active: picked === '' }" @click="picked = ''">Все
                </v-btn>
                <v-btn class="squads-tabs__item" :class="{ active: picked === area.name }"
                    v-for="area in squadsStore.areas" :key="area" @click="picked = area.name">{{ area.name }}
                </v-btn>
            </div>

            <Search v-model="name" @update:modelValue="searchDetachments" />
            <div class="squads-sorts">
                <div class="sort-layout">
                    <div>
                        <Button v-if="vertical" label="" type="button" class="dashboard" color="white"
                            @click="showVertical">
                        </Button>
                        <Button v-else type="button" label="" class="dashboardD" color="white" @click="showVertical">
                        </Button>
                    </div>
                    <div>
                        <Button v-if="!vertical" type="button" label="" class="menuuA" color="white"
                            @click="showVertical"></Button>
                        <Button v-else type="button" class="menuu" label="" color="white"
                            @click="showVertical"></Button>
                    </div>
                </div>

                <div class="sort-filter">
                    <div class="squads-sort">
                        <div class="sort-filters">
                            <div class="sort-select sort-select--width-district">
                                <headSelect v-model="SelectedSortDistrict" @update="sortDistricts"
                                    placeholder="Окружные штабы" :items="districtsStore.districts" />
                            </div>
                            <div class="sort-select sort-select--width-regional">
                                <headSelect v-model="SelectedSortRegional" @update="sortRegionals"
                                    placeholder="Региональные штабы" :items="regionalsStore.regionals" />
                            </div>

                            <div class="sort-select sort-select--width-local"
                                v-if="SelectedSortRegional || SelectedSortLocal">
                                <headSelect v-model="SelectedSortLocal" @update="sortLocals" placeholder="Местные штабы"
                                    :items="locals" />
                            </div>
                            <div class="sort-select sort-select--width-education"
                                v-if="SelectedSortRegional || SelectedSortLocal">
                                <headSelect v-model="education" @update="sortEducationals"
                                    placeholder="Образовательная организация" :items="educationals" />
                            </div>
                            <div class="sort-select sort-select--width-sort">
                                <sortByEducation variant="outlined" clearable v-model="sortBy" :options="sortOptions"
                                    :sorts-boolean="false" class="sort-alphabet" placeholder="Выберите фильтр">
                                </sortByEducation>
                            </div>

                            <Button type="button" label="" class="ascend" @click="ascending = !ascending"
                                color="white"></Button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-show="vertical">
                <squadsList :squads="sortedSquads" :is-loading="isLoading"></squadsList>
            </div>

            <div class="horizontal" v-show="!vertical">
                <horizontalList :squads="sortedSquads" :is-loading="isLoading"></horizontalList>
            </div>
            <template v-if="detachments.count && detachments.count > limit">
                <Button @click="next" v-if="sortedSquads.length < detachments.count" label="Показать еще"></Button>
                <Button @click="prev" v-else label="Свернуть все"></Button>
            </template>
        </div>
    </div>
</template>
<script setup>
import { bannerCreate } from '@shared/components/imagescomp';
import { Button } from '@shared/components/buttons';
import { squadsList, horizontalList } from '@features/Squads/components';
import { sortByEducation } from '@shared/components/selects';
import { ref, onMounted, onActivated, watch } from 'vue';
import { useSquadsStore } from '@features/store/squads';
import { HTTP } from '@app/http';
import { Search, headSelect } from '@shared/components/inputs';
import { useDistrictsStore } from '@features/store/districts';
import { useRegionalsStore } from '@features/store/regionals';

const squadsStore = useSquadsStore();
const districtsStore = useDistrictsStore();
const regionalsStore = useRegionalsStore();

const name = ref('');
const timerSearch = ref(null);
const education = ref(null);
const isLoading = ref(false);
const detachments = ref({});
const limit = 20;

const SelectedSortDistrict = ref(
    JSON.parse(localStorage.getItem('AllHeadquarters_filters'))?.districtName
);
const SelectedSortRegional = ref(
    JSON.parse(localStorage.getItem('AllHeadquarters_filters'))?.regionalName
);
const SelectedSortLocal = ref(
    JSON.parse(localStorage.getItem('AllHeadquarters_filters'))?.localName
);
// const text = ref('Окружные штабы')
const ascending = ref(true);
const sortBy = ref('name');
const picked = ref('');
const vertical = ref(true);
const locals = ref([]);
const educationals = ref([]);
const sortedSquads = ref([]);

const showVertical = () => {
    vertical.value = !vertical.value;
};

const sortOptions = ref([
    { value: 'name', name: 'Алфавиту от А - Я' },
    { value: 'founding_date', name: 'Дате создания отряда' },
]);

const next = () => getDetachments('next');
const prev = () => getDetachments();

const getHeadquartersForFilters = async (type) => {
    if (!SelectedSortRegional.value) {
        if (type === 'local') {
            locals.value = [];
            SelectedSortLocal.value = '';
        } else if (type === 'educational') {
            educationals.value = [];
            education.value = '';
        }
        return;
    }

    const params = [`regional_headquarter__name=${SelectedSortRegional.value}`];

    if (type === 'educational' && SelectedSortLocal.value) {
        params.push(`local_headquarter__name=${SelectedSortLocal.value}`);
    }

    const url = type === 'local' ? `/locals/?ordering=${sortBy.value}&${params.join('&')}`
        : `/eduicational_institutions/?${params.join('&')}`;

    try {
        const { data } = await HTTP.get(url);
        if (type === 'local') {
            locals.value = data.results;
        } else if (type === 'educational') {
            educationals.value = data.results;
        }
    } catch (error) {
        console.error(`Ошибка при запросе ${type} штабов:`, error);
    }
};

const getDetachments = async (pagination, orderLimit) => {
    if (isLoading.value) return;
    isLoading.value = true;
    try {
        const url = buildDetachmentsUrl(pagination, orderLimit);
        const response = await HTTP.get(url);

        if (response && response.data) {
            updateDetachments(response.data, pagination);
        } else {
            console.error('Ответ от сервера не содержит данных');
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
    } finally {
        isLoading.value = false;
    }
};

// const buildDetachmentsUrl = (pagination, orderLimit) => {
//     const params = [];
//     let url = '/detachments/?';

//     // Устанавливаем limit  
//     if (orderLimit) {
//         params.push(`limit=${orderLimit}`);
//     } else {
//         params.push(`limit=${limit}`);  // Используем фиксированный limit, если orderLimit не задан  
//     }

//     // Обработка пагинации  
//     if (pagination === 'next') {
//         url = detachments.value.next;
//     }

//     // Добавление параметров поиска  
//     if (name.value) params.push(`search=${encodeURIComponent(name.value)}`);
//     if (pagination !== 'next') {
//         addFilters(params);
//         if (sortBy.value) {
//             params.push(`ordering=${ascending.value ? '' : '-'}${sortBy.value}`);
//         }
//     }
//     return url + (params.length ? '&' + params.join('&') : '');
// };

const buildDetachmentsUrl = (pagination, orderLimit) => {
    const params = [];
    let url = '/detachments/?';

    // Устанавливаем limit  
    if (orderLimit) {
        params.push(`limit=${orderLimit}`);
    } else {
        params.push(`limit=${limit}`);  // Используем фиксированный limit, если orderLimit не задан  
    }

    // Обработка пагинации  
    if (pagination === 'next') {
        url = detachments.value.next;
    } else {
        // Добавление параметров поиска и фильтров, если не используем пагинацию "next"  
        if (name.value) params.push(`search=${encodeURIComponent(name.value)}`);
        addFilters(params);
        if (sortBy.value) {
            params.push(`ordering=${ascending.value ? '' : '-'}${sortBy.value}`);
        }
    }
    return pagination ? url : url + (params.length ? params.join('&') : '');

};

const addFilters = (params) => {
    if (SelectedSortDistrict.value) {
        params.push(`district_headquarter__name=${SelectedSortDistrict.value}`);
    }
    if (SelectedSortRegional.value) {
        params.push(`regional_headquarter__name=${SelectedSortRegional.value}`);
    }
    if (SelectedSortLocal.value) {
        params.push(`local_headquarter__name=${SelectedSortLocal.value}`);
    }
    if (education.value) {
        params.push(`educational_institution__name=${education.value}`);
    }
    if (picked.value) {
        params.push(`area__name=${picked.value}`);
    }
};

const updateDetachments = (response, pagination) => {
    if (pagination === 'next') {
        response.results = [...detachments.value.results, ...response.results]
    }
    detachments.value = response;
    sortedSquads.value = response.results;
};

const updateSearch = (newValue) => {
    name.value = newValue;
    searchDetachments();
};

const sortDistricts = (newValue) => {
    SelectedSortDistrict.value = newValue;
}

const sortRegionals = (newValue) => {
    SelectedSortRegional.value = newValue;
}

const sortLocals = (newValue) => {
    SelectedSortLocal.value = newValue;
}

const sortEducationals = (newValue) => {
    education.value = newValue;
}

const searchDetachments = () => {
    getDetachments();
};

onMounted(() => {
    regionalsStore.getRegionalsForFilters(sortBy.value);
    districtsStore.getDistricts();
    getDetachments();
});

onActivated(() => {
    localStorage.removeItem('AllHeadquarters_filters');
});

// Наблюдение за изменениями  
const watchDetachments = () => {
    watch(() => SelectedSortDistrict.value, () => getDetachments());
    watch(() => SelectedSortRegional.value, () => {
        getHeadquartersForFilters('local');
        getHeadquartersForFilters('educational');
        getDetachments();
    });
    watch(() => SelectedSortLocal.value, () => {
        getHeadquartersForFilters('educational');
        getDetachments();
    });
    watch(() => education.value, () => getDetachments());
    watch(() => picked.value, () => getDetachments());
    watch(() => sortBy.value, () => getDetachments('', sortedSquads.value.length));
    watch(() => ascending.value, () => getDetachments('', sortedSquads.value.length));
};

watchDetachments();

</script>
<style lang="scss">
.dashboard {
    background-image: url('@app/assets/icon/darhboard-active.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 !important;
    width: 32px;
    height: 32px;
    padding: 12px 20px !important;
}

.dashboardD {
    background-image: url('@app/assets/icon/darhboard-disable.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 !important;
    width: 32px;
    height: 32px;
    padding: 12px 20px !important;
}

.menuuA {
    background-image: url('@app/assets/icon/MenuA.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 !important;
    width: 32px;
    height: 32px;
    padding: 12px 20px !important;
}

.menuu {
    background-image: url('@app/assets/icon/Menu.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 !important;
    width: 32px;
    height: 32px;
    padding: 12px 20px !important;
}

.ascend {
    background-image: url('@app/assets/icon/switch.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    margin: 0 !important;
    padding: 7px 0 !important;
    width: 32px;
    height: 32px;
}

.v-select__selection {
    padding-bottom: 4px;

    span,
    pre {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        font-family: 'Bert Sans';
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
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
        box-shadow: 0px 4px 30px 0px #0000000D;
        margin-top: 20px;
        border-radius: 10px;

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
    gap: 8px;

    @media (max-width: 768px) {
        margin-top: 0;
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
    border: 1px solid #35383f;
    height: 32px;
}

.squads-sorts {
    margin-top: 30px;
    display: flex;
    column-gap: 23px;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
        margin-top: 40px;
        gap: 60px 0;
    }
}

.sort-layout {
    margin-top: 30px;

    @media screen and (max-width: 768px) {
        margin-top: 0;
    }
}

.sort-select {
    &--width {
        &-district {
            min-width: 193px;
        }

        &-regional {
            min-width: 227px;
        }

        &-local {
            min-width: 185px;
        }

        &-education {
            min-width: 295px;
        }

        &-sort {
            min-width: 180px;
        }
    }
}

.v-field__clearable {
    margin: 0;
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

.Sort-alphabet {
    margin-right: 8px;
}

.sort-alphabet {
    min-width: 200px;
}
</style>
