<template>
    <div class="container">
        <h1 class="title title--mb">Данные пользователя по показателям</h1>
        <form class="form" action="#" method="post" v-if="!loading">
            <v-expansion-panels>
                <v-expansion-panel v-if="id == 2">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    2. Прохождение Командиром и Комиссаром
                                    студенческого отряда региональной школы
                                    командного состава
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
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
                <v-expansion-panel v-else-if="id == 5">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    5. Процент членов студенческого отряда,
                                    прошедших профессиональное обучение
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top"
                                v-for="participant in applicationData.participants_data"
                                :key="participant.id"
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
                                            type="text"
                                            v-model:value="participant.name"
                                            readonly
                                        />
                                    </div>
                                </div>
                                <div class="form__field-group-right">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Документ, подтверждающий
                                            прохождение профессионального
                                            обучения<span>&nbsp;*</span></label
                                        >
                                        <div class="file">
                                            <div class="file_name">
                                                <SvgIcon
                                                    class="file_img"
                                                    icon-name="file-dock"
                                                />
                                                <a
                                                    :href="participant.document"
                                                    target="_blank"
                                                    class="file_title"
                                                    >{{
                                                        participant.document_name.slice(
                                                            participant.document_name.indexOf(
                                                                '/media/',
                                                            ) + 7,
                                                        )
                                                    }}</a
                                                >
                                            </div>
                                            <a
                                                class="download_text"
                                                :href="participant.document"
                                                target="_blank"
                                            >
                                                <SvgIcon
                                                    class="download_img"
                                                    iconName="download"
                                                />
                                                скачать файл
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 6">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    6. Участие членов студенческого отряда в
                                    обязательных общесистемных мероприятиях на
                                    региональном уровне
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text
                        class="form__inner-content"
                        v-if="
                            applicationData.demonstration_block &&
                            !applicationData.demonstration_block?.is_verified
                        "
                    >
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
                                            v-if="
                                                applicationData
                                                    .demonstration_block
                                                    .first_may_demonstration
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
                                            >Количество участников мероприятия
                                            Демонстрация 1 мая
                                            <span>&nbsp;*</span></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData
                                                    .demonstration_block
                                                    .first_may_demonstration_participants
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text
                        class="form__inner-content"
                        v-if="
                            applicationData.patriotic_action_block &&
                            !applicationData.patriotic_action_block?.is_verified
                        "
                    >
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
                                            v-if="
                                                applicationData
                                                    .patriotic_action_block
                                                    .patriotic_action
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
                                            >Количество участников всероссийской
                                            патриотической акции «Поклонимся
                                            великим тем годам»<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData
                                                    .patriotic_action_block
                                                    .patriotic_action_participants
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text
                        class="form__inner-content"
                        v-if="
                            applicationData.safety_work_week_block &&
                            !applicationData.safety_work_week_block?.is_verified
                        "
                    >
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
                                            v-if="
                                                applicationData
                                                    .safety_work_week_block
                                                    .safety_work_week
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
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text
                        class="form__inner-content"
                        v-if="
                            applicationData.commander_commissioner_school_block &&
                            !applicationData.commander_commissioner_school_block
                                ?.is_verified
                        "
                    >
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
                                            v-if="
                                                applicationData
                                                    .commander_commissioner_school_block
                                                    .commander_commissioner_school
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
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text
                        class="form__inner-content"
                        v-if="
                            applicationData.working_semester_opening_block &&
                            !applicationData.working_semester_opening_block
                                ?.is_verified
                        "
                    >
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
                                            v-if="
                                                applicationData
                                                    .working_semester_opening_block
                                                    .working_semester_opening
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
                                            >Количество участников мероприятия
                                            Открытие трудового семестра<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData
                                                    .working_semester_opening_block
                                                    .working_semester_opening_participants
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text
                        class="form__inner-content"
                        v-if="
                            applicationData.creative_festival_block &&
                            !applicationData.creative_festival_block
                                ?.is_verified
                        "
                    >
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
                                            v-if="
                                                applicationData
                                                    .creative_festival_block
                                                    .creative_festival
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
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text
                        class="form__inner-content"
                        v-if="
                            applicationData.spartakiad_block &&
                            !applicationData.spartakiad_block?.is_verified
                        "
                    >
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
                                            v-if="
                                                applicationData.spartakiad_block
                                                    .spartakiad
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
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text
                        class="form__inner-content"
                        v-if="
                            applicationData.professional_competition_block &&
                            !applicationData.professional_competition_block
                                ?.is_verified
                        "
                    >
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
                                            v-if="
                                                applicationData
                                                    .professional_competition_block
                                                    .professional_competition
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
                                    7. Участие членов студенческого отряда в
                                    окружных и межрегиональных мероприятиях РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
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
                                            type="text"
                                            v-model:value="
                                                applicationData.event_name
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество человек<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.number_of_participants
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div
                                        class="form__field"
                                        v-for="(
                                            link, index
                                        ) in applicationData.links"
                                        :key="index"
                                    >
                                        <label class="form__label"
                                            >Ссылка на социальные сети с
                                            фотоотчетом с наименованием
                                            мероприятия и наименованием ЛСО,
                                            принявшем в нем участие<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.links[index]
                                                    .link
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div
                                        class="form__field"
                                        v-if="
                                            applicationData.certificate_scans !==
                                            'null'
                                        "
                                    >
                                        <label class="form__label"
                                            >Скан грамот (при наличии)<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <div class="file">
                                            <div class="file_name">
                                                <SvgIcon
                                                    class="file_img"
                                                    icon-name="file-dock"
                                                />
                                                <a
                                                    :href="
                                                        applicationData.certificate_scans
                                                    "
                                                    target="_blank"
                                                    >{{
                                                        applicationData.certificate_scans.slice(
                                                            applicationData.certificate_scans.indexOf(
                                                                'Q7/',
                                                            ) + 18,
                                                        )
                                                    }}</a
                                                >
                                            </div>
                                            <a
                                                class="download_text"
                                                :href="
                                                    applicationData.certificate_scans
                                                "
                                                target="_blank"
                                            >
                                                <SvgIcon
                                                    class="download_img"
                                                    iconName="download"
                                                />

                                                скачать файл
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 8">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    8. Участие членов студенческого отряда во
                                    всероссийских мероприятиях РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
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
                                            type="text"
                                            v-model:value="
                                                applicationData.event_name
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Количество человек<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.number_of_participants
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div
                                        class="form__field"
                                        v-for="link in applicationData.links"
                                        :key="link.id"
                                    >
                                        <label class="form__label"
                                            >Ссылка на социальные сети с
                                            фотоотчетом с наименованием
                                            мероприятия и наименованием ЛСО,
                                            принявшем в нем участие<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="link.link"
                                            readonly
                                        />
                                    </div>
                                    <div
                                        class="form__field"
                                        v-if="
                                            applicationData.certificate_scans !==
                                            'null'
                                        "
                                    >
                                        <label class="form__label"
                                            >Скан грамот (при наличии)<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <div class="file">
                                            <div class="file_name">
                                                <SvgIcon
                                                    class="file_img"
                                                    icon-name="file-dock"
                                                />
                                                <a
                                                    :href="
                                                        applicationData.certificate_scans
                                                    "
                                                    target="_blank"
                                                    >{{
                                                        applicationData.certificate_scans.slice(
                                                            applicationData.certificate_scans.indexOf(
                                                                'ksk_',
                                                            ) + 4,
                                                        )
                                                    }}</a
                                                >
                                            </div>
                                            <a
                                                class="download_text"
                                                :href="
                                                    applicationData.certificate_scans
                                                "
                                                target="_blank"
                                            >
                                                <SvgIcon
                                                    class="download_img"
                                                    iconName="download"
                                                />

                                                скачать файл
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 9">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    9. Призовые места отряда в окружных и
                                    межрегиональных мероприятиях и конкурсах РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div class="form__field-column-one">
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование мероприятия или
                                            конкурса<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.event_name
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Призовое место<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.prize_place
                                            "
                                            readonly
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
                                        <div class="file">
                                            <div class="file_name">
                                                <SvgIcon
                                                    class="file_img"
                                                    icon-name="file-dock"
                                                />
                                                <a
                                                    :href="
                                                        applicationData.certificate_scans
                                                    "
                                                    target="_blank"
                                                    class="file_title"
                                                    >{{
                                                        applicationData.certificate_scans.slice(
                                                            applicationData.certificate_scans.indexOf(
                                                                '/Q9/',
                                                            ) + 19,
                                                        )
                                                    }}</a
                                                >
                                            </div>
                                            <a
                                                class="download_text"
                                                :href="
                                                    applicationData.certificate_scans
                                                "
                                                target="_blank"
                                            >
                                                <SvgIcon
                                                    class="download_img"
                                                    iconName="download"
                                                />
                                                скачать файл
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 10">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    10. Призовые места отряда во Всероссийских
                                    мероприятиях и конкурсах РСО
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div class="form__field-column-one">
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование мероприятия или
                                            конкурса<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.event_name
                                            "
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Призовое место<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.prize_place
                                            "
                                            readonly
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
                                        <div class="file">
                                            <div class="file_name">
                                                <SvgIcon
                                                    class="file_img"
                                                    icon-name="file-dock"
                                                />
                                                <a
                                                    :href="
                                                        applicationData.certificate_scans
                                                    "
                                                    target="_blank"
                                                    class="file_title"
                                                    >{{
                                                        applicationData.certificate_scans.slice(
                                                            applicationData.certificate_scans.indexOf(
                                                                'ksk_',
                                                            ) + 4,
                                                        )
                                                    }}</a
                                                >
                                            </div>
                                            <a
                                                class="download_text"
                                                :href="
                                                    applicationData.certificate_scans
                                                "
                                                target="_blank"
                                            >
                                                <SvgIcon
                                                    class="download_img"
                                                    iconName="download"
                                                />
                                                скачать файл
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 11">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    11. Призовые места отряда на окружных и
                                    межрегиональных трудовых проектах
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div class="form__field-column-one">
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование трудового проекта<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.event_name
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Призовое место<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.prize_place
                                            "
                                            readonly
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
                                        <div class="file">
                                            <div class="file_name">
                                                <SvgIcon
                                                    class="file_img"
                                                    icon-name="file-dock"
                                                />
                                                <a
                                                    :href="
                                                        applicationData.certificate_scans
                                                    "
                                                    target="_blank"
                                                    class="file_title"
                                                    >{{
                                                        applicationData.certificate_scans.slice(
                                                            applicationData.certificate_scans.indexOf(
                                                                'ksk_',
                                                            ) + 4,
                                                        )
                                                    }}</a
                                                >
                                            </div>
                                            <a
                                                class="download_text"
                                                :href="
                                                    applicationData.certificate_scans
                                                "
                                                target="_blank"
                                            >
                                                <SvgIcon
                                                    class="download_img"
                                                    iconName="download"
                                                />
                                                скачать файл
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 12">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    12. Призовые места отряда на всероссийских
                                    трудовых проектах
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div class="form__field-column-one">
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование трудового проекта<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.event_name
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Призовое место<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.prize_place
                                            "
                                            readonly
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
                                        <div class="file">
                                            <div class="file_name">
                                                <SvgIcon
                                                    class="file_img"
                                                    icon-name="file-dock"
                                                />
                                                <a
                                                    :href="
                                                        applicationData.certificate_scans
                                                    "
                                                    target="_blank"
                                                    class="file_title"
                                                    >{{
                                                        applicationData.certificate_scans.slice(
                                                            applicationData.certificate_scans.indexOf(
                                                                'ksk_',
                                                            ) + 4,
                                                        )
                                                    }}</a
                                                >
                                            </div>
                                            <a
                                                class="download_text"
                                                :href="
                                                    applicationData.certificate_scans
                                                "
                                                target="_blank"
                                            >
                                                <SvgIcon
                                                    class="download_img"
                                                    iconName="download"
                                                />
                                                скачать файл
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 13">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    13. Организация собственных мероприятий
                                    отряда
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
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
                                    <div
                                        v-if="!event.is_verified"
                                        class="form__block"
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
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 14">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    14. Отношение количества бойцов,
                                    отработавших в летнем трудовом семестре к
                                    общему числу членов отряда
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                                v-for="project in applicationData.q14_labor_projects"
                                :key="project.id"
                            >
                                <div
                                    class="form__field-group-left"
                                    v-if="!project.is_verified"
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
                                    15. Победы членов отряда в региональных,
                                    окружных и всероссийских грантовых
                                    конкурсах, направленных на развитие
                                    студенческих отрядов
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                                v-for="grant in applicationData.grants_data"
                                :key="grant.id"
                            >
                                <div
                                    class="form__field-group-left"
                                    v-if="!grant.is_verified"
                                >
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Полное название грантового
                                            проекта<span>&nbsp;*</span></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="grant.name"
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Статус конкурса<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="grant.status"
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Автор проекта<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="grant.author_name"
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на конкурс<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                grant.competition_link
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на новостной источник с
                                            упоминанием победы<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="grant.prove_link"
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 16">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    16. Активность отряда в социальных сетях
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
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
                                            type="text"
                                            v-model:value="
                                                applicationData.link_vk_commander
                                            "
                                            readonly
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Ссылка на личную страницу ВКонтакте
                                            комиссара отряда<span
                                                >&nbsp;*</span
                                            ></label
                                        >
                                        <Input
                                            type="text"
                                            v-model:value="
                                                applicationData.link_vk_commissar
                                            "
                                            readonly
                                        />
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
                                            type="text"
                                            v-model:value="
                                                applicationData.vk_rso_number_subscribers
                                            "
                                            readonly
                                        />
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
                                            type="text"
                                            v-model:value="
                                                applicationData.link_vk_detachment
                                            "
                                            readonly
                                        />
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
                                            type="text"
                                            v-model:value="
                                                applicationData.vk_detachment_number_subscribers
                                            "
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 17">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    17. Количество упоминаний в СМИ о прошедших
                                    творческих, добровольческих и патриотических
                                    мероприятиях отряда
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="form__inner-content">
                        <div class="form__field-group">
                            <div
                                class="form__field-group-top form__field-column-one"
                                v-for="source in applicationData.source_data"
                                :key="source.id"
                            >
                                <div class="form__field-group-left">
                                    <div class="form__field">
                                        <label class="form__label"
                                            >Наименование источника<span
                                                >&nbsp;*</span
                                            >
                                        </label>
                                        <Input
                                            type="text"
                                            v-model:value="source.source_name"
                                            readonly
                                        />
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
                                            type="text"
                                            v-model:value="source.link"
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel v-else-if="id == 18">
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col class="d-flex justify-start">
                                    18. Охват бойцов, принявших участие во
                                    Всероссийском дне ударного труда
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
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
                                    19. Отсутствие нарушений техники
                                    безопасности, охраны труда и противопожарной
                                    безопасности в трудовом семестре
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
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
                                            v-model:value="
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
                                    20. Соответствие требованиям и положения
                                    символики и атрибутике форменной одежды и
                                    символики отрядов
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:actions="{ expanded }">
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
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
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { HTTP } from '@app/http';

