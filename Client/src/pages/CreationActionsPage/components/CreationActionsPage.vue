<template>
    <div class='container action'>
        <div class='action-title'>Создание мероприятия</div>
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
                                <div class='flex align-items-center' style='display: flex'>
                                    <div class="flex align-items-center">
                                        <input v-model='maininfo.format' type='radio' value='Оффлайн' class='form-radio'/>
                                        <label class="ml-2 form-label">Оффлайн</label>
                                    </div>
                                    <div class="flex align-items-center">
                                        <input v-model='maininfo.format' type='radio' value='Онлайн' class='form-radio'/>
                                        <label class="ml-2 form-label">Онлайн</label>
                                    </div>
                                </div>
                            <div class='form-col-100'>
                                <div class="form__field">
                                    <label class='form-label'>Выберите маштаб мероприятия<sup class="valid-red">*</sup></label>
                                    <Dropdown
                                        :options='scale_massive'
                                        optionLabel='name'
                                        placeholder='Например, ЛСО'
                                        v-model='maininfo.scale'
                                        class='invents-block invents-select'>
                                    </Dropdown>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class='form-container'>
                            <div class='form-col'>
                                <div class="form__field">
                                    <label class='form-label' for="name-hq">Название мероприятия<sup class="valid-red">*</sup></label>
                                    <InputText
                                        id="name-hq"
                                        v-model='maininfo.name'
                                        class="form__input form-input-container"
                                        placeholder="Название мероприятия"
                                        name="name_hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label for="telegram-owner-hq">Ссылка на конференцию</label>
                                    <InputText
                                        id="telegram-owner-hq"
                                        v-model='maininfo.conference_link'
                                        class="form__input form-input-container"
                                        placeholder="https://discord.gg/s44UfkVJ"
                                        name="telegram-owner-hq"
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
                                            @uploader="maininfo.banner"
                                            chooseLabel="Выбрать файл"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class='form-col'>
                                <div class="form__field">
                                    <label for="address-hq">Адрес проведения (Оффлайн)<sup class="valid-red">*</sup></label>
                                    <InputText
                                        id="address-hq"
                                        v-model='maininfo.address'
                                        class="form__input form-input-container"
                                        placeholder="Например, Москва, Гагарина 40"
                                        name="address_hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label for="group-hq">Количество участников</label>
                                    <InputText
                                        v-model='maininfo.participants_number'
                                        id="group-hq"
                                        type='number'
                                        class="form__input form-input-container"
                                        placeholder="Например, 100"
                                        name="group-hq"
                                        :maxlength="100"
                                    />
                                </div>
                                <div class="form__field">
                                    <label>О мероприятии</label>
                                    <Textarea class="form__textarea" />
                                </div>
                            </div>
                        </div>
                        <div class='form-container'>
                            <div class='form-col-100'>
                                <div class="form__field">
                                    <label for="road-hq">Добавьте направление<sup class="valid-red">*</sup></label>
                                    <Dropdown
                                        :options='scale_massive'
                                        optionLabel='name'
                                        placeholder='Например, ЛСО'
                                        v-model='maininfo.scale'
                                        class='invents-block invents-select'
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
                                        <input v-model='maininfo.application_type' value='Персональная' type='radio' class='form-radio'/>
                                        <label class="ml-2">Персональная</label>
                                    </div>
                                    <div class="flex align-items-center">
                                        <input v-model='maininfo.application_type' value='Групповая' type='radio' class='form-radio'/>
                                        <label class="ml-2">Групповая</label>
                                    </div>
                                    <div class="flex align-items-center">
                                        <input v-model='maininfo.application_type' value='Многоэтапная' type='radio' class='form-radio'/>
                                        <label class="ml-2">Многоэтапная</label>
                                    </div>
                                </label>
                            </div>
                            <div class='form-col'>
                                <label>На какую область расчитано мероприятие</label>
                                <Dropdown
                                    v-model='maininfo.direction'
                                    :options='direction_massive'
                                    optionLabel='name'
                                    placeholder='Например, ЛСО'
                                    class='invents-block invents-select'
                                />
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
                                    <label for="action-start-hq">Начало мероприятия<sup class="valid-red">*</sup></label>
                                    <InputText
                                        id="action-start-hq"
                                        v-model='timeStart'
                                        class="form__input form-input-container"
                                        placeholder="Например 26.06.2024"
                                        name="action-start-hq"
                                        type='date'
                                    />
                                </div>
                                <div class="form__field">
                                    <label for="action-end-hq">Окончание мероприятия</label>
                                    <InputText
                                        id="action-end-hq"
                                        v-model='timeEnd'
                                        class="form__input form-input-container"
                                        placeholder="Например 27.06.2024"
                                        name="action-end-hq"
                                        type='date'
                                    />
                                </div>
                                <div class="form__field">
                                    <label for="telegram-squad-hq">Telegram отряда</label>
                                    <InputText
                                        id="telegram-squad-hq"
                                        class="form__input form-input-container"
                                        v-model='telegramSquad'
                                        placeholder="@Invar"
                                        name="telegram-squad-hq"
                                    />
                                </div>
                            </div>
                            <div class='form-col'>
                                <div class="form__field">
                                    <label for="action-hours-start-hq">Время в часах</label>
                                    <InputText
                                        id="action-hours-start-hq"
                                        class="form__input form-input-container"
                                        v-model="timehourStart"
                                        placeholder="Например 7:30"
                                        name="action-hours-start-hq"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label for="action-hours-end-hq">Время в часах</label>
                                    <InputText
                                        id="action-hours-end-hq"
                                        class="form__input form-input-container"
                                        v-model="timehourEnd"
                                        placeholder="Например 18:30"
                                        name="action-hours-end-hq"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label class='flex align-items-center' style='display: flex'>
                                        <div class="flex align-items-center">
                                            <input v-model='hour' value="1" name='houre1' type='radio' class='form-radio'/>
                                            <label for="hours1" class="ml-2">За час</label>
                                        </div>
                                        <div class="flex align-items-center">
                                            <input v-model='hour' value="2" name="hours2" type='radio' class='form-radio'/>
                                            <label for="hours2" class="ml-2">За 2 часа</label>
                                        </div>
                                        <div class="flex align-items-center">
                                            <input v-model='hour' value="3" name="hours3" type='radio' class='form-radio'/>
                                            <label for="hours3" class="ml-2">За 3 часа</label>
                                        </div>
                                    </label>
                                </div>
                            </div>
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
                                        v-model="passport"
                                        label="Паспорт"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="snils"
                                        label="СНИЛС"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="inn"
                                        label="ИНН"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="work_book"
                                        label="Трудовая книжка"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="military_document"
                                        label="Военный билет или препистное свидетельство"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="consent_personal_data"
                                        label="Согласие на обработку персональных данных"
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
                                    <v-textarea></v-textarea>
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
                                    <InputText
                                        id="name-hq"
                                        v-model="organizer"
                                        class="form__input form-input-container"
                                        placeholder="Фамилия Имя Отчество"
                                        name="name_hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label for="telegram-owner-hq">Telegram организатора</label>
                                    <InputText
                                        id="telegram-owner-hq"
                                        v-model="telegram"
                                        class="form__input form-input-container"
                                        placeholder="@modestra"
                                        name="telegram-owner-hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label for="telegram-squad-hq">Telegram отряда</label>
                                    <InputText
                                        id="telegram-squad-hq"
                                        v-model="telegramSquad"
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
                                    <InputText
                                        id="email-hq"
                                        v-model="organizer_email"
                                        class="form__input form-input-container"
                                        placeholder="email@gmail.com"
                                        name="email_hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label for="organization-hq">Организация</label>
                                    <InputText
                                        id="organization-hq"
                                        v-model="organization"
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
                                    <InputText
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
            <Button @click="SubmitEvent" label='Сохранить'></Button>
        </div>
    </div>
