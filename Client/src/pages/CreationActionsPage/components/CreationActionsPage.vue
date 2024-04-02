<template>
    <div class="container">
        <h1 class="title title--mb">Создание мероприятия</h1>
        <form @submit.prevent="SubmitEvent" class="form" style="margin-bottom: 118px;">
          <v-expansion-panels variant="accordion" v-model="panel">
                    <v-expansion-panel value="panelOne">
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
                        <v-expansion-panel-text class="form__inner-content">
                          <div class="form__field-group">
                            <div class="form-container">
                              <div class="form-col-100">
                                <label class="form__label">Выберите формат мероприятия</label>
                                <div style="display: flex; margin-top: 8px; margin-bottom: 16px;">
                                  <div style="display: flex; align-items: center">
                                    <input
                                        id="offlineBtn"
                                        v-model="maininfo.format"
                                        type="radio"
                                        value="Офлайн"
                                    />
                                    <label for="offlineBtn" class="ml-3 form-label">Офлайн</label>
                                  </div>
                                  <div style="display: flex; align-items: center">
                                    <input
                                        id="onlineBtn"
                                        v-model="maininfo.format"
                                        type="radio"
                                        value="Онлайн"
                                        class="form-radioR"
                                    />
                                    <label for="onlineBtn" class="ml-3 form-label">Онлайн</label>
                                  </div>
                                </div>
                                <div class="form-col-100">
                                  <div class="form__field">
                                    <label class="form__label"
                                    >Выберите маcштаб мероприятия <sup class="valid-red">*</sup></label>
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
                                  <label class="form__label" for="name-hq"
                                  >Название мероприятия <sup class="valid-red">*</sup></label>
                                  <InputText
                                      id="name-hq"
                                      v-model="maininfo.name"
                                      class="form__input form-input-container"
                                      placeholder="Название мероприятия"
                                      name="name_hq"
                                      :maxlength="100"
                                  />
                                  <div class="form__counter">
                                    {{ maininfo.name.length }}/60
                                  </div>
                                </div>
                                <div class="form__field">
                                  <label
                                      class="form__label"
                                      for="telegram-owner-hq"
                                  >Ссылка на конференцию
                                    <sup v-if="maininfo.format === 'Онлайн'" class="valid-red">*</sup></label>
                                  <InputText
                                      id="telegram-owner-hq"
                                      v-model="maininfo.conference_link"
                                      class="form__input form-input-container"
                                      placeholder="https://discord.gg/s44UfkVJ"
                                      name="telegram-owner-hq"
                                  />
                                  <div class="form__counter">{{ maininfo.conference_link.length }}/60</div>
                                </div>
                                <div class="form__field">
                                  <div class="form__field photo-add">
                                    <p class="form__label">
                                      Добавьте баннер <sup class="valid-red">*</sup>
                                    </p>
                                    <div style="width: 237px; border: 1px solid #939393; border-radius: 16px" class="photo-add__box photo-add__box--banner">
                                      <div class="photo-add__img photo-add__img--banner">
                                        <img
                                            v-if="maininfo.banner ?? urlBanner"
                                            class="photo-add__image"
                                            :src="urlBanner"
                                        />
                                      </div>

                                      <div class="photo-add__input">
                                        <label
                                            class="photo-add__label"
                                            for="upload-banner"
                                            v-if="!maininfo.banner && !urlBanner"
                                            @click="dialogBanner = true">
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
                                              @click="dialogBanner = true"
                                          ><span class="photo-add__label-text">Изменить фото</span>
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
                                            @click.prevent
                                        />
                                      </div>
                                    </div>
                                    <v-dialog v-model="dialogBanner" width="1024">
                                      <v-card>
                                        <v-card-title>
                                            <span class="text-h5">
                                                Загрузите ваше фото
                                            </span>
                                        </v-card-title>
                                        <v-card-text>
                                          <v-container>
                                            <v-row>
                                              <v-file-input
                                                  @change="selectBanner"
                                                  type="file"
                                                  show-size
                                                  prepend-icon="mdi-camera"
                                                  counter
                                              />
                                            </v-row>
                                            <v-row class="align-center justify-end">
                                              <v-btn
                                                  v-if="bannerPreview"
                                                  class="button-wrapper mt-5"
                                                  @click="cropImage"
                                                  prepend-icon="crop"
                                                  variant="plain"
                                              >Обрезать фото</v-btn>
                                            </v-row>
                                            <v-row>
                                              <Cropper ref="cropper" class="cropper mt-5 mx-auto" :src="bannerPreview" />
                                            </v-row>
                                          </v-container>
                                        </v-card-text>
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn
                                              color="blue-darken-1"
                                              variant="text"
                                              @click="dialogBanner = false"
                                          >
                                            Закрыть
                                          </v-btn>
                                          <v-btn
                                              :disabled="!maininfo.banner"
                                              color="blue-darken-1"
                                              variant="text"
                                              type="submit"
                                              @click="uploadPhoto"
                                          >
                                            Загрузить
                                          </v-btn>
                                        </v-card-actions>
