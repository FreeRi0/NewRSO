<template>
    <div class="container">
        <div class="contributor">
            <h2 class="title">Реестр участников</h2>
            <div class="contributor-filters">
                <div class="filter-category">
                    <h3>Категория</h3>
                    <form class="list">
                        <div class="list-elem" v-for="category in filteredCategories" :key="category.name">
                            <label class="custom-radio-wrapper">
                                <input type="radio" :id="category.name" name="category" :value="category.name"
                                    v-model="selectedCategory" class="custom-radio" />
                                <span class="custom-radio-style"></span>
                                {{ category.name }}
                            </label>
                        </div>
                    </form>
                </div>
                <div class="filter-indicators" v-if="currentIndicators.length > 0">
                    <h3 class="parammetrs">Показатель</h3>
                    <form class="list">
                        <div class="list-elem" v-for="indicator in currentIndicators" :key="indicator.id">
                            <label class="custom-checkbox-wrapper">
                                <input type="checkbox" v-model="indicator.selected" :id="indicator.id"
                                    class="custom-checkbox" />
                                <span class="custom-checkbox-style"></span>
                                {{ indicator.name }}
                            </label>
                        </div>
                    </form>
                </div>
            </div>
            <div class="downloadBtn">
                <button @click="downloadReport" :disabled="isLoading" :class="{ loading: isLoading }">
                    {{ isLoading ? "Загрузка..." : "Скачать отчет" }}
                </button>
                <p class="messageForUser">Результаты будут представлены в виде Excel таблицы.</p>
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
import { HTTP } from '@app/http';

const roleStore = useRoleStore();
const isLoading = ref(false);

const allCategories = [
    { name: 'Пользователи' },
    { name: 'Центральный штаб' },
    { name: 'Окружные штабы' },
    { name: 'Региональный штаб' },
    { name: 'Местные штабы' },
    { name: 'Штабы СО ОО' },
    { name: 'ЛСО' },
    { name: 'Направление' },
];

const requiredFieldsByRole = {
    centralheadquarter_commander: ['name', 'email', 'phone_number', 'district_headquarter', 'regional_headquarter', 'local_headquarter', 'educational_headquarter', 'detachment', 'position'],
    districtheadquarter_commander: ['name', 'email', 'phone_number', 'regional_headquarter', 'detachment', 'local_headquarter', 'position'],
    regionalheadquarter_commander: ['name', 'email', 'phone_number', 'regional_headquarter', 'detachment', 'local_headquarter', 'position'],
    localheadquarter_commander: ['name', 'email', 'local_headquarter', 'position'],
    educationalheadquarter_commander: ['name', 'email', 'educational_headquarter', 'position'],
    detachment_commander: ['name', 'email', 'detachment', 'position'],
};


const filteredCategories = ref([]);
const updateFilteredCategories = () => {
    if (roleStore.roles.centralheadquarter_commander) {
        filteredCategories.value = allCategories;
    }
    else if (roleStore.roles.districtheadquarter_commander) {
        filteredCategories.value = allCategories.filter(category => category.name == 'Пользователи' || category.name == 'Окружные штабы'
            || category.name == 'Региональный штаб' || category.name == 'Местные штабы' ||
            category.name == 'Штабы СО ОО' || category.name == 'ЛСО' || category.name == 'Направление');
    }
    else if (roleStore.roles.regionalheadquarter_commander) {
        filteredCategories.value = allCategories.filter(category => category.name == 'Пользователи'
            || category.name == 'Местные штабы' || category.name == 'Штабы СО ОО' || category.name == 'ЛСО' || category.name == 'Направление');
    }
    else if (roleStore.roles.localheadquarter_commander) {
        filteredCategories.value = allCategories.filter(category => category.name == 'Пользователи'
            || category.name == 'Региональный штаб' || category.name == 'Местные штабы' ||
            category.name == 'Штабы СО ОО' || category.name == 'ЛСО' || category.name == 'Направление');
    }
    else if (roleStore.roles.educationalheadquarter_commander) {
        filteredCategories.value = allCategories.filter(category => category.name == 'Пользователи' ||
            category.name == 'Штабы СО ОО' || category.name == 'ЛСО' || category.name == 'Направление');
    }
    else if (roleStore.roles.detachment_commander) {
        filteredCategories.value = allCategories.filter(category => category.name == 'Пользователи' || category.name == 'ЛСО');
    }
    else {
        filteredCategories.value = [];
    }
};

