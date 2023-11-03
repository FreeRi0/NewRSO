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
                            <label for="name-squad"
                                >Название отряда
                                <sup class="valid-red">*</sup>
                            </label>
                            <v-textarea
                                rows="1"
                                variant="outlined"
                                clearable
                                :maxlength="30"
                                class="form__input form__input--name"
                                id="name-squad"
                                placeholder="Например, Монолит"
                                name="name_squad"
                                v-model="data.squad"
                            ></v-textarea>
                            <div>{{ counter }} / 30</div>
                            <!-- <Input
                                class="form__input"
                                id="name-squad"
                                label="Название отряда"
                                placeholder="Например, Монолит"
                                name="name_squad"
                                v-model:value="data.squad"
                            /> -->
                        </div>

                        <div class="form__field">
                            <label for="select-direction"
                                >Выберите направление
                                <sup class="valid-red">*</sup>
                            </label>
                            <Select
                                variant="outlined"
                                clearable
                                name="select_direction"
                                :items="directions"
                                id="select-direction"
                                placeholder="Например, ССО"
                            ></Select>
                        </div>

                        <div class="form__field">
                            <label for="create-date"
                                >Дата основания
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                id="create-date"
                                label="Дата основания"
                                name="create_date"
                                type="date"
                                placeholder=""
                                v-model:value="data.date"
                            />
                        </div>

                        <div class="form__field">
                            <label for="select-region">Выберите регион</label>
                            <SelectRegion
                                clearable
                                name="select_region"
                                id="select-region"
                                placeholder="Например, Алтайский край"
                                v-model:value="data.region"
                            ></SelectRegion>
                        </div>

                        <div class="form__field">
                            <label for="city">Город </label>
                            <Input
                                id="city"
                                label="Город"
                                placeholder="Например, Барнаул"
                                name="city"
                                v-model:value="data.city"
                            />
                        </div>

                        <div class="form__field">
                            <label for="select-institution"
                                >Выберите учебное заведение
                                <sup class="valid-red">*</sup>
                            </label>
                            <Select
                                variant="outlined"
                                clearable
                                :items="institutions"
                                name="select_institution"
                                id="select-institution"
                                placeholder="Например, Алтайский государственный медицинский университет"
                            ></Select>
                        </div>

                        <div class="form__field">
                            <label for="beast"
                                >Командир отряда:
                                <sup class="valid-red">*</sup>
                            </label>
                            <SearchSelect
                                :items="leaders"
                                variant="outlined"
                                clearable
                                id="beast"
                                name="beast"
                                placeholder="Поиск по ФИО"
                            ></SearchSelect>
                            <!-- <v-text-field
                                variant="outlined"
                                id="beast"
                                name="beast"
                                placeholder="Поиск по ФИО"
                            /> -->
                        </div>
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
                                name="social_media_vk"
                                v-model:value="data.vk"
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
                                name="social_media_te"
                                v-model:value="data.te"
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
                                name="squad_slogan"
                                v-model:value="data.slogan"
                            />
                        </div>

                        <div class="form__field">
                            <label for="about-squad"
                                >Об отряде
                                <sup class="valid-red">*</sup>
                            </label>
                            <v-textarea
                                rows="3"
                                variant="outlined"
                                clearable
                                :maxlength="300"
                                class="form__input form__input--about"
                                id="about-squad"
                                placeholder="Расскажите об отряде"
                                name="about_squad"
                                v-model="data.about"
                            ></v-textarea>
                            <div>{{ counterAbout }} / 300</div>
                        </div>

                        <div class="form__field">
                            <label for="upload-logo">Добавьте логотип</label>
                            <Avatar
                                name="upload_logo"
                                id="upload-logo"
                                v-model:value="data.avatar"
                            />
                            <span class="form__footnote"
                                >Рекомендуемый размер 80х80</span
                            >
                        </div>

                        <div class="form__field">
                            <label for="upload-banner">Добавьте баннер</label>
                            <bannerPhoto
                                name="upload_banner"
                                id="upload-banner"
                                v-model:value="data.banner"
                            />
                            <span class="form__footnote"
                                >Рекомендуемый размер 1920х768</span
                            >
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
import { ref, computed } from 'vue';
import { Input } from '@shared/components/inputs';
import { SelectRegion } from '@shared/components/selects';
import { Button } from '@shared/components/buttons';
import { Avatar } from '@shared/components/imagescomp';
import { bannerPhoto } from '@shared/components/imagescomp';
import { Select } from '@shared/components/selects';
import { SearchSelect } from '@shared/components/selects';

const directions = ref([
    { title: 'ССО' },
    { title: 'СПО' },
    { title: 'СОП' },
    { title: 'ССервО' },
    { title: 'ССхО' },
    { title: 'СМО' },
]);

const institutions = ref([
    { title: 'Алтайский государственный медицинский университет' },
    { title: 'Амурская государственная медицинская академия' },
    { title: 'Амурский государственный университет' },
    { title: 'Владивостокский государственный медицинский университет' },
    {
        title: 'Владивостокский государственный университет экономики и сервиса',
    },
    { title: 'Дальневосточный государственный технический университет' },
    { title: 'Дальневосточный федеральный университет' },
]);