<!--                                        <p class="error" v-if="isError.detail">-->
<!--                                          {{ isError.detail }}-->
<!--                                        </p>-->
                                      </v-card>
                                    </v-dialog>
                                    <span
                                        style="margin-bottom: 16px; margin-top: 8px;" class="form__footnote"
                                    >Рекомендуемый размер 1920х768</span>
                                  </div>
                                </div>
                              </div>
                              <div class="form-col">
                                <div class="form__field">
                                  <label
                                      class="form__label"
                                      for="address-hq"
                                  >Адрес проведения (если мероприятияе формата офлайн) <sup class="valid-red">*</sup></label>
                                  <InputText
                                      id="address-hq"
                                      v-model="maininfo.address"
                                      class="form__input form-input-container"
                                      placeholder="Например, Москва, Гагарина 40"
                                      name="address_hq"
                                      :maxlength="100"
                                  />
                                  <div class="form__counter">
                                    {{ maininfo.address.length }}/60
                                  </div>
                                </div>
                                <div class="form__field">
                                  <label class="form__label" for="group-hq"
                                  >Количество участников <sup class="valid-red">*</sup></label>
                                  <Input
                                      v-model:value="maininfo.participants_number"
                                      id="group-hq"
                                      type="number"
                                      class="form__input form-input-container"
                                      placeholder="Например, 150"
                                      name="group-hq"
                                      min="0"
                                  />
                                  <div class="form__counter">
                                    {{ maininfo.participants_number.length }}/4
                                  </div>
                                </div>
                                <div class="form__field">
                                  <label class="form__label">О мероприятии <sup class="valid-red">*</sup></label>
                                  <textarea
                                      class="form__textarea"
                                      v-model="maininfo.description"
                                      placeholder="Расскажите об отряде"
                                  />
                                  <div class="form__counter">
                                    {{ maininfo.description.length }}/300
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="form-container">
                              <div class="form-col-100">
                                <div class="form__field">
                                  <label class="form__label" for="road-hq"
                                  >Добавьте направление <sup class="valid-red">*</sup></label>
                                  <v-select
                                      v-model="maininfo.direction"
                                      style="border: 1px solid #b6b6b6;
                                      border-radius: 10px;
                                      max-height: 40px;
                                      display: flex;
                                      align-items: center;"
                                      variant="outlined"
                                      :items="direction_massive"
                                      placeholder="Например, ЛСО"
                                  ></v-select>
                                </div>
                              </div>
                            </div>
                            <div class="form-container">
                              <div class="form-col">
                                <label class="form__label"
                                >Выберите вид принимаемых к подаче на мероприятие заявок: <sup class="valid-red">*</sup></label>
                                <label class="eventType">
                                  <div class="eventType__personalBtn">
                                    <input
                                        id="personalBtn"
                                        v-model="maininfo.application_type"
                                        value="Персональная"
                                        type="radio"
                                        class="form-radio"
                                    />
                                    <label for="personalBtn" class="ml-3 form-label"
                                    >Персональная</label>
                                  </div>
                                  <div class="eventType__groupBtn">
                                    <input
                                        id="groupBtn"
                                        v-model="maininfo.application_type"
                                        value="Групповая"
                                        type="radio"
                                        class="form-radio"
                                    />
                                    <label for="groupBtn" class="ml-3 form-label"
                                    >Групповая</label>
                                  </div>
                                  <div class="eventType__multistageBtn">
                                    <input
                                        id="multistageBtn"
                                        v-model="maininfo.application_type"
                                        value="Многоэтапная"
                                        type="radio"
                                        class="form-radio"
                                    />
                                    <label for="multistageBtn" class="ml-3 form-label"
                                    >Многоэтапная</label>
                                  </div>
                                </label>
                              </div>
                              <div
                                  class="form-col"
                                  v-if="maininfo.application_type === 'Групповая' || maininfo.application_type === 'Многоэтапная'"
                              >
                                <label class="form__label"
                                >Какие объекты могут формировать
                                  {{ maininfo.application_type === 'Групповая' ? 'групповые' : 'многоэтапные' }}
                                  заявки <sup class="valid-red">*</sup></label>
                                <sortByEducation
                                    v-model="area"
                                    :options="area_massive"
                                    placeholder="Например, ЛСО"
                                    style="margin-top: 8px;"
                                ></sortByEducation>
                              </div>
                            </div>
                          </div>

                          <v-card-actions class="form__button-group">
                            <Button
                                variant="text"
                                type="button"
                                class="form-button form-button--next"
                                label="Далее"
                                size="large"
                                @click="openPanelTwo"
                            ></Button>
                          </v-card-actions>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel value="panelTwo">
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
                        <v-expansion-panel-text class="form__inner-content">
                          <div class="form__field-group">
                            <div style="margin-bottom: 30px;">
                              <label class="form__label">Выберите продолжительность мероприятия</label>
                              <div style="display: flex; margin-top: 8px; margin-bottom: 16px;">
                                <div style="display: flex; align-items: center">
                                  <input
                                      id="onedayBtn"
                                      v-model="time_data.event_duration_type"
                                      type="radio"
                                      value="Однодневное"
                                      checked
                                  />
                                  <label for="onedayBtn" class="ml-3 form-label">Однодневное</label>
                                </div>
                                <div style="display: flex; align-items: center">
                                  <input
                                      id="multidayBtn"
                                      v-model="time_data.event_duration_type"
                                      type="radio"
                                      value="Многодневное"
                                      class="form-radioR"
                                  />
                                  <label for="multidayBtn" class="ml-3 form-label">Многодневное</label>
                                </div>
                              </div>
                            </div>
                            <div class="form-container">
                              <div class="form-col">

                                <div class="form__field">
                                  <label
                                      class="form__label"
                                      for="action-start-hq"
                                  >Начало мероприятия
                                    <sup class="valid-red">*</sup></label>
                                  <Input
                                      id="action-start-hq"
                                      v-model:value="time_data.start_date"
                                      class="form__input form-input-container"
                                      placeholder="Например 26.06.2024"
                                      name="action-start-hq"
                                      type="date"
                                  />
                                </div>
                                <div v-if="time_data.event_duration_type === 'Многодневное'" class="form__field">
                                  <label
                                      class="form__label"
                                      for="action-end-hq"
                                  >Окончание мероприятия <sup class="valid-red">*</sup></label>
                                  <Input
                                      id="action-end-hq"
                                      v-model:value="time_data.end_date"
                                      class="form__input form-input-container"
                                      placeholder="Например 27.06.2024"
                                      name="action-end-hq"
                                      type="date"
                                  />
                                </div>
                                <div class="form__field">
                                  <label
                                      class="form__label"
                                      for="end-registration-hq"
                                  >Окончание регистрации <sup class="valid-red">*</sup></label>
                                  <Input
                                      id="end-registration-hq"
                                      class="form__input form-input-container"
                                      v-model:value="time_data.registration_end_date"
                                      placeholder="Например, 15.05.2023"
                                      name="end-registration-hq"
                                      type="date"
                                  />
                                </div>
                              </div>
                              <div class="form-col">
                                <div class="form__field">
                                  <label
                                      class="form__label"
                                      for="action-hours-start-hq"
                                  >Время в часах</label>
                                  <Input
                                      id="action-hours-start-hq"
                                      class="form__input form-input-container"
                                      v-model:value="time_data.start_time"
                                      placeholder="Например 7:30"
                                      name="action-hours-start-hq"
                                      type="time"
                                  />
                                  <div class="form__counter"></div>
                                </div>
                                <div v-if="time_data.event_duration_type === 'Многодневное'" class="form__field">
                                  <label
                                      class="form__label"
                                      for="action-hours-end-hq"
                                  >Время в часах</label>
                                  <Input
                                      id="action-hours-end-hq"
                                      class="form__input form-input-container"
                                      v-model:value="time_data.end_time"
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
                                        class="form__label"
                                        for="action-hours-end-hq"
                                    >Время в часах</label>
                                    <Input
                                        id="action-hours-end-hq"
                                        class="form__input form-input-container"
                                        v-model:value="time_data.registration_end_time"
                                        placeholder="Например 18:30"
                                        name="action-hours-end-hq"
                                        type="time"
                                    />
                                    <div class="form__counter"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <v-card-actions class="form__button-group">
                            <Button
                                class="form-button form-button--prev"
                                variant="text"
                                type="button"
                                label="Назад"
                                size="large"
                                @click="openPanelOne"
                            ></Button>
                            <Button
                                variant="text"
                                type="button"
                                class="form-button form-button--next"
                                label="Далее"
                                size="large"
                                @click="openPanelThree"
                            ></Button>
                          </v-card-actions>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel value="panelThree">
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
                        <v-expansion-panel-text class="form__inner-content">
                          <div class="form__field-group">
                            <div class="form-container">
                              <div class="form-col-100">
                                <div style="margin-bottom: 22px;">
                                  <label class="form__label"
                                  >Какие личные данные участников вам
                                    нужны? Отметьте их галочкой, и в
                                    дальнейшем у вас будет возможность
                                    скачать все документы участников.</label>
                                  <div class="form-checkbox">
                                    <input
                                        v-model="document_data.passport"
                                        type="checkbox"
                                        name="passport"
                                    />
                                    <label for="passport"
                                    >Паспорт</label>
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
                                        v-model="document_data.work_book"
                                        type="checkbox"
                                        name="workbook"
                                    />
                                    <label for="workbook"
                                    >Трудовая книжка</label
                                    >
                                  </div>
                                  <div class="form-checkbox">
                                    <input
                                        v-model="document_data.military_document"
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
                                        v-model="document_data.consent_personal_data"
                                        type="checkbox"
                                        name="consert"
                                    />
                                    <label for="consert"
                                    >Согласие на обработку
                                      персональных данных</label>
                                  </div>
                                </div>

                                <label class="form__label">Добавьте документы:</label>
                                <div class="form-col" style="margin-top: 12px;">
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
                                        style="margin-left: 6px;"
                                        src="@app/assets/icon/addFile.svg"
                                        alt="addFile"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <v-card-actions class="form__button-group">
                            <Button
                                class="form-button form-button--prev"
                                variant="text"
                                type="button"
                                label="Назад"
                                size="large"
                                @click="openPanelTwo"
                            ></Button>
                            <Button
                                variant="text"
                                type="button"
                                class="form-button form-button--next"
                                label="Далее"
                                size="large"
                                @click="openPanelFour"
                            ></Button>
                          </v-card-actions>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel value="panelFour">
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
                        <v-expansion-panel-text class="form__inner-content">
                          <div class="form__field-group">
                            <div
                                v-for="(organizer, index) in selectedUser"
                                :key="index"
                                style="margin-bottom: 30px;"
                            >
                              <div v-if="organizer.organizerBtnClose" class="organizer__close">
                                <svg
                                    @click="selectedUser.splice(index, 1)"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z" stroke="#939393" stroke-linecap="round"/>
                                  <path d="M9 9L15 15" stroke="#939393" stroke-linecap="round"/>
                                  <path d="M15 9L9 15" stroke="#939393" stroke-linecap="round"/>
                                </svg>
                              </div>
                              <div class="form-container" style="align-items: flex-end">
                                <div class="form-col">
                                  <div class="form__field">
                                    <label class="form__label" for="name-hq"
                                    >ФИО организатора <sup class="valid-red">*</sup></label>

                                    <v-autocomplete
                                        variant="outlined"
                                        :model-value="organizer"
                                        class="form__input form-input-container"
                                        :items="usersList"
                                        :item-value="item => item"
                                        :item-title="item => item.first_name ? `${item.last_name} ${item.first_name} ${item.patronymic_name}` : ''"
                                        placeholder="Фамилия Имя Отчество"
                                        @update:modelValue="item => {
                                          organizer.organizer = item.id
                                          organizer.last_name = item.last_name
                                          organizer.first_name = item.first_name
                                          organizer.patronymic_name = item.patronymic_name
                                        }"
                                        style="border: 1px solid #b6b6b6;
                                        border-radius: 10px;
                                        max-height: 40px;
                                        display: flex;
                                        align-items: center;"
                                        no-data-text="Ничего не найдено"
                                    >
                                      <template v-slot:chip="{ item }">
                                        <div>
                                          {{
                                            item.raw.last_name +
                                            ' ' +
                                            item.raw.first_name +
                                            ' ' +
                                            item.raw.patronymic_name
                                          }}
                                        </div>
                                      </template>
                                      <template v-slot:item="{ props, item }">
                                        <v-list-item
                                            v-bind="props"
                                            :title="`${item.raw.last_name} ${item.raw.first_name} ${item.raw.patronymic_name}`"
                                            :subtitle="item.raw.date_of_birth"
                                        ></v-list-item>
                                      </template>
                                    </v-autocomplete>

                                  </div>
                                </div>
                                <div class="form-col">
                                  <div class="form__field">
                                    <div class="form-checkbox" style="justify-content: center">
                                      <input
                                          v-model="organizer.is_contact_person"
                                          type="checkbox"
                                          :id="index"
                                      />
                                      <label :for="index">Сделать контактным лицом</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div style="border: 1px solid #939393; width: 100%; margin-top: 40px; margin-bottom: 30px;"/>
                            </div>
                            <div class="form-add" @click="AddOrganizer">
                              + Добавить организатора
                            </div>
                          </div>
                          <v-card-actions class="form__button-group">
                            <Button
                                class="form-button form-button--prev"
                                variant="text"
                                type="button"
                                label="Назад"
                                size="large"
                                @click="openPanelThree"
                            ></Button>
                            <Button
                                variant="text"
                                type="button"
                                class="form-button form-button--next"
                                label="Далее"
                                size="large"
                                @click="openPanelFive"
                            ></Button>
                          </v-card-actions>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel value="panelFive">
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
                        <v-expansion-panel-text class="form__inner-content">
                          <div class="form__field-group">
                            <div
                                v-for="answer in answers"
                                class="form-container"
                                :key="answer"
                            >
                              <div class="form-col" style="width: 100%;">
                                <div class="form__field">
                                  <label
                                      class="form__label"
                                      for="sub-questions-hq"
                                  >Задайте интересующие вопросы
                                    участникам мероприятия</label>
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
                          </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
          <div class="form-col-100" style="margin-top: 40px;">
            <Button type="submit" label="Создать"></Button>
          </div>
        </form>
    </div>
