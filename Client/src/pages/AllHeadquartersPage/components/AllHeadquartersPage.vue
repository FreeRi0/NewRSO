<template>
    <div class="container">
        <div class="headquarters">
            <bannerCreate desc="Находим крутых работодателей. Стань частью большой команды, для которой «Труд Крут»!"
                label="Создать штаб" name="createhq" :button="false" :educ-com="true"></bannerCreate>
            <h2 class="headquarters-title">Штабы СО ОО</h2>
            <Search v-model="name" placeholder="Начните вводить название штаба образовательной организации" @update:modelValue="searchHeadquarters" />
            <div class="headquarters-sort">
                <div class="sort-layout">
                    <div>
                        <Button v-if="vertical" type="button" class="dashboard" icon="icon" color="white"
                            @click="showVertical">
                        </Button>
                        <Button v-else type="button" class="dashboardD" icon="icon" color="white" @click="showVertical">
                        </Button>
                    </div>
                    <Button v-if="!vertical" type="button" class="menuuA" icon="icon" color="white"
                        @click="showVertical"></Button>
                    <Button v-else type="button" class="menuu" icon="icon" color="white" @click="showVertical"></Button>
                </div>

                <div class="sort-filters">

                    <div class="sort-select sort-select--width-district">
                        <headSelect v-model="SelectedSortDistrict" @update="sortDistricts" placeholder="Окружные штабы"
                            :items="districtsStore.districts" />
                    </div>
                    <div class="sort-select sort-select--width-regional">
                        <headSelect v-model="SelectedSortRegional" @update="sortRegionals"
                            placeholder="Региональные штабы" :items="regionalsStore.regionals" />
                    </div>

                    <div class="sort-select sort-select--width-local" v-if="SelectedSortRegional || SelectedSortLocal">
                        <headSelect v-model="SelectedSortLocal" @update="sortLocals" placeholder="Местные штабы"
                            :items="locals" />
                    </div>
                    <div class="sort-select">
                        <sortByEducation variant="outlined" clearable v-model="sortBy" :options="sortOptions"
                            class="sort-alphabet" :sorts-boolean="false" placeholder="Выберите фильтр">
                        </sortByEducation>
                    </div>

                    <Button type="button" class="ascend" @click="ascending = !ascending" iconn="iconn"
                        color="white"></Button>
                </div>
            </div>

            <div v-show="vertical" class="mt-10">
                <HeadquartersList :is-loading="isLoading" :headquarters="sortedHeadquarters"></HeadquartersList>
            </div>

            <div class="horizontal" v-show="!vertical">
                <horizontalHeadquarters :is-loading="isLoading" :headquarters="sortedHeadquarters">
                </horizontalHeadquarters>
            </div>
            <template v-if='educations.count && educations.count > limit'>
                <Button @click="next" v-if="
                    sortedHeadquarters.length <
                    educations.count
                " label="Показать еще"></Button>
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
import { ref, onMounted, watch, onActivated } from 'vue';
import { HTTP } from '@app/http';
import { onBeforeRouteLeave } from 'vue-router';
import { useCrosspageFilter } from '@shared';
import { Search, headSelect } from '@shared/components/inputs';
import { useDistrictsStore } from '@features/store/districts';
import { useRegionalsStore } from '@features/store/regionals';

const crosspageFilters = useCrosspageFilter();

const districtsStore = useDistrictsStore();
const regionalsStore = useRegionalsStore();

const next = () => {
    getEducations('next')
};

const prev = () => {
    getEducations();
};

const ascending = ref(true);
const sortBy = ref('name');
const vertical = ref(true);
const isLoading = ref(false);
const educations = ref({ results: [], next: null });
const limit = 20;
const name = ref('');

const sortOptions = ref([
    {
        value: 'name',
        name: 'Алфавиту от А - Я',
    },
    { value: 'founding_date', name: 'Дате создания штаба' },
]);

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
    if (!SelectedSortRegional.value) {
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
const getEducations = async (pagination, orderLimit) => {
    if (isLoading.value) return;
    isLoading.value = true;
    try {
        const url = buildEducationsUrl(pagination, orderLimit);
        const response = await HTTP.get(url);

        if (response && response.data) {
            updateEducations(response.data, pagination);
        } else {
            console.error('Ответ от сервера не содержит данных');
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
    } finally {
        isLoading.value = false;
    }
};

const buildEducationsUrl = (pagination, orderLimit) => {
    const params = [];
    let url = '/educationals/?';

    // Устанавливаем limit  
    if (orderLimit) {
        params.push(`limit=${orderLimit}`);
    } else {
        params.push(`limit=${limit}`);  // Используем фиксированный limit, если orderLimit не задан  
    }

    // Обработка пагинации  
    if (pagination === 'next') {
        educations.value.next.includes('213.139.208.147:30000') ? url = educations.value.next : url = educations.value.next.replace('http', 'https');
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
};

const updateEducations = (response, pagination) => {
    if (pagination === 'next') {
        response.results = [...educations.value.results, ...response.results]
    }
    educations.value = response;
    sortedHeadquarters.value = response.results;
};

const updateSearch = (newValue) => {
    name.value = newValue;
    searchEducational();
};

const searchHeadquarters = () => {
    getEducations();
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


onMounted(() => {
    regionalsStore.getRegionalsForFilters(sortBy.value);
    districtsStore.getDistricts();
    getEducations();
});


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
const watchEducations = () => {
    watch(() => SelectedSortDistrict.value, () => getEducations());
    watch(() => SelectedSortRegional.value, () => {
        getLocalsHeadquartersForFilters();
        getEducations();
    });
    watch(() => SelectedSortLocal.value, () => {
        getEducations();
    });
    watch(() => sortBy.value, () => getEducations('', sortedHeadquarters.value.length));
    watch(() => ascending.value, () => getEducations('', sortedHeadquarters.value.length));
};

watchEducations();
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
        align-items: flex-start;
        gap: 0 23px;
        margin-top: 20px;

        @media screen and (max-width: 768px) {
            flex-direction: column-reverse;
            align-items: flex-start;
            gap: 60px 0;
            margin-top: 0;
        }
    }

    &-wrapper {
        @media screen and (min-width: 320px) and (max-width:480px) {
            padding: 10px 0px;
            justify-content: center;
        }

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

.sort-layout {
    margin-top: 40px;

    @media screen and (max-width: 768px) {
        margin-top: 0;
    }
}

pre {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    font-family: 'Bert Sans';
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
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
        @media screen and (min-width: 320px) and (max-width:480px) {
            padding: 5px 10px 0px 10px;
            font-size: 15.5px;
            transform: translateX(center);
        }

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
    // margin-right: 8px;
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
    flex-wrap: wrap;
    gap: 8px;

    @media screen and (max-width: 768px) {
        margin-top: 40px;
        display: flex;
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

        &-sort {
            min-width: 180px;
        }
    }

    span {
        font-family: 'Bert Sans';
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
    }
}

@media (max-width: 575px) {
    .squads-sort {
        flex-direction: column-reverse;
    }

    .sort-filters {
        flex-wrap: wrap;
        align-items: end;
    }
}

.v-field__field .v-field__input {
    font-family: 'Bert Sans';
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
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