watchEffect(() => {
    if (Object.keys(roleStore.roles).length > 0) {
        updateFilteredCategories();
    }
});

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
        { name: 'Количество региональных штабов', key: 'regional_headquarters', selected: true },
        { name: 'Количество местных штабов', key: 'local_headquarter', selected: true },
        { name: 'Количество штабов СО ОО', key: 'educational_headquarter', selected: true },
        { name: 'Количество ЛСО', key: 'educational_headquarter', selected: true },
        { name: 'Количество участников', key: 'participants_count', selected: true },
        { name: 'Верификация участников', key: 'verification_percent', selected: true },
        { name: 'Оплата членского взноса', key: 'membership_fee_percent', selected: true },
        { name: 'Прохождение теста по Охране труда', key: 'test_done_percent', selected: true },
        { name: 'Организация мероприятий', key: 'events_organizations', selected: true },
        { name: 'Участие в мероприятиях', key: 'event_participants', selected: true },
    ],
    'Окружные штабы': [
        { name: 'Количество региональных штабов', key: 'regional_headquarters', selected: true },
        { name: 'Количество местных штабов', key: 'local_headquarters', selected: true },
        { name: 'Количество штабов СО ОО', key: 'educational_headquarters', selected: true },
        { name: 'Количество ЛСО', key: 'detachments', selected: true },
        { name: 'Количество участников', key: 'participants_count', selected: true },
        { name: 'Верификация участников', key: 'verification_percent', selected: true },
        { name: 'Оплата членского взноса', key: 'membership_fee_percent', selected: true },
        { name: 'Прохождение теста по Охране труда', key: 'test_done_percent', selected: true },
        { name: 'Организация мероприятий', key: 'events_organizations', selected: true },
        { name: 'Участие в мероприятиях', key: 'event_participants', selected: true },
    ],
    'Региональный штаб': [
        { name: 'Количество местных штабов', key: 'local_headquarter', selected: true },
        { name: 'Количество штабов СО ОО', key: 'educational_headquarters', selected: true },
        { name: 'Количество ЛСО', key: 'detachments', selected: true },
        { name: 'Количество участников', key: 'participants_count', selected: true },
        { name: 'Верификация участников', key: 'verification_percent', selected: true },
        { name: 'Оплата членского взноса', key: 'membership_fee_percent', selected: true },
        { name: 'Прохождение теста по Охране труда', key: 'test_done_percent', selected: true },
        { name: 'Организация мероприятий', key: 'events_organizations', selected: true },
        { name: 'Участие в мероприятиях', key: 'event_participants', selected: true },
    ],
    'Местные штабы': [
        { name: 'Количество штабов СО ОО', key: 'educational_headquarters', selected: true },
        { name: 'Количество ЛСО', key: 'detachments', selected: true },
        { name: 'Количество участников', key: 'participants_count', selected: true },
        { name: 'Верификация участников', key: 'verification_percent', selected: true },
        { name: 'Оплата членского взноса', key: 'membership_fee_percent', selected: true },
        { name: 'Прохождение теста по Охране труда', key: 'test_done_percent', selected: true },
        { name: 'Организация мероприятий', key: 'events_organizations', selected: true },
        { name: 'Участие в мероприятиях', key: 'event_participants', selected: true },
    ],
    'Штабы СО ОО': [
        { name: 'Количество ЛСО', key: 'detachments', selected: true },
        { name: 'Количество участников', key: 'participants_count', selected: true },
        { name: 'Верификация участников', key: 'verification_percent', selected: true },
        { name: 'Оплата членского взноса', key: 'membership_fee_percent', selected: true },
        { name: 'Прохождение теста по Охране труда', key: 'test_done_percent', selected: true },
        { name: 'Организация мероприятий', key: 'events_organizations', selected: true },
        { name: 'Участие в мероприятиях', key: 'event_participants', selected: true },
    ],
    'ЛСО': [
        { name: 'Направление', key: 'direction', selected: true },
        { name: 'Количество участников', key: 'participation_count', selected: true },
        { name: 'Верификация участников', key: 'verification_percent', selected: true },
        { name: 'Оплата членского взноса', key: 'membership_fee_percent', selected: true },
        { name: 'Прохождение теста по Охране труда', key: 'test_done_percent', selected: true },
        { name: 'Организация мероприятия', key: 'events_organizations', selected: true },
        { name: 'Участие в мероприятии', key: 'event_participants', selected: true },
    ],
    'Направление': [
        { name: 'Количество ЛСО', key: 'lso_count', selected: true },
        { name: 'Верификация участников', key: 'verification_percent', selected: true },
        { name: 'Оплата членского взноса', key: 'membership_fee_percent', selected: true },
        { name: 'Процент прохождения теста', key: 'test_done_percent', selected: true },
        { name: 'Организация мероприятия', key: 'events_organizations', selected: true },
        { name: 'Участие в мероприятии', key: 'event_participants', selected: true },
    ],
};