</template>

<script setup>
import { Button } from '@shared/components/buttons';
import { ref, inject } from 'vue';
import {
  createAction,
  putTimeData,
  putDocuments,
  createOrganizator,
  getRoles,
  getRsousers,
} from '@services/ActionService';
import { sortByEducation } from '@shared/components/selects';
import { useRouter } from 'vue-router';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import { Input } from '@shared/components/inputs';
import { onActivated, onMounted, watchEffect } from 'vue';
import { getUser } from '@services/UserService';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { HTTP } from '@app/http';

const swal = inject('$swal');
const router = useRouter();
const rules = ref([]);
// const organization_stop = ref('');

//------------------------------------------------------------------------------------------------
const panel = ref();

const openPanelOne = () => {
  panel.value = 'panelOne';
};

const openPanelTwo = () => {
  panel.value = 'panelTwo';
};

const openPanelThree = () => {
  panel.value = 'panelThree';
};

const openPanelFour = () => {
  panel.value = 'panelFour';
}

const openPanelFive = () => {
  panel.value = 'panelFive';
}
//-------------------------------------------------------------------------------------
const usersList = ref(null)
let selectedUser = ref([])

onActivated( () => {
    getRoles().then((resp) => {
        console.log(resp.data);
        rules.value = resp.data;
        Object.entries(resp.data).forEach(([key, value]) => {
            if (value !== null) {
                const filted = scale_massive.value.find(
                    (commander) => commander.value === key,
                );
                scale_massive_sorted.value.push(filted); //Работает
            }
        });
    });
    getUser().then((resp) => {
      selectedUser.value.push({
          organizer: resp.data.id,
          last_name: resp.data.last_name,
          first_name: resp.data.first_name,
          patronymic_name: resp.data.patronymic_name,
          is_contact_person: true,
          organizerBtnClose: false,
      });
    });
    getRsousers().then((resp) => {
        users.value = resp.data;
    });

    const getUsers = async () => {
      try {
        const usersRes = await HTTP.get('users/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
          },
        })
        usersList.value = await usersRes.data.results;
      } catch (e) {
        console.log(e)
      }
    }
    getUsers();
});
onMounted(() => {});
//@update:value="changeValue"
const maininfo = ref({
    format: '',
    direction: '',
    name: '',
    scale: '',
    banner: null,
    conference_link: '',
    address: '',
    description: '',
    participants_number: '',
    application_type: '',
    available_structural_units: '',
    org_central_headquarter: '',
    org_district_headquarter: '',
    org_regional_headquarter: '',
    org_local_headquarter: '',
    org_educational_headquarter: '',
    org_detachment: '',
});

