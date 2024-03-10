<template>
    <div class="container">
        <h1 class="title title--mb">Редактирование данных по показателям</h1>
        <form class="form" action="#" method="post">
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Численность членов линейного студенческого
                                    отряда в соответствии с объемом уплаченных
                                    членских взносов
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div class="form__field">
                                <label class="form__label"
                                    >Численность членов линейного студенческого
                                    отряда в соответствии с объемом уплаченных
                                    членских взносов рассчитывается
                                    автоматически по состоянию на 15 апреля 2024
                                    года.
                                </label>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Прохождение Командиром и Комиссаром
                                    студенческого отряда региональной школы
                                    командного состава
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div class="form__field-group-top">
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Региональная школа командного
                                            состава пройдена командиром
                                            отряда<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, да"
                                            v-model="regionalSchoolCommander"
                                            :options="CommanderChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на публикацию о прохождении
                                            школы командного состава командиром
                                            отряда</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            :max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                </div>
                                <div class="form__field-group-right">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Региональная школа командного
                                            состава пройдена комиссаром
                                            отряда<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, да"
                                            v-model="regionalSchool"
                                            :options="Choose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на публикацию о прохождении
                                            школы командного состава комиссаром
                                            отряда</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 30 мая 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Получение командным составом отряда
                                    образования в корпоративном университете РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div class="form__field">
                                <label class="form__label"
                                    >Для получения баллов по данному показателю
                                    Командиру и Комиссару ЛСО необходимо пройти
                                    тестирование. Для прохождения теста
                                    перейдите в «Личный кабинет» —
                                    «Корпоративный университет» — «Тест».
                                </label>
                            </div>
                            <div class="form__field-group-bottom">
                                <p>
                                    Срок предоставления отчетности по показателю
                                    с 27 марта по 10 апреля 2024 года
                                    включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Прохождение обучения по охране труда и
                                    пожарной безопасности в рамках недели охраны
                                    труда РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div class="form__field">
                                <label class="form__label"
                                    >Для получения баллов по данному показателю
                                    участникам ЛСО необходимо пройти
                                    тестирование. Для прохождения теста
                                    перейдите в «Личный кабинет» - «Охрана
                                    труда» - «Тест».
                                </label>
                            </div>
                            <div class="form__field-group-bottom">
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 июня 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Процент членов студенческого отряда,
                                    прошедших профессиональное обучение
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div class="form__field-group-top">
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >ФИО участника, прошедшего
                                            профессиональное обучение<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, Иванова Светлана Андреевна"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        + добавить участника
                                    </div>
                                </div>
                                <div class="form__field-group-right">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Региональная школа командного
                                            состава пройдена комиссаром
                                            отряда<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <FileUpload
                                            mode="basic"
                                            name="demo[]"
                                            accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000"
                                            :customUpload="true"
                                            chooseLabel="Выбрать файл"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 июня 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Участие членов студенческого отряда в
                                    обязательных общесистемных мероприятиях на
                                    региональном уровне
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div class="form__field-group-top">
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Участие в Творческом фестивале<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, да"
                                            v-model="regionalSchoolCommander"
                                            :options="CommanderChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Участие в Конкурсе
                                            профессионального мастерства<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, да"
                                            v-model="regionalSchoolCommander"
                                            :options="CommanderChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Участие в Открытии трудового
                                            семестра<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, да"
                                            v-model="regionalSchoolCommander"
                                            :options="CommanderChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество участников мероприятия
                                            Открытие трудового семестра<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, 10"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Участие в Неделе охраны труда<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, да"
                                            v-model="regionalSchoolCommander"
                                            :options="CommanderChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                </div>
                                <div class="form__field-group-right">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Участие в Спартакиаде студенческих
                                            отрядов и комплексе мероприятий
                                            РСО-спорт<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, да"
                                            v-model="regionalSchoolCommander"
                                            :options="CommanderChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Участие в Школе подготовки
                                            командиров и комиссаров студенческих
                                            отрядов<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, да"
                                            v-model="regionalSchoolCommander"
                                            :options="CommanderChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Участие во всероссийской
                                            патриотической акции «Поклонимся
                                            великим тем годам»<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, да"
                                            v-model="regionalSchoolCommander"
                                            :options="CommanderChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество участников всероссийской
                                            патриотической акции «Поклонимся
                                            великим тем годам»<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, 10"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Участие в Демонстрации 1 мая<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, да"
                                            v-model="regionalSchoolCommander"
                                            :options="CommanderChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество участников мероприятия
                                            Демонстрация 1 мая
                                            <span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, 10"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Участие членов студенческого отряда в
                                    окружных и межрегиональных мероприятиях РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование мероприятия<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, Окружной слет студенческих отрядов ПФО"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество человек<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, 5"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на социальные сети
                                            с фотоотчетом с наименованием
                                            мероприятия и наименованием ЛСО,
                                            принявшем в нем участие<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                        <p>+ добавить ссылку</p>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Скан грамот (при наличии)<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <FileUpload
                                            mode="basic"
                                            name="demo[]"
                                            accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000"
                                            :customUpload="true"
                                            chooseLabel="Выбрать файл"
                                        />
                                    </div>

                                    <p>+ Добавить мероприятие</p>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Участие членов студенческого отряда во
                                    всероссийских мероприятиях РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование мероприятия<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, Всероссийский конкурс «В объективе РСО»"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество человек<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, 5"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на социальные сети
                                            с фотоотчетом с наименованием
                                            мероприятия и наименованием ЛСО,
                                            принявшем в нем участие<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                        <p>+ добавить ссылку</p>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Скан грамот (при наличии)<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <FileUpload
                                            mode="basic"
                                            name="demo[]"
                                            accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000"
                                            :customUpload="true"
                                            chooseLabel="Выбрать файл"
                                        />
                                    </div>

                                    <p>+ Добавить мероприятие</p>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Призовые места отряда в окружных и
                                    межрегиональных мероприятиях и конкурсах РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование мероприятия или
                                            конкурса<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            placeholder="Например, Окружной слет студенческих отрядов ПФО"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Призовое место<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, 1"
                                            v-model="prizePlace"
                                            :options="prizePlaceChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Скан грамоты с наименованием
                                            проектов, наименования студенческого
                                            отряда, призовым местом<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <FileUpload
                                            mode="basic"
                                            name="demo[]"
                                            accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000"
                                            :customUpload="true"
                                            chooseLabel="Выбрать файл"
                                        />
                                    </div>

                                    <p>+ Добавить мероприятие или конкурс</p>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Призовые места отряда во Всероссийских
                                    мероприятиях и конкурсах РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование мероприятия или
                                            конкурса<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            placeholder="Например, Всероссийский конкурс «В объективе РСО»"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Призовое место<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, 1"
                                            v-model="prizePlace"
                                            :options="prizePlaceChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Скан грамоты с наименованием
                                            проектов, наименования студенческого
                                            отряда, призовым местом<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <FileUpload
                                            mode="basic"
                                            name="demo[]"
                                            accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000"
                                            :customUpload="true"
                                            chooseLabel="Выбрать файл"
                                        />
                                    </div>

                                    <p>+ Добавить мероприятие или конкурс</p>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Призовые места отряда на окружных и
                                    межрегиональных трудовых проектах
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование трудового проекта<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, Спартакиада на МСС «Алабуга»"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Призовое место<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, 1"
                                            v-model="prizePlace"
                                            :options="prizePlaceChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Скан грамоты с наименованием
                                            мероприятия, наименования ЛСО,
                                            призовым местом<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <FileUpload
                                            mode="basic"
                                            name="demo[]"
                                            accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000"
                                            :customUpload="true"
                                            chooseLabel="Выбрать файл"
                                        />
                                    </div>

                                    <p>+ добавить проект</p>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Призовые места отряда на всероссийских
                                    трудовых проектах
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование трудового проекта<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, Творческий фестиваль на ВСС «Мирный атом»"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Призовое место<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, 1"
                                            v-model="prizePlace"
                                            :options="prizePlaceChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Скан грамоты с наименованием
                                            мероприятия, наименования ЛСО,
                                            призовым местом<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <FileUpload
                                            mode="basic"
                                            name="demo[]"
                                            accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000"
                                            :customUpload="true"
                                            chooseLabel="Выбрать файл"
                                        />
                                    </div>

                                    <p>+ добавить проект</p>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Организация собственных мероприятий отряда
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Выберите тип мероприятия<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, спортивное"
                                            v-model="typeEvent"
                                            :options="typeEventChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на публикацию<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, https://t.me/+7pe98d2PqoJ"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <p>+ добавить мероприятие</p>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Отношение количества бойцов, отработавших в
                                    летнем трудовом семестре к общему числу
                                    членов отряда
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование трудового проекта<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, ВСС «Мирный атом»"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество бойцов, отработавших
                                            в летнем трудовом семестре<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, 5"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <p>+ добавить проект</p>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 30 сентября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Победы членов отряда в региональных,
                                    окружных и всероссийских грантовых
                                    конкурсах, направленных на развитие
                                    студенческих отрядов
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Полное название грантового
                                            проекта<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, Всероссийский конкурс молодёжных проектов среди физических лиц Федерального агентства по делам молодежи"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Статус конкурса<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, окружной"
                                            v-model="status"
                                            :options="statusChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Автор проекта<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, Иванова Светлана Андреевна"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на конкурс<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на новостной источник
                                            с упоминанием победы<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, https://t.me/+7pe98d2PqoJ"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <p>+ добавить проект</p>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Активность отряда в социальных сетях
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field-group-left-title">
                                        Наличие открытых аккаунтов у участников
                                        командного состава отряда в социальных
                                        сетях:
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на личную страницу ВКонтакте
                                            командира отряда<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на личную страницу ВКонтакте
                                            комиссара отряда<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field-group-left-title">
                                        Наличие действующей подписки
                                        на официальную группу МООО «РСО»
                                        в социальной сети ВКонтакте:
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество членов отряда,
                                            подписанных на официальную страницу
                                            РСО ВКонтакте<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, 5"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field-group-left-title">
                                        Наличие активной группы Отряда
                                        в социальной сети ВКонтакте:
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на группу отряда
                                            ВКонтакте<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field-group-left-title">
                                        Количество подписчиков активной группы
                                        Отряда в социальной сети ВКонтакте:
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Укажите количество подписчиков
                                            группы отряда ВКонтакте<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, 200"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Количество упоминаний в СМИ о прошедших
                                    творческих, добровольческих и патриотических
                                    мероприятиях отряда
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование источника<span
                                                ><span>&nbsp;*</span></span
                                            >
                                        </label>
                                        <Input
                                            placeholder="Например, РИА Новости"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                </div>
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на публикацию<span
                                                ><span>&nbsp;*</span></span
                                            >
                                        </label>
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <p>+ добавить источник</p>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 30 сентября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Охват бойцов, принявших участие во
                                    Всероссийском дне ударного труда
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество бойцов, принявших
                                            участие во Всероссийском дне
                                            ударного труда<span
                                                ><span>&nbsp;*</span></span
                                            >
                                        </label>
                                        <Input
                                            placeholder="Например, 10"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 30 сентября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Отсутствие нарушений техники безопасности,
                                    охраны труда и противопожарной безопасности
                                    в трудовом семестре
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Нарушения техники безопасности,
                                            охраны труда и противопожарной
                                            безопасности в трудовом
                                            семестре<span
                                                ><span>&nbsp;*</span></span
                                            ></label
                                        >
                                        <Dropdown
                                            placeholder="Например, отсутствуют"
                                            v-model="precaution"
                                            :options="precautionChoose"
                                            optionLabel="name"
                                            class="invents-block invents-select"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 30 сентября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Соответствие требованиям и положения
                                    символики и атрибутике форменной одежды и
                                    символики отрядов
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                            <v-icon v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="15.5"
                                        transform="rotate(-180 16 16)"
                                        fill="#1F7CC0"
                                        stroke="#1F7CC0"
                                    />
                                    <path
                                        d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </v-icon>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на фото эмблемы</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на изображение
                                            эмблемы</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на фото флага</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на изображение флага</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на фото знамени</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на изображение
                                            знамени</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </form>
    </div>
