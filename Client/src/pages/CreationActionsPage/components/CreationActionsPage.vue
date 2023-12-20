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
                        </div>
                        <div class='form-container'>
                            <div class='form-border'></div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </div>
</template>

<script setup>

import FormAction from '@features/FormAction/components/FormAction.vue';
</script>

<style lang='scss' scoped>
.action{
    margin-top: 60px;
    &-container{

    }
    &-title{
      height: 116px;
      font-size: 36px;
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
    border-bottom: 1px solid black;
  }
}
</style>