function AddOrganizer() {
  selectedUser.value.push({
    organizer: '',
    last_name: '',
    first_name: '',
    patronymic_name: '',
    is_contact_person: false,
    organizerBtnClose: true,
  });
}
// ----------------------------------------------------------------------------
const cropper = ref();
const dialogBanner = ref(false);
const users = ref([]);
const urlBanner = ref(null);
let bannerPreview = ref(null);

const selectBanner = (event) => {
    maininfo.value.banner = event.target.files[0];
  // fileBanner.value = event.target.files[0];
    bannerPreview.value = URL.createObjectURL(maininfo.value.banner);
};
const cropImage = () => {
  if (cropper.value) {
    const { canvas } = cropper.value.getResult();
    bannerPreview.value = canvas.toDataURL('image/jpeg')
    canvas.toBlob((blob) => {
      maininfo.value.banner = new File([blob], "banner.jpg", { type: "image/jpeg" })
    }, 'image/jpeg');
  }
};
const uploadPhoto = () => {
  urlBanner.value = URL.createObjectURL(maininfo.value.banner);
  dialogBanner.value = false;
}
const resetBanner = () => {
    maininfo.value.banner = null;
    urlBanner.value = null;
};
//--------------------------------------------------------------
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
    'Добровольческое',
    'Образовательное',
    'Патриотическое',
    'Спортивное',
    'Творческое',
]);

