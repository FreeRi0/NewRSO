<template>
    <Dropdown
        v-model="selected"
        :options="items"
        showClear
        filter
        :filterPlaceholder="filterPlaceholder"
        :resetFilterOnHide="resetFilterOnHide"
        optionLabel="title"
        placeholder="Поиск по ФИО"
        v-bind="$attrs"
        @update:model-value="changeValue"
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
                <div class="option__wrapper">
                    <p class="option__title">{{ slotProps.value.title }}</p>
                    <p class="option__date">{{ slotProps.value.date }}</p>
                </div>
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
                <div class="option__wrapper">
                    <p class="option__title">{{ slotProps.option.title }}</p>
                    <p class="option__date">{{ slotProps.option.date }}</p>
                </div>
            </div>
        </template>
    </Dropdown>
    <TransitionGroup>
        <div class="error-wrapper" v-for="element of error" :key="element.$uid">
            <div class="form-error__message">{{ element.$message }}</div>
        </div>
    </TransitionGroup>
</template>

<script setup>
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown';

defineOptions({
    inheritAttrs: false,
});

const emit = defineEmits(['update:value']);

const props = defineProps({
    error: {
        type: Array,
        required: false,
    },
    filterPlaceholder: {
        type: String,
        default: '',
    },
    resetFilterOnHide: {
        type: Boolean,
        default: false,
    },
    filtericon: {
        type: Boolean,
        default: true,
    },
});

const selected = ref();
const items = ref([]);

const changeValue = (event) => {
    console.log(event);
    emit('update:value', event);
};
</script>

<style lang="scss">
//-----отсутствует атрибут scoped, чтобы стилизовать Dropdown
.error-wrapper {
    position: relative;
}
.form-error__message {
    position: absolute;
    right: 0;
    color: var(--danger);
    font-size: 12px;
}

.p-dropdown {
    display: flex;
    // padding: 8px 20px 8px 54px;
    padding: 1px 20px 1px 54px;
    min-height: 40px;
    background-image: url('@app/assets/icon/search.svg');
    background-position: 20px;
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
            // height: 100%;
            position: absolute;
            left: 34px;
            margin-top: -45px;
            width: calc(100% - 86px);

            &:focus {
                background-color: white;
            }
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

        @media (max-width: 768px) {
            height: 56px;
            padding: 8px;
        }
    }
}

.option {
    // max-height: 100px;
    // overflow-y: auto;
    background-color: #ffffff;

    &__content {
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
    }

    &__image {
        margin-right: 11px;
        width: 38px;
        height: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        overflow: hidden;

        @media (max-width: 768px) {
            margin-right: 13px;
            width: 36px;
            height: 36px;
        }
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

    &__wrapper {
        display: flex;
        flex-wrap: nowrap;
        width: calc(100% - 49px);
        justify-content: space-between;
        font-family: 'BertSans', sans-serif;
        line-height: 21px;

        @media (max-width: 768px) {
            flex-wrap: wrap;
            font-size: 12px;
            line-height: 16px;
        }
    }

    &__title {
        @media (max-width: 768px) {
            width: 100%;
            margin-bottom: 3px;
        }
    }

    &__date {
        position: relative;
        color: #1c5c94;

        &::before {
            position: absolute;
            content: '';
            width: 1.5px;
            height: 15px;
            top: calc(50% - 7.5px);
            left: -11px;
            background-color: #b6b6b6;

            @media (max-width: 768px) {
                display: none;
            }
        }
    }

    img {
        width: 100%;
        height: auto;
    }
}
</style>
