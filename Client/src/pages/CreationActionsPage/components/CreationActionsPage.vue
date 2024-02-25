<template>
    <div class="container action">
        <div class="action-title">Создание мероприятия</div>
        <form @submit.prevent="SubmitEvent">
            <div class="col-auto form-container">
                <v-expansion-panels variant="accordion">
                    <v-expansion-panel>
                        <v-expansion-panel-title>
                            <template v-slot="{ expanded }">
                                <v-row no-gutters>
                                    <v-col
                                        cols="4"
                                        class="d-flex justify-start"
                                    >
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
                            <div class="form-container">
                                <div class="form-col-100">
                                    <label class="form-label"
                                        >Выберете формат мероприятия</label
                                    >
                                    <div
                                        class="flex align-items-center"
                                        style="display: flex"
                                    >
                                        <div class="flex align-items-center">
                                            <input
                                                v-model="maininfo.format"
                                                type="radio"
                                                value="Оффлайн"
                                                class="form-radio"
                                            />
                                            <label class="ml-2 form-label"
                                                >Оффлайн</label
                                            >
                                        </div>
                                        <div class="flex align-items-center">
                                            <input
                                                v-model="maininfo.format"
                                                type="radio"
                                                value="Онлайн"
                                                class="form-radio"
                                            />
                                            <label class="ml-2 form-label"
                                                >Онлайн</label
                                            >
                                        </div>
                                    </div>
                                    <div class="form-col-100">
                                        <div class="form__field">
                                            <label class="form-label"
                                                >Выберите маcштаб
                                                мероприятия<sup
                                                    class="valid-red"
                                                    >*</sup
                                                ></label
                                            >
                                            <sortByEducation
                                                :options="scale_massive_sorted"
                                                placeholder="Например, ЛСО"
                                                v-model="maininfo.scale"
                                                :sorts-boolean="true"
                                            >
                                            </sortByEducation>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-container">
                                <div class="form-col">
                                    <div class="form__field">
                                        <label class="form-label" for="name-hq"
                                            >Название мероприятия<sup
                                                class="valid-red"
                                                >*</sup
                                            ></label
                                        >
                                        <InputText
                                            id="name-hq"
                                            v-model="maininfo.name"
                                            class="form__input form-input-container"
                                            placeholder="Название мероприятия"
                                            name="name_hq"
                                            :maxlength="100"
                                        />
                                        <div class="form__counter">
                                            {{ maininfo.name.length }}/100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label
                                            class="form-label"
                                            for="telegram-owner-hq"
                                            >Ссылка на конференцию</label
                                        >
                                        <InputText
                                            id="telegram-owner-hq"
                                            v-model="maininfo.conference_link"
                                            class="form__input form-input-container"
                                            placeholder="https://discord.gg/s44UfkVJ"
                                            name="telegram-owner-hq"
                                        />
                                        <div class="form__counter"></div>
                                    </div>
                                    <div class="form__field">
                                        <div class="form__field photo-add">
                                            <p class="form__label">
                                                Добавьте баннер
                                            </p>
                                            <div
                                                class="photo-add__box photo-add__box--banner"
                                            >
                                                <div
                                                    class="photo-add__img photo-add__img--banner"
                                                >
                                                    <img
                                                        v-if="
                                                            maininfo.banner ??
                                                            urlBanner
                                                        "
                                                        class="photo-add__image"
                                                        :src="
                                                            maininfo.banner ??
                                                            urlBanner
                                                        "
                                                    />
                                                    <img
                                                        v-else
                                                        src="@app/assets/banner-stub.png"
                                                        alt="Баннер отряда(пусто)"
                                                    />
                                                </div>

                                                <div class="photo-add__input">
                                                    <label
                                                        class="photo-add__label"
                                                        for="upload-banner"
                                                        v-if="
                                                            !maininfo.banner &&
                                                            !urlBanner
                                                        "
                                                    >
                                                        <svg
                                                            class=""
                                                            aria-hidden="true"
                                                            focusable="false"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="48"
                                                            height="48"
                                                            viewBox="0 0 48 48"
                                                            fill="none"
                                                        >
                                                            <g
                                                                filter="url(#filter0_b_2686_15482)"
                                                            >
                                                                <circle
                                                                    cx="24"
                                                                    cy="24"
                                                                    r="24"
                                                                    fill="black"
                                                                    fill-opacity="0.4"
                                                                />
                                                                <circle
                                                                    cx="24"
                                                                    cy="24"
                                                                    r="23"
                                                                    stroke="white"
                                                                    stroke-width="2"
                                                                />
                                                            </g>
                                                            <path
                                                                d="M24.1328 15.1328L24.1328 33.1328"
                                                                stroke="white"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                            />
                                                            <path
                                                                d="M15.1328 24.1328H33.1328"
                                                                stroke="white"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                            />
                                                            <defs>
                                                                <filter
                                                                    id="filter0_b_2686_15482"
                                                                    x="-36.9643"
                                                                    y="-36.9643"
                                                                    width="121.929"
                                                                    height="121.929"
                                                                    filterUnits="userSpaceOnUse"
                                                                    color-interpolation-filters="sRGB"
                                                                >
                                                                    <feFlood
                                                                        flood-opacity="0"
                                                                        result="BackgroundImageFix"
                                                                    />
                                                                    <feGaussianBlur
                                                                        in="BackgroundImageFix"
                                                                        stdDeviation="18.4821"
                                                                    />
                                                                    <feComposite
                                                                        in2="SourceAlpha"
                                                                        operator="in"
                                                                        result="effect1_backgroundBlur_2686_15482"
                                                                    />
                                                                    <feBlend
                                                                        mode="normal"
                                                                        in="SourceGraphic"
                                                                        in2="effect1_backgroundBlur_2686_15482"
                                                                        result="shape"
                                                                    />
                                                                </filter>
                                                            </defs>
                                                        </svg>
                                                    </label>
                                                    <div
                                                        class="photo-add__edit-group"
                                                        v-else
                                                    >
                                                        <label
                                                            class="photo-add__label-edit"
                                                            for="upload-banner"
                                                        >
                                                            <span
                                                                class="photo-add__label-text"
                                                                >Изменить
                                                                фото</span
                                                            >
                                                        </label>
                                                        <button
                                                            class="photo-add__button-clear"
                                                            type="reset"
                                                            @click="resetBanner"
                                                        >
                                                            Удалить фото
                                                        </button>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        id="upload-banner"
                                                        name="squad-banner"
                                                        hidden
                                                        @change="selectBanner"
                                                    />
                                                </div>
                                            </div>
                                            <span class="form__footnote"
                                                >Рекомендуемый размер
                                                1920х768</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="form-col">
                                    <div class="form__field">
                                        <label
                                            class="form-label"
                                            for="address-hq"
                                            >Адрес проведения (Оффлайн)<sup
                                                class="valid-red"
                                                >*</sup
                                            ></label
                                        >
                                        <InputText
                                            id="address-hq"
                                            v-model="maininfo.address"
                                            class="form__input form-input-container"
                                            placeholder="Например, Москва, Гагарина 40"
                                            name="address_hq"
                                            :maxlength="100"
                                        />
                                        <div class="form__counter">
                                            {{ maininfo.address.length }}/100
                                        </div>
                                    </div>
                                    <div class="form__field">
                                        <label class="form-label" for="group-hq"
                                            >Количество участников</label
                                        >
                                        <InputText
                                            v-model="
                                                maininfo.participants_number
                                            "
                                            id="group-hq"
                                            type="number"
                                            class="form__input form-input-container"
                                            placeholder="Например, 100"
                                            name="group-hq"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label class="form-label"
                                            >О мероприятии</label
                                        >
                                        <textarea
                                            class="form__textarea"
                                            v-model="maininfo.description"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="form-container">
                                <div class="form-col-100">
                                    <div class="form__field">
                                        <label class="form-label" for="road-hq"
                                            >Добавьте направление<sup
                                                class="valid-red"
                                                >*</sup
                                            ></label
                                        >
                                        <sortByEducation
                                            id="road-hq"
                                            :options="direction_massive"
                                            optionLabel="name"
                                            placeholder="Например, ЛСО"
                                            v-model="maininfo.direction"
                                        ></sortByEducation>
                                    </div>
                                </div>
                            </div>
                            <div class="form-container">
                                <div class="form-col">
                                    <label class="form-label"
                                        >Выберите вид принимаемых к подаче на
                                        мероприятие заявок</label
                                    >
                                    <label
                                        class="flex align-items-center"
                                        style="display: flex"
                                    >
                                        <div class="flex align-items-center">
                                            <input
                                                v-model="
                                                    maininfo.application_type
                                                "
                                                value="Персональная"
                                                type="radio"
                                                class="form-radio"
                                            />
                                            <label class="ml-2 form-label"
                                                >Персональная</label
                                            >
                                        </div>
                                        <div class="flex align-items-center">
                                            <input
                                                v-model="
                                                    maininfo.application_type
                                                "
                                                value="Групповая"
                                                type="radio"
                                                class="form-radio"
                                            />
                                            <label class="ml-2 form-label"
                                                >Групповая</label
                                            >
                                        </div>
                                        <div class="flex align-items-center">
                                            <input
                                                v-model="
                                                    maininfo.application_type
                                                "
                                                value="Многоэтапная"
                                                type="radio"
                                                class="form-radio"
                                            />
                                            <label class="ml-2 form-label"
                                                >Многоэтапная</label
                                            >
                                        </div>
                                    </label>
                                </div>
                                <div class="form-col">
                                    <label class="form-label"
                                        >Какие объекты могут формировать
                                        групповые заявки</label
                                    >
                                    <sortByEducation
                                        v-model="area"
                                        :options="area_massive"
                                        placeholder="Например, ЛСО"
                                    ></sortByEducation>
                                </div>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title>
                            <template v-slot="{ expanded }">
                                <v-row no-gutters>
                                    <v-col
                                        cols="4"
                                        class="d-flex justify-start"
                                    >
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
                            <div class="form-container">
                                <div class="form-col">
                                    <div class="form__field">
                                        <label
                                            class="form-label"
                                            for="action-start-hq"
                                            >Начало мероприятия<sup
                                                class="valid-red"
                                                >*</sup
                                            ></label
                                        >
                                        <InputText
                                            id="action-start-hq"
                                            v-model="time_data.start_date"
                                            class="form__input form-input-container"
                                            placeholder="Например 26.06.2024"
                                            name="action-start-hq"
                                            type="date"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label
                                            class="form-label"
                                            for="action-end-hq"
                                            >Окончание мероприятия</label
                                        >
                                        <InputText
                                            id="action-end-hq"
                                            v-model="time_data.end_date"
                                            class="form__input form-input-container"
                                            placeholder="Например 27.06.2024"
                                            name="action-end-hq"
                                            type="date"
                                        />
                                    </div>
                                    <div class="form__field">
                                        <label
                                            class="form-label"
                                            for="end-registration-hq"
                                            >Окончение регистрации</label
                                        >
                                        <InputText
                                            id="end-registration-hq"
                                            class="form__input form-input-container"
                                            v-model="
                                                time_data.registration_end_date
                                            "
                                            placeholder="Например, 15.05.2023"
                                            name="end-registration-hq"
                                            type="date"
                                        />
                                    </div>
                                </div>
                                <div class="form-col">
                                    <div class="form__field">
                                        <label
                                            class="form-label"
                                            for="action-hours-start-hq"
                                            >Время в часах</label
                                        >
                                        <InputText
                                            id="action-hours-start-hq"
                                            class="form__input form-input-container"
                                            v-model="time_data.start_time"
                                            placeholder="Например 7:30"
                                            name="action-hours-start-hq"
                                            type="time"
                                        />
                                        <div class="form__counter"></div>
                                    </div>
                                    <div class="form__field">
                                        <label
                                            class="form-label"
                                            for="action-hours-end-hq"
                                            >Время в часах</label
                                        >
                                        <InputText
                                            id="action-hours-end-hq"
                                            class="form__input form-input-container"
                                            v-model="time_data.end_time"
                                            placeholder="Например 18:30"
                                            name="action-hours-end-hq"
                                            type="time"
                                        />
                                        <div class="form__counter"></div>
                                    </div>
                                    <div class="form__field">
                                        <!----<label class='flex align-items-center' style='display: flex'>
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
                                        </label> -->
                                        <div class="form__field">
                                            <label
                                                class="form-label"
                                                for="action-hours-end-hq"
                                                >Время в часах</label
                                            >
                                            <InputText
                                                id="action-hours-end-hq"
                                                class="form__input form-input-container"
                                                v-model="
                                                    time_data.registration_end_time
                                                "
                                                placeholder="Например 18:30"
                                                name="action-hours-end-hq"
                                                type="time"
                                            />
                                            <div class="form__counter"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title>
                            <template v-slot="{ expanded }">
                                <v-row no-gutters>
                                    <v-col
                                        cols="4"
                                        class="d-flex justify-start"
                                    >
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
                            <div class="form-container">
                                <div class="form-col-100">
                                    <label class="form-label"
                                        >Какие личные данные участников вам
                                        нужны? Отметьте их галочкой, и в
                                        дальнейшем у вас будет возможность
                                        скачать все документы участников.</label
                                    >
                                    <v-container fluid>
                                        <div class="form-checkbox">
                                            <input
                                                v-model="document_data.passport"
                                                type="checkbox"
                                                name="passport"
                                            />
                                            <label for="passport"
                                                >Паспорт</label
                                            >
                                        </div>
                                        <div class="form-checkbox">
                                            <input
                                                v-model="document_data.snils"
                                                type="checkbox"
                                                name="snils"
                                            />
                                            <label for="snils">СНИЛС</label>
                                        </div>
                                        <div class="form-checkbox">
                                            <input
                                                v-model="document_data.inn"
                                                type="checkbox"
                                                name="inn"
                                            />
                                            <label for="inn">ИНН</label>
                                        </div>
                                        <div class="form-checkbox">
                                            <input
                                                v-model="
                                                    document_data.work_book
                                                "
                                                type="checkbox"
                                                name="workbook"
                                            />
                                            <label for="workbook"
                                                >Трудовая книжка</label
                                            >
                                        </div>
                                        <div class="form-checkbox">
                                            <input
                                                v-model="
                                                    document_data.military_document
                                                "
                                                type="checkbox"
                                                name="military"
                                            />
                                            <label for="military"
                                                >Военный билет или приписное
                                                свидетельство</label
                                            >
                                        </div>
                                        <div class="form-checkbox">
                                            <input
                                                v-model="
                                                    document_data.consent_personal_data
                                                "
                                                type="checkbox"
                                                name="consert"
                                            />
                                            <label for="consert"
                                                >Согласие на обработку
                                                персональных данных</label
                                            >
                                        </div>
                                    </v-container>
                                    <label class="form-label"
                                        >Добавьте Документы</label
                                    >
                                    <div class="form-col">
                                        <div class="form-fileupload">
                                            <FileUpload
                                                mode="basic"
                                                name="demo[]"
                                                accept=".pdf, .jpeg, .png"
                                                :maxFileSize="7000000"
                                                :customUpload="true"
                                                chooseLabel="Выбрать файл"
                                            ></FileUpload>
                                            <img
                                                src="@app/assets/icon/addFile.svg"
                                                alt="addFile"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-container">
                                    <div class="form-border"></div>
                                </div>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title>
                            <template v-slot="{ expanded }">
                                <v-row no-gutters>
                                    <v-col
                                        cols="4"
                                        class="d-flex justify-start"
                                    >
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
                            <div
                                v-for="organizator in organizators"
                                class="form-container"
                                :key="organizator"
                            >
                                <div class="form-col">
                                    <div class="form__field">
                                        <label class="form-label" for="name-hq"
                                            >ФИО организатора<sup
                                                class="valid-red"
                                                >*</sup
                                            ></label
                                        >
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
                                        <label
                                            class="form-label"
                                            for="telegram-owner-hq"
                                            >Telegram организатора</label
                                        >
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
                                        <label
                                            class="form-label"
                                            for="telegram-squad-hq"
                                            >Telegram отряда</label
                                        >
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
                                <div class="form-col">
                                    <div class="form__field">
                                        <label class="form-label" for="email-hq"
                                            >Email организатора<sup
                                                class="valid-red"
                                                >*</sup
                                            ></label
                                        >
                                        <InputText
                                            id="email-hq"
                                            v-model="
                                                organizator.organizer_email
                                            "
                                            class="form__input form-input-container"
                                            placeholder="email@gmail.com"
                                            name="email_hq"
                                            :maxlength="100"
                                        />
                                        <div class="form__counter"></div>
                                    </div>
                                    <div class="form__field">
                                        <label
                                            class="form-label"
                                            for="organization-hq"
                                            >Организация</label
                                        >
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
                                </div>
                                <div class="form__field">
                                    <div class="form-checkbox">
                                        <input
                                            v-model="
                                                organizators.is_contact_person
                                            "
                                            type="checkbox"
                                            name="person"
                                        />
                                        <label for="person"
                                            >Сделать контактным лицом</label
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="form-add" @click="AddOrganizator">
                                + Добавить организатора
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title>
                            <template v-slot="{ expanded }">
                                <v-row no-gutters>
                                    <v-col
                                        cols="4"
                                        class="d-flex justify-start"
                                    >
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
                            <div
                                v-for="answer in answers"
                                class="form-container"
                                :key="answer"
                            >
                                <div class="form-col">
                                    <div class="form__field">
                                        <label
                                            class="form-label"
                                            for="sub-questions-hq"
                                            >Задайте интересующие вопросы
                                            участникам мероприятия</label
                                        >
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
                            <div class="form-add" @click="AddQuestion">
                                + Добавить вопрос
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
            <div class="form-col-100">
                <Button type="submit" label="Сохранить"></Button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { Button } from '@shared/components/buttons';