import { Input } from '@shared/components/inputs';
import { SvgIcon } from '@shared/components/SvgIcon';

const route = useRoute();
const id = ref(route.params.id);

const applicationData = ref({});
const loading = ref(true);

const idHasCert = ['7', '8', '9', '10', '11', '12'];

const getApplicationData = async (_id, applicationId) => {
    id.value = _id;
    try {
        const { data } = await HTTP.get(
            `/competitions/1/reports/q${_id}/${applicationId}`,
        );
        applicationData.value = data;
        if (_id == 5) {
            for (const temp of applicationData.value.participants_data) {
                temp.document_name = decodeURI(temp.document);
            }
            applicationData.value.participants_data =
                applicationData.value.participants_data.filter(
                    (item) => item.is_verified !== true,
                );
        }
        if (idHasCert.includes(_id)) {
            applicationData.value.certificate_scans = decodeURI(
                applicationData.value.certificate_scans,
            );
        }
        console.log(applicationData.value);
    } catch (e) {
        console.log(`getApplicationData error`, e);
    } finally {
        loading.value = false;
    }
};

watch(
    [() => route.params.id, () => route.params.applicationId],
    async (newParams) => {
        await getApplicationData(newParams[0], newParams[1]);
    },
    { immediate: true },
);

onMounted(async () => {
    window.scroll(0, 0);
});
</script>

<style>
.expanded {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
}

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

.form__block {
    margin-bottom: 60px;
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
<style scoped lang="scss">
.file_img {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 8px;
}

.file_name {
    display: flex;
    flex-wrap: nowrap;
    color: #35383f;
    font-size: 16px;
    font-style: normal;
    align-items: center;
    font-weight: 400;
    line-height: 20px;
    text-decoration-line: underline;
    max-width: 80%;
}

.download_text {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: #1f7cc0;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.download_img {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-left: 40px;
    margin-right: 4px;
}

.file {
    display: flex;
}

.file_title {
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
