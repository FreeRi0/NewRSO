<template>
    <h1 class="helpInfo_title">Полезная информация</h1>
    <form class="form" action="#" method="post">
        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-title>
                    <template v-slot="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start">
                                Новичку о РСО
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon iconName="wrap" :class="{ expanded }" />
                        </v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group>
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Что такое РСО?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Молодежная общероссийская общественная
                                        организация «Российские Студенческие
                                        Отряды» (МООО «РСО») – крупнейшая
                                        молодежная организация страны, которая
                                        обеспечивает временной трудовой
                                        занятостью более 200 тысяч молодых людей
                                        из 81 региона нашей страны, в которых
                                        открыты и действуют ее региональные
                                        отделения, а также занимается
                                        гражданским и патриотическим
                                        воспитанием, развивает творческий и
                                        спортивный потенциал молодежи. Цель
                                        Российских Студенческих Отрядов —
                                        организация временной трудовой
                                        деятельности обучающихся.
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Где я могу узнать, действует ли движение РСО в моем регионе и какие существуют направления работы?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        На сайте трудкрут.рф можно узнать о
                                        региональных отделениях и о существующих
                                        направлениях работы.
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Могу ли я вступить в РСО, если мне нет 18 лет?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Вступить в РСО можно с 14 лет, но
                                        необходимо согласие законного
                                        представителя.
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Хочу узнать подробнее о структуре организации, правах, обязанностях членов РСО"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        С данной информацией можно ознакомиться
                                        в Уставе МООО «РСО».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Для чего нужен членский взнос?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Членский взнос уплачивается каждым
                                        членом организации, подтверждая свое
                                        членство.
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как просмотреть информацию об оплате членского взноса?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в раздел «Личный кабинет» -
                                        «Членский взнос». На этой странице
                                        указана актуальная информация об оплате
                                        членского взноса.
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Что означают аббревиатуры ЛСО, Штаб СО ОО?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        ЛСО - линейный студенческий отряд, Штаб
                                        СО ОО - штаб студенческих отрядов
                                        образовательной организации.
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Что такое линейный студенческий отряд?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Линейный студенческий отряд (ЛСО) —
                                        форма организации студентов
                                        образовательных учреждений среднего и
                                        высшего профессионального образования
                                        различных форм обучения, изъявивших
                                        желание в свободное от учебы время
                                        трудиться в различных отраслях
                                        хозяйства, выполняющих общую
                                        производственную задачу и одновременно
                                        реализующих общественно полезную
                                        программу.
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title>
                    <template v-slot="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start"
                                >Работа с Личным кабинетом
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

                <v-expansion-panel-text>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как зарегистрироваться в РСО?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        На странице регистрации выберите регион
                                        местонахождения вашей образовательной
                                        организации, далее укажите свои ФИО,
                                        телефон, электронную почту, придумайте
                                        пароль, нажмите кнопку
                                        «Зарегистрироваться».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как изменить пароль?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в раздел «Личный кабинет» -
                                        «Настройки профиля» - «Логин и пароль».
                                        В окне «Изменить пароль» введите старый
                                        пароль, также придумайте новый пароль,
                                        нажмите кнопку «Сохранить».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как изменить логин?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в раздел «Личный кабинет» -
                                        «Настройки профиля» - «Логин и пароль».
                                        Нажмите на значок «Изменить» рядом с
                                        логином. Введите новый логин в
                                        открывшемся поле и нажмите кнопку
                                        «Сохранить».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как восстановить пароль?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        На странице авторизации нажмите на
                                        ссылку «Восстановить». Укажите
                                        электронную почту, которую использовали
                                        при регистрации. Перейдите по ссылке из
                                        письма в электронной почте, придумайте
                                        новый пароль, нажмите кнопку
                                        «Сохранить».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как изменить персональные данные?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в раздел «Личный кабинет» -
                                        «Настройки профиля» - «Персональные
                                        данные». Выберите необходимое поле,
                                        укажите новые данные, нажмите кнопку
                                        «Сохранить изменения».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как настроить приватность данных?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Для определения приватности данных
                                        перейдите в раздел «Личный кабинет» -
                                        «Настройки профиля» - «Настройки
                                        приватности». Выберите желаемый уровень
                                        приватности, нажмите кнопку «Сохранить».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Для чего нужна верификация данных?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Верификация данных необходима для
                                        вступления в члены Организации, также
                                        для получения полного доступа к
                                        информации о деятельности Организации,
                                        полного доступа к участию в деятельности
                                        Организации.
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как пройти верификацию данных?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в раздел «Личный кабинет» -
                                        «Настройки профиля» - «Персональные
                                        данные» либо нажмите на кнопку «Пройти
                                        верификацию» на Моей странице. Укажите
                                        ваши данные, нажмите кнопку «Отправить
                                        данные на верификацию». После проверки
                                        внесенных данных и подтверждения
                                        верификации уполномоченным сотрудником
                                        Организации вы получите полный доступ к
                                        информации о деятельности Организации,
                                        полный доступ к участию в ее
                                        деятельности.
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title>
                    <template v-slot="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start">
                                Об отрядах и штабах
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
                        </v-icon>
                    </template>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как создать отряд?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в  раздел  «ЛСО». Нажмите на
                                        кнопку «Создать отряд», расположенную на
                                        баннере вверху страницы. Заполните
                                        открывшуюся форму, нажмите на кнопку
                                        «Сохранить».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как редактировать данные об отряде?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите на страницу ЛСО, данные о
                                        котором желаете редактировать. Нажмите
                                        на кнопку «Редактировать отряд», внесите
                                        актуальную информацию, нажмите кнопку
                                        «Сохранить изменения».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как создать штаб?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        В разделе  «Структура» выберите
                                        необходимые вам штабы. Перейдите на
                                        страницу. Нажмите на кнопку «Создать
                                        штаб», расположенную на баннере вверху
                                        страницы. Заполните открывшуюся форму,
                                        нажмите на кнопку «Сохранить».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как редактировать данные о штабе?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите на страницу штаба, данные о
                                        котором желаете редактировать. Нажмите
                                        на кнопку «Редактировать штаб», внесите
                                        актуальную информацию, нажмите кнопку
                                        «Сохранить изменения».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как вступить в отряд?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в  раздел  «Структура» -
                                        «ЛСО». Выберите отряд, в который желаете
                                        вступить. Нажмите на кнопку «Подать
                                        заявку». После подтверждения вступления
                                        в отряд уполномоченным сотрудником
                                        Организации статус «Заявка на
                                        рассмотрении» изменится на статус «Вы
                                        участник».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title>
                    <template v-slot="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start">
                                О мероприятиях
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
                        </v-icon>
                    </template>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как создать мероприятие?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в  раздел  «Мероприятия».
                                        Нажмите на кнопку «Создать мероприятие»,
                                        расположенную на баннере вверху
                                        страницы. Заполните открывшуюся форму,
                                        нажмите на кнопку «Создать».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как редактировать данные о мероприятии?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите на страницу мероприятия,
                                        данные о котором желаете редактировать.
                                        Нажмите на кнопку «Редактировать
                                        мероприятие», внесите актуальную
                                        информацию, нажмите кнопку «Сохранить
                                        изменения».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как зарегистрироваться на участие в мероприятии?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в  раздел  «Мероприятия».
                                        Выберите мероприятие, в котором желаете
                                        участвовать. Нажмите на кнопку
                                        «Участвовать». В случае, если для
                                        участия необходима дополнительная
                                        информация, после нажатия на кнопку
                                        «Участвовать» откроется форма. Заполните
                                        ее, далее нажмите кнопку «Подать
                                        заявку». После подтверждения вашего
                                        участия уполномоченным сотрудником
                                        Организации статус «Заявка на
                                        рассмотрении» изменится на статус «Вы
                                        участник».  В случае, если к участию в
                                        мероприятии принимается только групповая
                                        заявка, после нажатия на кнопку
                                        «Участвовать» также откроется
                                        специальная форма. Заполните ее, далее
                                        нажмите кнопку «Подать заявку». При
                                        изменении статуса «Заявка на
                                        рассмотрении» на «Сформировать списки»
                                        необходимо нажать на кнопку
                                        «Сформировать списки». Внесите данные,
                                        далее нажмите кнопку «Подать заявку».
                                        После подтверждения вашего участия
                                        уполномоченным сотрудником Организации
                                        статус «Заявка на рассмотрении»
                                        изменится на статус «Вы участник».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как отказаться от участия в мероприятии?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите на страницу мероприятия, от
                                        участия в котором вы желаете отказаться.
                                        Наведите курсор мыши на кнопку «Вы
                                        участник», в выпадающем меню нажмите на
                                        кнопку «Отказаться от участия».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title>
                    <template v-slot="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start">
                                Работа с заявками
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
                        </v-icon>
                    </template>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как одобрить/отклонить заявку на участие в мероприятии?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в раздел «Личный кабинет» -
                                        «Активные заявки» - «Заявка на участие в
                                        мероприятии». Выберите заявку, проверьте
                                        данные, наведите курсор мыши на кнопку
                                        «Выберите действие», в выпадающем меню
                                        нажмите на кнопку «Одобрить» или кнопку
                                        «Отклонить».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как одобрить/отклонить заявку на вступление в отряд?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в раздел «Личный кабинет» -
                                        «Активные заявки» - «Заявка на
                                        вступление в отряд». Выберите заявку,
                                        проверьте данные, наведите курсор мыши
                                        на кнопку «Выберите действие», в
                                        выпадающем меню нажмите на кнопку
                                        «Одобрить» или кнопку «Отклонить».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как одобрить/отклонить заявку на верификацию аккаунта?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в раздел «Личный кабинет» -
                                        «Активные заявки» - «Верификация
                                        аккаунтов». Выберите аккаунт, который
                                        желаете верифицировать, проверьте данные
                                        пользователя, наведите курсор мыши на
                                        кнопку «Выберите действие», в выпадающем
                                        меню нажмите на кнопку «Одобрить» или
                                        кнопку «Отклонить».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как одобрить/отклонить заявку на Конкурс?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в раздел «Личный кабинет» —
                                        «Активные заявки» — «Конкурс». Выберите
                                        заявку, проверьте данные, наведите
                                        курсор мыши на кнопку «Выберите
                                        действие», в выпадающем меню нажмите на
                                        кнопку «Одобрить» или кнопку
                                        «Отклонить».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group"> -->
                                <!-- </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title>
                    <template v-slot="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start">
                                Работа с реестром участников, выдача справок
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
                        </v-icon>
                    </template>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как пользоваться реестром участников?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в раздел «Личный кабинет» -
                                        «Реестр участников». Для просмотра
                                        информации о каком-либо объекте отметьте
                                        необходимые пункты в фильтрах. Также вы
                                        можете просматривать статистику любых
                                        объектов, для этого нажмите кнопку
                                        «Показать статистику».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group">
                                </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как сформировать справку о членстве в РСО?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в раздел «Личный кабинет» -
                                        «Оформление справок». Выберите справку,
                                        которую желаете оформить. Заполните
                                        открывшуюся форму, нажмите кнопку
                                        «Получить справки».
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group">
                                    <Button
                                        class="form__button form__button--prev"
                                        variant="text"
                                        label="Назад"
                                        size="large"
                                    ></Button>
                                    <Button
                                        class="form__button form__button--prev"
                                        variant="text"
                                        label="Далее"
                                        size="large"
                                    ></Button>
                                </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-title>
                    <template v-slot="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start"
                                >О Конкурсе
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
                        </v-icon>
                    </template>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Кто может принять участие в Конкурсе?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Принять участие в Конкурсе может любой
                                        участник (боец) РСО в составе
                                        студенческого отряда. Подробные условия
                                        Конкурса размещены по
                                        <a
                                            class="accordion_text-link"
                                            href="/Competition"
                                            >ссылке</a
                                        >.
                                    </template>
                                </v-list-group>
                                <!-- <v-card-actions class="form__button-group">
                                </v-card-actions> -->
                            </v-list-group>
                        </v-list>
                    </v-card>

                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Какие номинации есть в Конкурсе?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Конкурс проводится в двух номинациях:
                                        «Тандем» и «Дебют». В номинации «Тандем»
                                        участвуют 2 отряда: действующий и новый
                                        студенческий отряд, созданный не ранее
                                        25 января 2024 года. Численность
                                        действующего студенческого отряда не
                                        должна быть меньше численности этого
                                        отряда за 2023 год. В номинации «Дебют»
                                        может принять участие новый студенческий
                                        отряд, созданный не ранее 25 января 2024
                                        года. Один отряд может подать заявку
                                        только в одну из номинаций.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как принять участие в Конкурсе?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Участнику РСО необходимо вступить в
                                        отряд, который планирует участвовать или
                                        уже участвует в Конкурсе, либо самому
                                        создать новый отряд, став в нем
                                        Командиром. Для участия студенческого
                                        отряда в Конкурсе Командиру отряда
                                        необходимо подать
                                        <a
                                            class="accordion_text-link"
                                            href="/Competition"
                                            >заявку на участие</a
                                        >. Для подачи заявки от ЛСО допустимо
                                        количество участников отряда от 1
                                        человека.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как Командиру отряда подать заявку на участие в конкурсе в номинации «Дебют»?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите на страницу
                                        <a
                                            class="accordion_text-link"
                                            href="/Competition"
                                            >«Конкурс»</a
                                        >. Нажмите на кнопку «Участвовать»,
                                        выберите в всплывающем окне номинацию
                                        «Дебют». После подтверждения вашего
                                        участия уполномоченным сотрудником
                                        Организации статус «Заявка на
                                        рассмотрении» изменится на статус «Вы
                                        участник», также на странице вашего
                                        отряда появится баннер с подробной
                                        информацией о Конкурсе.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как командиру отряда подать заявку на участие в конкурсе в номинации «Тандем»?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите на страницу
                                        <a
                                            class="accordion_text-link"
                                            href="/Competition"
                                            >«Конкурс»</a
                                        >. Нажмите на кнопку «Участвовать»,
                                        выберите в всплывающем окне номинацию
                                        «Тандем». Далее выберите из предложенных
                                        вариантов отряд-старт, вместе с которым
                                        вы будете участвовать в Конкурсе.
                                        Командиру отряда-старт необходимо
                                        перейти на страницу «Активные заявки»
                                        своего профиля и подтвердить совместное
                                        участие. Далее, после подтверждения
                                        заявки уполномоченным сотрудником
                                        Организации статус «Заявка на
                                        рассмотрении» изменится на статус «Вы
                                        участник», также на страницах вашего
                                        отряда и отряда-старт появятся баннеры с
                                        подробной информацией о Конкурсе.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как определяется место отряда в рейтинге отрядов-участников Конкурса?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Место отряда в рейтинге определяется на
                                        основании суммы мест, полученных в
                                        результате сложения занятых мест по
                                        каждому отчетному показателю
                                        деятельности студенческих отрядов МООО
                                        «РСО». Ознакомиться с данными своего
                                        отряда по каждому отчетному показателю
                                        может Командир отряда, нажав на кнопку
                                        «Отчетность» под баннером, размещенным
                                        на странице отряда (доступно с 30 марта
                                        2024 года).
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как командиру отряда отправить отчетность для формирования места в рейтинге отрядов-участников Конкурса?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите на страницу своего отряда,
                                        нажмите на кнопку «Отчетность»,
                                        расположенную под баннером с информацией
                                        о Конкурсе. На открывшейся странице
                                        нажмите на кнопку «Внести данные»,
                                        заполните нужные поля формы, нажмите
                                        «Отправить данные на верификацию»
                                        (доступно с 30 марта 2024 года).
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как узнать рейтинг своего отряда в конкурсе?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Для ознакомления с местом в рейтинге
                                        среди отрядов-участников Конкурса
                                        перейдите на страницу своего отряда — на
                                        баннере будет указано место (данные
                                        появятся не ранее 30 марта 2024 года).
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Учитываются ли в Конкурсе места на региональных трудовых проектах?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        В соответствии с положением Приложение
                                        2, Пункт 9 – 10, учитываются места
                                        только на межрегиональных, окружных,
                                        всероссийских проектах.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Засчитываются ли в Конкурсе мероприятия штаба студенческих отрядов образовательной организации?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Мероприятия, организованные штабом
                                        образовательной организации, НЕ
                                        УЧИТЫВАЮТСЯ в рейтинге.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Засчитываются ли в Конкурсе победы штаба студенческих отрядов образовательной организации (в которых участвовал отряд в том числе)?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        НЕТ. В зачёт конкурса идут только победы
                                        отряда и членов ОТРЯДА на
                                        межрегиональных, окружных и
                                        всероссийских конкурсах.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Что подразумевается под «Победы членов отряда в региональных, окружных и всероссийских грантовых конкурсах, направленных на развитие студенческих отрядов»?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Каждый представитель отряда может стать
                                        участником региональных, окружных и
                                        всероссийских грантовых конкурсов, подав
                                        проект на развитие студенческих отрядов.
                                        Рекомендуем ознакомиться с порядком
                                        проведения и участия в грантовых
                                        конкурсах в сети интернет, уточнить в
                                        региональном отделении РСО.<br />Ссылки
                                        на всероссийские грантовые площадки:
                                        <br /><a
                                            class="accordion_text-link"
                                            href="https://президентскиегранты.рф/"
                                            >https://президентскиегранты.рф/</a
                                        >
                                        <br /><a
                                            class="accordion_text-link"
                                            href="https://фондкультурныхинициатив.рф/"
                                            >https://фондкультурныхинициатив.рф/</a
                                        >
                                        <br /><a
                                            class="accordion_text-link"
                                            href="https://fadm.gov.ru/directions/grant/"
                                            >https://fadm.gov.ru/directions/grant/</a
                                        >
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Учитывается ли в Конкурсе производственная часть отряда на целине? Или только победы?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Производственная деятельность
                                        учитывается только в части конкурсов
                                        трудовых проектов в части показателей
                                        производственной деятельности. Если вы
                                        стали лучшими на проекте и получили
                                        знамя, вымпел, диплом, то данную награду
                                        вы прикладываете, в остальных случаях
                                        производственная деятельность не
                                        учитывается.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Как поступить в случае возникновения ошибки при загрузке данных во время отправки Отчетности?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Обратитесь в тех.поддержку, вам
                                        подскажут, в чем конкретно проблема в
                                        тех или иных пунктах. Тех. поддержка
                                        сайта:
                                        <a
                                            class="accordion_text-link"
                                            href="https://t.me/LK_RSO_Support"
                                            >https://t.me/LK_RSO_Support</a
                                        >
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Учитываются ли в Конкурсе награды за победу и участие в региональных конкурсах РО?
"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Региональные конкурсы НЕ ИДУТ в зачёт. В
                                        зачёт идут победы в межрегиональных,
                                        окружных и всероссийских конкурсах.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Засчитывается ли в Конкурсе участие в акции «Снежный десант РСО», если участвовал от другого отряда?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Участие в акции «Снежный десант РСО»
                                        ИДЁТ в зачёт. Данные необходимо подавать
                                        в пункт 8, Положения, Приложения 2:
                                        «Участие членов студенческого отряда во
                                        всероссийских мероприятиях РСО»
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Какие данные подтверждает командир РО, а какие комиссар РО?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Таблица с расчётом показателей, где
                                        отразили дедлайн по каждому показателю и
                                        лицо, которое верифицирует результаты:
                                        <a
                                            class="accordion_text-link"
                                            href="https://docs.google.com/spreadsheets/d/1TiQQ2meY9D2-pUmsAlY3DjgpENTo0W-w3WInX44zuRE/edit?gid=0#gid=0"
                                            >https://docs.google.com/spreadsheets/d/1TiQQ2meY9D2-pUmsAlY3DjgpENTo0W-w3WInX44zuRE/edit?gid=0#gid=0</a
                                        >
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Что означает «Рейтинг ещё не сформирован»?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Срок (дата) формирования рейтинга ещё не
                                        наступил(а) и (или) показатель ещё не
                                        верифицирован. Крайний срок подачи
                                        данных, можно отследить в таблице с
                                        расчётом показателей:<a
                                            class="accordion_text-link"
                                            href="https://docs.google.com/spreadsheets/d/1TiQQ2meY9D2-pUmsAlY3DjgpENTo0W-w3WInX44zuRE/edit?gid=0#gid=0"
                                            >https://docs.google.com/spreadsheets/d/1TiQQ2meY9D2-pUmsAlY3DjgpENTo0W-w3WInX44zuRE/edit?gid=0#gid=0</a
                                        >
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Проф. обучение на ребят (сертификаты) загружать по одному или сразу на всех? Можно ли потом добавлять?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        По итогам профессионального обучения
                                        выдаются свидетельства о профессии
                                        рабочего, должности служащего.
                                        Свидетельство загружается на каждого
                                        члена отряда индивидуально. Данные можно
                                        подать единовременно. Также можно
                                        загружать свидетельства в разное время.
                                        На сканах свидетельства вся информация
                                        должна быть четкой и читаемой.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="После отправки того или иного сертификата на согласование, можно ли добавлять потом еще?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Всё зависит от показателя, если в пункте
                                        есть «+добавить …», то добавление
                                        предусмотрено, если такой функции нет,
                                        то результат не подразумевает
                                        дополнения.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Сколько человек в отряде должно быть для того, чтобы место в рейтинге было выше?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Место в конкурсном рейтинге зависит от
                                        большого количества показателей и
                                        корректных отчётов по каждому из них,
                                        место по показателю «Численность членов
                                        линейного студенческого отряда в
                                        соответствии с объемом уплаченных
                                        членских взносов» регламентировано
                                        Положением о Конкурсе.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Какие отчетные документы нужно подготовить по итогу конкурса и как/куда их прикреплять? На данный момент показатели в критериях подтверждаются на сайте со страницы ком. состава регионального отделения, готовим ли мы к этому же какой-то отчет для достоверности этих показателей? К какому числу и как?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Все отчетные документы, которые
                                        необходимо подать расписаны в положении,
                                        дополнительного (общего) отчета делать
                                        не нужно. Показатели проверяет и
                                        подтверждает региональное отделение, а
                                        после данные будет проверять комиссия
                                        конкурса.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Нужно ли прикладывать платежные поручения об оплате членских взносов? 
