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
                                        title="Что такое РСО?"
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
                                    <Button
                                        class="form__button form__button--prev"
                                        variant="text"
                                        label="Далее"
                                        size="large"
                                    ></Button>
                                </v-card-actions>
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
                                    ></v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        На сайте трудкрут.рф можно узнать о
                                        региональных отделениях и о существующих
                                        направлениях работы.
                                    </template>
                                </v-list-group>
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Вступить в РСО можно с 14 лет, но
                                        необходимо согласие законного
                                        представителя.
                                    </template>
                                </v-list-group>
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        С данной информацией можно ознакомиться
                                        в Уставе МООО «РСО».
                                    </template>
                                </v-list-group>
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Членский взнос уплачивается каждым
                                        членом организации, подтверждая свое
                                        членство.
                                    </template>
                                </v-list-group>
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        Перейдите в раздел «Личный кабинет» -
                                        «Членский взнос». На этой странице
                                        указана актуальная информация об оплате
                                        членского взноса.
                                    </template>
                                </v-list-group>
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
                                </template>
                                <v-list-group class="accordion_text">
                                    <template v-slot:activator="{ props }">
                                        ЛСО - линейный студенческий отряд, Штаб
                                        СО ОО - штаб студенческих отрядов
                                        образовательной организации.
                                    </template>
                                </v-list-group>
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                О работе с Личным кабинетом
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                        title="Как создать отряд?"
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                        title="Как создать мероприятие?"
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                        title="Как одобрить/отклонить заявку на участие в мероприятии?"
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                        title="Как пользоваться реестром участников?"
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
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
                                    ></v-list-item>
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
                                <v-card-actions class="form__button-group">
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
                                </v-card-actions>
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </form>
</template>

<script setup>
import { Button } from '@shared/components/buttons';
</script>

<style lang="scss">
.form {
    &__button-group {
        display: flex;
        margin-left: 200px;
        margin-right: 200px;
        padding-left: 240px;
        padding-right: 240px;
    }
    &__button {
        width: 132px;
        min-height: 52px;
        margin: 0;
        padding: 16px 32px;
        font-family: 'Bert Sans';
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        text-transform: none;

        &--next,
        &--prev {
            width: 131px;
            color: #35383f;
            border: 2px solid #35383f;
            background-color: #ffffff;
        }
    }
}
.v-expansion-panel {
    &__shadow {
        box-shadow: none;
    }

    &--active,
    &--after-active {
        margin: 0;
    }

    &--active:not(:first-child) {
        margin: 0;
    }

    &--active + .v-expansion-panel {
        margin: 0;
    }

    .v-expansion-panel-title {
        max-height: 60px;
        font-family: 'Akrobat';
        font-size: 24px;
        font-weight: 600;
        background-color: transparent;
        border-bottom: 1px solid #939393;
        color: #35383f;
        padding: 16px 0px;

        &__overlay {
            display: none;
        }
    }
}

.mx-auto {
    width: 1140px;
    margin-top: 10px;
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
</style>
