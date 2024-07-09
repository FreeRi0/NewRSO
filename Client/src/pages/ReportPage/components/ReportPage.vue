s
<template>
    <div class="container">
        <h1 class="title title--mb">Редактирование данных по показателям</h1>
        <form class="form" action="#" method="post">
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(1)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    1.&nbsp;Численность членов линейного
                                    студенческого отряда в соответствии
                                    с объемом уплаченных членских взносов
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div class="form__field">
                                <label class="form__label"
                                    >Численность членов линейного студенческого
                                    отряда в соответствии с объемом уплаченных
                                    членских взносов рассчитывается ежедневно.
                                    Последняя дата расчета 30 июня 2024 года.
                                </label>
                                <div class="form_place">
                                    <p>Для сведения:</p>
                                </div>
                                <table>
                                    <tr>
                                        <td>
                                            Количество участников ЛСО на
                                            {{
                                                new Date(
                                                    Date.now(),
                                                ).toLocaleDateString()
                                            }}
                                        </td>
                                        <td>
                                            <p
                                                v-if="
                                                    report[1]?.number_of_members
                                                "
                                            >
                                                {{
                                                    report[1]?.number_of_members
                                                }}
                                            </p>
                                            <v-progress-circular
                                                class="circleLoader"
                                                v-if="isLoading"
                                                indeterminate
                                                color="blue"
                                            ></v-progress-circular>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Количество оплаченных ЧВ на
                                            {{
                                                new Date(
                                                    Date.now(),
                                                ).toLocaleDateString()
                                            }}
                                        </td>
                                        <td>
                                            <p
                                                v-if="
                                                    report[1]
                                                        ?.number_of_payments
                                                "
                                            >
                                                {{
                                                    report[1]
                                                        ?.number_of_payments
                                                }}
                                            </p>
                                            <v-progress-circular
                                                class="circleLoader"
                                                v-if="isLoading"
                                                indeterminate
                                                color="blue"
                                            ></v-progress-circular>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(2)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    2.&nbsp;Прохождение Командиром и Комиссаром
                                    студенческого отряда региональной школы
                                    командного состава
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
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
                                            variant="outlined"
                                            :disabled="report[2].is_verified"
                                        />
                                        <p
                                            class="error"
                                            v-if="isError.commander_achievement"
                                        >
                                            {{
                                                isError.commander_achievement[0]
                                            }}
                                        </p>
                                    </div>

                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на публикацию из группы
                                            отряда о прохождении школы
                                            командного состава командиром
                                            отряда<span
                                                v-if="
                                                    report[2]
                                                        .commander_achievement ==
                                                    true
                                                "
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            :maxlength="100"
                                            v-model:value="
                                                report[2].commander_link
                                            "
                                            :readonly="
                                                report[2].is_verified ||
                                                is_regional_commander
                                            "
                                        />
                                        <div class="form__counter">
                                            {{
                                                report[2].commander_link.length
                                            }}
                                            / 100
                                        </div>
                                        <p
                                            class="error"
                                            v-if="isError.commander_link"
                                        >
                                            {{ isError.commander_link[0] }}
                                        </p>
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
                                            variant="outlined"
                                            :disabled="report[2].is_verified"
                                        />
                                        <p
                                            class="error"
                                            v-if="
                                                isError.commissioner_achievement
                                            "
                                        >
                                            {{
                                                isError
                                                    .commissioner_achievement[0]
                                            }}
                                        </p>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на публикацию из группы
                                            отряда о прохождении школы
                                            командного состава комиссаром
                                            отряда<span
                                                v-if="
                                                    report[2]
                                                        .commissioner_achievement ==
                                                    true
                                                "
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            max-length="100"
                                            v-model:value="
                                                report[2].commissioner_link
                                            "
                                            :readonly="report[2].is_verified"
                                        />
                                        <div class="form__counter">
                                            {{
                                                report[2].commissioner_link
                                                    .length
                                            }}
                                            / 100
                                        </div>
                                        <p
                                            class="error"
                                            v-if="isError.commissioner_link"
                                        >
                                            {{ isError.commissioner_link[0] }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[2].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(2)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 30 мая 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(3)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    3.&nbsp;Получение командным составом отряда
                                    образования в корпоративном университете РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div class="form__field">
                                <!-- <label
                                    v-if="report[3]?.place"
                                    class="form__label"
                                    >{{ report[3]?.place }}
                                </label> -->
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
                    <v-expansion-panel-title @click="getParameters(4)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    4.&nbsp;Прохождение обучения по охране труда
                                    и пожарной безопасности в рамках недели
                                    охраны труда РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div class="form__field">
                                <!-- <label
                                    v-if="report[4]?.place"
                                    class="form__label"
                                    >{{ report[4]?.place }}</label
                                > -->
                                <label class="form__label"
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
                                    по 30 июня 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(5)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    5.&nbsp;Процент членов студенческого отряда,
                                    прошедших профессиональное обучение
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-file"
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
                                            :maxlength="100"
                                            v-model:value="block.name"
                                            :readonly="
                                                block.is_verified ||
                                                is_regional_commander
                                            "
                                        />
                                        <div class="form__counter">
                                            {{ block.name.length }} / 100
                                        </div>
                                        <p class="error" v-if="isError.name">
                                            {{ isError.name[0] }}
                                        </p>
                                    </div>
                                </div>
                                <div class="form__field-group-right">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Документ, подтверждающий
                                            прохождение профессионального
                                            обучения<span>&nbsp;*</span>
                                        </label>
                                        <div
                                            class="statement-item"
                                            v-if="!block.document"
                                        >
                                            <img
                                                src="@app/assets/icon/addFile.svg"
                                                alt="addFile"
                                            />
                                            <FileUpload
                                                mode="basic"
                                                name="demo[]"
                                                accept=".pdf, .jpeg, .png"
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
                                                chooseLabel="Выбрать файл"
                                            />
                                        </div>

                                        <div v-else>
                                            <div
                                                class="flex flex-wrap p-0 sm:p-5 gap-5"
                                            >
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                                >
                                                    <img
                                                        class="addFile"
                                                        src="@app/assets/icon/addFile.svg"
                                                        alt="addFile"
                                                    />
                                                    <span
                                                        class="font-semibold"
                                                        >{{
                                                            block.document.name
                                                        }}</span
                                                    >
                                                    <span
                                                        v-if="block.id"
                                                        class="font-semibold"
                                                        >{{
                                                            decodeURIComponent(
                                                                block.document
                                                                    .split('/')
                                                                    .pop(),
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                        <p
                                            class="error"
                                            v-if="isError.document"
                                        >
                                            {{ isError.document[0] }}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    type="button"
                                    v-if="
                                        !block.is_verified &&
                                        !is_regional_commander &&
                                        !block.id
                                    "
                                >
                                    <svg
                                        @click="
                                            deleteBlock(
                                                index,
                                                5,
                                                'participants_data',
                                            )
                                        "
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M9 9L15 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M15 9L9 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                v-if="!is_regional_commander"
                                class="form__field add-block"
                                @click="
                                    addNewBlock(5, 'participants_data', {
                                        name: '',
                                        document: '',
                                    })
                                "
                            >
                                + добавить участника
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[5].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(5)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 июля 2024 года включительно.<br /><br />
                                    ОДНОВРЕМЕННО МОЖНО ОТПРАВИТЬ ДАННЫЕ ПО ПЯТИ
                                    УЧАСТНИКАМ.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(6)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    6.&nbsp;Участие членов студенческого отряда
                                    в обязательных общесистемных мероприятиях на
                                    региональном уровне
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
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
                                                report[61].demonstration_block
                                                    .first_may_demonstration
                                            "
                                            :options="mayDemonstrationChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
                                            variant="outlined"
                                            clearable
                                            :disabled="
                                                report[61].demonstration_block
                                                    .is_verified
                                            "
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
                                            :maxlength="5"
                                            v-model:value="
                                                report[61].demonstration_block
                                                    .first_may_demonstration_participants
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{
                                                report[61].demonstration_block
                                                    .first_may_demonstration_participants
                                                    .length
                                            }}
                                            / 100
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[61].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(61)"
                                    />
                                </div>
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
                                            v-model="
                                                report[62]
                                                    .patriotic_action_block
                                                    .patriotic_action
                                            "
                                            :options="patrioticActionChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
                                            variant="outlined"
                                            clearable
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
                                            :maxlength="5"
                                            v-model:value="
                                                report[62]
                                                    .patriotic_action_block
                                                    .patriotic_action_participants
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{
                                                report[62]
                                                    .patriotic_action_block
                                                    .patriotic_action_participants
                                                    .length
                                            }}
                                            / 100
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[62].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(62)"
                                    />
                                </div>
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
                                            v-model="
                                                report[63]
                                                    .safety_work_week_block
                                                    .safety_work_week
                                            "
                                            :options="SafetyWeekChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
                                            variant="outlined"
                                            clearable
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[63].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(63)"
                                    />
                                </div>
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
                                                report[64]
                                                    .commander_commissioner_school_block
                                                    .commander_commissioner_school
                                            "
                                            :options="
                                                CommanderCommissionerschoolChoose
                                            "
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
                                            variant="outlined"
                                            clearable
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[64].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(64)"
                                    />
                                </div>
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
                                                report[65]
                                                    .working_semester_opening_block
                                                    .working_semester_opening
                                            "
                                            :options="semesterOpeningChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
                                            variant="outlined"
                                            clearable
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
                                            :maxlength="5"
                                            v-model:value="
                                                report[65]
                                                    .working_semester_opening_block
                                                    .working_semester_opening_participants
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{
                                                report[65]
                                                    .working_semester_opening_block
                                                    .working_semester_opening_participants
                                                    .length
                                            }}
                                            / 100
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[65].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(65)"
                                    />
                                </div>
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
                                            v-model="
                                                report[66]
                                                    .creative_festival_block
                                                    .creative_festival
                                            "
                                            :options="festivalChoose"
                                            class="invents-select"
                                            :sorts-boolean="false"
                                            variant="outlined"
                                            clearable
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[66].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(66)"
                                    />
                                </div>
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
                                            v-model="
                                                report[67].spartakiad_block
                                                    .spartakiad
                                            "
                                            :options="spartakiadChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
                                            variant="outlined"
                                            clearable
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[67].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(67)"
                                    />
                                </div>
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
                                                report[68]
                                                    .professional_competition_block
                                                    .professional_competition
                                            "
                                            :options="competitionProChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
                                            variant="outlined"
                                            clearable
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[68].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(68)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(7)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    7.&nbsp;Участие членов студенческого отряда
                                    в окружных и межрегиональных мероприятиях
                                    РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one form__field-column-one-file"
                                v-for="(block, index) in report[7]
                                    .participation_data"
                                :key="index"
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
                                            :maxlength="150"
                                            v-model:value="block.event_name"
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ block.event_name.length }} / 100
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
                                            :maxlength="5"
                                            v-model:value="
                                                block.number_of_participants
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{
                                                block.number_of_participants
                                                    .length
                                            }}
                                            / 100
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
                                        <template
                                            v-for="(link, i) in block.links"
                                            :key="index + '_' + i"
                                        >
                                            <div class="form__field-link">
                                                <Input
                                                    placeholder="Например, https://vk.com/cco_monolit"
                                                    :maxlength="100"
                                                    v-model:value="link.link"
                                                    :readonly="
                                                        is_regional_commander
                                                    "
                                                />
                                                <div
                                                    type="button"
                                                    v-if="!block.is_verified"
                                                >
                                                    <svg
                                                        @click="
                                                            deleteLink(
                                                                index,
                                                                7,
                                                                'participation_data',
                                                            )
                                                        "
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
                                                            stroke="#939393"
                                                            stroke-linecap="round"
                                                        />
                                                        <path
                                                            d="M9 9L15 15"
                                                            stroke="#939393"
                                                            stroke-linecap="round"
                                                        />
                                                        <path
                                                            d="M15 9L9 15"
                                                            stroke="#939393"
                                                            stroke-linecap="round"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div class="form__counter">
                                                {{ link.link.length }} / 100
                                            </div>
                                        </template>
                                        <div
                                            class="form__field add-block"
                                            @click="
                                                AddLink(
                                                    index,
                                                    7,
                                                    'participation_data',
                                                    { link: '' },
                                                )
                                            "
                                            v-if="!is_regional_commander"
                                        >
                                            <p>+ добавить ссылку</p>
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Скан грамот (при наличии)</label
                                        >
                                        <div
                                            class="statement-item"
                                            v-if="!block.certificate_scans"
                                        >
                                            <img
                                                src="@app/assets/icon/addFile.svg"
                                                alt="addFile"
                                            />
                                            <FileUpload
                                                mode="basic"
                                                name="demo[]"
                                                accept=".pdf, .jpeg, .png"
                                                :customUpload="true"
                                                @select="
                                                    selectFile(
                                                        $event,
                                                        7,
                                                        'participation_data',
                                                        'certificate_scans',
                                                        index,
                                                    )
                                                "
                                                chooseLabel="Выбрать файл"
                                            />
                                        </div>

                                        <div v-else>
                                            <div
                                                class="flex flex-wrap p-0 sm:p-5 gap-5"
                                            >
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                                >
                                                    <img
                                                        class="addFile"
                                                        src="@app/assets/icon/addFile.svg"
                                                        alt="addFile"
                                                    />
                                                    <span
                                                        class="font-semibold"
                                                        >{{
                                                            block
                                                                .certificate_scans
                                                                .name
                                                        }}</span
                                                    >
                                                    <span
                                                        v-if="block.id"
                                                        class="font-semibold"
                                                        >{{
                                                            decodeURIComponent(
                                                                block.certificate_scans
                                                                    .split('/')
                                                                    .pop(),
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    type="button"
                                    v-if="
                                        !block.is_verified &&
                                        !is_regional_commander &&
                                        !block.id
                                    "
                                >
                                    <svg
                                        @click="
                                            deleteBlock(
                                                index,
                                                7,
                                                'participation_data',
                                            )
                                        "
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M9 9L15 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M15 9L9 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                v-if="!is_regional_commander"
                                class="form__field add-block"
                                @click="
                                    addNewBlock(7, 'participation_data', {
                                        event_name: '',
                                        number_of_participants: '',
                                        certificate_scans: null,
                                        links: [{ link: '' }],
                                    })
                                "
                            >
                                <p>+ Добавить мероприятие</p>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[7].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(7)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(8)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    8.&nbsp;Участие членов студенческого отряда
                                    во всероссийских мероприятиях РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one form__field-column-one-file"
                                v-for="(block, index) in report[8]
                                    .participation_data"
                                :key="index"
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
                                            :maxlength="100"
                                            v-model:value="block.event_name"
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ block.event_name.length }} / 100
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
                                            :maxlength="100"
                                            v-model:value="
                                                block.number_of_participants
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{
                                                block.number_of_participants
                                                    .length
                                            }}
                                            / 100
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
                                        <template
                                            v-for="(link, i) in block.links"
                                            :key="index + '_' + i"
                                        >
                                            <div class="form__field-link">
                                                <Input
                                                    placeholder="Например, https://vk.com/cco_monolit"
                                                    :maxlength="100"
                                                    v-model:value="link.link"
                                                    :readonly="
                                                        is_regional_commander
                                                    "
                                                />
                                                <div
                                                    type="button"
                                                    v-if="!block.is_verified"
                                                >
                                                    <svg
                                                        @click="
                                                            deleteLink(
                                                                index,
                                                                8,
                                                                'participation_data',
                                                            )
                                                        "
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
                                                            stroke="#939393"
                                                            stroke-linecap="round"
                                                        />
                                                        <path
                                                            d="M9 9L15 15"
                                                            stroke="#939393"
                                                            stroke-linecap="round"
                                                        />
                                                        <path
                                                            d="M15 9L9 15"
                                                            stroke="#939393"
                                                            stroke-linecap="round"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="form__counter">
                                                {{ link.link.length }} / 100
                                            </div>
                                        </template>
                                        <div
                                            class="form__field add-block"
                                            @click="
                                                AddLink(
                                                    index,
                                                    8,
                                                    'participation_data',
                                                    { link: '' },
                                                )
                                            "
                                            v-if="!is_regional_commander"
                                        >
                                            <p>+ добавить ссылку</p>
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Скан грамот (при наличии)</label
                                        >
                                        <div
                                            class="statement-item"
                                            v-if="!block.certificate_scans"
                                        >
                                            <img
                                                src="@app/assets/icon/addFile.svg"
                                                alt="addFile"
                                            />
                                            <FileUpload
                                                mode="basic"
                                                name="demo[]"
                                                accept=".pdf, .jpeg, .png"
                                                :customUpload="true"
                                                @select="
                                                    selectFile(
                                                        $event,
                                                        8,
                                                        'participation_data',
                                                        'certificate_scans',
                                                        index,
                                                    )
                                                "
                                                chooseLabel="Выбрать файл"
                                            />
                                        </div>

                                        <div v-else>
                                            <div
                                                class="flex flex-wrap p-0 sm:p-5 gap-5"
                                            >
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                                >
                                                    <img
                                                        src="@app/assets/icon/addFile.svg"
                                                        alt="addFile"
                                                        class="addFile"
                                                    />
                                                    <span
                                                        class="font-semibold"
                                                        >{{
                                                            block
                                                                .certificate_scans
                                                                .name
                                                        }}</span
                                                    >
                                                    <span
                                                        v-if="block.id"
                                                        class="font-semibold"
                                                        >{{
                                                            decodeURIComponent(
                                                                block.certificate_scans
                                                                    .split('/')
                                                                    .pop(),
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    type="button"
                                    v-if="
                                        !block.is_verified &&
                                        !is_regional_commander &&
                                        !block.id
                                    "
                                >
                                    <svg
                                        @click="
                                            deleteBlock(
                                                index,
                                                8,
                                                'participation_data',
                                            )
                                        "
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M9 9L15 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M15 9L9 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                v-if="!is_regional_commander"
                                class="form__field add-block"
                                @click="
                                    addNewBlock(8, 'participation_data', {
                                        event_name: '',
                                        number_of_participants: '',
                                        certificate_scans: null,
                                        links: [{ link: '' }],
                                    })
                                "
                            >
                                <p>+ Добавить мероприятие</p>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[8].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(8)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(9)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    9.&nbsp;Призовые места отряда в окружных и
                                    межрегиональных мероприятиях и конкурсах РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one form__field-column-one-file"
                                v-for="(block, index) in report[9]
                                    .participation_data"
                                :key="index"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование мероприятия или
                                            конкурса<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            placeholder="Например, Окружной слет студенческих отрядов ПФО"
                                            :maxlength="100"
                                            v-model:value="block.event_name"
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ block.event_name.length }} / 100
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
                                            v-model="block.prize_place"
                                            :options="prizePlaceChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
                                            variant="outlined"
                                            clearable
                                            :disabled="block.is_verified"
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
                                        <div
                                            class="statement-item"
                                            v-if="!block.certificate_scans"
                                        >
                                            <img
                                                src="@app/assets/icon/addFile.svg"
                                                alt="addFile"
                                            />
                                            <FileUpload
                                                mode="basic"
                                                name="demo[]"
                                                accept=".pdf, .jpeg, .png"
                                                :customUpload="true"
                                                @select="
                                                    selectFile(
                                                        $event,
                                                        9,
                                                        'participation_data',
                                                        'certificate_scans',
                                                        index,
                                                    )
                                                "
                                                chooseLabel="Выбрать файл"
                                            />
                                        </div>

                                        <div v-else>
                                            <div
                                                class="flex flex-wrap p-0 sm:p-5 gap-5"
                                            >
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                                >
                                                    <img
                                                        src="@app/assets/icon/addFile.svg"
                                                        alt="addFile"
                                                        class="addFile"
                                                    />
                                                    <span
                                                        class="font-semibold"
                                                        >{{
                                                            block
                                                                .certificate_scans
                                                                .name
                                                        }}</span
                                                    >
                                                    <span
                                                        v-if="block.id"
                                                        class="font-semibold"
                                                        >{{
                                                            decodeURIComponent(
                                                                block.certificate_scans
                                                                    .split('/')
                                                                    .pop(),
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    type="button"
                                    v-if="
                                        !block.is_verified &&
                                        !is_regional_commander &&
                                        !block.id
                                    "
                                >
                                    <svg
                                        @click="
                                            deleteBlock(
                                                index,
                                                9,
                                                'participation_data',
                                            )
                                        "
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M9 9L15 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M15 9L9 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                v-if="!is_regional_commander"
                                class="form__field add-block"
                                @click="
                                    addNewBlock(9, 'participation_data', {
                                        event_name: '',
                                        number_of_participants: '',
                                        certificate_scans: null,
                                    })
                                "
                            >
                                <p>+ Добавить мероприятие или конкурс</p>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[9].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(9)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(10)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    10.&nbsp;Призовые места отряда во
                                    Всероссийских мероприятиях и конкурсах РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one form__field-column-one-file"
                                v-for="(block, index) in report[10]
                                    .participation_data"
                                :key="index"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование мероприятия или
                                            конкурса<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            placeholder="Например, Всероссийский конкурс «В объективе РСО»"
                                            :maxlength="100"
                                            v-model:value="block.event_name"
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ block.event_name.length }} / 100
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
                                            v-model="block.prize_place"
                                            :options="prizePlaceChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
                                            variant="outlined"
                                            clearable
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
                                        <div
                                            class="statement-item"
                                            v-if="!block.certificate_scans"
                                        >
                                            <img
                                                src="@app/assets/icon/addFile.svg"
                                                alt="addFile"
                                            />
                                            <FileUpload
                                                mode="basic"
                                                name="demo[]"
                                                accept=".pdf, .jpeg, .png"
                                                :customUpload="true"
                                                @select="
                                                    selectFile(
                                                        $event,
                                                        10,
                                                        'participation_data',
                                                        'certificate_scans',
                                                        index,
                                                    )
                                                "
                                                chooseLabel="Выбрать файл"
                                            />
                                        </div>

                                        <div v-else>
                                            <div
                                                class="flex flex-wrap p-0 sm:p-5 gap-5"
                                            >
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                                >
                                                    <img
                                                        src="@app/assets/icon/addFile.svg"
                                                        alt="addFile"
                                                        class="addFile"
                                                    />
                                                    <span
                                                        class="font-semibold"
                                                        >{{
                                                            block
                                                                .certificate_scans
                                                                .name
                                                        }}</span
                                                    >
                                                    <span
                                                        v-if="block.id"
                                                        class="font-semibold"
                                                        >{{
                                                            decodeURIComponent(
                                                                block.certificate_scans
                                                                    .split('/')
                                                                    .pop(),
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    type="button"
                                    v-if="
                                        !block.is_verified &&
                                        !is_regional_commander &&
                                        !block.id
                                    "
                                >
                                    <svg
                                        @click="
                                            deleteBlock(
                                                index,
                                                10,
                                                'participation_data',
                                            )
                                        "
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M9 9L15 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M15 9L9 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                v-if="!is_regional_commander"
                                class="form__field add-block"
                                @click="
                                    addNewBlock(10, 'participation_data', {
                                        event_name: '',
                                        number_of_participants: '',
                                        certificate_scans: null,
                                    })
                                "
                            >
                                <p>+ Добавить мероприятие или конкурс</p>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[10].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(10)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(11)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    11.&nbsp;Призовые места отряда на окружных и
                                    межрегиональных трудовых проектах
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one form__field-column-one-file"
                                v-for="(block, index) in report[11]
                                    .participation_data"
                                :key="index"
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
                                            :maxlength="100"
                                            v-model:value="block.event_name"
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ block.event_name.length }} / 100
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
                                            v-model="block.prize_place"
                                            :options="prizePlaceChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
                                            clearable
                                            variant="outlined"
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
                                        <div
                                            class="statement-item"
                                            v-if="!block.certificate_scans"
                                        >
                                            <img
                                                src="@app/assets/icon/addFile.svg"
                                                alt="addFile"
                                            />

                                            <FileUpload
                                                mode="basic"
                                                name="demo[]"
                                                accept=".pdf, .jpeg, .png"
                                                :customUpload="true"
                                                @select="
                                                    selectFile(
                                                        $event,
                                                        11,
                                                        'participation_data',
                                                        'certificate_scans',
                                                        index,
                                                    )
                                                "
                                                chooseLabel="Выбрать файл"
                                            />
                                        </div>

                                        <div v-else>
                                            <div
                                                class="flex flex-wrap p-0 sm:p-5 gap-5"
                                            >
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                                >
                                                    <img
                                                        src="@app/assets/icon/addFile.svg"
                                                        alt="addFile"
                                                        class="addFile"
                                                    />

                                                    <span
                                                        class="font-semibold"
                                                        >{{
                                                            block
                                                                .certificate_scans
                                                                .name
                                                        }}</span
                                                    >
                                                    <span
                                                        v-if="block.id"
                                                        class="font-semibold"
                                                        >{{
                                                            decodeURIComponent(
                                                                block.certificate_scans
                                                                    .split('/')
                                                                    .pop(),
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    type="button"
                                    v-if="
                                        !block.is_verified &&
                                        !is_regional_commander &&
                                        !block.id
                                    "
                                >
                                    <svg
                                        @click="
                                            deleteBlock(
                                                index,
                                                11,
                                                'participation_data',
                                            )
                                        "
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M9 9L15 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M15 9L9 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                v-if="!is_regional_commander"
                                class="form__field add-block"
                                @click="
                                    addNewBlock(11, 'participation_data', {
                                        event_name: '',
                                        number_of_participants: '',
                                        certificate_scans: null,
                                    })
                                "
                            >
                                <p>+ добавить проект</p>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[11].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(11)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(12)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    12.&nbsp;Призовые места отряда на
                                    всероссийских трудовых проектах
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one form__field-column-one-file"
                                v-for="(block, index) in report[12]
                                    .participation_data"
                                :key="index"
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
                                            :maxlength="100"
                                            v-model:value="block.event_name"
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ block.event_name.length }} / 100
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
                                            v-model="block.prize_place"
                                            :options="prizePlaceChoose"
                                            optionLabel="name"
                                            class="invents-select"
                                            :sorts-boolean="false"
                                            clearable
                                            variant="outlined"
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
                                        <div
                                            class="statement-item"
                                            v-if="!block.certificate_scans"
                                        >
                                            <img
                                                src="@app/assets/icon/addFile.svg"
                                                alt="addFile"
                                            />
                                            <FileUpload
                                                mode="basic"
                                                name="demo[]"
                                                accept=".pdf, .jpeg, .png"
                                                :customUpload="true"
                                                @select="
                                                    selectCertScans(
                                                        $event,
                                                        index,
                                                    )
                                                "
                                                chooseLabel="Выбрать файл"
                                            />
                                        </div>

                                        <div v-else>
                                            <div
                                                class="flex flex-wrap p-0 sm:p-5 gap-5"
                                            >
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                                >
                                                    <img
                                                        src="@app/assets/icon/addFile.svg"
                                                        alt="addFile"
                                                        class="addFile"
                                                    />
                                                    <span
                                                        class="font-semibold"
                                                        >{{
                                                            block
                                                                .certificate_scans
                                                                .name
                                                        }}</span
                                                    >
                                                    <span
                                                        v-if="block.id"
                                                        class="font-semibold"
                                                        >{{
                                                            decodeURIComponent(
                                                                block.certificate_scans
                                                                    .split('/')
                                                                    .pop(),
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    type="button"
                                    v-if="
                                        !block.is_verified &&
                                        !is_regional_commander &&
                                        !block.id
                                    "
                                >
                                    <svg
                                        @click="
                                            deleteBlock(
                                                index,
                                                12,
                                                'participation_data',
                                            )
                                        "
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M9 9L15 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M15 9L9 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                v-if="!is_regional_commander"
                                class="form__field add-block"
                                @click="
                                    addNewBlock(12, 'participation_data', {
                                        event_name: '',
                                        number_of_participants: '',
                                        certificate_scans: null,
                                    })
                                "
                            >
                                <p>+ добавить проект</p>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[12].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(12)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(13)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    13.&nbsp;Организация собственных мероприятий
                                    отряда
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one form__field-column-one-file"
                                v-for="(block, index) in report[13]
                                    .organization_data"
                                :key="index"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Выберите тип мероприятия<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <sortByEducation
                                            v-model="block.event_type"
                                            :options="typeEventChoose"
                                            class="invents-select"
                                            clearable
                                            placeholder="Например, спортивное"
                                            variant="outlined"
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
                                            :maxlength="100"
                                            v-model:value="block.event_link"
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ block.event_link.length }} / 100
                                        </div>
                                    </div>
                                </div>
                                <div
                                    type="button"
                                    v-if="
                                        !block.is_verified &&
                                        !is_regional_commander &&
                                        !block.id
                                    "
                                >
                                    <svg
                                        @click="
                                            deleteBlock(
                                                index,
                                                13,
                                                'organization_data',
                                            )
                                        "
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M9 9L15 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M15 9L9 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                v-if="!is_regional_commander"
                                class="form__field add-block"
                                @click="
                                    addNewBlock(13, 'organization_data', {
                                        event_type: '',
                                        event_link: '',
                                    })
                                "
                            >
                                <p>+ добавить мероприятие</p>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[13].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(13)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(14)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    14.&nbsp;Отношение количества бойцов,
                                    отработавших в летнем трудовом семестре к
                                    общему числу членов отряда
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one form__field-column-one-file"
                                v-for="(block, index) in report[14]
                                    .q14_labor_projects"
                                :key="index"
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
                                            :maxlength="100"
                                            v-model:value="
                                                block.lab_project_name
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ block.lab_project_name.length }}
                                            / 100
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
                                            :maxlength="100"
                                            v-model:value="block.amount"
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ block.amount.length }} / 100
                                        </div>
                                    </div>
                                </div>
                                <div
                                    type="button"
                                    v-if="
                                        !block.is_verified &&
                                        !is_regional_commander &&
                                        !block.id
                                    "
                                >
                                    <svg
                                        @click="
                                            deleteBlock(
                                                index,
                                                14,
                                                'q14_labor_projects',
                                            )
                                        "
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M9 9L15 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M15 9L9 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                v-if="!is_regional_commander"
                                class="form__field add-block"
                                @click="
                                    addNewBlock(14, 'q14_labor_projects', {
                                        lab_project_name: '',
                                        amount: '',
                                    })
                                "
                            >
                                <p>+ добавить проект</p>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[14].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(14)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 30 сентября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(15)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    15.&nbsp;Победы членов отряда в
                                    региональных, окружных и всероссийских
                                    грантовых конкурсах, направленных на
                                    развитие студенческих отрядов
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one form__field-column-one-file"
                                v-for="(block, index) in report[15].grants_data"
                                :key="index"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Полное название грантового
                                            проекта<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            placeholder="Например, Всероссийский конкурс молодёжных проектов среди физических лиц Федерального агентства по делам молодежи"
                                            :maxlength="100"
                                            v-model:value="block.name"
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ block.name.length }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Статус конкурса<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <sortByEducation
                                            placeholder="Например, окружной"
                                            v-model="block.status"
                                            :options="statusChoose"
                                            class="invents-select"
                                            clearable
                                            variant="outlined"
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
                                            :maxlength="100"
                                            v-model:value="block.author_name"
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ block.author_name.length }} / 100
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
                                            :maxlength="100"
                                            v-model:value="
                                                block.competition_link
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ block.competition_link.length }}
                                            / 100
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
                                            :maxlength="100"
                                            v-model:value="block.prove_link"
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ block.prove_link.length }} / 100
                                        </div>
                                    </div>
                                </div>
                                <div
                                    type="button"
                                    v-if="
                                        !block.is_verified &&
                                        !is_regional_commander &&
                                        !block.id
                                    "
                                >
                                    <svg
                                        @click="
                                            deleteBlock(
                                                index,
                                                15,
                                                'grants_data',
                                            )
                                        "
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M9 9L15 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M15 9L9 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                v-if="!is_regional_commander"
                                class="form__field add-block"
                                @click="
                                    addNewBlock(15, 'grants_data', {
                                        name: '',
                                        status: '',
                                        author_name: '',
                                        competition_link: '',
                                        prove_link: '',
                                    })
                                "
                            >
                                <p>+ добавить проект</p>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[15].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(15)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(16)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    16.&nbsp;Активность отряда в социальных
                                    сетях
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
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
                                            :maxlength="100"
                                            v-model:value="
                                                report[16].link_vk_commander
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{
                                                report[16].link_vk_commander
                                                    .length
                                            }}
                                            / 100
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
                                            :maxlength="100"
                                            v-model:value="
                                                report[16].link_vk_commissar
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{
                                                report[16].link_vk_commissar
                                                    .length
                                            }}
                                            / 100
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
                                            :maxlength="100"
                                            v-model:value="
                                                report[16]
                                                    .vk_rso_number_subscribers
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{
                                                report[16]
                                                    .vk_rso_number_subscribers
                                                    .length
                                            }}
                                            / 100
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
                                            :maxlength="100"
                                            v-model:value="
                                                report[16].link_vk_detachment
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{
                                                report[16].link_vk_detachment
                                                    .length
                                            }}
                                            / 100
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
                                            :maxlength="100"
                                            v-model:value="
                                                report[16]
                                                    .vk_detachment_number_subscribers
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{
                                                report[16]
                                                    .vk_detachment_number_subscribers
                                                    .length
                                            }}
                                            / 100
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[16].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(16)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 15 октября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(17)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    17.&nbsp;Количество упоминаний в СМИ о
                                    прошедших творческих, добровольческих и
                                    патриотических мероприятиях отряда
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one form__field-column-one-file"
                                v-for="(block, index) in report[17].source_data"
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
                                            :maxlength="100"
                                            v-model:value="block.source_name"
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ block.source_name.length }} / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на публикацию<span
                                                >&nbsp;*</span
                                            >
                                        </label>
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            :maxlength="100"
                                            v-model:value="block.link"
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ block.link.length }} / 100
                                        </div>
                                    </div>
                                </div>
                                <div
                                    type="button"
                                    v-if="
                                        !block.is_verified &&
                                        !is_regional_commander &&
                                        !block.id
                                    "
                                >
                                    <svg
                                        @click="
                                            deleteBlock(
                                                index,
                                                17,
                                                'source_data',
                                            )
                                        "
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M9 9L15 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            d="M15 9L9 15"
                                            stroke="#939393"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                v-if="!is_regional_commander"
                                class="form__field add-block"
                                @click="
                                    addNewBlock(17, 'source_data', {
                                        source_name: '',
                                        link: '',
                                    })
                                "
                            >
                                + Добавить источник
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[17].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(17)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 30 сентября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(18)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    18.&nbsp;Охват бойцов, принявших участие во
                                    Всероссийском дне ударного труда
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
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
                                            :maxlength="100"
                                            v-model:value="
                                                report[18].participants_number
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{
                                                report[18].participants_number
                                                    .length
                                            }}
                                            / 100
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[18].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(18)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 30 сентября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(19)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    19.&nbsp;Отсутствие нарушений техники
                                    безопасности, охраны труда и противопожарной
                                    безопасности в трудовом семестре
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
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
                                            v-model="
                                                report[19].safety_violations
                                            "
                                            :options="precautionChoose"
                                            class="invents-select"
                                            clearable
                                            placeholder="Например, отсутствуют"
                                            variant="outlined"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[19].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(19)"
                                    />
                                </div>
                                <p>
                                    Срок предоставления отчетности по показателю
                                    по 30 сентября 2024 года включительно.
                                </p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title @click="getParameters(20)">
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    20.&nbsp;Соответствие требованиям и
                                    положения символики и атрибутике форменной
                                    одежды и символики отрядов
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <svg-icon name="wrap" :flip="expanded" />
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
                                            :maxlength="100"
                                            v-model:value="
                                                report[20].link_emblem
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ report[20].link_emblem.length }}
                                            / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на макет эмблемы</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            :maxlength="100"
                                            v-model:value="
                                                report[20].link_emblem_img
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{
                                                report[20].link_emblem_img
                                                    .length
                                            }}
                                            / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на фото флага</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            :maxlength="100"
                                            v-model:value="report[20].link_flag"
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ report[20].link_flag.length }} /
                                            100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на макет флага</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            :maxlength="100"
                                            v-model:value="
                                                report[20].link_flag_img
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{
                                                report[20].link_flag_img.length
                                            }}
                                            / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на фото знамени</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            :maxlength="100"
                                            v-model:value="
                                                report[20].link_banner
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{ report[20].link_banner.length }}
                                            / 100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на макет знамени</label
                                        >
                                        <Input
                                            placeholder="Например, https://vk.com/cco_monolit"
                                            :maxlength="100"
                                            v-model:value="
                                                report[20].link_banner_img
                                            "
                                            :readonly="is_regional_commander"
                                        />
                                        <div class="form__counter">
                                            {{
                                                report[20].link_banner_img
                                                    .length
                                            }}
                                            / 100
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form__field-group-bottom">
                                <div class="form__field-group-bottom-btn">
                                    <v-progress-circular
                                        class="circleLoader"
                                        v-if="isLoading"
                                        indeterminate
                                        color="blue"
                                    ></v-progress-circular>
                                    <Button
                                        v-if="!is_regional_commander"
                                        type="button"
                                        :disabled="report[20].disabledBtn"
                                        class="form__button form__button-color"
                                        label="Отправить данные на верификацию"
                                        size="large"
                                        @click="postParameters(20)"
                                    />
                                </div>
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
import { Input } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { ref, inject, onMounted, computed, watch } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';
import { sortByEducation } from '@shared/components/selects';
import { SvgIcon } from '@shared';

