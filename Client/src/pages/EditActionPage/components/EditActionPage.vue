<template>
    <div class='container action'>
        <div class='action-title'>Редактирование мероприятия</div>
        <form @submit.prevent="SubmitEvent">
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
                                        <input v-model='maininfo.format' type='radio' value='OFFLINE' class='form-radio'/>
                                        <label class="ml-2 form-label">Оффлайн</label>
                                    </div>
                                    <div class="flex align-items-center">
                                        <input v-model='maininfo.format' type='radio' value='ONLINE' class='form-radio'/>
                                        <label class="ml-2 form-label">Онлайн</label>
                                    </div>
                                </div>
                            <div class='form-col-100'>
                                <div class="form__field">
                                    <label class='form-label'>Выберите маcштаб мероприятия<sup class="valid-red">*</sup></label>
                                    <sortByEducation
                                        :options='scale_massive'
                                        placeholder='Например, ЛСО'
                                        v-model='maininfo.scale'>
                                    </sortByEducation>
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
                                    <div class="form__counter">{{ maininfo.name.length }}/100</div>
                                </div>
                                <div class="form__field">
                                    <label class="form-label" for="telegram-owner-hq">Ссылка на конференцию</label>
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
                                    <label class="form-label">Добавить баннер</label>
                                    <FileUpload 
                                        name="demo[]" 
                                        accept=".pdf, .jpeg, .png" 
                                        :maxFileSize="7000000"
                                        v-model="maininfo.banner"
                                    >
                                        <template #header="{ chooseCallback }">
                                            <button @click="chooseCallback()" class="upload">
                                                <div class="upload-load">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 32 32"
                                                        fill="none"
                                                    ></svg>
                                                </div>
                                            </button>
                                            <div class="form__counter">Рекомендуемый размер файла 1024х768</div>
                                        </template>
                                    </FileUpload>
                                </div>
                            </div>
                            <div class='form-col'>
                                <div class="form__field">
                                    <label class="form-label" for="address-hq">Адрес проведения (Оффлайн)<sup class="valid-red">*</sup></label>
                                    <InputText
                                        id="address-hq"
                                        v-model='maininfo.address'
                                        class="form__input form-input-container"
                                        placeholder="Например, Москва, Гагарина 40"
                                        name="address_hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter">{{ maininfo.address.length }}/100</div>
                                </div>
                                <div class="form__field">
                                    <label class="form-label" for="group-hq">Количество участников</label>
                                    <InputText
                                        v-model='maininfo.participants_number'
                                        id="group-hq"
                                        type='number'
                                        class="form__input form-input-container"
                                        placeholder="Например, 100"
                                        name="group-hq"
                                    />
                                </div>
                                <div class="form__field">
                                    <label class="form-label">О мероприятии</label>
                                    <textarea class="form__textarea" v-model="maininfo.description" />
                                </div>
                            </div>
                        </div>
                        <div class='form-container'>
                            <div class='form-col-100'>
                                <div class="form__field">
                                    <label class="form-label" for="road-hq">Добавьте направление<sup class="valid-red">*</sup></label>
                                    <sortByEducation
                                        id="road-hq"
                                        :options='direction_massive'
                                        optionLabel='name'
                                        placeholder='Например, ЛСО'
                                        v-model='maininfo.direction'
                                    ></sortByEducation>
                                </div>
                            </div>
                        </div>
                        <div class='form-container'>
                            <div class='form-col'>
                                <label class="form-label">Выберите вид принимаемых к подаче на мероприятие заявок</label>
                                <label class='flex align-items-center' style='display: flex'>
                                    <div class="flex align-items-center">
                                        <input v-model='maininfo.application_type' value='Персональная' type='radio' class='form-radio'/>
                                        <label class="ml-2 form-label">Персональная</label>
                                    </div>
                                    <div class="flex align-items-center">
                                        <input v-model='maininfo.application_type' value='Групповая' type='radio' class='form-radio'/>
                                        <label class="ml-2 form-label">Групповая</label>
                                    </div>
                                    <div class="flex align-items-center">
                                        <input v-model='maininfo.application_type' value='Многоэтапная' type='radio' class='form-radio'/>
                                        <label class="ml-2 form-label">Многоэтапная</label>
                                    </div>
                                </label>
                            </div>
                            <div class='form-col'>
                                <label class="form-label">Какие объекты могут формировать групповые заявки</label>
                                <sortByEducation
                                    v-model='area'
                                    :options='area_massive'
                                    placeholder='Например, ЛСО'
                                ></sortByEducation>
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
                                    <label class="form-label" for="action-start-hq">Начало мероприятия<sup class="valid-red">*</sup></label>
                                    <InputText
                                        id="action-start-hq"
                                        v-model='timeData.start_date'
                                        class="form__input form-input-container"
                                        placeholder="Например 26.06.2024"
                                        name="action-start-hq"
                                        type='date'
                                    />
                                </div>
                                <div class="form__field">
                                    <label class="form-label" for="action-end-hq">Окончание мероприятия</label>
                                    <InputText
                                        id="action-end-hq"
                                        v-model='timeData.end_date'
                                        class="form__input form-input-container"
                                        placeholder="Например 27.06.2024"
                                        name="action-end-hq"
                                        type='date'
                                    />
                                </div>
                                <div class="form__field">
                                    <label class="form-label" for="end-registration-hq">Окончение регистрации</label>
                                    <InputText
                                        id="end-registration-hq"
                                        class="form__input form-input-container"
                                        v-model='timeData.registration_end_date'
                                        placeholder="Например, 15.05.2023"
                                        name="end-registration-hq"
                                        type='date'
                                    />
                                </div>
                            </div>
                            <div class='form-col'>
                                <div class="form__field">
                                    <label class="form-label" for="action-hours-start-hq">Время в часах</label>
                                    <InputText
                                        id="action-hours-start-hq"
                                        class="form__input form-input-container"
                                        v-model="timeData.start_time"
                                        placeholder="Например 7:30"
                                        name="action-hours-start-hq"
                                        type="time"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label class="form-label" for="action-hours-end-hq">Время в часах</label>
                                    <InputText
                                        id="action-hours-end-hq"
                                        class="form__input form-input-container"
                                        v-model="timeData.end_time"
                                        placeholder="Например 18:30"
                                        name="action-hours-end-hq"
                                        type="time"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label class='flex align-items-center' style='display: flex'>
                                        <div class="flex align-items-center">
                                            <input v-model='timeData.hour' value="1" name='houre1' type='radio' class='form-radio'/>
                                            <label for="hours1" class="ml-2">За час</label>
                                        </div>
                                        <div class="flex align-items-center">
                                            <input v-model='timeData.hour' value="2" name="hours2" type='radio' class='form-radio'/>
                                            <label for="hours2" class="ml-2">За 2 часа</label>
                                        </div>
                                        <div class="flex align-items-center">
                                            <input v-model='timeData.hour' value="3" name="hours3" type='radio' class='form-radio'/>
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
                                <label class="form-label">Какие личные данные участников вам нужны?
                                Отметьте их галочкой, и в дальнейшем у вас будет возможность скачать все документы участников.</label>
                                <v-container fluid>
                                    <v-checkbox
                                        v-model="maininfo.document_data.passport"
                                        :binary="true"
                                        label="Паспорт"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="maininfo.document_data.snils"
                                        :binary="true"
                                        label="СНИЛС"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="maininfo.document_data.inn"
                                        :binary="true"
                                        label="ИНН"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="maininfo.document_data.work_book"
                                        :binary="true"
                                        label="Трудовая книжка"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="maininfo.document_data.military_document"
                                        :binary="true"
                                        label="Военный билет или препистное свидетельство"
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="maininfo.document_data.consent_personal_data"
                                        :binary="true"
                                        label="Согласие на обработку персональных данных"
                                    ></v-checkbox>
                                </v-container>
                                <label class='form-label'>Добавьте Документы</label>
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
                                            chooseLabel="Выбрать файл"
                                        ></FileUpload>
                                    </div>
                                </div>
                                <div class='form-col-100'>
                                    <label class="form-label">Расскажите, с какими документами необходимо просто ознакомиться, а какие скачать и заполнить</label>
                                    <textarea class="form__textarea" />
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
                        <div v-for="organizator in organizators" class='form-container'>
                            <div class='form-col'>
                                <div class="form__field">
                                    <label class="form-label" for="name-hq">ФИО организатора<sup class="valid-red">*</sup></label>
                                    <InputText
                                        id="name-hq"
                                        v-model="organizator.organizer"
                                        class="form__input form-input-container"
                                        placeholder="Фамилия Имя Отчество"
                                        name="name_hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label class="form-label" for="telegram-owner-hq">Telegram организатора</label>
                                    <InputText
                                        id="telegram-owner-hq"
                                        v-model="organizator.telegram"
                                        class="form__input form-input-container"
                                        placeholder="@modestra"
                                        name="telegram-owner-hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label class="form-label" for="telegram-squad-hq">Telegram отряда</label>
                                    <InputText
                                        id="telegram-squad-hq"
                                        v-model="organizator.telegramSquad"
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
                                    <label class="form-label" for="email-hq">Email организатора<sup class="valid-red">*</sup></label>
                                    <InputText
                                        id="email-hq"
                                        v-model="organizator.organizer_email"
                                        class="form__input form-input-container"
                                        placeholder="email@gmail.com"
                                        name="email_hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <div class="form__field">
                                    <label class="form-label" for="organization-hq">Организация</label>
                                    <InputText
                                        id="organization-hq"
                                        v-model="organizator.organization"
                                        class="form__input form-input-container"
                                        placeholder="Например КузГТУ"
                                        name="organization-hq"
                                        :maxlength="100"
                                    />
                                    <div class="form__counter"></div>
                                </div>
                                <v-checkbox
                                        v-model="organizator.is_contact_person"
                                        :binary="true"
                                        label="Сделать контактным лицом"
                                    ></v-checkbox>
                                <div class="form__field"></div>
                            </div>
                        </div>
                        <div class='form-add' @click="AddOrganizator">+ Добавить организатора</div>
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
                        <div v-for="answer in answers" class='form-container'>
                            <div class='form-col'>
                                <div class="form__field">
                                    <label class="form-label" for="sub-questions-hq">Задайте интересующие вопросы участникам мероприятия</label>
                                    <InputText
                                        id="sub-questions-hq"
                                        v-model="answer.question"
                                        class="form__input form-input-container"
                                        placeholder="Например: Какой у вас размер футболки"
                                        name="name_hq"
                                        :maxlength="100"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="form-container">
                            <div class='form-add' @click='AddQuestion'>+ Добавить вопрос</div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
        <div class='form-col-100'>
            <Button @click="SubmitEvent" label='Сохранить'></Button>
        </div>
        </form>
    </div>
