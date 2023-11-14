<template>
    <div class="member">
        <div
            class="member__item"
            v-for="item in items"
            :key="item.title"
            v-if="items.length > 0"
        >
            <div class="member__content">
                <div class="member__image">
                    <img
                        v-if="item.img"
                        :src="'./assets/foto-leader-squad/' + item.srcImg"
                        alt="Фото бойца"
                    />
                    <img
                        v-else
                        :src="'./assets/foto-leader-squad/foto-leader-squad-stub.png'"
                        alt="'Фото бойца (заглушка)'"
                    />
                </div>
                <div class="member__status" v-if="item.logo">
                    <img
                        :src="'./assets/icon/icon-status/' + item.iconStatus"
                        alt="Статус бойца"
                    />
                </div>
                <p class="member__title">{{ item.title }}</p>
                <p class="member__date">{{ item.date }}</p>
            </div>

            <div class="member__select-box">
                <Select
                    class="member__select"
                    variant="outlined"
                    clearable
                    :items="functions"
                    name="select_function"
                    id="functions"
                    placeholder="Выберите должность"
                ></Select>
            </div>

            <div class="member__confidant">
                <Checkbox
                    label="Доверенное лицо"
                    :id="item.title"
                    :value="item.title"
                    v-model:checked="item.confidant"
                ></Checkbox>

                <!-- <Checkbox
                    class="member__input"
                    label="Доверенное лицо"
                    :id="item.title"
                    :model-value="item.confidant"
                    v-model:checked="item.confidant"
                ></Checkbox> -->

                <!-- <Checkbox
                    class="member__input"
                    label="Доверенное лицо"
                    :id="item.title"
                    :model-value="true"
                    v-model:checked="item.confidant"
                ></Checkbox> -->

                <!-- <div>
                    <label>Доверенное лицо</label>
                    <Checkbox v-model:checked="item.confidant" />
                </div> -->
            </div>
        </div>

        <h2 v-else>Участники не найдены...</h2>
    </div>
</template>

<script setup>
import { Select } from '@shared/components/selects';
import { Checkbox } from '@shared/components/checkboxes';

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
        required: true,
    },
});

const functions = ['Комиссар', 'Мастер-методист', 'Специалист', 'Медик'];
</script>

<style lang="scss">
.member {
    max-height: 200px;
    overflow: auto; //-------------------------------------------
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 12px;
    margin-top: -8px;
    padding: 28px 20px 20px;
    border: 1px solid #b6b6b6;
    border-top: none;
    border-radius: 0 0 10px 10px;

    &__item {
        display: flex;
    }

    &__content {
        // display: grid;
        // grid-template-columns: 50px 18px auto 95px;

        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        padding: 5px 20px;

        border: 1px solid #b6b6b6;
        border-radius: 10px;
    }

    &__image {
        margin-right: 11px;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        overflow: hidden;
    }
    &__status {
        position: absolute;
        bottom: 0;
        left: 27px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #ffff00;
    }

    &__date {
        margin-left: auto;
        position: relative;

        &::before {
            position: absolute;
            content: '';
            width: 1.5px;
            height: 15px;
            top: calc(50% - 7.5px);
            left: -11px;
            background-color: #b6b6b6;
        }
    }

    img {
        width: 100%;
        height: auto;
    }

    &__select-box {
        margin-left: 12px;
        min-width: 224px;
        width: 224px;
    }

    &__select {
        //--------------------------------------------------------------- не стилизуется
        border: 1px solid #b6b6b6;
        border-radius: 10px;
    }

    &__confidant {
        margin-left: 12px;
        padding: 4px 16px;
        display: flex;
        align-items: center;
        min-width: 224px;
        width: 224px;
        border: 1px solid #b6b6b6;
        border-radius: 10px;

        label {
            margin-right: 12px;
        }

        .v-field__overlay,
        .v-field__loader {
            display: none;
        }

        .v-input,
        .v-input__control,
        .v-field {
            width: 24px;
            // height: 50%;
            min-height: 0;
        }

        // .v-field__field {
        // }
        .v-field__input,
        .v-text-field input.v-field__input {
            // max-height: 24px;
            min-height: 0;
            width: 24px;
            height: 24px;
        }
    }
}
</style>