const data = ref({
    squad: '',
    direction: '',
    date: '',
    region: '',
    city: '',
    institution: '',
    beast: '',
    vk: '',
    te: '',
    slogan: '',
    about: '',
    avatar: '',
    banner: '',
});

const counter = computed(() => {
    return data.value.squad.length || 0;
});

const counterAbout = computed(() => {
    return data.value.about.length || 0;
});

const leaders = [
    {
        id: 1,
        img: true,
        srcImg: '@app/assets/foto-leader-squad/foto-leader-squad-01.png',
        // altTitle: 'Фото бойца',
        logo: true,
        iconStatus: '@app/assets/icon/icon-status/icon-status-01.svg',
        title: 'Васильев Андрей Владимирович',
        date: '13.07.2000',
    },
    {
        id: 2,
        img: true,
        srcImg: '@app/assets/foto-leader-squad/foto-leader-squad-02.png',
        // altTitle: 'Фото бойца',
        logo: true,
        iconStatus: '@app/assets/icon/icon-status/icon-status-02.svg',
        title: 'Иванов Александр Петрович',
        date: '13.07.2000',
    },
    {
        id: 3,
        img: true,
        srcImg: '@app/assets/foto-leader-squad/foto-leader-squad-03.png',
        // altTitle: 'Фото бойца',
        logo: true,
        iconStatus: '@app/assets/icon/icon-status/icon-status-03.svg',
        title: 'Сидоров Дмитрий Олегович',
        date: '13.07.2000',
    },
    {
        id: 4,
        img: true,
        srcImg: '@app/assets/foto-leader-squad/foto-leader-squad-04.png',
        // altTitle: 'Фото бойца',
        logo: true,
        iconStatus: '@app/assets/icon/icon-status/icon-status-04.svg',
        title: 'Петрова Анастасия Владимировна',
        date: '13.07.2000',
    },
    {
        id: 5,
        img: true,
        srcImg: '@app/assets/foto-leader-squad/foto-leader-squad-05.png',
        // altTitle: 'Фото бойца',
        logo: false,
        iconStatus: '',
        title: 'Петров Петр Петрович',
        date: '13.07.2000',
    },
    {
        id: 6,
        img: true,
        srcImg: '@app/assets/foto-leader-squad/foto-leader-squad-06.png',
        // altTitle: 'Фото бойца',
        logo: false,
        iconStatus: '',
        title: 'Смирнова Елена Дмитриевна',
        date: '13.07.2000',
    },
    {
        id: 7,
        img: false,
        srcImg: '',
        // altTitle: 'Фото бойца',
        logo: false,
        iconStatus: '',
        title: 'Николаева Ольга Васильевна',
        date: '13.07.2000',
    },
    {
        id: 8,
        img: true,
        srcImg: '@app/assets/foto-leader-squad/foto-leader-squad-08.png',
        // altTitle: 'Фото бойца',
        logo: false,
        iconStatus: '',
        title: 'Васильев Михаил Владимирович',
        date: '13.07.2000',
    },
    {
        id: 9,
        img: true,
        srcImg: '@app/assets/foto-leader-squad/foto-leader-squad-09.png',
        // altTitle: 'Фото бойца',
        logo: false,
        iconStatus: '',
        title: 'Олегов Иван Иванович',
        date: '13.07.2000',
    },
    {
        id: 10,
        img: true,
        srcImg: '@app/assets/foto-leader-squad/foto-leader-squad-10.png',
        // altTitle: 'Фото бойца',
        logo: false,
        iconStatus: '',
        title: 'Певцов Дмитрий Владимирович',
        date: '13.07.2000',
    },
];
</script>

<style lang="scss" scoped>
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
            // margin-top: 8px;
            padding: 12px 20px;
            min-height: 101px;
            outline: none;
            overflow: hidden;
            text-align: left;
            resize: none;
            border-radius: 10px;
        }
    }

    // &__field-direction {
    //     margin-bottom: 0;
    //     padding: 8px 44px 8px 20px;
    //     width: 100%;
    //     font-size: 16px;
    //     line-height: 21px;
    //     color: #898989;
    //     border: 1px solid #b6b6b6;
    //     border-radius: 10px;
    //     // min-height: auto;
    // }

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

    .user-metric__avatar-wrapper {
        align-self: flex-start;
    }

    .v-field__outline {
        display: none;
    }
}
//------------------------------------------------------------------------------
//Стили для компонента аккордион - пенесла в стили для страницы "Станицы ЛСО"
// .v-expansion-panel {
//     border-bottom: 1px solid #d9d9d9;

//     &__shadow {
//         box-shadow: none;
//     }

//     &--active,
//     &--after-active {
//         margin: 0;
//     }

//     &--active:not(:first-child) {
//         margin: 0;
//     }

//     &--active + .v-expansion-panel {
//         margin: 0;
//     }

//     .v-expansion-panel-title {
//         padding: 16px 0;
//         max-height: 60px;
//         font-family: 'Akrobat';
//         font-size: 24px;
//         line-height: 28px;
//         font-weight: 600;
//         background-color: transparent;

//         &--active {
//             margin-bottom: 40px;
//         }

//         &__overlay {
//             display: none;
//         }
//     }
// }
</style>
