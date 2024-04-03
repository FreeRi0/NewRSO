<template>
    <div class="container">
        <h1 class="title title--mb">Данные пользователя по показателям</h1>
        <form class="form" action="#" method="post">
            <v-expansion-panels>
                <v-expansion-panel v-if="id == 1">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Численность членов линейного студенческого
                                    отряда в соответствии с объемом уплаченных
                                    членских взносов
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded" @click="getParameters(1)">
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
                                <label
                                    v-if="report[1]?.place"
                                    class="form__label"
                                    >{{ report[1]?.place }}
                                </label>
                                <label v-else class="form__label"
                                    >Численность членов линейного студенческого
                                    отряда в соответствии с объемом уплаченных
                                    членских взносов рассчитывается
                                    автоматически по состоянию на 15 апреля 2024
                                    года.
                                </label>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 2">
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
                                            отряда<span>&nbsp;*</span></label
                                        >

                                        <Input
                                            v-if="
                                                applicationData.commander_achievement
                                            "
                                            type="text"
                                            value="Да"
                                            readonly
                                        />
                                        <Input
                                            v-else
                                            type="text"
                                            value="Нет"
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на публикацию из группы
                                            отряда о прохождении школы
                                            командного состава командиром
                                            отряда<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            :max-length="100"
                                            v-model:value="
                                                applicationData.commander_link
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                                <div class="form__field-group-right">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Региональная школа командного
                                            состава пройдена комиссаром
                                            отряда<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            v-if="
                                                applicationData.commissioner_achievement
                                            "
                                            type="text"
                                            value="Да"
                                            readonly
                                        />
                                        <Input
                                            v-else
                                            type="text"
                                            value="Нет"
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на публикацию из группы
                                            отряда о прохождении школы
                                            командного состава комиссаром
                                            отряда<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                            v-model:value="
                                                applicationData.commissioner_link
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 3">
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
                            <v-icon v-if="!expanded" @click="getParameters(3)">
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
                                <label
                                    v-if="report[3]?.place"
                                    class="form__label"
                                    >{{ report[3]?.place }}
                                </label>
                                <label v-else class="form__label"
                                    >Для получения баллов по данному показателю
                                    Командиру и Комиссару ЛСО необходимо пройти
                                    тестирование. Для прохождения теста
                                    перейдите в «Личный кабинет» —
                                    «Корпоративный университет» — «Тест».
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
                <v-expansion-panel v-else-if="id == 4">
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
                            <v-icon v-if="!expanded" @click="getParameters(4)">
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
                                <label
                                    v-if="report[4]?.place"
                                    class="form__label"
                                    >{{ report[4]?.place }}</label
                                >
                                <label v-else class="form__label"
                                    >Для получения баллов по данному показателю
                                    участникам ЛСО необходимо пройти
                                    тестирование. Для прохождения теста
                                    перейдите в «Личный кабинет» - «Охрана
                                    труда» - «Тест».</label
                                >
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
                <v-expansion-panel v-else-if="id == 5">
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
                            <v-icon v-if="!expanded" @click="getParameters(5)">
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
                                class="form__field-group-top"
                                v-for="(block, index) in report[5]
                                    .participants_data"
                                :key="index"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >ФИО участника, прошедшего
                                            профессиональное обучение<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, Иванова Светлана Андреевна"
                                            max-length="100"
                                            v-model:value="block.name"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                </div>
                                <div class="form__field-group-right">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Документ, подтверждающий
                                            прохождение профессионального
                                            обучения<span>&nbsp;*</span></label
                                        >
                                        <FileUpload
                                            mode="basic"
                                            name="demo[]"
                                            accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000"
                                            :customUpload="true"
                                            @select="
                                                selectFile(
                                                    $event,
                                                    5,
                                                    'participants_data',
                                                    'document',
                                                    index,
                                                )
                                            "
                                            v-if="!block.document"
                                            chooseLabel="Выбрать файл"
                                        />
                                        <div v-else>
                                            <div
                                                class="flex flex-wrap p-0 sm:p-5 gap-5"
                                            >
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                                >
                                                    <span
                                                        class="font-semibold"
                                                        >{{
                                                            block.document.name
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="form__field add-block"
                                @click="addNewBlock"
                            >
                                + добавить участника
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                    @click="postParameters(5)"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 июня 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 6">
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
                            <v-icon v-if="!expanded" @click="getParameters(6)">
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
                                            >Участие в Демонстрации 1 мая<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.first_may_demonstration
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество участников мероприятия
                                            Демонстрация 1 мая
                                            <span>&nbsp;*</span></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.first_may_demonstration_participants
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Участие во всероссийской
                                            патриотической акции «Поклонимся
                                            великим тем годам»<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.patriotic_action
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество участников всероссийской
                                            патриотической акции «Поклонимся
                                            великим тем годам»<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.patriotic_action_participants
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Участие в Неделе охраны труда<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.safety_work_week
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Участие в Школе подготовки
                                            командиров и комиссаров студенческих
                                            отрядов<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.commander_commissioner_school
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Участие в Открытии трудового
                                            семестра<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.working_semester_opening
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество участников мероприятия
                                            Открытие трудового семестра<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.working_semester_opening_participants
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Участие в Творческом фестивале<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.creative_festival
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Участие в Спартакиаде студенческих
                                            отрядов и комплексе мероприятий
                                            РСО-спорт<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.spartakiad
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Участие в Конкурсе
                                            профессионального мастерства<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.professional_competition
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 7">
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
                            <v-icon v-if="!expanded" @click="getParameters(7)">
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
                                                >&nbsp;*</span
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
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="number"
                                            placeholder="Например, 5"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на социальные сети с
                                            фотоотчетом с наименованием
                                            мероприятия и наименованием ЛСО,
                                            принявшем в нем участие<span
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
                                        <div class="form__field add-block">
                                            <p>+ добавить ссылку</p>
                                        </div>
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
                                            @select="selectCertSkansSeven"
                                            v-if="!report[7].certificate_scans"
                                            chooseLabel="Выбрать файл"
                                        />
                                        <div
                                            v-else-if="
                                                report[7].certificate_scans
                                            "
                                        >
                                            <div
                                                class="flex flex-wrap p-0 sm:p-5 gap-5"
                                            >
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                                >
                                                    <span
                                                        class="font-semibold"
                                                        >{{
                                                            report[7]
                                                                .certificate_scans
                                                                .name
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form__field add-block">
                                        <p>+ Добавить мероприятие</p>
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
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 8">
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
                            <v-icon v-if="!expanded" @click="getParameters(8)">
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
                                                >&nbsp;*</span
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
                                            type="number"
                                            placeholder="Например, 5"
                                            max-length="100"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на социальные сети с
                                            фотоотчетом с наименованием
                                            мероприятия и наименованием ЛСО,
                                            принявшем в нем участие<span
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
                                        <div class="form__field add-block">
                                            <p>+ добавить ссылку</p>
                                        </div>
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
                                            @select="selectPersonal"
                                            v-if="!report[8].certificate_scans"
                                            chooseLabel="Выбрать файл"
                                        />
                                        <div
                                            v-else-if="
                                                report[8].certificate_scans
                                            "
                                        >
                                            <div
                                                class="flex flex-wrap p-0 sm:p-5 gap-5"
                                            >
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                                >
                                                    <span
                                                        class="font-semibold"
                                                        >{{
                                                            report[8]
                                                                .certificate_scans
                                                                .name
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form__field add-block">
                                        <p>+ Добавить мероприятие</p>
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
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 9">
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
                            <v-icon v-if="!expanded" @click="getParameters(9)">
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
                                            >Скан грамоты с наименованием
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
                                            @select="selectPersonal"
                                            v-if="!report[9].certificate_scans"
                                            chooseLabel="Выбрать файл"
                                        />
                                        <div
                                            v-else-if="
                                                report[9].certificate_scans
                                            "
                                        >
                                            <div
                                                class="flex flex-wrap p-0 sm:p-5 gap-5"
                                            >
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                                >
                                                    <span
                                                        class="font-semibold"
                                                        >{{
                                                            report[9]
                                                                .certificate_scans
                                                                .name
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form__field add-block">
                                        <p>
                                            + Добавить мероприятие или конкурс
                                        </p>
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
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 10">
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
                            <v-icon v-if="!expanded" @click="getParameters(10)">
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
                                            >Скан грамоты с наименованием
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
                                            @select="selectPersonal"
                                            v-if="report[10].certificate_scans"
                                            chooseLabel="Выбрать файл"
                                        />
                                        <div
                                            v-else-if="
                                                report[10].certificate_scans
                                            "
                                        >
                                            <div
                                                class="flex flex-wrap p-0 sm:p-5 gap-5"
                                            >
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                                >
                                                    <span
                                                        class="font-semibold"
                                                        >{{
                                                            report[10]
                                                                .certificate_scans
                                                                .name
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form__field add-block">
                                        <p>
                                            + Добавить мероприятие или конкурс
                                        </p>
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
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 11">
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
                            <v-icon v-if="!expanded" @click="getParameters(11)">
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
                                            >Скан грамоты с наименованием
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
                                            @select="selectPersonal"
                                            v-if="!report[11].certificate_scans"
                                            chooseLabel="Выбрать файл"
                                        />
                                        <div
                                            v-else-if="
                                                report[11].certificate_scans
                                            "
                                        >
                                            <div
                                                class="flex flex-wrap p-0 sm:p-5 gap-5"
                                            >
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                                >
                                                    <span
                                                        class="font-semibold"
                                                        >{{
                                                            report[11]
                                                                .certificate_scans
                                                                .name
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form__field add-block">
                                        <p>+ добавить проект</p>
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
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 12">
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
                            <v-icon v-if="!expanded" @click="getParameters(12)">
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
                                            v-model:value="
                                                report[12].participation_data
                                                    .event_name
                                            "
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
                                        <sortByEducation
                                            placeholder="Например, 1"
                                            v-model="
                                                report[12].participation_data
                                                    .prize_place
                                            "
                                            :options="prizePlaceChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Скан грамоты с наименованием
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
                                            @select="selectCertScans"
                                            v-if="
                                                !report[12].participation_data
                                                    .certificate_scans
                                            "
                                            chooseLabel="Выбрать файл"
                                        />
                                        <div
                                            v-else-if="
                                                report[12].participation_data
                                                    .certificate_scans
                                            "
                                        >
                                            <div
                                                class="flex flex-wrap p-0 sm:p-5 gap-5"
                                            >
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                                >
                                                    <span
                                                        class="font-semibold"
                                                        >{{
                                                            report[12]
                                                                .participation_data
                                                                .certificate_scans
                                                                .name
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form__field add-block">
                                        <p>+ добавить проект</p>
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                    @click="postParameters(12)"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 13">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Организация собственных мероприятий отряда
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded" @click="getParameters(13)">
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
                                <div
                                    class="form__field-group-left"
                                    v-for="event in applicationData.organization_data"
                                    :key="event.id"
                                >
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Выберите тип мероприятия<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="event.event_type"
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на публикацию<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="event.event_link"
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 14">
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
                            <v-icon v-if="!expanded" @click="getParameters(14)">
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
                                <div
                                    class="form__field-group-left"
                                    v-for="project in applicationData.q14_labor_project"
                                    :key="project.id"
                                >
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование трудового проекта<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                project.lab_project_name
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество бойцов, отработавших в
                                            летнем трудовом семестре<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="project.amount"
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 15">
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
                            <v-icon v-if="!expanded" @click="getParameters(15)">
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
                                            проекта<span>&nbsp;*</span></label
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
                                                >&nbsp;*</span
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
                                                >&nbsp;*</span
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
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на новостной источник с
                                            упоминанием победы<span
                                                >&nbsp;*</span
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
                                    <div class="form__field add-block">
                                        <p>+ добавить проект</p>
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
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 16">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    Активность отряда в социальных сетях
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <v-icon v-if="!expanded" @click="getParameters(16)">
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
                                            >Ссылка на личную страницу ВКонтакте
                                            командира отряда<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                            v-model:value="
                                                report[16].link_vk_commander
                                            "
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на личную страницу ВКонтакте
                                            комиссара отряда<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                            v-model:value="
                                                report[16].link_vk_commissar
                                            "
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field-group-left-title">
                                        Наличие действующей подписки на
                                        официальную группу МООО «РСО» в
                                        социальной сети ВКонтакте:
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество членов отряда,
                                            подписанных на официальную страницу
                                            РСО ВКонтакте<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="number"
                                            placeholder="Например, 5"
                                            max-length="100"
                                            v-model:value="
                                                report[16]
                                                    .vk_rso_number_subscribers
                                            "
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field-group-left-title">
                                        Наличие активной группы Отряда в
                                        социальной сети ВКонтакте:
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на группу отряда
                                            ВКонтакте<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                            v-model:value="
                                                report[16].link_vk_detachment
                                            "
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field-group-left-title">
                                        Количество подписчиков активной группы
                                        Отряда в социальной сети ВКонтакте:
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Укажите количество подписчиков
                                            группы отряда ВКонтакте<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, 200"
                                            max-length="100"
                                            v-model:value="
                                                report[16]
                                                    .vk_detachment_number_subscribers
                                            "
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
                                    @click="postParameters(16)"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 17">
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
                            <v-icon v-if="!expanded" @click="getParameters(17)">
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
                                v-for="(block, index) in report[17]"
                                :key="index"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование источника<span
                                                >&nbsp;*</span
                                            >
                                        </label>
                                        <Input
                                            placeholder="Например, РИА Новости"
                                            max-length="100"
                                            v-model:value="
                                                block.q17_event.source_name
                                            "
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
                                                >&nbsp;*</span
                                            >
                                        </label>
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                            v-model:value="block.q17_link.link"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="form__field add-block"
                                @click="addNewBlockQ17"
                            >
                                + добавить участника
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                    @click="postParameters(17)"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 30 сентября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 18">
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
                            <v-icon v-if="!expanded" @click="getParameters(18)">
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
                                            ударного труда<span>&nbsp;*</span>
                                        </label>
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.participants_number
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 19">
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
                            <v-icon v-if="!expanded" @click="getParameters(19)">
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
                                            охраны труда и противопожарной
                                            безопасности в трудовом
                                            семестре<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            type="text"
                                            v-model="
                                                applicationData.safety_violations
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 20">
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
                            <v-icon v-if="!expanded" @click="getParameters(20)">
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
                                            >Ссылка на фото эмблемы</label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.link_emblem
                                            "
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на макет эмблемы</label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.link_emblem_img
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на фото флага</label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.link_flag
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на макет флага</label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.link_flag_img
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на фото знамени</label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.link_banner
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на макет знамени</label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.link_banner_img
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </form>
    </div>
</template>

<script setup>
import { Button } from '@shared/components/buttons';
import { sortByEducation } from '@shared/components/selects';

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { HTTP } from '@app/http';

import { Input } from '@shared/components/inputs';

const route = useRoute();
const id = route.params.id;
const applicationId = route.params.applicationId;
console.log(id);
console.log(applicationId);

const applicationData = ref({
    commander_achievement: true,
    commissioner_achievement: true,
    commander_link: 'http://vk.com',
    commissioner_link: 'http://vk.com',
});

const getApplicationData = async () => {
    try {
        const { data } = await HTTP.get(
            `/competitions/1/reports/q${id}/${applicationId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        applicationData.value = data;
        console.log(applicationData.value);
    } catch (e) {
        console.log(`getApplicationData error`, e);
    }
};

onMounted(async () => {
    console.log(123);
    await getApplicationData();
    window.scroll(0, 0);
});
</script>

<style>
.v-expansion-panels {
    margin-bottom: 60px;
}
.form .v-expansion-panel .v-expansion-panel-title {
    font-weight: 500;
}
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
.invents-select {
    border: 2px solid #b6b6b6;
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
.add-block {
    cursor: pointer;
    max-width: fit-content;
    border-bottom: 1px solid #35383f;
}
</style>