</template>
<script setup>
import Dropdown from 'primevue/dropdown';
import { Input } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { ref, computed } from 'vue';

const regionalSchool = ref();
const Choose = ref([{ name: 'Да' }, { name: 'Нет' }]);

const regionalSchoolCommander = ref();
const CommanderChoose = ref([{ name: 'Да' }, { name: 'Нет' }]);

const precaution = ref();
const precautionChoose = ref([{ name: 'Отсутствуют' }, { name: 'Имеются' }]);

const status = ref();
const statusChoose = ref([
    { name: 'Региональный' },
    { name: 'Окружной' },
    { name: 'Всероссийский' },
]);

const typeEvent = ref();
const typeEventChoose = ref([
    { name: 'Спортивное' },
    { name: 'Интеллектуальное' },
    { name: 'Творческое' },
    { name: 'Волонтерское' },
    { name: 'Внутреннее' },
]);

const prizePlace = ref();
const prizePlaceChoose = ref([{ name: '1' }, { name: '2' }, { name: '3' }]);

// const counterReport = computed(() => {
//     return .value?.length || 0;
// });
</script>
<style>
.form__inner-content {
    margin-bottom: 40px;
    border-bottom: none;
}
.form__label {
    font-weight: 500;
}
.p-placeholder {
    color: #b6b6b6;
}

.p-dropdown-items {
    background-color: white;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
}
.p-dropdown-item {
    border-bottom: 1px solid #b6b6b6;
    margin: 15px;
}

.form__field-group-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 80px;
}
.form__field-group-bottom {
    margin-top: 50px;
}
.form__field-group-bottom p {
    margin-top: 50px;
    font-family: 'Akrobat';
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    color: #35383f;
}
.form__field-column-one {
    grid-template-columns: 1fr;
}
.form__field-group-left-title {
    font-size: 24px;
    color: #35383f;
    font-family: 'Akrobat';
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 40px;
}
.form__label * {
    color: red;
}
.form .v-expansion-panel .v-expansion-panel-title {
    max-height: none;
}
</style>
