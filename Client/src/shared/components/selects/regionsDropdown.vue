<template>
    <v-autocomplete
        v-model="selected"
        :items="items"
        chips
        clearable
        v-model:search="name"
        variant="outlined"
        item-title="name"
        item-value="id"
        v-bind="$attrs"
        @update:value="changeValue"
        :address="address"
        :no-data-text="noDataText"
        class="option"
    >
        <template #prepend-inner>
            <Icon
                icon="clarity-search-line"
                color="#222222"
                width="24"
                height="24"
                class="option__icon mr-3"
            >
            </Icon>
        </template>
        <template v-slot:chip="{ props, item }">
            <div class="option__content">
                <div class="option__wrapper">
                    <p class="option__title">
                        {{ item.raw.name }}
                    </p>
                </div>
            </div>
        </template>

        <template v-slot:item="{ props, item }">
            <v-container v-bind="props">
                <div class="option__content option__content--option">
                    <div class="option__wrapper">
                        <p class="option__title">
                            {{ item.raw.name }}
                        </p>
                    </div>
                </div>
            </v-container>
        </template>
    </v-autocomplete>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { HTTP } from '@app/http';
import { useRegionalsStore } from '@features/store/regionals';
import { storeToRefs } from 'pinia';

defineOptions({
    inheritAttrs: false,
});
const search = ref(null);
const emit = defineEmits(['update:value']);

const regionalsStore = useRegionalsStore();

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    address: {
        type: String,
        default: '',
    },
    noDataText: {
        type: String,
        default: 'Ничего не найдено...',
    },
});
const name = ref('');

const selected = ref(null);

const changeValue = (event) => {
    console.log(event);
    emit('update:value', event);
};

const items = ref(props.items);

const onChangeItem = async () => {
    await HTTP.get(props.address, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            // console.log(props.address);
            items.value = res.data;
            console.log(res.data);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

    regionalsStore.searchRegions(name.value);


// watch(
//     () => search,
//     (name) => {
//         items.value = regionalsStore.searchRegions(name);
//     },
// );

onMounted(() => {

    onChangeItem();
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

.option {
    background-color: #ffffff;
    box-sizing: border-box;
    // max-height: 40px;
    .v-field__input {
        padding: 1px 0;
        min-height: 40px;
    }

    &__content {
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;

        &--option {
            width: calc(100% - 10px);
            margin-bottom: -20px;
            padding: 5px 20px;
            border: 1px solid #b6b6b6;
            border-radius: 10px;
        }
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
}
</style>
