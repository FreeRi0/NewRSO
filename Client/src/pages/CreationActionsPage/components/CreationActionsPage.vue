<template>
    <div class='container action'>
        <div class='action-title'>Создание мероприятия</div>
        <form method='post' enctype='multipart/form-data' @submit.prevent='SubmitEvent'>
        <div class='col-auto form-container'>
            <v-expansion-panels variant='accordion'>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col cols="4" class="d-flex justify-start">
                                    Основная информация
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
                        <div class='form-container'>
                            <div class='form-col-100'>
                                <label class='form-label'>Выберете формат мероприятия</label>
                                <label class='flex align-items-center' style='display: flex'>
                                    <div class="flex align-items-center">
                                        <input type='radio' class='form-radio'/>
                                        <label for="hours1" class="ml-2 form-label">Оффлайн</label>
                                    </div>
                                    <div class="flex align-items-center">
                                        <input type='radio' class='form-radio'/>
                                        <label for="hours2" class="ml-2 form-label">Онлайн</label>
                                    </div>
                                </label>
                            <div class='form-col-100'>
                                <div class="form__field">
                                    <label class='form-label' for="name-hq">Название мероприятия<sup class="valid-red">*</sup></label>
                                    <Input
                                        id="name-hq"
                                        class="form__input form-input-container"
                                        placeholder="Название мероприятия"
                                        name="name_hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class='form-container'>
                            <div class='form-col'>
                                <div class="form__field">
                                    <label class='form-label' for="name-hq">Название мероприятия<sup class="valid-red">*</sup></label>
                                    <Input
                                        id="name-hq"
                                        class="form__input form-input-container"
                                        placeholder="Название мероприятия"
                                        name="name_hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label for="telegram-owner-hq">Ссылка на конференцию</label>
                                    <Input
                                        id="telegram-owner-hq"
                                        class="form__input form-input-container"
                                        placeholder="https://discord.gg/s44UfkVJ"
                                        name="telegram-owner-hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label>Добавить баннер</label>
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/addFile.svg"
                                            alt="addFile"
                                        />
                                        <FileUpload
                                            mode="basic"
                                            name="demo[]"
                                            accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000"
                                            :customUpload="true"
                                            @uploader="selectParentPersonal"
                                            chooseLabel="Выбрать файл"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class='form-col'>
                                <div class="form__field">
                                    <label for="email-hq">Адрес проведения (Оффлайн)<sup class="valid-red">*</sup></label>
                                    <Input
                                        id="email-hq"
                                        class="form__input form-input-container"
                                        placeholder="Например, Москва, Гагарина 40"
                                        name="email_hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label for="organization-hq">Количество участников</label>
                                    <Input
                                        id="organization-hq"
                                        class="form__input form-input-container"
                                        placeholder="Например, 100"
                                        name="organization-hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label>О мероприятии</label>
                                    <v-textarea label="Label" variant="outlined"></v-textarea>
                                </div>
                            </div>
                        </div>
                        <div class='form-container'>
                            <div class='form-col-100'>
                                <div class="form__field">
                                    <label for="name-hq">Добавьте направление<sup class="valid-red">*</sup></label>
                                    <Input
                                        id="name-hq"
                                        class="form__input form-input-container"
                                        placeholder="Название мероприятия"
                                        name="name_hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                            </div>
                        </div>
                        <div class='form-container'>
                            <div class='form-col'>
                                <label>Выберите вид принимаемых к подаче заявок на мероприятие</label>
                                <label class='flex align-items-center' style='display: flex'>
                                    <div class="flex align-items-center">
                                        <input type='radio' class='form-radio'/>
                                        <label for="hours1" class="ml-2">Персональная</label>
                                    </div>
                                    <div class="flex align-items-center">
                                        <input type='radio' class='form-radio'/>
                                        <label for="hours2" class="ml-2">Групповая</label>
                                    </div>
                                    <div class="flex align-items-center">
                                        <input type='radio' class='form-radio'/>
                                        <label for="hours2" class="ml-2">Многоэтапная</label>
                                    </div>
                                </label>
                            </div>
                            <div class='form-col'>
                                <Dropdown
                                          optionlabel='title'
                                          placeholder='Выберете действие'
                                          class='invents-block invents-select'>
                                </Dropdown>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col cols="4" class="d-flex justify-start">
                                    Дата и время
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
                        <div class='form-container'>
                            <div class='form-col'>
                                <div class="form__field">
                                    <label for="name-hq">Начало мероприятия<sup class="valid-red">*</sup></label>
                                    <Input
                                        id="action-start-hq"
                                        class="form__input form-input-container"
                                        placeholder="Например 26.06.2024"
                                        name="action-start-hq"
                                        type="date"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label for="telegram-owner-hq">Окончание мероприятия</label>
                                    <Input
                                        id="action-end-hq"
                                        class="form__input form-input-container"
                                        placeholder="Например 27.06.2024"
                                        name="action-end-hq"
                                        type="date"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label for="telegram-squad-hq">Telegram отряда</label>
                                    <Input
                                        id="telegram-squad-hq"
                                        class="form__input form-input-container"
                                        placeholder="@Invar"
                                        name="telegram-squad-hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                            </div>
                            <div class='form-col'>
                                <div class="form__field">
                                    <label for="telegram-squad-hq">Время в часах</label>
                                    <Input
                                        id="action-hours-start-hq"
                                        class="form__input form-input-container"
                                        placeholder="Например 7:30"
                                        name="action-hours-start-hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label for="telegram-squad-hq">Время в часах</label>
                                    <Input
                                        id="action-hours-end-hq"
                                        class="form__input form-input-container"
                                        placeholder="Например 18:30"
                                        name="action-hours-end-hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label class='flex align-items-center' style='display: flex'>
                                        <div class="flex align-items-center">
                                            <input type='radio' class='form-radio'/>
                                            <label for="hours1" class="ml-2">За час</label>
                                        </div>
                                        <div class="flex align-items-center">
                                            <input type='radio' class='form-radio'/>
                                            <label for="hours2" class="ml-2">За 2 часа</label>
                                        </div>
                                        <div class="flex align-items-center">
                                            <input type='radio' class='form-radio'/>
                                            <label for="hours3" class="ml-2">За 3 часа</label>
                                        </div>
                                    </label>
                                    <div class="form__counter"></div>
                                </div>
                            </div>
                        </div>
                        <div class='form-col-100'>

                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col cols="4" class="d-flex justify-start">
                                    Документы
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
                        <div class='form-container'>
                            <div class='form-col-100'>
                                Какие личные данные участников вам нужны?
                                Отметьте их галочкой, и в дальнейшем у вас будет возможность скачать все документы участников.
                                <v-container fluid>
                                    <v-checkbox
                                        v-model="documents"
                                        label="Паспорт"
                                        value="Паспорт"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="documents"
                                        label="СНИЛС"
                                        value="СНИЛС"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="documents"
                                        label="ИНН"
                                        value="ИНН"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="documents"
                                        label="Трудовая книжка"
                                        value="Трудовая книжка"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="documents"
                                        label="Военный билет или препистное свидетельство"
                                        value="Военный билет или препистное свидетельство"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="documents"
                                        label="Согласие на обработку персональных данных"
                                        value="Согласие на обработку персональных данных"
                                    ></v-checkbox>
                                </v-container>
                                Добавьте документы:
                                <div class='form-col'>
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/addFile.svg"
                                            alt="addFile"
                                        />
                                        <FileUpload
                                            mode="basic"
                                            name="demo[]"
                                            accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000"
                                            :customUpload="true"
                                            @uploader="selectParentPersonal"
                                            chooseLabel="Выбрать файл"
                                        />
                                    </div>
                                </div>
                                <div class='form-col-100'>
                                    Расскажите, с какими документами необходимо просто ознакомиться, а какие скачать и заполнить
                                    <v-textarea label="Label" variant="outlined"></v-textarea>
                                </div>
                            </div>
                        </div>
                        <div class='form-container'>
                            <div class='form-border'></div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col cols="4" class="d-flex justify-start">
                                    Организаторы
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
                        <div class='form-container'>
                            <div class='form-col'>
                                <div class="form__field">
                                    <label for="name-hq">ФИО организатора<sup class="valid-red">*</sup></label>
                                    <Input
                                        id="name-hq"
                                        class="form__input form-input-container"
                                        placeholder="Фамилия Имя Отчество"
                                        name="name_hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label for="telegram-owner-hq">Telegram организатора</label>
                                    <Input
                                        id="telegram-owner-hq"
                                        class="form__input form-input-container"
                                        placeholder="@modestra"
                                        name="telegram-owner-hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label for="telegram-squad-hq">Telegram отряда</label>
                                    <Input
                                        id="telegram-squad-hq"
                                        class="form__input form-input-container"
                                        placeholder="@Invar"
                                        name="telegram-squad-hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                            </div>
                            <div class='form-col'>
                                <div class="form__field">
                                    <label for="email-hq">Email организатора<sup class="valid-red">*</sup></label>
                                    <Input
                                        id="email-hq"
                                        class="form__input form-input-container"
                                        placeholder="email@gmail.com"
                                        name="email_hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label for="organization-hq">Организация</label>
                                    <Input
                                        id="organization-hq"
                                        class="form__input form-input-container"
                                        placeholder="Например КузГТУ"
                                        name="organization-hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field"></div>
                            </div>
                        </div>
                        <div class='form-add'>+ Добавить организатора</div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <template v-slot="{ expanded }">
                            <v-row no-gutters>
                                <v-col cols="4" class="d-flex justify-start">
                                   Дополнительная информация
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
                        <div class='form-container'>
                            <div class='form-col'>
                                <div class="form__field">
                                    <label for="sub-questions-hq">Задайте интересующие вопросы участникам мероприятия</label>
                                    <Input
                                        id="sub-questions-hq"
                                        class="form__input form-input-container"
                                        placeholder="Например: Какой у вас размер футболки"
                                        name="name_hq"
                                        :maxlength="100"
                                    />
                                    <div class='form-add' @click='AddQuestion'>+ Добавить вопрос</div>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
            <div class='form-col-100'>
                <Button type='submit' label='Сохранить'></Button>
            </div>
        </form>
    </div>