const area = ref('');
const area_massive = ref([
    { name: 'ЛСО' },
    { name: 'Региональный штаб' },
    { name: 'Окружной штаб' },
]);

watchEffect(() => {
    switch (maininfo.value.application_type) {
        case 'Персональная':
            area_massive.value = [{ name: 'ЛСО' }];
            break;
        case 'Групповая':
            area_massive.value = [
                { name: 'Округи' },
                { name: 'Регионы' },
                { name: 'Местные штабы' },
                { name: 'ЛСО' },
                { name: 'Штабы ОО' },
            ];
            break;
        case 'Многоэтапная':
            area_massive.value = [
                { name: 'Округи' },
                { name: 'Регионы' },
                { name: 'Местные штабы' },
                { name: 'ЛСО' },
                { name: 'Штабы ОО' },
            ];
            break;
    }
    switch (maininfo.value.scale) {
        case 'Отрядное':
            Object.entries(rules.value).forEach(([key, value]) => {
                if (key === 'detachment_commander') {
                    Object.entries(value).forEach(([key, value]) => {
                        if (key === 'id') {
                            maininfo.value.org_central_headquarter = '';
                            maininfo.value.org_district_headquarter = '';
                            maininfo.value.org_regional_headquarter = '';
                            maininfo.value.org_local_headquarter = '';
                            maininfo.value.org_educational_headquarter = '';
                            maininfo.value.org_detachment = value;
                        }
                    });
                }
            });
            break;
        case 'Образовательное':
            Object.entries(rules.value).forEach(([key, value]) => {
                if (key === 'educationalheadquarter_commander') {
                    Object.entries(value).forEach(([key, value]) => {
                        if (key === 'id') {
                            maininfo.value.org_central_headquarter = '';
                            maininfo.value.org_district_headquarter = '';
                            maininfo.value.org_regional_headquarter = '';
                            maininfo.value.org_local_headquarter = '';
                            maininfo.value.org_educational_headquarter = value;
                            maininfo.value.org_detachment = '';
                        }
                    });
                }
            });
            break;
        case 'Городское':
            Object.entries(rules.value).forEach(([key, value]) => {
                if (key === 'localheadquarter_commander') {
                    Object.entries(value).forEach(([key, value]) => {
                        if (key === 'id') {
                            maininfo.value.org_central_headquarter = '';
                            maininfo.value.org_district_headquarter = '';
                            maininfo.value.org_regional_headquarter = '';
                            maininfo.value.org_local_headquarter = value;
                            maininfo.value.org_educational_headquarter = '';
                            maininfo.value.org_detachment = '';
                        }
                    });
                }
            });
            break;
        case 'Региональное':
            //Работает, на удивление...
            Object.entries(rules.value).forEach(([key, value]) => {
                if (key === 'regionalheadquarter_commander') {
                    Object.entries(value).forEach(([key, value]) => {
                        if (key === 'id') {
                            maininfo.value.org_central_headquarter = '';
                            maininfo.value.org_district_headquarter = '';
                            maininfo.value.org_regional_headquarter = value;
                            maininfo.value.org_local_headquarter = '';
                            maininfo.value.org_educational_headquarter = '';
                            maininfo.value.org_detachment = '';
                        }
                    });
                }
            });
            break;
        case 'Окружное':
            Object.entries(rules.value).forEach(([key, value]) => {
                if (key === 'districtheadquarter_commander') {
                    Object.entries(value).forEach(([key, value]) => {
                        if (key === 'id') {
                            maininfo.value.org_central_headquarter = '';
                            maininfo.value.org_district_headquarter = value;
                            maininfo.value.org_regional_headquarter = '';
                            maininfo.value.org_local_headquarter = '';
                            maininfo.value.org_educational_headquarter = '';
                            maininfo.value.org_detachment = '';
                        }
                    });
                }
            });
            break;
        case 'Всероссийское':
            Object.entries(rules.value).forEach(([key, value]) => {
                if (key === 'centralheadquarter_commander') {
                    maininfo.value.org_central_headquarter = value;
                    maininfo.value.org_district_headquarter = '';
                    maininfo.value.org_regional_headquarter = '';
                    maininfo.value.org_local_headquarter = '';
                    maininfo.value.org_educational_headquarter = '';
                    maininfo.value.org_detachment = '';
                }
            });
            break;
    }
});