const is_regional_commander = ref();

const route = useRoute();

const swal = inject('$swal');

const isError = ref({});
const isLoading = ref(false);

const Choose = ref([
    { value: true, name: 'Да' },
    { value: false, name: 'Нет' },
]);

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

const festivalChoose = ref([
    { value: true, name: 'Да' },
    { value: false, name: 'Нет' },
]);

const statusChoose = ref([
    { name: 'Региональный', value: 'Региональный' },
    { name: 'Окружной', value: 'Окружной' },
    { name: 'Всероссийский', value: 'Всероссийский' },
]);

const typeEventChoose = ref([
    { value: 'Спортивное', name: 'Спортивное' },
    { value: 'Интеллектуальное', name: 'Интеллектуальное' },
    { value: 'Творческое', name: 'Творческое' },
    { value: 'Волонтерское', name: 'Волонтерское' },
    { value: 'Внутреннее', name: 'Внутреннее' },
]);

const prizePlaceChoose = ref([
    { name: '1', value: 1 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
]);

const selectFile = (e, id, field, subfield, index) => {
    if (subfield) report.value[id][field][index][subfield] = e.files[0];
    else report.value[id][field] = e.files[0];
};

const addNewBlock = (sectionIndex, NameSection, fields) => {
    report.value[sectionIndex][NameSection].push(fields);
    if (sectionIndex === 5 || sectionIndex === 17) {
        report.value[sectionIndex].disabledBtn = false;
    }
};

const AddLink = (index, sectionIndex, nameSection, fields) => {
    report.value[sectionIndex][nameSection][index].links.push(fields);
};

const deleteBlock = (index, sectionIndex, nameSection) => {
    report.value[sectionIndex][nameSection].splice(index, 1);
};

const deleteLink = (index, sectionIndex, nameSection) => {
    report.value[sectionIndex][nameSection][index].links.splice(index, 1);
};
const report = ref({
    1: { number_of_members: '', number_of_payments: '' },
    2: {
        commander_achievement: null,
        commissioner_achievement: null,
        commander_link: '',
        commissioner_link: '',
        disabledBtn: false,
    },
    3: { place: '' },
    4: { place: '' },
    5: {
        participants_data: [{ name: '', document: null }],
        disabledBtn: false,
        show_btn: false,
    },
    61: {
        demonstration_block: {
            first_may_demonstration: null,
            first_may_demonstration_participants: '',
            disabledBtn: false,
        },
    },
    62: {
        patriotic_action_block: {
            patriotic_action: null,
            patriotic_action_participants: '',
            disabledBtn: false,
        },
    },
    63: {
        safety_work_week_block: { safety_work_week: null, disabledBtn: false },
    },
    64: {
        commander_commissioner_school_block: {
            commander_commissioner_school: null,
            disabledBtn: false,
        },
    },
    65: {
        working_semester_opening_block: {
            working_semester_opening: null,
            working_semester_opening_participants: '',
            disabledBtn: false,
        },
    },
    66: {
        creative_festival_block: {
            creative_festival: null,
            disabledBtn: false,
        },
    },
    67: { spartakiad_block: { spartakiad: null, disabledBtn: false } },
    68: {
        professional_competition_block: {
            professional_competition: null,
            disabledBtn: false,
        },
    },
    7: {
        participation_data: [
            {
                event_name: '',
                number_of_participants: '',
                links: [{ link: '' }],
            },
        ],
        disabledBtn: false,
        show_btn: false,
    },
    8: {
        participation_data: [
            {
                event_name: '',
                number_of_participants: '',
                links: [{ link: '' }],
            },
        ],
        disabledBtn: false,
        show_btn: false,
    },
    9: {
        participation_data: [
            {
                event_name: '',
                prize_place: null,
                certificate_scans: null,
            },
        ],
        disabledBtn: false,
        show_btn: false,
    },
    10: {
        participation_data: [
            {
                event_name: '',
                prize_place: null,
                certificate_scans: null,
            },
        ],
        disabledBtn: false,
        show_btn: false,
    },
    11: {
        participation_data: [
            {
                event_name: '',
                prize_place: null,
                certificate_scans: null,
            },
        ],
        disabledBtn: false,
        show_btn: false,
    },
    12: {
        participation_data: [
            { event_name: '', prize_place: null, certificate_scans: null },
        ],
        disabledBtn: false,
        show_btn: false,
    },
    13: {
        organization_data: [{ event_type: null, event_link: '' }],
        disabledBtn: false,
        show_btn: false,
    },
    14: {
        q14_labor_projects: [{ lab_project_name: '', amount: '' }],
        disabledBtn: false,
        show_btn: false,
    },
    15: {
        grants_data: [
            {
                name: '',
                status: null,
                author_name: '',
                competition_link: '',
                prove_link: '',
            },
        ],
        disabledBtn: false,
        show_btn: false,
    },
    16: {
        link_vk_commander: '',
        link_vk_commissar: '',
        vk_rso_number_subscribers: '',
        link_vk_detachment: '',
        vk_detachment_number_subscribers: '',
        disabledBtn: false,
    },
    17: {
        source_data: [{ source_name: '', link: '' }],
        disabledBtn: false,
        show_btn: false,
    },
    18: { participants_number: '', disabledBtn: false },
    19: { safety_violations: null, disabledBtn: false },
    20: {
        link_emblem: '',
        link_emblem_img: '',
        link_flag: '',
        link_flag_img: '',
        link_banner: '',
        link_banner_img: '',
        disabledBtn: false,
    },
});

const selectCertScans = (event, index) => {
    report.value[12].participation_data[index].certificate_scans =
        event.files[0];
    console.log(
        'файл есть',
        report.value[12].participation_data.certificate_scans,
    );
};

const getParametersRegCom = async (id) => {
    try {
        const { data } = await HTTP.get(
            `/competitions/${route.params.competition_pk}/detachment/${route.params.id}/q/${id}/`,
        );
        if (id == 6) {
            if (data.demonstration_block) {
                report.value[61].demonstration_block = data.demonstration_block;
            }
            if (data.patriotic_action_block) {
                report.value[62].patriotic_action_block =
                    data.patriotic_action_block;
            }
            if (data.safety_work_week_block) {
                report.value[63].safety_work_week_block =
                    data.safety_work_week_block;
            }
            if (data.commander_commissioner_school_block) {
                report.value[64].commander_commissioner_school_block =
                    data.commander_commissioner_school_block;
            }
            if (data.working_semester_opening_block) {
                report.value[65].working_semester_opening_block =
                    data.working_semester_opening_block;
            }
            if (data.creative_festival_block) {
                report.value[66].creative_festival_block =
                    data.creative_festival_block;
            }
            if (data.spartakiad_block) {
                report.value[67].spartakiad_block = data.spartakiad_block;
            }
            if (data.professional_competition_block) {
                report.value[68].professional_competition_block =
                    data.professional_competition_block;
            }
        } else if (id == 5) {
            if (data.q5educatedparticipant_set) {
                report.value[5].participants_data =
                    data.q5educatedparticipant_set;
            }
        } else if ([7, 8, 9, 10, 11, 12].includes(id)) {
            if (data.participation_data) {
                report.value[id].participation_data = data.participation_data;
            }
        } else if (id == 13) {
            if (data.organization_data) {
                report.value[13].organization_data = data.organization_data;
            }
        } else if (id == 14) {
            if (data.q14_labor_project) {
                report.value[14].q14_labor_projects = data.q14_labor_project;
            }
        } else if (id == 15) {
            if (data.q15grantwinner_set) {
                report.value[15].grants_data = data.q15grantwinner_set;
            }
        } else if (id == 17) {
            if (data.q17_event_links) {
                report.value[17].source_data = data.q17_event_links;
            }
        } else {
            report.value[id] = data;
        }
        console.log(data);
    } catch (error) {
        isError.value = error.response;
    }
    isLoading.value = false;
};

const getParameters = async (id) => {
    isLoading.value = true;
    if (is_regional_commander.value) {
        await getParametersRegCom(id);
    } else {
        try {
            const response = await HTTP.get(
                `/competitions/${route.params.competition_pk}/reports/q${id}/` +
                    (id == 1 ? 'info/' : 'me/'),
            );
            if (id == 1 || id == 3 || id == 4) report.value[id] = response.data;
            else if (response.data.results.length) {
                if (
                    id == 6 &&
                    route.params.id == response.data.results[0].detachment
                ) {
                    if (
                        response.data.results[0].demonstration_block
                            ?.first_may_demonstration
                    ) {
                        report.value[61].demonstration_block.first_may_demonstration =
                            response.data.results[0].demonstration_block.first_may_demonstration;
                        report.value[61].demonstration_block.first_may_demonstration_participants =
                            response.data.results[0].demonstration_block.first_may_demonstration_participants;
                        report.value[61].disabledBtn = true;
                    } else {
                        report.value[61].demonstration_block.first_may_demonstration =
                            null;
                        report.value[61].demonstration_block.first_may_demonstration_participants =
                            '';
                    }
                    if (
                        response.data.results[0].patriotic_action_block
                            ?.patriotic_action_participants
                    ) {
                        report.value[62].patriotic_action_block.patriotic_action =
                            response.data.results[0].patriotic_action_block.patriotic_action;
                        report.value[62].patriotic_action_block.patriotic_action_participants =
                            response.data.results[0].patriotic_action_block.patriotic_action_participants;
                        report.value[62].disabledBtn = true;
                    } else {
                        report.value[62].patriotic_action_block.patriotic_action =
                            null;
                        report.value[62].patriotic_action_block.patriotic_action_participants =
                            '';
                    }
                    if (
                        response.data.results[0].safety_work_week_block
                            ?.safety_work_week
                    ) {
                        report.value[63].disabledBtn = true;
                        report.value[63].safety_work_week_block.safety_work_week =
                            response.data.results[0].safety_work_week_block.safety_work_week;
                    } else {
                        report.value[63].safety_work_week_block.safety_work_week =
                            null;
                    }
                    if (
                        response.data.results[0]
                            .commander_commissioner_school_block
                            ?.commander_commissioner_school
                    ) {
                        report.value[64].disabledBtn = true;
                        report.value[64].commander_commissioner_school_block.commander_commissioner_school =
                            response.data.results[0].commander_commissioner_school_block.commander_commissioner_school;
                    } else {
                        report.value[64].commander_commissioner_school_block.commander_commissioner_school =
                            null;
                    }
                    if (
                        response.data.results[0].working_semester_opening_block
                            ?.working_semester_opening
                    ) {
                        report.value[65].disabledBtn = true;
                        report.value[65].working_semester_opening_block.working_semester_opening =
                            response.data.results[0].working_semester_opening_block.working_semester_opening;
                        report.value[65].working_semester_opening_block.working_semester_opening_participants =
                            response.data.results[0].working_semester_opening_block.working_semester_opening_participants;
                    } else {
                        report.value[65].working_semester_opening_block.working_semester_opening =
                            null;
                        report.value[65].working_semester_opening_block.working_semester_opening_participants =
                            '';
                    }
                    if (
                        response.data.results[0].creative_festival_block
                            ?.creative_festival
                    ) {
                        report.value[66].disabledBtn = true;
                        report.value[66].creative_festival_block.creative_festival =
                            response.data.results[0].creative_festival_block.creative_festival;
                    } else {
                        report.value[66].creative_festival_block.creative_festival =
                            null;
                    }
                    if (response.data.results[0].spartakiad_block?.spartakiad) {
                        report.value[67].disabledBtn = true;
                        report.value[67].spartakiad_block.spartakiad =
                            response.data.results[0].spartakiad_block.spartakiad;
                    } else {
                        report.value[67].spartakiad_block.spartakiad = null;
                    }
                    if (
                        response.data.results[0].professional_competition_block
                            ?.professional_competition
                    ) {
                        report.value[68].disabledBtn = true;
                        report.value[68].professional_competition_block.professional_competition =
                            response.data.results[0].professional_competition_block.professional_competition;
                    } else {
                        report.value[68].professional_competition_block.professional_competition =
                            null;
                    }
                } else {
                    if (report.value[id].participation_data) {
                        report.value[id].participation_data =
                            response.data.results;
                    } else report.value[id] = response.data.results[0];
                    console.log(`true`);
                    report.value[id].disabledBtn = true;
                }
            }
            isLoading.value = false;
            const allowedIds = [5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17];
            if (allowedIds.includes(id)) {
                report.value[id].disabledBtn = false;
            }
        } catch (error) {
            isError.value = error.response;
        }
    }
};
const postParameters = async (id) => {
    if (report.value[id].disabledBtn) return false;
    try {
        report.value[id].disabledBtn = true;
        let fd = report.value[id];
        let type = 'application/json';
        const allowedIds = [5, 7, 8, 9, 10, 11, 12];
        if (allowedIds.includes(id)) {
            type = 'multipart/form-data';
            fd = new FormData();
            for (let i in report.value[id]) {
                let field = report.value[id][i];
                if (Array.isArray(field)) {
                    for (let k in field) {
                        for (let j in field[k]) {
                            if (Array.isArray(field[k][j])) {
                                let temp = field[k][j];
                                for (let k1 in temp) {
                                    for (let j1 in temp[k1]) {
                                        fd.append(
                                            i +
                                                '[' +
                                                k +
                                                '][' +
                                                j +
                                                ']' +
                                                '[' +
                                                k1 +
                                                '][' +
                                                j1 +
                                                ']',
                                            temp[k1][j1],
                                        );
                                    }
                                }
                            } else
                                fd.append(
                                    i + '[' + k + '][' + j + ']',
                                    field[k][j],
                                );
                        }
                    }
                } else {
                    fd.append(i, field);
                }
            }
        }

        let index = id > 60 ? 6 : id;
        let dataName = 'participation_data';
        if (id == 5) dataName = 'participants_data';
        if (id == 13) dataName = 'organization_data';
        if (id == 14) dataName = 'q14_labor_projects';
        if (id == 15) dataName = 'grants_data';
        if (id == 17) dataName = 'source_data';
        console.log(report.value[id]);
        if (
            report.value[id]?.id ||
            report.value[id]?.participation_data?.[0]?.detachment_report?.id
        ) {
            let data = {};
            data['' + dataName] = [];
            if (!(id == 2 || id == 6 || id == 16 || id >= 18)) {
                for (let i in report.value[id][dataName]) {
                    let temp = report.value[id][dataName][i];
                    if (temp.id) {
                        if (!temp.is_verified) {
                            delete temp.document;
                            delete temp.certificate_scans;
                        }
                        if (temp.is_verified) {
                            continue;
                        }
                        const allowedIds = [7, 8, 9, 10, 11, 12];
                        if (allowedIds.includes(id)) {
                            if (temp.id) continue;
                            await HTTP.patch(
                                `/competitions/${route.params.competition_pk}/reports/q${index}/${report.value[id].participation_data[0].detachment_report.id}/objects/${temp.id}/`,
                                temp,
                                {
                                    headers: {
                                        'Content-Type': type,
                                    },
                                },
                            );
                        } else {
                            await HTTP.patch(
                                `/competitions/${route.params.competition_pk}/reports/q${index}/${report.value[id].id}/objects/${temp.id}/`,
                                temp,
                                {
                                    headers: {
                                        'Content-Type': type,
                                    },
                                },
                            );
                        }
                    } else {
                        data[dataName].push(temp);
                    }
                }
                if (data[dataName].length > 0) {
                    await HTTP.post(
                        `/competitions/${route.params.competition_pk}/reports/q${index}/`,
                        data,
                        {
                            headers: {
                                'Content-Type': type,
                            },
                        },
                    );
                }
            } else if (id == 20 || id == 16) {
                let data_for_save = report.value[id];
                delete data_for_save.disabledBtn;
                await HTTP.patch(
                    `/competitions/${route.params.competition_pk}/reports/q${index}/${report.value[id].id}/`,
                    data_for_save,
                    {
                        headers: {
                            'Content-Type': type,
                        },
                    },
                );
            }
        } else {
            if (id == 16) {
                if (!fd.vk_rso_number_subscribers)
                    fd.vk_rso_number_subscribers = 0;
                if (!fd.vk_detachment_number_subscribers)
                    fd.vk_detachment_number_subscribers = 0;
            }
            delete fd.disabledBtn;
            console.log(fd);
            await HTTP.post(
                `/competitions/${route.params.competition_pk}/reports/q${index}/`,
                fd,
                {
                    headers: {
                        'Content-Type': type,
                    },
                },
            );
        }
        isLoading.value = false;
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
        await getParameters(id);
    } catch (error) {
        console.log(error);
        isError.value = error.response.data;
        isLoading.value = false;
        report.value[id].disabledBtn = false;
        if (isError.value && (id < 60 || id != 2)) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `ошибка`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
        if (isError.value && (id > 60 || id == 2)) {
            swal.fire({
                position: 'center',
                title: `К сожалению, срок отправки данных по показателю истек.`,
                showConfirmButton: false,
                timer: 3000,
            });
        }
    }
    report.value[id].disabledBtn = false;
};

const getMeCommander = async () => {
    try {
        const { data } = await HTTP.get(`/rsousers/me_commander/`);
        if (
            data.regionalheadquarter_commander &&
            data.detachment_commander?.id != route.params.id
        ) {
            is_regional_commander.value = true;
        }
    } catch (e) {
        console.log(`getMeCommander error`, e);
    }
};

watch(
    () => report.value[16],
    () => {
        report.value[16].disabledBtn = false;
    },
    { deep: true },
);

watch(
    () => report.value[20],
    () => {
        report.value[20].disabledBtn = false;
    },
    { deep: true },
);

onMounted(async (id) => {
    // report.value = JSON.parse(JSON.stringify(reportBase));
    await getParameters(id);
    await getMeCommander();
});
console.log(report);
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

.form__field-group-bottom-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    margin-top: 40px;
}

