s
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
                            <v-icon v-if="!expanded" @click="getParameters(2)">
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
                                        <sortByEducation
                                            placeholder="Например, да"
                                            v-model="
                                                report[2].commander_achievement
                                            "
                                            :options="CommanderChoose"
                                            optionLabel="name"
                                            :sorts-boolean="false"
                                            class="invents-select"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на публикацию из группы
                                            отряда о прохождении школы
                                            командного состава командиром
                                            отряда<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            :max-length="100"
                                            v-model:value="
                                                report[2].commander_link
                                            "
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
                                            отряда<span>&nbsp;*</span></label
                                        >
                                        <sortByEducation
                                            placeholder="Например, да"
                                            v-model="
                                                report[2]
                                                    .commissioner_achievement
                                            "
                                            :options="Choose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на публикацию из группы
                                            отряда о прохождении школы
                                            командного состава комиссаром
                                            отряда<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                            v-model:value="
                                                report[2].commissioner_link
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
                                    @click="postParameters(2)"
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
                                        <!-- <FileUpload
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
                                        /> -->
                                        <input
                                            type="file"
                                            @change="
                                                selectFile(
                                                    $event,
                                                    5,
                                                    'participants_data',
                                                    'document',
                                                    index,
                                                )
                                            "
                                            v-if="!block.document"
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
                                        <sortByEducation
                                            placeholder="Например, да"
                                            v-model="
                                                report[6]
                                                    .first_may_demonstration
                                            "
                                            :options="mayDemonstrationChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество участников мероприятия
                                            Демонстрация 1 мая
                                            <span>&nbsp;*</span></label
                                        >
                                        <Input
                                            type="number"
                                            placeholder="Например, 10"
                                            max-length="100"
                                            v-model:value="
                                                report[6]
                                                    .first_may_demonstration_participants
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
                                    @click="postParameters(6)"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 31 мая 2024 года включительно.
                                </p>
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
                                        <sortByEducation
                                            placeholder="Например, да"
                                            v-model="report[6].patriotic_action"
                                            :options="patrioticActionChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
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
                                            type="number"
                                            placeholder="Например, 10"
                                            max-length="100"
                                            v-nodel:value="
                                                report[6]
                                                    .patriotic_action_participants
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
                                    @click="postParameters(6)"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 31 мая 2024 года включительно.
                                </p>
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
                                        <sortByEducation
                                            placeholder="Например, да"
                                            v-model="report[6].safety_work_week"
                                            :options="SafetyWeekChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
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
                                    @click="postParameters(6)"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 31 мая 2024 года включительно.
                                </p>
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
                                            >Участие в Школе подготовки
                                            командиров и комиссаров студенческих
                                            отрядов<span>&nbsp;*</span></label
                                        >
                                        <sortByEducation
                                            placeholder="Например, да"
                                            v-model="
                                                report[6]
                                                    .commander_commissioner_school
                                            "
                                            :options="
                                                CommanderCommissionerschoolChoose
                                            "
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
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
                                    @click="postParameters(6)"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 31 мая 2024 года включительно.
                                </p>
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
                                        <sortByEducation
                                            placeholder="Например, да"
                                            v-model="
                                                report[6]
                                                    .working_semester_opening
                                            "
                                            :options="semesterOpeningChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
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
                                            type="number"
                                            placeholder="Например, 10"
                                            max-length="100"
                                            v-model:value="
                                                report[6]
                                                    .working_semester_opening_participants
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
                                    @click="postParameters(6)"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 30 июня 2024 года включительно.
                                </p>
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
                                        <sortByEducation
                                            placeholder="Например, да"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
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
                                    @click="postParameters(6)"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
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
                                        <sortByEducation
                                            placeholder="Например, да"
                                            v-model="report[6].spartakiad"
                                            :options="spartakiadChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
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
                                    @click="postParameters(6)"
                                />
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
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
                                        <sortByEducation
                                            placeholder="Например, да"
                                            v-model="
                                                report[6]
                                                    .professional_competition
                                            "
                                            :options="competitionProChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
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
                                    @click="postParameters(6)"
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
                                            v-model="report[12].event_name"
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
                                            v-model="report[12].prize_place"
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
                                            @select="selectCertScans"
                                            v-if="!report[12].certificate_scans"
                                            chooseLabel="Выбрать файл"
                                        />
                                        <div
                                            v-else-if="
                                                report[12].certificate_scans
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
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Выберите тип мероприятия<span
                                                >&nbsp;*</span
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
                                        <p>+ добавить мероприятие</p>
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <Button
                                    type="button"
                                    class="form__button"
                                    label="Отправить данные на верификацию"
                                    size="large"
                                    @click="postParameters(13)"
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
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование трудового проекта<span
                                                >&nbsp;*</span
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
                                            >Ссылка на новостной источник
                                            с упоминанием победы<span
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
                                            >Ссылка на личную страницу ВКонтакте
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
                                            >Ссылка на личную страницу ВКонтакте
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
                                        Наличие действующей подписки
                                        на официальную группу МООО «РСО»
                                        в социальной сети ВКонтакте:
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество членов отряда,
                                            подписанных на официальную страницу
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
                                        Наличие активной группы Отряда
                                        в социальной сети ВКонтакте:
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на группу отряда
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
                                        Отряда в социальной сети ВКонтакте:
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
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field add-block">
                                        <p>+ добавить источник</p>
                                    </div>
                                </div>
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
                                            type="number"
                                            placeholder="Например, 10"
                                            max-length="100"
                                            v-model:value="
                                                report[18].participants_number
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
                                    @click="postParameters(18)"
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
                                            охраны труда и противопожарной
                                            безопасности в трудовом
                                            семестре<span>&nbsp;*</span></label
                                        >
                                        <sortByEducation
                                            placeholder="Например, отсутствуют"
                                            v-model="
                                                report[19].safety_violations
                                            "
                                            :options="precautionChoose"
                                            optionLabel="value"
                                            class="invents-select"
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
                                    @click="postParameters(19)"
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
                                            >Ссылка на фото эмблемы</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                            v-model:value="
                                                report[20].link_emblem
                                            "
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на макет эмблемы</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                            v-model:value="
                                                report[20].link_emblem_img
                                            "
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
                                            v-model:value="report[20].link_flag"
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на макет флага</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                            v-model:value="
                                                report[20].link_flag_img
                                            "
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
                                            v-model:value="
                                                report[20].link_banner
                                            "
                                        />
                                        <div class="form__counter">
                                            {{ counterReport }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на макет знамени</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                            v-model:value="
                                                reportPost[20].link_banner_img
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
                                    @click="postParameters(20)"
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
import { ref } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';
import { sortByEducation } from '@shared/components/selects';

const route = useRoute();

const Choose = ref([
    { value: true, name: 'Да' },
    { value: false, name: 'Нет' },
]);

const regionalSchoolCommander = ref();

const CommanderChoose = ref([
    { value: true, name: 'Да' },
    { value: false, name: 'Нет' },
]);

const precautionChoose = ref([
    { value: 'Имеются', name: 'Имеются' },
    { value: 'Отсутствуют', name: 'Отсутствуют' },
]);

const mayDemonstrationChoose = ref([
    { value: true, name: 'Да' },
    { value: false, name: 'Нет' },
]);

const patrioticActionChoose = ref([
    { value: true, name: 'Да' },
    { value: false, name: 'Нет' },
]);

const SafetyWeekChoose = ref([
    { value: true, name: 'Да' },
    { value: false, name: 'Нет' },
]);

const CommanderCommissionerschoolChoose = ref([
    { value: true, name: 'Да' },
    { value: false, name: 'Нет' },
]);

const semesterOpeningChoose = ref([
    { value: true, name: 'Да' },
    { value: false, name: 'Нет' },
]);

const spartakiadChoose = ref([
    { value: true, name: 'Да' },
    { value: false, name: 'Нет' },
]);

const competitionProChoose = ref([
    { value: true, name: 'Да' },
    { value: false, name: 'Нет' },
]);
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
const selectFile = (e, id, field, subfield, index) => {
    console.log(e.target.files[0], id, field, subfield);
    if (subfield) report.value[id][field][index][subfield] = e.target.files[0];
    else report.value[id][field] = e.target.files[0];
};
const addNewBlock = () => {
    report.value[5].participants_data.push({ name: '', document: '' });
};

const report = ref({
    1: { place: '' },
    2: {
        commander_achievement: null,
        commissioner_achievement: null,
        commander_link: '',
        commissioner_link: '',
    },
    3: { place: '' },
    4: { place: '' },
    5: {
        participants_data: [{ name: '', document: '' }],
    },
    6: {
        first_may_demonstration: null,
        first_may_demonstration_participants: '',
        patriotic_action: null,
        patriotic_action_participants: '',
        safety_work_week: null,
        commander_commissioner_school: null,
        working_semester_opening: null,
        working_semester_opening_participants: '',
        spartakiad: null,
        professional_competition: null,
    },
    7: {
        event_name: '',
        number_of_participants: '',
        links: '',
        certificate_scans: null,
    },
    8: {
        event_name: '',
        number_of_participants: '',
        links: '',
        certificate_scans: null,
    },
    9: { event_name: '', prize_place: '', certificate_scans: null },
    10: { event_name: '', prize_place: '', certificate_scans: null },
    11: { event_name: '', prize_place: '', certificate_scans: null },
    12: { event_name: '', prize_place: '', certificate_scans: null },
    13: { organization_data: '' },
    16: {
        link_vk_commander: '',
        link_vk_commissar: '',
        vk_rso_number_subscribers: '',
        link_vk_detachment: '',
        vk_detachment_number_subscribers: '',
    },
    18: { participants_number: '' },
    19: { safety_violations: '' },
    20: {
        link_emblem: '',
        link_emblem_img: '',
        link_flag: '',
        link_flag_img: '',
        link_banner: '',
        link_banner_img: '',
    },
});
const isError = ref([]);
const reportPost = ref({
    1: { place: '' },
    2: {
        commander_achievement: '',
        commissioner_achievement: '',
        commander_link: '',
        commissioner_link: '',
    },
    3: { place: '' },
    4: { place: '' },
    5: { participants_data: '' },
    7: {
        event_name: '',
        number_of_participants: '',
        links: '',
        certificate_scans: '',
    },
    8: {
        event_name: '',
        number_of_participants: '',
        links: '',
        certificate_scans: '',
    },
    9: { event_name: '', prize_place: '', certificate_scans: '' },
    10: { event_name: '', prize_place: '', certificate_scans: '' },
    11: { event_name: '', prize_place: '', certificate_scans: '' },
    12: { event_name: '', prize_place: '', certificate_scans: '' },
    13: { organization_data: '' },
    18: { participants_number: '' },
    19: { safety_violations: '' },
    20: {
        link_emblem: '',
        link_emblem_img: '',
        link_flag: '',
        link_flag_img: '',
        link_banner: '',
        link_banner_img: '',
    },
});

const selectCertScans = (event) => {
    report.value[12].certificate_scans = event.files[0];
    console.log('файл есть', report.value[12].certificate_scans);
};

const getParameters = async (id) => {
    try {
        const response = await HTTP.get(
            `/competitions/${route.params.competition_pk}/reports/q${id}/` +
                ((id == 1) | 3 | 4 ? 'get_place/' : ''),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );

        if ((id == 1) | 3 | 4) report.value[id] = response.data;
        else if (response.data.results.lenght)
            report.value[id] = response.data.results;
    } catch (error) {
        isError.value = error.response.data;
        console.log('an error occured ' + error);
    }
};
const postParameters = async (id) => {
    try {
        let fd = new FormData();
        for (let i in report.value[id]) {
            let field = report.value[id][i];
            if (Array.isArray(field)) {
                for (let k in field) {
                    for (let j in field[k]) {
                        fd.append(i + '[' + k + '][' + j + ']', field[k][j]);
                        console.log(j, field[k][j]);
                    }
                }
            } else {
                fd.append(i, field);
            }
        }
        await HTTP.post(
            `/competitions/${route.params.competition_pk}/reports/q${id}/`,
            fd,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
    } catch (error) {
        console.log('an error occured ' + error);
    }
};
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
