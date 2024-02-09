<template>
    <v-autocomplete
        v-model="selected"
        :items="items"
        chips
        clearable
        variant="outlined"
        item-title="name"
        item-value="id"
        :custom-filter="customFilter"
        v-bind="$attrs"
        @update:value="changeValue"
        :no-data-text="noDataText"
        class="option select"
    >
        <template v-slot:chip="{ props, item }">
            <div class="option-select__content">
                <div class="option-select__wrapper">
                    <p class="option-select__title">
                        {{ item.raw.name }}
                    </p>
                </div>
            </div>
        </template>

        <template v-slot:item="{ props, item }">
            <v-container v-bind="props">
                <div
                    class="option-select__content option-select__content--option"
                >
                    <div class="option-select__wrapper">
                        <p class="option-select__title">
                            {{ item.raw.name }}
                        </p>
                    </div>
                </div>
            </v-container>
        </template>
    </v-autocomplete>
</template>

<script setup>
import { ref } from 'vue';

defineOptions({
    inheritAttrs: false,
});

const emit = defineEmits(['update:value']);

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    noDataText: {
        type: String,
        default: 'Ничего не найдено...',
    },
});

const selected = ref(null);

const changeValue = (event) => {
    console.log(event);
    emit('update:value', event);
};

const customFilter = (itemTitle, queryText, item) => {
    const textOne = item.raw.name.toLowerCase();

    const searchText = queryText.toLowerCase();

    return textOne.indexOf(searchText) > -1;
};
</script>

<style lang="scss">
//-----отсутствует атрибут scoped, чтобы отрабатывала высота поля
.error-wrapper {
    position: relative;
}
.form-error__message {
    position: absolute;
    right: 0;
    color: var(--danger);
    font-size: 12px;
}

.option.select {
    // max-height: 100px;
    // overflow-y: auto;
    background-color: #ffffff;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    box-sizing: border-box;
    // max-height: 40px;

    .v-field__input {
        padding: 1px 20px 0;
        min-height: 40px;
        // max-height: 40px;
    }
    // &__icon {

    // }

    &__content {
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;

        &--option {
            width: calc(100% - 10px);
            // margin-left: -20px;
            // margin-right: -20px;
            // margin-left: 5px;
            // margin-right: 5px;
            margin-bottom: -20px;
            padding: 5px 20px;
            border: 1px solid #b6b6b6;
            border-radius: 10px;
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

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

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
        min-width: 82px;

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
        // height: auto;
        height: 100%;
    }
}
</style>