.add-link {
    cursor: pointer;
    max-width: fit-content;
    border-bottom: 1px solid #35383f;
}

.form__field-file {
    grid-template-columns: 10fr 10fr 0.5fr;
}

.form__field-column-one-file {
    grid-template-columns: 10fr 0.5fr;
}

.form__button-color:disabled {
    background-color: #b6b6b6;
    border-color: #b6b6b6;
}

.card {
    position: relative;
}

.addFile {
    position: absolute;
    top: 4px;
    left: 1px;
}

.statement-item {
    display: flex;
    margin-top: 12px;
    margin-right: 30px;
}

.statement-item p,
.statement-item a {
    text-decoration: none;
    font-size: 16px;
    display: block;
    margin-left: 8px;

    @media (max-width: 768px) {
        font-size: 14px;
        max-width: 290px;
    }
}

.statement-item a {
    color: #1f7cc0;
}

.p-icon {
    display: none !important;
}

.p-button-label {
    color: #1f7cc0;
    margin-left: 5px;
}

.form__field-link {
    display: grid;
    grid-template-columns: 10fr 0.5fr;
    grid-column-gap: 5px;
}

.form__field-link svg {
    margin-top: 10px;
}

table {
    width: 100%;
    border-top: 1px solid #d9d9d9;
    border-collapse: collapse;
    text-align: center;
    margin-bottom: 20px;
    border: 1px solid #dddddd;
}

td {
    font-size: 18px;
    line-height: 23.74px;
    width: 50%;
    text-align: center;
    padding: 20px;
    border: 1px solid #d9d9d9;
}

.form_place p {
    margin-top: 20px;
    margin-bottom: 10px;
    font-family: Bert Sans;
    font-size: 16px;
    color: #35383f;
}

.btn_large {
    padding: 12px 32px !important;
}

.error {
    color: #db0000;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Acrobat';
}
</style>