import { ref, watch } from 'vue';
import {
    createAction,
    putTimeData,
    putDocuments,
} from '@services/ActionService';
import { sortByEducation } from '@shared/components/selects';
import { useRouter } from 'vue-router';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import { onActivated } from 'vue';
import { useRoleStore } from '@layouts/store/role';
const router = useRouter();
const rolesStore = useRoleStore();

onActivated(() => {
    watch(
        () => rolesStore.roles,
        (newRole) => {
            Object.entries(newRole).forEach(([obj, value], index) => {
                if (value !== null) {
                    console.log(`${obj} + ${value} + ${index}`);
                    const filted = scale_massive.value.find(
                        (commander) => commander.value === obj,
                    );
                    scale_massive_sorted.value.push(filted); //Работает
                }
            });
        },
    );
});

const maininfo = ref({
    format: '',
    direction: '',
    name: '',
    scale: '',
    banner: null,
    conference_link: '',
    address: '',
    description: '',
    participants_number: 0,
    application_type: '',
    available_structural_units: '',
    org_central_headquarter: 0,
    org_district_headquarter: 0,
    org_regional_headquarter: 0,
    org_local_headquarter: 0,
    org_educational_headquarter: 0,
    org_detachment: 0,
});

const urlBanner = ref(null);

const selectBanner = (event) => {
    maininfo.value.banner = event.target.files[0];
};