</template>

<script setup>
import RadioButton from 'primevue/radiobutton';
import { Button } from '@shared/components/buttons';
import { ref } from 'vue';
import { createAction } from '@services/ActionService';
import { useRoute } from 'vue-router';
import Dropdown from 'primevue/dropdown';
const router = useRoute();
const datahour = ref("");
const documents = ref([]);


//Переменные для формы



//Формы самой страницы

const actionForm = {
    format: String,
    direction: String,
    status: String,
    name: String,
    scale: String,
    participants_number: Number,
    description: String,
    application_type: String,
}
//Документы пользователя
const user_documents = {
    document: String,

}
const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Штабы СО ОО', href: '#' },
    { pageTitle: 'Создание штаба СО ОО', href: '#' },
]);

function SubmitEvent(){
    createAction(actionForm)
        .then(() =>{

    })
        .catch((e) =>{

        })
}

function AddQuestion(){

}

</script>

<style lang='scss' scoped>
.action{
    margin-top: 60px;
    &-container{

    }
    &-title{
      height: 116px;
      font-size: 52px;
      font-family: Akrobat;
      display: flex;
      flex-direction: column;
      justify-content: center;
        @media screen and (max-width: 575px) {
            font-size: 32px;
        }
    }
  &-slides{
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }
    &-slides{
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
    }
}
.form{
  &-container{
    display: flex;
    margin-right: 16px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  &-col{
    width:50%;
    padding-left: 15px;
    padding-right: 15px;
  }
  &-input{
    width: 100%;
    height: 40px;
  }
  &-radio{
    margin-left: 10px;
  }
  &-input-container{
    border: 1px solid black;
    border-radius: 15px;
    padding-left: 15px;
  }
  &-title{
    font-family: Bert Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }
  &-row{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  &-border{
    width: 100%;
    margin-top: 10px;
    margin-left: 10px;
    border-bottom: 1px solid black;
  }
  &-col-100{
    width: 100%;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 34px;
    margin-top: 3px;
    margin-bottom: 3px;
  }
  &-label{
    font-family: Bert Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    margin-top: 5px;
  }
  &-add-block:hover{
    cursor: pointer;
  }
  &-btm{
    width: 114px;
    border-radius: 10px;
    background-color: #39BFBF;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-btminv{
    width: 114px;
    border-radius: 10px;
    border: 2px solid #35383F;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-add{
    margin-top: 10px;
    text-decoration: underline;
  }
  &-add:hover{
    cursor: pointer;
  }
}
</style>