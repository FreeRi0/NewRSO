<template>
    <div class="container">
        <div class="squads">
            <h2 class="squads-title">Участники конкурса</h2>
            <div class="squads-tabs">
                <v-btn class="squads-tabs__item" :class="{ active: picked === '' }" @click="picked = ''">Все
                </v-btn>
                <v-btn class="squads-tabs__item" :class="{ active: picked === area.name }"
                    v-for="area in squadsStore.areas" :key="area" @click="picked = area.name">{{ area.name }}
                </v-btn>
            </div>
            <Search v-model="name" @update:modelValue="searchDetachments" />
            <div class="squads-sorts">
                <div class="sort-filter">
                    <div class="squads-sort">
                        <div class="sort-filters">
                            <div class="sort-select sort-select--width-sort">
                                <sortByEducation variant="outlined" clearable v-model="sortBy" :options="sortOptions"
                                    :sorts-boolean="false" class="sort-alphabet" placeholder="Выберите фильтр">
                                </sortByEducation>
                            </div>

                            <Button type="button" class="ascend" icon="switch" @click="ascending = !ascending"
                                color="white"></Button>
                        </div>
                    </div>
                </div>

                <div class="d-flex mt-5">
                    <button type="button" class="contributorBtn" :class="{ active: switched == true }"
                        @click="switched = true">
                        Тандем
                    </button>

                    <button type="button" class="contributorBtn ml-2" :class="{ active: switched == false }"
                        @click="switched = false">
                        Дебют
                    </button>
                </div>
            </div>

            <div class="mt-10">
                <horizontalCompetitionList v-bind="listProps" />
            </div>
            <paginationButton :next="next" :prev="prev" :limit="limit" :element="detachments"
                :sorted-elements="sortedSquads" />
        </div>
    </div>
</template>
<script setup>
import { paginationButton } from '@shared/components/buttons';
import {
    horizontalCompetitionList,
} from '@features/Squads/components';
import {
    sortByEducation
} from '@shared/components/selects';
import { ref, onMounted, watch, nextTick } from 'vue';
import { useSquadsStore } from '@features/store/squads';
import { storeToRefs } from 'pinia';
import { scrollToLastElement, ListPropsSquads } from '@services/ListItemsServices.ts';
import { Search } from '@shared/components/inputs';
import { HTTP } from '@app/http';

const squadsStore = useSquadsStore();
const name = ref('');
const isLoading = ref(false);
const detachments = ref({});
const isTandem = ref(true);
const limit = 24;
const sortBy = ref('detachment__overalltandemranking_main_detachment__place');
const ascending = ref(true);
const picked = ref('');
const switched = ref(true);
const selectedSort = ref(null);
const sortedSquads = ref([]);
const sortOptions = ref([{
    value: 'detachment__name',
    name: 'Алфавиту от А - Я',
},
{ value: 'created_at', name: 'Дате создания отряда' },
{
    value: 'detachment__overalltandemranking_main_detachment__place',
    name: 'Рейтингу',
}]);

const listProps = ListPropsSquads(sortedSquads, isLoading, false);

const next = () => getCompetitions('next');
const prev = () => switched.value ? getCompetitions() : getCompetitions()

const getCompetitions = async (pagination, orderLimit) => {
    if (isLoading.value) return;
    isLoading.value = true;
    try {
        const url = buildCompetitionsUrl(pagination, orderLimit);
        const response = await HTTP.get(url);

        if (response && response.data) {
            updateCompetitions(response.data, pagination);
            nextTick(() => {
                scrollToLastElement(true, '.CompItem');
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

const buildCompetitionsUrl = (pagination, orderLimit) => {
    const params = [];
    let url = '/competitions/1/participants/?';

    if (orderLimit) {
        params.push(`limit=${orderLimit}`);
    } else {
        params.push(`limit=${limit}`);  // Use a fixed limit if orderLimit is not provided  
    }
    if (pagination === 'next') {
        detachments.value.next.includes('213.139.208.147:30000') ? url = detachments.value.next : url = detachments.value.next.replace('http', 'https');
    } else {
        if (name.value) params.push(`search=${encodeURIComponent(name.value)}`);
        if (picked.value) params.push(`area=${picked.value}`);
        if (sortBy.value) {
            let sort = sortBy.value;
            if (sort === 'detachment__overalltandemranking_main_detachment__place' && !isTandem.value) {
                sort = 'junior_detachment__overallranking__place';
            }
            params.push(`ordering=${ascending.value ? '' : '-'}${sort}`);
            params.push(`is_tandem=${isTandem.value}`);
        }
    }

    return pagination ? url : url + (params.length ? params.join('&') : '');
};

const updateCompetitions = (response, pagination) => {
    if (pagination === 'next') {
        response.results = [...detachments.value.results, ...response.results];
    }
    detachments.value = response;
    sortedSquads.value = response.results;
};

const updateSearch = (newValue) => {
    name.value = newValue;
};

const searchDetachments = () => {
    getCompetitions();
};

const watchDetachments = () => {
    watch(() => switched.value, () => {
        isTandem.value = switched.value;
        getCompetitions();
    });
    watch(() => picked.value, () => getCompetitions());
    watch(() => sortBy.value, () => getCompetitions('', sortedSquads.value.length));
    watch(() => ascending.value, () => getCompetitions('', sortedSquads.value.length));
};

watchDetachments();
onMounted(() => {
    getCompetitions();
});
</script>
<style lang="scss" scoped>
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

.squads-sorts {
    margin-top: 30px;
    display: flex;
    column-gap: 23px;
    justify-content: space-between;
    flex-direction: row-reverse;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
        margin-top: 40px;
        gap: 60px 0;
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
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-row-gap: 40px;
        box-shadow: 0px 4px 30px 0px #0000000D;
        margin-top: 40px;
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
        justify-content: flex-end;
        align-items: flex-end;

        @media screen and (min-width: 320px) and (max-width:480px) {
            display: block;
            justify-content: start;
            align-items: start;
        }
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


.contributorBtn {
    border-radius: 30px;
    background-color: white;
    color: #1c5c94;
    border: 1px solid #1c5c94;
    margin: 0px;
    padding: 10px 24px;
}

.active {
    background-color: #1c5c94;
    color: white;
    border: 1px solid #1c5c94;
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

.form__select {
    margin-bottom: 0px;
    border: 1px solid #35383f;
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

@media screen and (min-width: 320px) and (max-width:480px) {
    .squads-sort {
        flex-direction: column-reverse;
        align-items: start;
    }

    .sort-filters {
        flex-wrap: wrap;
        margin-bottom: 40px;
        align-items: end;
    }

    .sort-select {
        margin-top: 12px;
        right: 8px;
        width: 83%;
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