const selectedCategory = ref('Пользователи');
const currentIndicators = computed(() => indicatorsByCategory[selectedCategory.value] || []);

const urlMap = {
    'Пользователи': `${HTTP.defaults.baseURL}/registry/users/`,
    'Центральный штаб': `${HTTP.defaults.baseURL}registry/centrals/`,
    'Окружные штабы': `${HTTP.defaults.baseURL}registry/districts/`,
    'Региональный штаб': `${HTTP.defaults.baseURL}registry/regionals/`,
    'Местные штабы': `${HTTP.defaults.baseURL}registry/locals/`,
    'Штабы СО ОО': `${HTTP.defaults.baseURL}registry/educationals/`,
    'ЛСО': `${HTTP.defaults.baseURL}registry/detachments/`,
    'Направление': `${HTTP.defaults.baseURL}registry/directions/`,
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
        { key: 'position', title: 'Должность' },
        { key: 'area', title: 'Направление' },
        { key: 'verification', title: 'Статус верификации' },
        { key: 'membership_fee', title: 'Статус оплаты членского взноса' },
        { key: 'test_done', title: 'Прохождение теста по охране труда' },
        { key: 'events_organizations', title: 'Организация мероприятия' },
        { key: 'event_participants', title: 'Участие в мероприятии' },
    ],
    'Центральный штаб': [
        { key: 'name', title: 'Центральный штаб' },
        { key: 'regional_headquarter', title: 'Количество РШ' },
        { key: 'local_headquarter', title: 'Количество МШ' },
        { key: 'educational_headquarter', title: 'Количество штабов СО ОО' },
        { key: 'detachments', title: 'Количество ЛСО' },
        { key: 'participants_count', title: 'Количество участников' },
        { key: 'verification_percent', title: 'Верификация участников' },
        { key: 'membership_fee_percent', title: 'Оплата членского взноса' },
        { key: 'test_done_percent', title: 'Прохождение теста по Охране труда' },
        { key: 'events_organizations', title: 'Организация мероприятия' },
        { key: 'event_participants', title: 'Участие в мероприятии' },
    ],
    'Окружные штабы': [
        { key: 'name', title: 'Окружной штаб' },
        { key: 'regional_headquarters', title: 'Количество РШ' },
        { key: 'local_headquarters', title: 'Количество МШ' },
        { key: 'educational_headquarters', title: 'Количество штабов СО ОО' },
        { key: 'detachments', title: 'Количество ЛСО' },
        { key: 'participants_count', title: 'Количество участников' },
        { key: 'verification_percent', title: 'Верификация участников' },
        { key: 'membership_fee_percent', title: 'Оплата членского взноса' },
        { key: 'test_done_percent', title: 'Прохождение теста по Охране труда' },
        { key: 'events_organizations', title: 'Организация мероприятия' },
        { key: 'event_participants', title: 'Участие в мероприятии' },
    ],
    'Региональный штаб': [
        { key: 'name', title: 'Региональный штаб' },
        { key: 'district_headquarter', title: 'Окружной штаб' },
        { key: 'local_headquarters', title: 'Количество МШ' },
        { key: 'educational_headquarters', title: 'Количество штабов СО ОО' },
        { key: 'detachments', title: 'Количество ЛСО' },
        { key: 'participants_count', title: 'Количество участников' },
        { key: 'verification_percent', title: 'Верификация участников' },
        { key: 'membership_fee_percent', title: 'Оплата членского взноса' },
        { key: 'test_done_percent', title: 'Прохождение теста по Охране труда' },
        { key: 'events_organizations', title: 'Организация мероприятия' },
        { key: 'event_participants', title: 'Участие в мероприятии' },
    ],
    'Местные штабы': [
        { key: 'name', title: 'Местный штаб' },
        { key: 'district_headquarter', title: 'Окружной штаб' },
        { key: 'regional_headquarter', title: 'Региональный штаб' },
        { key: 'educational_headquarters', title: 'Количество штабов СО ОО' },
        { key: 'detachments', title: 'Количество ЛСО' },
        { key: 'participants_count', title: 'Количество участников' },
        { key: 'verification_percent', title: 'Верификация участников' },
        { key: 'membership_fee_percent', title: 'Оплата членского взноса' },
        { key: 'test_done_percent', title: 'Прохождение теста по Охране труда' },
        { key: 'events_organizations', title: 'Организация мероприятия' },
        { key: 'event_participants', title: 'Участие в мероприятии' },
    ],
    'Штабы СО ОО': [
        { key: 'name', title: 'Штаб СО ОО' },
        { key: 'district_headquarter', title: 'Окружной штаб' },
        { key: 'regional_headquarter', title: 'Региональный штаб' },
        { key: 'local_headquarter', title: 'Местный штаб' },
        { key: 'detachments', title: 'Количество ЛСО' },
        { key: 'participants_count', title: 'Количество участников' },
        { key: 'verification_percent', title: 'Верификация участников' },
        { key: 'membership_fee_percent', title: 'Оплата членского взноса' },
        { key: 'test_done_percent', title: 'Прохождение теста по Охране труда' },
        { key: 'events_organizations', title: 'Организация мероприятия' },
        { key: 'event_participants', title: 'Участие в мероприятии' },
    ],

    'ЛСО': [
        { key: 'name', title: 'ЛСО' },
        { key: 'district_headquarter', title: 'Окружной штаб' },
        { key: 'regional_headquarter', title: 'Региональный штаб' },
        { key: 'local_headquarter', title: 'Местный штаб' },
        { key: 'educational_headquarter', title: 'Штаб СО ОО' },
        { key: 'direction', title: 'Напарвление' },
        { key: 'participation_count', title: 'Количество участников' },
        { key: 'verification_percent', title: 'Верификация участников' },
        { key: 'membership_fee_percent', title: 'Оплата членского взноса' },
        { key: 'test_done_percent', title: 'Прохождение теста по Охране труда' },
        { key: 'events_organizations', title: 'Организация мероприятия' },
        { key: 'event_participants', title: 'Участие в мероприятии' },
    ],
    'Направление': [
        { key: 'name', title: 'Направление' },
        { key: 'participation_count', title: 'Количество участников' },
        { key: 'lso_count', title: 'Количество ЛСО' },
        { key: 'verification_percent', title: 'Верификация участников' },
        { key: 'membership_fee_percent', title: 'Оплата членского взноса' },
        { key: 'test_done_percent', title: 'Прохождение теста по Охране труда' },
        { key: 'events_organizations', title: 'Организация мероприятия' },
        { key: 'event_participants', title: 'Участие в мероприятии' },

    ]
};


