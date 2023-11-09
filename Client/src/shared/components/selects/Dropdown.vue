<template>
    <Dropdown
        v-model="selected"
        :options="items"
        filter
        showClear
        optionLabel="title"
        placeholder="Поиск по ФИО"
    >
        <template #value="slotProps">
            <div v-if="slotProps.value" class="option__content">
                <div class="option__image">
                    <img
                        v-if="slotProps.value.img"
                        :src="
                            './assets/foto-leader-squad/' +
                            slotProps.value.srcImg
                        "
                        alt="Фото бойца"
                    />
                    <img
                        v-else
                        src="@app/assets/foto-leader-squad/foto-leader-squad-stub.png"
                        alt="'Фото бойца (заглушка)'"
                    />
                </div>
                <div class="option__status" v-if="slotProps.value.logo">
                    <img
                        :src="
                            './assets/icon/icon-status/' +
                            slotProps.value.iconStatus
                        "
                        alt="Статус бойца"
                    />
                </div>
                <p class="option__title">{{ slotProps.value.title }}</p>
                <p class="option__date">{{ slotProps.value.date }}</p>
            </div>

            <span v-else>
                {{ slotProps.placeholder }}
            </span>
        </template>
        <template #option="slotProps">
            <div class="option__content">
                <div class="option__image">
                    <img
                        v-if="slotProps.option.img"
                        :src="
                            './assets/foto-leader-squad/' +
                            slotProps.option.srcImg
                        "
                        alt="Фото бойца"
                    />
                    <img
                        v-else
                        :src="'./assets/foto-leader-squad/foto-leader-squad-stub.png'"
                        alt="'Фото бойца (заглушка)'"
                    />
                </div>
                <div class="option__status" v-if="slotProps.option.logo">
                    <img
                        :src="
                            './assets/icon/icon-status/' +
                            slotProps.option.iconStatus
                        "
                        alt="Статус бойца"
                    />
                </div>
                <p class="option__title">{{ slotProps.option.title }}</p>
                <p class="option__date">{{ slotProps.option.date }}</p>
            </div>
        </template>
    </Dropdown>
</template>

<script setup>
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown';

const selected = ref();
const items = ref([]);
</script>

<style lang="scss">
.p-dropdown {
    display: flex;
    padding: 8px 20px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 10px;
    border: 1px solid #b6b6b6;

    .p-dropdown-trigger-icon {
        width: 24px;
        height: 24px;
        fill: none;
        stroke: #898989;
        stroke-width: 0.75px;
        stroke-miterlimit: 10;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .p-dropdown-clear-icon {
        position: relative;
        width: 24px;
        height: 24px;

        // &::after {
        //     position: absolute;
        //     content: '';
        //     width: 19px;
        //     height: 19px;
        //     top: 50%;
        //     left: 50%;
        //     border-radius: 50%;
        //     border: 1px solid #898989;
        // }
    }
}

.p-dropdown-filter-container {
    svg {
        display: none;
    }
}
.p-dropdown-panel {
    // margin-top: -42px;
    // padding: 55px 20px 20px 20px;
    // padding: 30px 20px 20px 20px;
    padding: 13px 20px 20px 20px;
    border-radius: 0 0 10px 10px;
    // border-radius: 10px;
    border: 1px solid #b6b6b6;
    border-top: none;
    // background-image: linear-gradient(to top, #ffffff 80%, transparent 20%);
    background-color: #ffffff;
    // transform-origin: center top;

    .p-dropdown-header {
        // margin-bottom: 20px;
        // width: calc(100% - 24px);

        input {
            // background-color: #ffffff;
            // height: 100%;
            position: absolute;
            margin-top: -45px;
            width: calc(100% - 50px);
        }
    }

    .p-dropdown-items-wrapper {
        // min-height: 400px;

        &::-webkit-scrollbar {
            /*стили полосы прокрутки */
            width: 8px;
        }

        &::-webkit-scrollbar-track {
            /*стили зоны отслеживания */
            background: #ffffff;
            border-radius: 10px;
            border: 1px solid #898989;
        }

        &::-webkit-scrollbar-thumb {
            /*стили бегунка */
            width: 8px;
            // height: 108px;
            border-radius: 10px;
            border: 1px solid #ffffff;
            background-color: #35383f;
        }
    }

    .p-dropdown-items {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 12px;
        width: calc(100% - 16px);
    }

    .p-dropdown-item {
        display: flex;
        height: 48px;
        padding: 5px 20px;
        // justify-content: center;
        // align-items: center;
        gap: 10px;
        border-radius: 10px;
        border: 1px solid #b6b6b6;
    }
}

.option {
    // max-height: 100px;
    // overflow-y: auto;
    background-color: #ffffff;

    &__content {
        // display: grid;
        // grid-template-columns: 50px 18px auto 95px;
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
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
}
</style>