</template>

<script setup>
import { Button } from '@shared/components/buttons';
import { ref } from 'vue';
import { getAction, createAction, createOrganizator, getOrganizator, putAction, putOrganizator } from '@services/ActionService';
import { sortByEducation, Select } from '@shared/components/selects';
import { useRoute } from 'vue-router';
import { uploadPhoto } from '@shared/components/imagescomp';
import FileUpload from 'primevue/fileupload';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import textarea from '@shared/components/inputs/textarea.vue';
const router = useRoute();

const id = router.params.id;

getAction(id)
    .then((resp)=>{
        maininfo.value = resp.data
        getOrganizator(id)
            .then((resp)=>{
                organizators.value = resp.data;
            })
            .catch((e)=>{
                console.log(e)
            })
    })
    .catch((e)=>{
        console.log(e)
    })

//Переменные для основной формы

const scale_massive = ref([
    {name: "Отрядное"},
    {name:"Образовательное"},
    {name:"Городское"},
    {name:"Региональное"},
    {name:"Окружное"},
    {name:"Городское"}])

const direction_massive = ref([
    {name:"Добровольческое"},
    {name:"Образовательное"},
    {name:"Патриотическое"},
    {name:"Региональное"},
    {name:"Окружное"},
    {name:"Всероссийское"}])