</template>

<script setup>
import { Button } from '@shared/components/buttons';
import { ref } from 'vue';
import { createAction } from '@services/ActionService';
import { useRoute } from 'vue-router';
import FileUpload from 'primevue/fileupload';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
const router = useRoute();
const datahour = ref("");

//Переменные для формы

const scale_massive = ref([
    {name: "Отрядное"},
    {name: "Образовательное"},
    {name: "Городское"},
    {name: "Региональное"},
    {name: "Окружное"},
    {name: "Городское"}
])

const direction_massive = ref([
    {name: "Добровольческое"},
    {name: "Образовательное"},
    {name: "Патриотическое"},
    {name: "Региональное"},
    {name: "Окружное"},
    {name: "Всероссийское"}
])

const maininfo = ref({
    format: '',
    direction: '',
    name: '',
    scale: '',
    direction: '',
    banner: '',
    conference_link: '',
    address: '',
    participants_number: Number,
    application_type: '',
    available_structural_units: ''
})

const available_structural_units = ref([
    {name: "Отряды"},
    {name: "Образовательные Отряды"},
    {name: "Местные штабы"},
    {name: "Региональные штабы"},
    {name: "Окружные штабы"},
    {name: "Центральные штабы"},
])
const selectedMassive = ref('')
const area = ref([
    {name: "ЛСО", value: "LSO"},
    {name: "Региональный штаб", value: "regional"},
    {name: "Окружной штаб", value: "area"}
])
const selectedArea = ref('');
const groupReq = ref(Number);
const timeStart = ref('');
const timehourStart = ref('');
const timeEnd = ref('');
const timehourEnd = ref('')
const hour = ref('')

const organizer = ref("");
const organizer_phone_number = ref('');
const organizer_email = ref('');
const organization = ref('');
const telegram = ref('');
const telegramSquad = ref('')
const is_contact_person = ref('')
const organizator = ref([{
    organizer: organizer.value,
    organizer_phone_number: organizer_phone_number.value,
    organizer_email: organizer_email.value,
    organization: organization.value,
    telegram: telegram.value,
    is_contact_person: is_contact_person.value
}])

const passport = ref('');
const snils = ref('')
const inn = ref()
const work_book = ref('')
const military_document = ref('')
const consent_personal_data = ref('')
const additional_info = ref('')
const documents = ref({
    passport: passport.value,
    snils: snils.value,
    inn: inn.value,
    work_book: work_book.value,
    military_document: military_document.value,
    consent_personal_data: consent_personal_data.value,
    additional_info: additional_info.value
})
//Формы самой страницы
const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Штабы СО ОО', href: '#' },
    { pageTitle: 'Создание штаба СО ОО', href: '#' },
]);
function SubmitEvent(){
    console.log("Основаная информация", maininfo.value)
}

function AddQuestion(){

}

</script>

<style lang='scss' scoped>
.action{
    margin-top: 60px;
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