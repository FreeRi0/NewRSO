<template>
    <div class="container">
        <div class="headquarters">
            <bannerCreate desc="Находим крутых работодателей. Стань частью большой команды, для которой «Труд Крут»!"
                label="Создать штаб" name="CreationOfRS" :button="false" :reg-com="true"></bannerCreate>
            <h2 class="headquarters-title">Региональные штабы</h2>
            <Search v-model="name" placeholder="Начните вводить название штаба"
                @update:modelValue="searchHeadquarters" />
            <div class="headquarters-sort">
                <changeButton :vertical="vertical" @switch="showVertical()" />
                <div class="sort-filters">
                    <div class="sort-select sort-select--width-district">
                        <headSelect v-model="SelectedSortDistrict" @update="sortDistricts" placeholder="Окружные штабы"
                            :items="districtsStore.districts" />
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
            <HeadquartersList v-bind="listProps" />
            <paginationButton :next="next" :prev="prev" :limit="limit" :element="regionals"
                :sorted-elements="sortedRegionalHeadquarters" />
        </div>
    </div>
</template>
<script setup>
import { bannerCreate } from '@shared/components/imagescomp';
import { Search, headSelect } from '@shared/components/inputs';
import { paginationButton, changeButton } from '@shared/components/buttons';
import {
    HeadquartersList
} from '@features/Headquarters/components';
import { sortByEducation, Select } from '@shared/components/selects';
import { ref, onMounted, onActivated, watch, nextTick } from 'vue';
import { HTTP } from '@app/http';
import { useRegionalsStore } from '@features/store/regionals';
import { onBeforeRouteLeave } from 'vue-router';
import { scrollToLastElement, ListPropsHeadquarters } from '@services/ListItemsServices.ts';
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
const sortedRegionalHeadquarters = ref([]);
const listProps = ListPropsHeadquarters(sortedRegionalHeadquarters, isLoading, vertical, 'RegionalHQ');
const sortOptions = ref([
    {
        value: 'name',
        name: 'Алфавиту от А - Я',
    },
    { value: 'founding_date', name: 'Дате создания штаба' },
]);


const next = () => getRegionals('next')
const prev = () => getRegionals();

const showVertical = () => {
    vertical.value = !vertical.value;
    nextTick(() => {
        scrollToLastElement(vertical.value, '.headquarters-wrapper__item');
    });
};
const SelectedSortDistrict = ref(
    JSON.parse(localStorage.getItem('regionalHeadquarters_filters'))
        ?.districtName ?? '',
);

const getRegionals = async (pagination, orderLimit) => {
    if (isLoading.value) return;
    isLoading.value = true;
    try {
        const url = buildRegionalsUrl(pagination, orderLimit);
        const response = await HTTP.get(url);

        if (response && response.data) {
            updateRegionals(response.data, pagination);
            nextTick(() => {
                scrollToLastElement(vertical.value, '.headquarters-wrapper__item');
            });
        } else {
            console.error('Ответ от сервера не содержит данных');
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
    } finally {
        isLoading.value = false;
    }
};

const buildRegionalsUrl = (pagination, orderLimit) => {
    const params = [];
    let url = '/regionals/?';

    // Устанавливаем limit  
    if (orderLimit) {
        params.push(`limit=${orderLimit}`);
    } else {
        params.push(`limit=${limit}`);  // Используем фиксированный limit, если orderLimit не задан  
    }

    // Обработка пагинации  
    if (pagination === 'next') {
        regionals.value.next.includes('213.139.208.147:30000') ? url = regionals.value.next : url = regionals.value.next.replace('http', 'https');
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
};

const updateRegionals = (response, pagination) => {
    if (pagination === 'next') {
        response.results = [...regionals.value.results, ...response.results]
    }
    regionals.value = response;
    sortedRegionalHeadquarters.value = response.results;
};

const updateSearch = (newValue) => {
    name.value = newValue;
};

const searchHeadquarters = () => {
    getRegionals();
};

const sortDistricts = (newValue) => {
    SelectedSortDistrict.value = newValue;
}

onBeforeRouteLeave(async (to, from) => {
    const pageName = 'regionalHeadquarters';
    const filtersPropertiesToRemove = ['districtName'];
    crosspageFilters.removeFilters(pageName, filtersPropertiesToRemove);
});

onActivated(() => {
    SelectedSortDistrict.value =
        JSON.parse(localStorage.getItem('regionalHeadquarters_filters'))
            ?.districtName ?? null;

    localStorage.removeItem('regionalHeadquarters_filters');
});

onMounted(() => {
    districtsStore.getDistricts();
    getRegionals();
});

watch(
    () => SelectedSortDistrict.value,
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


const watchRegionals = () => {
    watch(() => SelectedSortDistrict.value, () => getRegionals());
    watch(() => sortBy.value, () => getRegionals('', sortedRegionalHeadquarters.value.length));
    watch(() => ascending.value, () => getRegionals('', sortedRegionalHeadquarters.value.length));
};

watchRegionals();
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

    &-wrapper {
        padding: 40px 0px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-row-gap: 40px;
        box-shadow: 0px 4px 30px 0px #0000000D;
        border-radius: 10px;
        margin-top: 40px;

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

.form__select {
    margin-bottom: 0px;
    margin-right: 8px;
    border: 1px solid #35383f;
}

.v-select__selection {
    span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
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
