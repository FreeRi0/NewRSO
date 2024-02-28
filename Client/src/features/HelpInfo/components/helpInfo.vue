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
                            <v-list-group>
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        title="Что такое РСО?"
                                    >
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
                                    >
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
                                    >
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
                                    >
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
                                    >
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
                                        title="Кто может принять участие в Конкурсе?"
                                    >
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
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </form>
</template>

<script setup>
import { usePage } from '@shared';

usePage({ isHidden: true });
</script>

<style lang="scss">
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
</style>
