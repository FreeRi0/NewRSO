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
            <div class="squads-search">
                <input type="text" id="search" class="squads-search__input" v-model="name" @keyup="searchDetachments"
                    placeholder="Поищем отряд?" />
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18.511 19.0914L24 24.8M21 12.84C21 14.5884 20.5015 16.2975 19.5675 17.7512C18.6335 19.205 17.306 20.338 15.7528 21.0071C14.1997 21.6762 12.4906 21.8512 10.8417 21.5101C9.1929 21.169 7.67835 20.3271 6.4896 19.0908C5.30085 17.8545 4.4913 16.2794 4.16333 14.5646C3.83535 12.8498 4.00368 11.0724 4.64703 9.45708C5.29037 7.84178 6.37984 6.46116 7.77766 5.48981C9.17548 4.51846 10.8189 4 12.5 4C14.7544 4 16.9164 4.93135 18.5104 6.58918C20.1045 8.247 21 10.4955 21 12.84Z"
                        stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
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
                                <v-select class="form__select filter-district" :items="districtsStore.districts"
                                    clearable variant="outlined" name="select_district" id="select-district"
                                    v-model="SelectedSortDistrict" item-title="name" placeholder="Окружной штаб">
                                    <template #selection="{ item }">
                                        <pre v-if="!districtsStore.isLoading">{{
                                            item.title
                                        }}</pre>
                                        <v-progress-circular class="circleLoader" v-else indeterminate
                                            color="blue"></v-progress-circular>
                                    </template>
                                </v-select>
                            </div>
                            <div class="sort-select sort-select--width-regional">
                                <v-select class="form__select filter-district" :items="regionalsStore.regionals"
                                    clearable variant="outlined" name="select_region" id="select-region"
                                    v-model="SelectedSortRegional" item-title="name" placeholder="Региональные штабы">
                                    <template #selection="{ item }">
                                        <pre v-if="!regionalsStore.isLoading">{{
                                            item.title
                                        }}</pre>
                                        <v-progress-circular class="circleLoader" v-else indeterminate
                                            color="blue"></v-progress-circular>
                                    </template>
                                </v-select>
                            </div>

                            <div class="sort-select sort-select--width-local"
                                v-if="SelectedSortRegional || SelectedSortLocal">
                                <v-select class="form__select filter-district" :items="locals" clearable
                                    variant="outlined" name="select_local" id="select-local" v-model="SelectedSortLocal"
                                    item-title="name" placeholder="Местные штабы">
                                    <template #selection="{ item }">
                                        <pre>{{ item.title }}</pre>
                                    </template>
                                </v-select>
                            </div>
                            <div class="sort-select sort-select--width-education"
                                v-if="SelectedSortRegional || SelectedSortLocal">
                                <v-select class="form__select filter-district sortedEducation" :items="educationals"
                                    clearable variant="outlined" name="select_local" id="select-local"
                                    v-model="education" item-title="name" placeholder="Образовательная организация">
                                    <template #selection="{ item }">
                                        <pre>{{ item.title }}</pre>
                                    </template>
                                </v-select>
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
                <squadsList :squads="sortedSquads"></squadsList>
                <v-progress-circular class="circleLoader" v-if="isLoading" indeterminate
                    color="blue"></v-progress-circular>
                <p v-else-if="!isLoading && !sortedSquads.length">
                    Ничего не найдено
                </p>
            </div>

            <div class="horizontal" v-show="!vertical">
                <horizontalList :squads="sortedSquads"></horizontalList>
                <p v-if="!sortedSquads.length">Ничего не найдено</p>
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

const getLocalsHeadquartersForFilters = async () => {  
    if (!SelectedSortRegional.value) {  
        locals.value = [];  
        SelectedSortLocal.value = '';  
        return;  
    }  

    try {  
        const { data } = await HTTP.get(  
            `/locals/?ordering=${sortBy.value}&regional_headquarter__name=${SelectedSortRegional.value}`  
        );  
        locals.value = data.results;  
    } catch (error) {  
        console.error('Ошибка при запросе местных штабов:', error);  
    }  
};  

const getEducationalsHeadquartersForFilters = async () => {  
    if (!SelectedSortRegional.value) {  
        educationals.value = [];  
        education.value = '';  
        return;  
    }  

    const params = [`regional_headquarter__name=${SelectedSortRegional.value}`];  
    if (SelectedSortLocal.value) {  
        params.push(`local_headquarter__name=${SelectedSortLocal.value}`);  
    }  

    try {  
        const { data } = await HTTP.get(`/eduicational_institutions/?${params.join('&')}`);  
        educationals.value = data.results;  
    } catch (error) {  
        console.error('Ошибка при запросе образовательных учреждений:', error);  
    }  
};  

const getDetachments = async (pagination, orderLimit) => {  
    if (isLoading.value) return;  

    isLoading.value = true;  

    try {  
        console.log('1', orderLimit);  
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

const buildDetachmentsUrl = (pagination, orderLimit) => {  
    const params = [];  
    let url = '/detachments/?';  
    console.log('2', orderLimit);  

    // Устанавливаем limit  
    if (orderLimit) {  
        console.log('11', orderLimit)
        params.push(`limit=${orderLimit}`);  
    } else {  
        console.log('12')
        params.push(`limit=${limit}`);  // Используем фиксированный limit, если orderLimit не задан  
    }  

    // Обработка пагинации  
    if (pagination === 'next' && detachments.value.next && !detachments.value.next.includes('213.139.208.147:30000')) {  
        url = detachments.value.next.replace('http', 'https');  
    } else if (pagination === 'prev' && detachments.value.previous && !detachments.value.previous.includes('213.139.208.147:30000')) {  
        url = detachments.value.previous.replace('http', 'https');  
    } else {  
        // Если пагинация не указана, используем базовый URL  
        url = '/detachments/?' + params.join('&');  
    }  

    // Добавление параметров поиска  
    if (name.value) params.push(`search=${encodeURIComponent(name.value)}`);  
    if (pagination !== 'next') {  
        addFilters(params);  
        if (sortBy.value) {  
            params.push(`ordering=${ascending.value ? '' : '-'}${sortBy.value}`);  
        }  
    }  

    return url + (params.length ? '&' + params.join('&') : '');  
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
        detachments.value = {
            ...response,
            results: [...detachments.value.results, ...response.results]
        };
    } else {
        detachments.value = response;
    }
    sortedSquads.value = detachments.value.results;
};

const searchDetachments = () => {  
    clearTimeout(timerSearch.value);  
    timerSearch.value = setTimeout(() => {  
        getDetachments();  
    }, 400);  
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
    watch(() => SelectedSortRegional.value, async () => {  
        await getLocalsHeadquartersForFilters();  
        await getEducationalsHeadquartersForFilters();  
        getDetachments();  
    });  
    watch(() => SelectedSortLocal.value, async () => {  
        await getEducationalsHeadquartersForFilters();  
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
