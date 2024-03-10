<template>
    <v-autocomplete
        v-model="selected"
        :items="items"
        chips
        clearable
        v-model:search.trim="name"
        variant="outlined"
        item-title="name"
        item-value="id"
        v-bind="$attrs"
        @keyup="searchRegion"
        @update:value="changeValue"
        :address="address"
        v-if="props.valueChange === false"
        :no-data-text="noDataText"
        class="option-select"
    >
        <template #prepend-inner v-if="changeUser">
            <Icon
                icon="clarity-search-line"
                color="#222222"
                width="24"
                height="24"
                class="option-select__icon mr-3"
            >
            </Icon>
        </template>
        <template v-slot:chip="{ props, item }">
            <div class="option-select__content" v-if="!isLoading">
                <div class="option-select__wrapper">
                    <p class="option-select__title">
                        {{ item.raw.name }}
                    </p>
                </div>
            </div>
            <v-progress-circular
                class="circleLoader"
                v-else
                indeterminate
                color="blue"
            ></v-progress-circular>
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
    <v-autocomplete
        v-model="selected"
        :items="items"
        chips
        clearable
        v-else-if="props.valueChange === true"
        v-model:search.trim="name"
        variant="outlined"
        item-title="name"
        item-value="value"
        v-bind="$attrs"
        @keyup="searchRegion"
        @update:value="changeValue"
        :address="address"
        :no-data-text="noDataText"
        class="option-select"
    >
        <template #prepend-inner v-if="changeUser">
            <Icon
                icon="clarity-search-line"
                color="#222222"
                width="24"
                height="24"
                class="option-select__icon mr-3"
            >
            </Icon>
        </template>
        <template v-slot:chip="{ props, item }">
            <div class="option-select__content" v-if="!isLoading">
                <div class="option-select__wrapper">
                    <p class="option-select__title">
                        {{ item.raw.name }}
                    </p>
                </div>
            </div>
            <v-progress-circular
                class="circleLoader"
                v-else
                indeterminate
                color="blue"
            ></v-progress-circular>
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
import { ref, onMounted, toRef } from 'vue';
import { Icon } from '@iconify/vue';
import { HTTP } from '@app/http';
import { useRegionalsStore } from '@features/store/regionals';
import { storeToRefs } from 'pinia';

defineOptions({
    inheritAttrs: false,
});
const emit = defineEmits(['update:value']);

const regionalsStore = useRegionalsStore();
const regions = storeToRefs(regionalsStore);

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    modelValue: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: '',
    },
    noDataText: {
        type: String,
        default: 'Ничего не найдено...',
    },
    changeUser: {
        type: Boolean,
        default: false,
    },
    valueChange: {
        type: Boolean,
        default: false,
    }

});
const name = ref('');

const selected = toRef(props, 'modelValue');
const isLoading = ref(false);
const changeValue = (event) => {
    emit('update:value', event);
};

const items = ref(props.items);
const onChangeItem = async () => {
    try {
        isLoading.value = true;
        setTimeout(async () => {
            const ItemResponse = await HTTP.get(props.address, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            items.value = ItemResponse.data.results;
            isLoading.value = false;
        }, 500);
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const searchRegion = (val) => {
    if (name.value.length < 3) {
        return;
    }
    items.value = regionalsStore.regions.find((reg) => reg.name.indexOf(name.value) !== false);
};

onMounted(() => {
    onChangeItem();
    // regionalsStore.getRegions();
});
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

.option-select {
    background-color: #ffffff;
    box-sizing: border-box;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    box-sizing: border-box;

    .v-field__input {
        padding: 10px 16px;
        min-height: 40px;

        input {
            margin: 0;
        }

        .v-autocomplete__selection {
            width: 100%;
            margin: 0;
        }
    }

    &__content {
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
        border: none;

        &--option {
            width: calc(100% - 10px);
            margin-top: -10px;
            padding: 5px 0;
            border-bottom: 1px solid #b6b6b6;
        }
    }

    &__wrapper {
        display: flex;
        flex-wrap: nowrap;
        width: calc(100% - 49px);
        justify-content: space-between;
        font-family: 'BertSans', sans-serif;
        line-height: 20px;

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
}

.option-select.v-text-field .v-field__input input {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}
</style>