const resetBanner = () => {
    maininfo.value.banner = null;
    urlBanner.value = null;
};

const scale_massive_sorted = ref([]);

const scale_massive = ref([
    { name: 'Отрядное', value: 'detachment_commander' },
    { name: 'Образовательное', value: 'educationalheadquarter_commander' },
    { name: 'Городское', value: 'localheadquarter_commander' },
    { name: 'Региональное', value: 'regionalheadquarter_commander' },
    { name: 'Окружное', value: 'districtheadquarter_commander' },
    { name: 'Всероссийское', value: 'centralheadquarter_commander' },
]);

const direction_massive = ref([
    { name: 'Добровольческое' },
    { name: 'Образовательное' },
    { name: 'Патриотическое' },
    { name: 'Спортивное' },
    { name: 'Творческое' },
]);

const area = ref('');
const area_massive = ref([
    { name: 'ЛСО' },
    { name: 'Региональный штаб' },
    { name: 'Окружной штаб' },
]);

const document_data = ref({
    passport: false,
    snils: false,
    inn: false,
    work_book: false,
    military_document: false,
    consent_personal_data: false,
    additional_info: '',
});
const time_data = ref({
    event_duration_type: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    registration_end_date: '',
    registration_end_time: '',
});

//Переменные организаторов

const organizators = ref([
    {
        organizer: '',
        organizer_phone_number: '',
        organizer_email: '',
        organization: '',
        telegram: '',
        is_contact_person: false,
    },
]);