"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Нет, членский взнос подтверждает
                                        командир регионального отделения.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Нужно ли прикладывать сертификаты о прохождении Школы командных составов командиром и комиссаром отряда?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Для подтверждения вам необходимо сделать
                                        пост в социальной сети ВКонтакте и
                                        прикрепить ссылку на пост в данном
                                        показателе. Данный пункт подтверждает
                                        региональное отделение. (Смотри видео –
                                        3:00) Видео:<a
                                            class="accordion_text-link"
                                            href="https://vk.com/video-223571150_456239061"
                                            >https://vk.com/video-223571150_456239061</a
                                        >
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Нужно ли прикладывать выписку из списка участников мероприятий? Как подтверждается количество участников на мероприятиях (в частности Открытие ТТС): общее фото, например, или достаточно того, что это подтверждает командир РО в критерии?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Смотри видео – 4:22, там показано какие
                                        данные нужны для заполнения данного
                                        показателя. Видео:<a
                                            class="accordion_text-link"
                                            href="https://vk.com/video-223571150_456239061"
                                            >https://vk.com/video-223571150_456239061</a
                                        >
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Какие упоминания в СМИ о деятельности отряда учитываются в рамках конкурса? Учитываются ли публикации на сайте университета, где учатся ребята, университетские газеты, или учитываются только упоминания в СМИ, зарегистрированных в Роскомнадзоре?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Учитываются все упоминания в официальных
                                        СМИ, это сайты, газеты, журналы, статьи,
                                        но не учитываются упоминания в
                                        социальных сетях. Сайт университета,
                                        района, города подходят для данного
                                        показателя.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Будет ли происходить перерасчёт баллов за тестирование в связи с прибавлением членов отряда или исключением?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Новые участники могут пройти
                                        тестирование по Охране труда и технике
                                        безопасности до 30 июня (включительно).
                                        На основе новых результатов будет
                                        произведен перерасчёт.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-group value="Programming Group">
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="У некоторых регионов заканчивается профобучение 30 июня 2024 г. 30 июня – крайний срок загрузки документов: есть риск, что организация не успеет выдать /направить свидетельства: есть ли вариант переноса срока?"
                                    >
                                        <SvgIcon
                                            iconName="wrap"
                                            :class="{ expanded }"
                                        />
                                    </v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Срок загрузки свидетельств на сайт
                                        продлили до 15 июля (включительно).
                                        Также обращаем ваше внимание, что
                                        поскольку свидетельства действительны
                                        минимум 3 года, то вы можете загружать
                                        свидетельства, подтверждающие
                                        прохождение профессионального обучения
                                        за 2022, 2023 и 2024 год включительно.
                                    </template>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </form>