const document_data = ref({
    passport: false,
    snils: false,
    inn: false,
    work_book: false,
    military_document: false,
    consent_personal_data: false,
});
const time_data = ref({
    event_duration_type: 'Однодневное',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    registration_end_date: '',
    registration_end_time: '',
});

//Переменные организаторов

// const organizators = ref([]);

//Ответы на вопросы
const answers = ref([
    {
        question: '',
        answer: '',
    },
]);

function SubmitEvent() {
    //Внести все значения в FormData главной информации мероприятия
    let fd = new FormData();
    Object.entries(maininfo.value).forEach(([key, item]) => {
        fd.append(key, item);
    });
    if (time_data.value.event_duration_type === 'Однодневное') {
      delete time_data.value.end_date;
      delete time_data.value.end_time;
    }
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
            selectedUser.value.forEach((item) => {
                createOrganizator(resp.data.id, { organizer: item.organizer, is_contact_person: item.is_contact_person })
                    .then((resp) => {
                        console.log(resp.data);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            });
            swal.fire({
                position: 'center',
                icon: 'success',
                title: `Мероприятие создано`,
                showConfirmButton: false,
                timer: 1500,
            });
            router.push({ name: 'actionSquads' });
        })
        .catch(() => {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `Не удалось создать`,
                showConfirmButton: false,
                timer: 1500,
            });
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
.v-expansion-panel {
  border-bottom: none;
}
.form__inner-content {
  border-bottom: none;
}
.organizer__close {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  svg {
    cursor: pointer;
  }
}
.eventType {
  display: flex;
  margin-top: 13px;
  @media (max-width: 768px) {
    display: initial;
  }
  &__personalBtn {
    display: flex;
    align-items: center;
  }
  &__groupBtn {
    display: flex;
    align-items: center;
    margin-left: 16px;
    @media (max-width: 768px) {
      margin-left: initial;
    }
  }
  &__multistageBtn {
    display: flex;
    align-items: center;
    margin-left: 16px;
    @media (max-width: 768px) {
      margin-left: initial;
    }
  }
}
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
        margin-bottom: 8px;
        gap: 80px;
        @media (max-width: 768px) {
          display: initial;
        }
    }
    &-col {
        width: 50%;
        @media (max-width: 768px) {
          width: initial;
        }
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
        font-family: Bert Sans;
        font-size: 16px;
        font-weight: 400;
        line-height: 25.6px;
        text-align: left;
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
    &-radioR {
        margin-left: 16px;
    }
    &-radio input {
        width: 20px;
        height: 20px;
    }
    &-input-container {
        border: 1px solid #B6B6B6;
        border-radius: 15px;
        padding-left: 15px;
        margin-bottom: 3px;
        -moz-appearance: none;
        background-color: none;
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
      font-size: 16px;
      font-weight: 400;
      line-height: 21.1px;
      text-align: left;
      color: #35383F;
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
        font-family: Bert Sans;
        font-size: 14px;
        font-weight: 600;
        line-height: 24px;
        text-align: left;
        color: #35383F;
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

.form-button {
  width: 132px;
  min-height: 52px;
  margin: 0 10px;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
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
//.v-expansion-panel {
//    &__shadow {
//        box-shadow: none;
//    }
//
//    &--active,
//    &--after-active {
//        margin: 0;
//    }
//
//    &--active:not(:first-child) {
//        margin: 0;
//    }
//
//    &--active + .v-expansion-panel {
//        margin: 0;
//    }
//
//    .v-expansion-panel-title {
//        max-height: 60px;
//        font-family: 'Akrobat';
//        font-size: 24px;
//        font-weight: 600;
//        background-color: transparent;
//        border-bottom: 1px solid #939393;
//        color: #35383f;
//        padding: 16px 0px;
//
//        &__overlay {
//            display: none;
//        }
//    }
//}
</style>