//Ответы на вопросы
const answers = ref([
    {
        question: '',
        answer: '',
    },
]);

function AddOrganizator() {
    organizators.value.push({
        organizer: '',
        organizer_phone_number: '',
        organizer_email: '',
        organization: '',
        telegram: '',
        is_contact_person: false,
    });
}
function SubmitEvent() {
    //Внести все значения в FormData
    let fd = new FormData();
    Object.entries(maininfo.value).forEach(([key, item]) => {
        fd.append(key, item);
    });
    createAction(fd)
        .then((resp) => {
            console.log('Форма передалась успешно', resp.data);
            putDocuments(resp.data.id, document_data.value)
                .then(() => {})
                .catch((e) => {
                    console.error(e);
                });
            putTimeData(resp.data.id, time_data.value).then((resp) => {
                console.log('Удалось изменить время', resp.data);
            });
            putDocuments(resp.data.id, document_data.value)
                .then(() => {})
                .catch((e) => {
                    console.error(e);
                });
            router.push({ name: 'actionSquads' });
        })
        .catch((e) => {
            console.error(e);
        });
}

function AddQuestion() {
    answers.value.push({
        question: '',
        answer: '',
    });
}
</script>

<style lang="scss" scoped>
.action {
    margin-top: 60px;
    &-title {
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
    &-slides {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
    }
    &-slides {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
    }
}
//Пользовательские стили для формы
.form {
    &-container {
        display: flex;
        margin-right: 16px;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    &-col {
        width: 50%;
        padding-left: 15px;
        padding-right: 15px;
    }
    &-input {
        width: 100%;
        height: 40px;
    }
    &-checkbox {
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    &-checkbox input {
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }
    &-fileupload {
        display: flex;
        flex-direction: row;
    }
    &-radio {
        margin-left: 10px;
    }
    &-radio input {
        width: 20px;
        height: 20px;
    }
    &-input-container {
        border: 1px solid black;
        border-radius: 15px;
        padding-left: 15px;
    }
    &-title {
        font-family: Bert Sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
    }
    &-row {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    &-border {
        width: 100%;
        margin-top: 10px;
        margin-left: 10px;
        border-bottom: 1px solid black;
    }
    &-col-100 {
        width: 100%;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        margin-top: 3px;
        margin-bottom: 3px;
    }
    &-label {
        font-family: Bert Sans;
        font-size: 0.9vw;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        margin-top: 5px;
        margin-bottom: 10px;
    }
    &-add-block:hover {
        cursor: pointer;
    }
    &-btm {
        width: 114px;
        border-radius: 10px;
        background-color: #39bfbf;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &-btminv {
        width: 114px;
        border-radius: 10px;
        border: 2px solid #35383f;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &-add {
        margin-top: 10px;
        text-decoration: underline;
    }
    &-add:hover {
        cursor: pointer;
    }
}
.upload {
    width: 100%;
    height: 162px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 16px;

    &-load {
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
</style>