</template>

<script setup>
import { usePage } from '@shared';
import SvgIcon from '@shared/ui/SvgIcon/SvgIcon.vue';

usePage({ isHidden: true });
</script>

<style lang="scss">
.expanded {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
}

.v-card {
    margin-top: 10px;
    border-bottom: 1px solid #d9d9d9;
    box-shadow: none;
}

.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated.mx-auto {
    box-shadow: none;
}

.v-list-item__append {
    display: none;
}

.v-list-item__content {
    display: flex;
    justify-content: space-between;
}

.v-expansion-panel:not(:first-child)::after {
    display: none;
}

.accordion_text {
    border-radius: 10px;
    border: 1px solid var(--_, rgba(0, 0, 0, 0.1));
    padding: 40px 40px 40px 40px;
    margin: 40px 40px 40px 40px;
}

.d-flex {
    font-weight: normal;
}

.v-expansion-panels {
    padding-bottom: 80px;
}

.helpInfo_title {
    padding-top: 20px;
    padding-bottom: 20px;
}
.v-row.v-row--no-gutters .v-col-4 {
    flex: none;
    max-width: none;
}

.v-list-item-title {
    white-space: wrap;
}
.accordion_text-link {
    font-size: 18px;
    color: #1f7cc0;
    text-decoration-line: underline;
    // border-bottom: 1px solid #1f7cc0;
    // padding-bottom: 1px;
    font-family: 'BertSans';
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
.accordion_text-link {
    text-decoration: underline;
}
</style>
