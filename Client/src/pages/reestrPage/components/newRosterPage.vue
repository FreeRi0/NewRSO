<template>
    <div class="container">
        <div class="contributor">
            <h2 class="title">Реестр участников</h2>
            <div class="contributor-filters">
                <div class="filter-category">
                    <h3>Категория</h3>
                    <form class="list">
                        <div class="list-elem" v-for="category in filteredCategories" :key="category.name">
                            <input type="radio" :id="category.name" name="category" :value="category.name"
                                v-model="selectedCategory" />
                            <label :for="category.name">{{ category.name }}</label>
                        </div>
                    </form>
                </div>

                <!-- Индикаторы для выбранной категории -->
                <div class="filter-indicators" v-if="currentIndicators.length > 0">
                    <h3 class="parammetrs">Показатели для {{ selectedCategory }}</h3>
                    <div class="list">
                        <div class="list-elem" v-for="indicator in currentIndicators" :key="indicator.id">
                            <input type="checkbox" v-model="indicator.selected" :id="indicator.id">
                            <label :for="indicator.id">{{ indicator.name }}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="downloadBtn">
                <button @click="downloadReport">Скачать отчет</button>
                <p class="messageForUser">Результаты будут представлены в виде Excel таблицы. </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useRoleStore } from '@layouts/store/role';
import { addr_conf } from "@app/http";

const addr = `${addr_conf.proto}://${addr_conf.ip}:${addr_conf.port}`;
const roleStore = useRoleStore();

// Категории участников
const allCategories = [
    { name: 'Пользователи' },
    { name: 'Центральный штаб' },
    { name: 'Окружные штабы' },
    { name: 'Региональные штабы' },
    { name: 'Местные штабы' },
    { name: 'Штабы СО ОО' },
    { name: 'ЛСО' },
    { name: 'Направления' },
];

const filteredCategories = ref([]);

// Функция для обновления доступных категорий
const updateFilteredCategories = () => {
    if (roleStore.roles.centralheadquarter_commander) {
        filteredCategories.value = allCategories;
        console.log("Установлены все категории для centralheadquarter_commander");
    } else if (roleStore.roles.detachment_commander) {
        filteredCategories.value = allCategories.filter(category => category.name === 'Пользователи');
        console.log("Установлена только категория 'Пользователи' для detachment_commander");
    } else {
        filteredCategories.value = [];
        console.log("Категории не установлены, роль не определена");
    }
};

// Наблюдатель, который следит за изменениями в роли и обновляет категории, как только роли загружены
watchEffect(() => {
    // Проверяем, что роли загружены
    if (Object.keys(roleStore.roles).length > 0) {
        console.log("Роли загружены:", roleStore.roles);
        updateFilteredCategories();
    } else {
        console.log("Ожидаем загрузки ролей...");
    }
});

// Остальная часть кода остается прежней
const indicatorsByCategory = {
    'Пользователи': [
        { name: 'Направление', key: 'area', selected: true },
        { name: 'Статус верификации', key: 'verification', selected: true },
        { name: 'Статус оплаты членского взноса', key: 'membership_fee', selected: true },
        { name: 'Прохождение теста по Охране труда', key: 'test_done', selected: true },
        { name: 'Организация мероприятия', key: 'events_organizations', selected: true },
        { name: 'Участие в мероприятии', key: 'event_participants', selected: true },
    ],
    'Центральный штаб': [
        { name: 'Количество участников', key: 'participants_count', selected: true },
        { name: 'Верификация участников', key: 'verification_percent', selected: true },
        { name: 'Оплата членского взноса', key: 'membership_fee_percent', selected: true },
        { name: 'Прохождение теста по Охране труда', key: 'test_done_percent', selected: true },
        { name: 'Организация мероприятий', key: 'events_organizations', selected: true },
        { name: 'Участие в мероприятиях', key: 'event_participants', selected: true },
    ]
};

const selectedCategory = ref('Пользователи');
const currentIndicators = computed(() => indicatorsByCategory[selectedCategory.value] || []);

const urlMap = {
    'Пользователи': `${addr}/api/v1/registry/users/`,
    'Центральный штаб': `${addr}/api/v1/registry/centrals/`,
    'Окружные штабы': `${addr}/api/v1/registry/districts/`,
    'Региональные штабы': `${addr}/api/v1/registry/regionals/`,
    'Местные штабы': `${addr}/api/v1/registry/locals/`,
    'Штабы СО ОО': `${addr}/api/v1/registry/educationals/`,
    'ЛСО': `${addr}/api/v1/registry/detachments/`,
    'Направления': `${addr}/api/v1/registry/directions/`,
};

