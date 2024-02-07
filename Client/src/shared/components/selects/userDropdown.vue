<template>
    <v-autocomplete
        v-model="selected"
        :items="items"
        chips
        clearable
        v-model:search.trim="userName"
        variant="outlined"
        item-title="last_name"
        item-value="id"
        v-bind="$attrs"
        @keyup="searchUser"
        @update:value="changeValue"
        :no-data-text="noDataText"
        class="option"
    >
        <template #prepend-inner>
            <Icon
                icon="clarity-search-line"
                color="#222222"
                width="24"
                height="24"
                class="option__icon"
            >
            </Icon>
        </template>
        <template v-slot:chip="{ props, item }">
            <div class="option__content">
                <div class="option__image">
                    <!-- <img
                        v-if="item.raw?.media?.photo"
                        :src="item.raw?.media?.photo"
                        alt="Фото бойца"
                    />
                    <img
                        v-else
                        src="@app/assets/foto-leader-squad/foto-leader-squad-stub.png'"
                        alt="Фото бойца"
                    /> -->
                    <img
                        :src="
                            item.raw?.media?.photo ??
                            '@app/assets/foto-leader-squad/foto-leader-squad-stub.png'
                        "
                        alt="Фото бойца"
                    />
                </div>

                <div class="option__wrapper">
                    <p class="option__title">
                        {{
                            item.raw.last_name +
                            ' ' +
                            item.raw.first_name +
                            ' ' +
                            item.raw.patronymic_name
                        }}
                    </p>
                    <p class="option__date">
                        {{ item.raw.date_of_birth }}
                    </p>
                </div>
            </div>
        </template>

        <template v-slot:item="{ props, item }">
            <v-container v-bind="props">
                <div class="option__content option__content--option">
                    <div class="option__image">
                        <!-- <img
                            v-if="item.raw?.media?.photo"
                            :src="item.raw?.media?.photo"
                            alt="Фото бойца"
                        />
                        <img
                            v-else
                            src="@app/assets/foto-leader-squad/foto-leader-squad-stub.png"
                            alt="Фото бойца"
                        /> -->
                        <img
                            :src="
                                item.raw?.media?.photo ??
                                '@app/assets/foto-leader-squad/foto-leader-squad-stub.png'
                            "
                            alt="Фото бойца"
                        />
                    </div>
                    <div class="option__wrapper">
                        <p class="option__title">
                            {{
                                item?.raw?.last_name +
                                ' ' +
                                item?.raw?.first_name +
                                ' ' +
                                item?.raw?.patronymic_name
                            }}
                        </p>
                        <p class="option__date">
                            {{ item?.raw?.date_of_birth }}
                        </p>
                    </div>
                </div>
            </v-container>
        </template>
    </v-autocomplete>
    <!-- <TransitionGroup>
        <div class="error-wrapper" v-for="element of error" :key="element.$uid">
            <div class="form-error__message">{{ element.$message }}</div>
        </div>
    </TransitionGroup> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { HTTP } from '@app/http';
// import { useUsersRegionalsStore } from '@features/store/usersRegionals';
// import { useRoleStore } from '@layouts/store/role';

defineOptions({
    inheritAttrs: false,
});

const emit = defineEmits(['update:value']);

// const usersRegionalsStore = useUsersRegionalsStore();

// console.log(useRoleStore());

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

const userName = ref('');
const regHeadquarterName = ref('Московский региональный штаб');

const selected = ref(null);

const changeValue = (event) => {
    console.log(event);
    emit('update:value', event);
};

// const items = ref(props.items);

const onChangeItem = async () => {
    await HTTP.get(
        `/rsousers/?search=${userName.value}&regional_headquarter__name=${regHeadquarterName.value}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        },
    )

        .then((res) => {
            props.items = res.data;
            console.log(res.data);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const searchUser = (val) => {
    if (userName.value.length <= 3) {
        return;
    }
    // usersRegionalsStore.searchUsers(userName.value);
    onChangeItem();

    console.log('val', val);
};

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
    // max-height: 100px;
    // overflow-y: auto;
    background-color: #ffffff;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    box-sizing: border-box;
    // max-height: 40px;

    .v-field__input {
        padding: 1px 0;
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