const downloadReport = async () => {
    isLoading.value = true;
    try {
        // Получаем URL для текущей категории
        const apiUrl = urlMap[selectedCategory.value];
        if (!apiUrl) throw new Error('Выбрана некорректная категория');

        // Выполняем GET запрос с использованием HTTP клиента
        const response = await HTTP.get(apiUrl, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
            },
            responseType: 'blob',  // Указываем, что ожидаем blob-ответ
        });

        // Преобразуем blob в текст, затем в JSON
        const data = await response.data.text();
        const parsedData = JSON.parse(data);

        // Преобразуем полученные данные в отчет
        const reportData = Array.isArray(parsedData) ? parsedData : [parsedData];
        const columns = reportColumns[selectedCategory.value];

        // Функция для получения необходимых полей для текущей роли
        const getRequiredFields = () => {
            const role = Object.keys(roleStore.roles).find(role => roleStore.roles[role]);
            return requiredFieldsByRole[role] || [];
        };

        // Фильтруем выбранные индикаторы
        const selectedIndicators = currentIndicators.value.filter(indicator => indicator.selected);
        const requiredFields = getRequiredFields();

        // Фильтруем столбцы по выбранным индикаторам и необходимым полям
        const filteredColumns = columns.filter(col =>
            selectedIndicators.some(indicator => indicator.key === col.key) ||
            requiredFields.includes(col.key)
        );

        // Формируем данные для Excel
        const excelData = reportData.map(item =>
            filteredColumns.reduce((acc, col) => {
                acc[col.title] = item[col.key];
                return acc;
            }, {})
        );

        // Генерируем worksheet и workbook для Excel
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Отчет');

        // Записываем Excel файл в buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Создаем Blob и сохраняем его
        const fileName = `${selectedCategory.value} Отчет.xlsx`;
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, fileName);

    } catch (error) {
        console.error('Ошибка при скачивании отчета:', error);
        alert('Произошла ошибка при скачивании отчета. Попробуйте еще раз.');
    } finally {
        isLoading.value = false;
    }
};

