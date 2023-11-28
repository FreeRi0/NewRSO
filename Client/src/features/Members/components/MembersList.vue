<template>
    <div class="member">
        <ul class="member__wrapper">
            <template v-if="items.length > 0">
                <ItemMember
                    class="member__item"
                    v-for="item in items"
                    :key="item.title"
                    v-bind="item"
                    @update-member="onUpdateMember"
                ></ItemMember>
            </template>

            <h2 v-else>Участники не найдены...</h2>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { ItemMember } from '@features/ItemMember';

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
        required: true,
    },
    submited: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['updateMember']);

const onUpdateMember = (event, id) => {
    emit('updateMember', event, id);
};
</script>

<style lang="scss">
.member {
    padding: 28px 20px 20px;
    border: 1px solid #b6b6b6;
    border-top: none;
    border-radius: 0 0 10px 10px;
    color: #35383f;

    &__wrapper {
        max-height: 350px;
        overflow: auto;
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 12px;
        margin-top: -8px;
        padding-right: 16px;

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

    &__item {
        display: flex;

        @media (max-width: 1024px) {
            flex-wrap: wrap;
        }
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

        @media (max-width: 1024px) {
            margin-bottom: 12px;
        }
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
        bottom: 4px;
        left: 47px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #ffff00;
    }

    &__container {
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
        margin-left: auto;
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

    &__select-box {
        margin-left: 12px;
        min-width: 224px;
        width: 224px;

        @media (max-width: 1024px) {
            .form__select {
                margin: 0;
                height: 48px;
                align-items: center;
                // color: #35383f;// Не работает?
            }
            margin: 0;
        }
    }

    // &__select {
    //     //-------- не стилизуется
    //     border: 1px solid #b6b6b6;
    //     border-radius: 10px;
    // }

    &__confidant {
        margin-left: 12px;
        padding: 4px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 224px;
        width: 224px;
        border: 1px solid #b6b6b6;
        border-radius: 10px;

        label {
            margin-right: 12px;
            line-height: 21px;
            font-weight: 400;

            @media (max-width: 1024px) {
                margin-bottom: 0;
            }
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
            border-radius: 0;
        }
    }
}
</style>
