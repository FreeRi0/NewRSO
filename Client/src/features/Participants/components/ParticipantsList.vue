<template>
    <div class="member">
        <div class="member__item" v-for="item in items" :key="item.title">
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
                    :model-value="item.confidant"
                ></Checkbox>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Select } from '@shared/components/selects';
import { Checkbox } from '@shared/components/checkboxes';

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
});

const functions = ['Комиссар', 'Мастер-методист', 'Специалист', 'Медик'];
</script>

<style lang="scss" scoped>
.member {
    // height: 200px;
    // overflow: scroll; //-------------------------------------------
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 12px;
    padding: 20px;

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
        width: 224px;
        border: 1px solid #b6b6b6;
        border-radius: 10px;
    }
}
</style>