</script>

<style lang="scss" scoped>
h3 {
    font-weight: unset;
}

.contributor {
    padding: 0px 0px 160px 0px;

    &-container {
        margin: 0 auto;
    }

    &-filters {
        padding: 60px 0 0 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
        min-height: 450px;
        gap: 16px;
        flex-wrap: wrap;

        .filter-category,
        .filter-indicators {
            flex: 1 1 0;
        }
    }
}


.list {
    margin: 20px 4px;
    display: flex;
    flex-direction: column;
    row-gap: 6px;

    &-elem {
        display: flex;
        align-items: center;
        column-gap: 8px;
    }
}


.list label {
    font-size: 16px;
}


.downloadBtn {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    row-gap: 24px;

    .messageForUser {
        font-weight: 500;
        font-size: 16px;
        text-align: center;
        font-family: "Akrobat";
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
    line-height: 1.25;
    color: #fff;

    &.loading {
        background: #a9a9a9;
        cursor: not-allowed;
    }
}


@media (max-width: 800px) {
    .contributor {
        &-filters {
            width: 100%;
            height: auto;

        }
    }
}

@media (max-width: 560px) {
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

    .downloadBt {
        margin-top: 10px;
        row-gap: 20px;
    }
}

/* Основные настройки для оберток */
.custom-radio-wrapper,
.custom-checkbox-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 4px;
}

/* Скрытие стандартных input элементов (radio и checkbox) */
.custom-radio-wrapper input[type="radio"],
.custom-checkbox-wrapper input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

/* ====== Стили для радио-кнопок ====== */

/* Кастомная радио-кнопка */
.custom-radio-style {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #006eff;
    border-radius: 50%;
    margin-right: 8px;
    transition: background-color 0.2s ease;
    position: relative;
}

/* Внутренний круг при выбранном состоянии */
.custom-radio-style::after {
    content: '';
    width: 8px;
    height: 8px;
    background-color: #006eff;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.2s ease;
}

/* Малый круг для неактивных радио-кнопок */
.custom-radio-style::before {
    content: '';
    width: 8px;
    height: 8px;
    background-color: #ffffff;
    border: 1px solid #006eff;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
    transition: opacity 0.2s ease;
}

/* Отображение внутреннего круга при выборе радио-кнопки */
.custom-radio-wrapper input[type="radio"]:checked+.custom-radio-style::after {
    opacity: 1;
}

/* ====== Стили для чекбоксов ====== */

.custom-checkbox-style {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #333;
    border-radius: 3px;
    position: relative;
    margin-right: 8px;
    transition: background-color 0.2s ease;
}

/* Фон кастомного чекбокса при выборе */
.custom-checkbox-wrapper input[type="checkbox"]:checked+.custom-checkbox-style {
    background-color: #ffffff;
}

/* Кастомная галочка внутри чекбокса */
.custom-checkbox-style::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 6px;
    width: 6px;
    height: 12px;
    border: solid rgb(0, 0, 0);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity 0.2s ease;
}

/* Отображение галочки при выборе чекбокса */
.custom-checkbox-wrapper input[type="checkbox"]:checked+.custom-checkbox-style::after {
    opacity: 1;
}
</style>
