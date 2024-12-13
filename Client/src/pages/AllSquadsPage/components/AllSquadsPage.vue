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
                <changeButton :vertical="vertical" @switch="showVertical()" />

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
                                <headSelect v-model="education" @update="sortEducations"
                                    placeholder="Образовательная организация" :items="educations" />
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
            <squadsList v-bind="listProps" />
            <paginationButton :next="next" :prev="prev" :limit="limit" :element="detachments"
                :sorted-elements="sortedSquads" />
        </div>
    </div>
</template>
<script setup>
import { bannerCreate } from '@shared/components/imagescomp';
import { changeButton, paginationButton } from '@shared/components/buttons';
import { squadsList } from '@features/Squads/components';
import { sortByEducation } from '@shared/components/selects';
import { ref, onMounted, onActivated, watch, nextTick } from 'vue';
import { useSquadsStore } from '@features/store/squads';
import { HTTP } from '@app/http';
import { scrollToLastElement, ListPropsSquads } from '@services/ListItemsServices.ts';
import { Search, headSelect } from '@shared/components/inputs';
import { useDistrictsStore } from '@features/store/districts';
import { useRegionalsStore } from '@features/store/regionals';

const squadsStore = useSquadsStore();
const districtsStore = useDistrictsStore();
const regionalsStore = useRegionalsStore();
const name = ref('');
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

const ascending = ref(true);
const sortBy = ref('name');
const picked = ref('');
const vertical = ref(true);
const locals = ref([]);
const educations = ref([]);
const sortedSquads = ref([]);

const showVertical = () => {
    vertical.value = !vertical.value;
    nextTick(() => {
        scrollToLastElement(vertical.value, '.squads-wrapper__item');
    });
};

const sortOptions = ref([
    { value: 'name', name: 'Алфавиту от А - Я' },
    { value: 'founding_date', name: 'Дате создания отряда' },
]);

const next = () => getDetachments('next');
const prev = () => getDetachments();

const listProps = ListPropsSquads(sortedSquads, isLoading, vertical);

const getHeadquartersForFilters = async (type) => {
    if (!SelectedSortRegional.value) {
        if (type === 'local') {
            locals.value = [];
            SelectedSortLocal.value = '';
        } else if (type === 'educational') {
            educations.value = [];
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
            educations.value = data.results;
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
            nextTick(() => {
                scrollToLastElement(vertical.value, '.squads-wrapper__item');
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
        detachments.value.next.includes('213.139.208.147:30000') ? url = detachments.value.next : url = detachments.value.next.replace('http', 'https');
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

const sortEducations = (newValue) => {
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
        padding: 40px 0px;
        display: grid;
        margin-top: 40px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-row-gap: 40px;
        box-shadow: 0px 4px 30px 0px #0000000D;
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
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
        margin-top: 40px;
        gap: 60px 0;
    }
}

.active {
    background-color: #1c5c94;
    color: white;
    border: 1px solid #1c5c94;
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

.sort-alphabet {
    min-width: 200px;
}
</style>
