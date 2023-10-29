<template>
    <form class="form" action="#" method="post">
        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-title>
                    <template v-slot:default="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start">
                                Основная информация
                            </v-col>
                        </v-row>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="form__field-group">
                        <div class="form__field">
                            <label for="name_squad"
                                >Название отряда
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                class="form__input"
                                id="name_squad"
                                label="Название отряда"
                                placeholder="Например, Монолит"
                                name="name_squad"
                            />
                        </div>

                        <v-text-field
                            v-model="name4"
                            hide-details
                            label="Выберите направление"
                            placeholder="Например, ССО"
                        ></v-text-field>

                        <div class="form__field">
                            <label for="create_date"
                                >Дата основания
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                id="create_date"
                                label="Дата основания"
                                name="create_date"
                                type="date"
                            />
                        </div>

                        <div class="form__field">
                            <label for="select_region">Выберите регион</label>
                            <SelectRegion
                                id="select_region"
                                placeholder="Например, Алтайский край"
                            ></SelectRegion>
                        </div>

                        <div class="form__field">
                            <label for="city"
                                >Город
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                id="city"
                                label="Город"
                                placeholder="Например, Барнаул"
                                name="city"
                            />
                        </div>

                        <v-text-field
                            v-model="name5"
                            hide-details
                            label="Выберите учебное заведение"
                            placeholder="Например, Алтайский государственный медицинский университет"
                        ></v-text-field>

                        <v-text-field
                            v-model="name6"
                            hide-details
                            label="Командир отряда:"
                            placeholder="Поиск по ФИО"
                        ></v-text-field>
                    </div>

                    <v-card-actions class="form__button-group">
                        <Button
                            class="form__button form__button--next"
                            label="Далее"
                            size="large"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Контакты
                        </v-col>
                        <!-- <v-col cols="8" class="text--secondary">
                            <v-fade-transition leave-absolute>
                                <span v-if="open" key="0">
                                    Select trip destination
                                </span>
                                <span v-else key="1">
                                    {{ trip.location }}
                                </span>
                            </v-fade-transition>
                        </v-col> -->
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="form__field-group">
                        <div class="form__field">
                            <label for="social-media-vk"
                                >Группа отряда ВКонтакте
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                id="social-media-vk"
                                label="Группа отряда ВКонтакте"
                                placeholder="Например, https://vk.com/cco_monolit"
                                name="social-media-vk"
                            />
                        </div>

                        <div class="form__field">
                            <label for="social-media-te"
                                >Группа отряда в Телеграмме
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                id="social-media-te"
                                label="Группа отряда в Телеграмме"
                                placeholder="Например, https://t.me/cco_monolit"
                                name="social-media-te"
                            />
                        </div>

                        <!-- <v-col cols="5">
                            <v-select
                                v-model="trip.location"
                                :items="locations"
                                chips
                                flat
                                variant="solo"
                            ></v-select>
                        </v-col> -->

                        <!-- <v-col cols="3">
                            Select your destination of choice
                            <br />
                            <a href="#">Learn more</a>
                        </v-col> -->
                    </div>

                    <v-card-actions class="form__button-group">
                        <Button
                            class="form__button form__button--prev"
                            variant="text"
                            label="Назад"
                            size="large"
                        ></Button>
                        <Button
                            class="form__button form__button--next"
                            label="Далее"
                            size="large"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Оформление
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="form__field-group">
                        <div class="form__field">
                            <label for="squad-slogan"
                                >Девиз отряда
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                id="squad-slogan"
                                label="Девиз отряда"
                                placeholder="Например, через тернии к звездам"
                                name="squad-slogan"
                            />
                        </div>

                        <div class="form__field">
                            <label for="about-squad"
                                >Об отряде
                                <sup class="valid-red">*</sup>
                            </label>
                            <textarea
                                id="about-squad"
                                placeholder="Расскажите об отряде"
                            ></textarea>
                        </div>

                        <!-- <v-col cols="3">
                            <v-text-field
                                v-model="trip.end"
                                label="End date"
                                type="date"
                            ></v-text-field>
                        </v-col>  -->
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-card-actions class="form__button-group">
                <Button
                    class="form__button form__button--prev"
                    variant="text"
                    label="Назад"
                    size="large"
                ></Button>
                <Button
                    class="form__button"
                    variant="text"
                    label="Сохранить"
                    size="large"
                ></Button>
            </v-card-actions>
        </v-expansion-panels>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { Input } from '@shared/components/inputs';
import { SelectRegion } from '@shared/components/selects';
import { Button } from '@shared/components/buttons';
</script>

<style scoped lang="scss">
.form {
    font-family: 'BertSans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #35383f;
    background-color: transparent;

    &__inner-content {
        border-bottom: 1px solid #d9d9d9;
        background-color: #ffffff;
    }

    &__field-group {
        padding: 32px 16px 24px;
        background-color: #ffffff;
        position: relative;

        &::before {
            position: absolute;
            content: '';
            top: -8px;
            right: -24px;
            left: -24px;
            bottom: -16px;
            border: 1px solid #b6b6b6;
            border-radius: 10px;
        }
    }

    &__field {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        label {
            width: fit-content;
            font-size: 16px;
            font-weight: 600;
            color: #35383f;
        }

        input {
            margin-bottom: 0;
            padding: 8px 44px 8px 20px;
            width: 100%;
            font-size: 16px;
            line-height: 21px;
            color: #898989;
            border: 1px solid #b6b6b6;
            border-radius: 10px;
            // min-height: auto;
        }

        select {
            margin-bottom: 0;
            padding: 8px 54px 8px 20px;
            font-weight: 400;
            border: 1px solid #b6b6b6;
            // background-image: url('../images/icons/angel-down-form.svg');
            background-repeat: no-repeat;
            background-position: right 19px center;
            appearance: none;
        }

        textarea {
            border: 1px solid #b6b6b6;
            margin-top: 8px;
            padding: 12px 20px;
            min-height: 101px;
            outline: none;
            overflow: hidden;
            text-align: left;
            resize: none;
            border-radius: 10px;
        }
    }

    &__button-group {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 56px 0 44px;
    }

    &__button {
        width: 132px;
        min-height: 52px;
        margin: 0;
        padding: 16px 32px;
        font-family: Bert Sans;
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

.v-expansion-panels,
.v-expansion-panel,
.v-expansion-panel--active {
    position: static;
}

.v-expansion-panel--active,
.v-expansion-panel--after-active {
    margin: 0;
}

.v-expansion-panel--active
    .v-expansion-panel-title.v-expansion-panel-title--active {
    margin-bottom: 40px;
}
.v-expansion-panel-title,
.v-expansion-panel-title--active {
    padding: 16px 0;
    height: 60px;
    font-family: Akrobat;
    font-size: 24px;
    line-height: 28px;
    font-weight: 600;
    background-color: transparent;
}

.v-expansion-panel {
    border-bottom: 1px solid #d9d9d9;
}
.v-expansion-panel-text__wrapper {
    border: 1px solid #b6b6b6;
    border-radius: 10px;
}
.v-expansion-panel-text.form__inner-content .v-expansion-panel-text__wrapper {
    padding: 0;
}
.v-expansion-panel.v-expansion-panel--active {
    background-color: transparent;
    border: none;
}
.v-expansion-panel.v-expansion-panel--active .v-expansion-panel__shadow {
    box-shadow: none;
    border: none;
    border-radius: 10px;
    background-color: transparent;
    width: 0;
}
</style>