const maininfo = ref({
    format: '',
    direction: '',
    name: '',
    scale: '',
    banner: '',
    conference_link: '',
    address: '',
    description: '',
    participants_number: Number,
    application_type: '',
    available_structural_units: '',
    document_data:{
        additional_info: '',
        consent_personal_data: false,
        inn: false,
        military_document: false,
        passport: false,
        snils: false,
        work_book: false
    }
    
})

const available_structural_units = ref([
    {name: "Отряды"},
    {name: "Образовательные Отряды"},
    {name: "Местные штабы"},
    {name: "Региональные штабы"},
    {name: "Окружные штабы"},
    {name: "Центральные штабы"},
])
const area = ref('')
const area_massive = ref([
    {name: "ЛСО"},
    {name: "Региональный штаб"},
    {name: "Окружной штаб"}
])

//Переменные организаторов

const organizators = ref([{
    id: Number,
    organizer: '',
    organizer_phone_number: '',
    organizer_email: '',
    organization: '',
    telegram: '',
    is_contact_person: false
}])

const timeData = {
        start_date: '',
        start_time: '',
        end_date: '',
        end_time: '',
        registration_end_date: '',
        hour: '',
    }

//Ответы на вопросы
const answers = ref([[
    {
        question: '',
        answer: ''
    }
]])
//Формы самой страницы
const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Штабы СО ОО', href: '#' },
    { pageTitle: 'Создание штаба СО ОО', href: '#' },
]);

function AddOrganizator(){
    organizators.value.push({
        id: Number,
        organizer: '',
        organizer_phone_number: '',
        organizer_email: '',
        organization: '',
        telegram: '',
        is_contact_person: false
    });
}
function SubmitEvent(){
    console.log(maininfo.value)
    putAction(id, maininfo)
        .then((resp)=>{
            putOrganizator(id, organizator)
            .then((resp)=>{
                router.push("/")
            })
            .catch((e) =>{
                console.log(e)
            })
        })
        .catch((e)=>{
            console.log(e)
        })

}

function AddQuestion(){
    answers.value.push({
        question: '',
        answer: ''
    })
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
    font-size: 1.3vw;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    margin-top: 5px;
    margin-bottom: 2px;
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
.upload{
    width: 100%;
    height: 162px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 16px;

    &-load{
        width: 64px;
        height: 64px;
        background-color: #5153b9;
        border-radius: 50%;
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

.v-expansion-panel:not(:first-child)::after {
    display: none;
}
</style>