const reportColumns = {
    'Пользователи': [
        { key: 'name', title: 'ФИО' },
        { key: 'email', title: 'Email' },
        { key: 'phone_number', title: 'Телефон' },
        { key: 'district_headquarter', title: 'Окружной штаб' },
        { key: 'regional_headquarter', title: 'Региональный штаб' },
        { key: 'local_headquarter', title: 'Местный штаб' },
        { key: 'educational_headquarter', title: 'Штаб СО ОО' },
        { key: 'detachment', title: 'ЛСО' },
        { key: 'area', title: 'Направление' },
        { key: 'verification', title: 'Статус верификации' },
        { key: 'membership_fee', title: 'Статус оплаты членского взноса' },
        { key: 'test_done', title: 'Прохождение теста по охране труда' },
        { key: 'events_organizations', title: 'Организация мероприятия' },
        { key: 'event_participants', title: 'Участие в мероприятии' },
    ],
    'Центральный штаб': [
        { key: 'name', title: 'Название штаба' },
        { key: 'regional_headquarters', title: 'Количество РШ' },
        { key: 'local_headquarters', title: 'Количество МШ' },
        { key: 'educational_headquarters', title: 'Количество штабов СО ОО' },
        { key: 'detachments', title: 'Количество ЛСО' },
        { key: 'participants_count', title: 'Количество участников' },
        { key: 'verification_percent', title: 'Процент верификации' },
        { key: 'membership_fee_percent', title: 'Оплата членского взноса' },
        { key: 'test_done_percent', title: 'Прохождение теста по Охране труда' },
        { key: 'events_organizations', title: 'Организовано мероприятий' },
        { key: 'event_participants', title: 'Участников в мероприятиях' },
    ]
};

const downloadReport = async () => {
    try {
        const apiUrl = urlMap[selectedCategory.value];
        if (!apiUrl) {
            throw new Error('Выбрана некорректная категория');
        }

        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
            },
            responseType: 'blob',
        });

        const data = await response.data.text();
        const parsedData = JSON.parse(data);

        const reportData = Array.isArray(parsedData) ? parsedData : [parsedData];
        const columns = reportColumns[selectedCategory.value];

        if (!columns) {
            console.error(`Колонки для категории "${selectedCategory.value}" не найдены.`);
            return;
        }

        const selectedIndicators = currentIndicators.value.filter(indicator => indicator.selected);
        const filteredColumns = columns.filter(col =>
            selectedIndicators.some(indicator => indicator.key === col.key) ||
            ['name', 'regional_headquarter', 'district_headquarter', 'local_headquarter', 'educational_headquarter', 'detachments'].includes(col.key)
        );

        const excelData = reportData.map(item =>
            filteredColumns.reduce((acc, col) => {
                acc[col.title] = item[col.key];
                return acc;
            }, {})
        );

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Отчет');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const fileName = `${selectedCategory.value}_Отчет.xlsx`;
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, fileName);

    } catch (error) {
        console.error('Ошибка при скачивании отчета:', error);
    }
};
</script>


<style lang="scss" scoped>
h3 {
    font-family: var(--font-family);
    font-size: 20px;
    line-height: 120%;
}

.contributor {

    padding: 0px 0px 160px 0px;

    &-container {
        margin: 0 auto;
    }

    &-filters {
        padding: 60px 0px 0px 0px;
        display: flex;
        justify-content: space-between;
        width: 75%;
        height: 500px;


    }

}

.downloadBtn {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    row-gap: 32px;

    &-messageForUser {
        font-family: var(--third-family);
        font-weight: 500;
        font-size: 16px;
        text-align: center;
        color: var(--tekst-aktivnyy);
        margin-top: 12px;
    }
}

button {
    background: #39bfbf;
    border-radius: 10px;
    padding: 16px 32px;
    width: 200px;
    height: 52px;
    cursor: pointer;
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
    color: #fff;
}

.list {
    margin: 20px 4px;
    display: flex;
    flex-direction: column;
    row-gap: 12px;

    &-elem {
        display: flex;
        align-items: center;
        column-gap: 8px;
    }
}

.list label {
    font-family: var(--font-family);
    font-size: 16px;
    line-height: 150%;
    color: var(--tekst-aktivnyy);
}

@media (max-width: 790px) {
    .contributor {

        &-filters {

            width: 100%;


        }

    }
}

@media (max-width: 540px) {


    .contributor {

        padding: 0px 0px 80px 0px;

        &-filters {
            padding: 60px 0px 0px 0px;
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 20px;
            height: auto;

        }

    }
}
</style>
