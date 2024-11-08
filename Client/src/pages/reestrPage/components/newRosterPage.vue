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
import { addr_conf } from "@app/http";

const addr = `${addr_conf.proto}://${addr_conf.ip}:${addr_conf.port}`;
const roleStore = useRoleStore();
const isLoading = ref(false);

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
const updateFilteredCategories = () => {
    if (roleStore.roles.centralheadquarter_commander) {
        filteredCategories.value = allCategories;
    } else if (roleStore.roles.detachment_commander) {
        filteredCategories.value = allCategories.filter(category => category.name === 'Пользователи');
    } else {
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
        { name: 'Количество местных штабов', key: 'local_headquarters', selected: true },
        { name: 'Количество штабов СО ОО', key: 'educational_headquarters', selected: true },
        { name: 'Количество ЛСО', key: 'educational_headquarters', selected: true },
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
    'Региональные штабы': [
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
    'Направления': [
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
    'Региональные штабы': [
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
    'Направления': [
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
        const apiUrl = urlMap[selectedCategory.value];
        if (!apiUrl) throw new Error('Выбрана некорректная категория');

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
        const selectedIndicators = currentIndicators.value.filter(indicator => indicator.selected);
        const filteredColumns = columns.filter(col =>
            selectedIndicators.some(indicator => indicator.key === col.key) ||
            ['name', 'email', 'phone_number', 'district_headquarter', 'regional_headquarter',
                'local_headquarter', 'educational_headquarter', 'detachment', 'position',].includes(col.key)
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
        const fileName = `${selectedCategory.value} Отчет.xlsx`;
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, fileName);

    } catch (error) {
        console.error('Ошибка при скачивании отчета:', error);
    } finally {
        isLoading.value = false;
    }
};
</script>

<style lang="scss" scoped>
/* Заголовки */
h3 {
    font-weight: unset;
}

/* Общий контейнер */
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
        height: 500px;
        /* Отступ между фильтрами */
        gap: 16px;

        .filter-category,
        .filter-indicators {
            /* Равномерное распределение ширины */
            flex: 1 1 0;
        }
    }
}

/* Стили для списка и элементов внутри него */
.list {
    margin: 20px 4px;
    display: flex;
    flex-direction: column;
    row-gap: 6px;

    &-elem {
        display: flex;
        align-items: center;
        /* Вертикальное выравнивание */
        column-gap: 8px;
        /* Расстояние между чекбоксом и текстом */
    }
}

/* Стиль для текста в списке */
.list label {
    font-size: 16px;

}

/* Кнопка загрузки */
.downloadBtn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    row-gap: 32px;

    &.messageForUser {

        font-weight: 500;
        font-size: 16px;
        text-align: center;
        font-family: var(--third-family);
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
    line-height: 1.25;
    color: #fff;

    &.loading {
        background: #a9a9a9;
        cursor: not-allowed;
    }
}

/* Медиазапросы для адаптивности */
@media (max-width: 800px) {
    .contributor {

        &-filters {
            width: 100%;
            height: 550px;


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
    /* Белый фон */
    border: 1px solid #006eff;
    /* Синяя граница */
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
    /* Отображается по умолчанию */
    transition: opacity 0.2s ease;
}


/* Отображение внутреннего круга при выборе радио-кнопки */
.custom-radio-wrapper input[type="radio"]:checked+.custom-radio-style::after {
    opacity: 1;
}


/* ====== Стили для чекбоксов ====== */

//  Кастомный чекбокс 
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

// Фон кастомного чекбокса при выборе 
.custom-checkbox-wrapper input[type="checkbox"]:checked+.custom-checkbox-style {
    background-color: #ffffff;
    //  Зеленый фон при выборе 
}

// Кастомная галочка внутри чекбокса 
.custom-checkbox-style::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 6px;
    width: 6px;
    height: 12px;
    // Цвет галочки
    border: solid rgb(0, 0, 0);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
    /* По умолчанию галочка не видна */
    transition: opacity 0.2s ease;
}

//  Отображение галочки при выборе чекбокса 
.custom-checkbox-wrapper input[type="checkbox"]:checked+.custom-checkbox-style::after {
    // Показываем галочку 
    opacity: 1;
}
</style>
