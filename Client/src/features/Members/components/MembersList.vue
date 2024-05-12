<template>
    <div class="member">
        <ul class="member__wrapper">
            <template v-if="items.length > 0">
                <ItemMember class="member__item" v-for="item in items" :key="item.id" :item="item"
                    :functions="functions" :is-error-members="isErrorMembers" @update-member="onUpdateMember"
                    @delete-member="onDeleteMember"></ItemMember>
            </template>

            <p v-else>В {{ unit }} еще никто не вступил...</p>
        </ul>
    </div>
    <div>


    </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue';
import { ItemMember } from '@features/ItemMember';

// import { HTTP } from '@app/http';
// import { usePositionsStore } from '@features/store/positions';
// import { storeToRefs } from 'pinia';

// const positionsStore = usePositionsStore();
// const positions = storeToRefs(positionsStore);
// console.log('ДОЛЖНОСТИ', positions.positions.value);

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
    unit: {
        type: String,
        default: 'штаб',
    },
    isErrorMembers: {
        type: Object,
        default: () => ({}),
    },
    functions: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['updateMember', 'deleteMember']);


// const functions = ref(props.functions);

// const getPositions = async () => {
//     HTTP.get('positions/')

//         .then((res) => {
//             functions.value = res.data;
//             // console.log('должности в MembersList - ', res.data);
//         })
//         .catch(function (error) {
//             console.log('an error occured ' + error);
//         });
// };

const onUpdateMember = (event, id) => {
    emit('updateMember', event, id);
};

const onDeleteMember = (memId) => {
    emit('deleteMember', memId)
    // console.log('member', memId);
}

// onMounted(() => {
//     // getPositions();
//     // positionsStore.getPositions();
// });
</script>

<style lang="scss">
.member {
    padding: 28px 20px 20px;
    border: 1px solid #b6b6b6;
    border-top: none;
    border-radius: 0 0 10px 10px;
    color: #35383f;

    @media (max-width: 768px) {
        padding-left: 16px;
        padding-right: 16px;
    }

    @media (max-width: 360px) {
        padding-left: 10px;
        padding-right: 10px;
    }

    &__delete {
        width: 44px;
        height: 48px;
        border: 1px solid #b6b6b6;
        border-radius: 10px;
        padding: 18px 16px;
        cursor: pointer;

        img {
            min-height: 12px;
            min-width: 12px;
        }
    }

    &__wrap {
        display: flex;
        column-gap: 12px;

        @media (max-width: 768px) {
            flex-wrap: wrap;
            align-items: center;

        }

        @media (max-width: 575px) {
            column-gap: 8px;
            row-gap: 5px;
            margin-top: 4px;
        }
    }

    &__wrapper {
        max-height: 350px;
        overflow: auto;
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 12px;
        margin-top: -8px;
        padding-right: 16px;

        @media (max-width: 768px) {
            padding-right: 0;
        }

        &::-webkit-scrollbar {
            /*стили полосы прокрутки */
            width: 8px;

            @media (max-width: 768px) {
                /*на мобильной версии убираем полосу прокрутки*/
                width: 0;
            }
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

        @media (max-width: 768px) {
            flex-direction: column;
            margin-left: 5px;
            row-gap: 8px;
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

        @media (max-width: 768px) {
            margin-bottom: 4px;
        }

        @media (max-width: 575px) {
            max-width: 264px;
            width: 100%;
            margin-bottom: 0;
        }
    }

    &__image {
        margin-right: 12px;
        width: 38px;
        height: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        overflow: hidden;

        @media (max-width: 768px) {
            margin-right: 12px;
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
            font-size: 16px;
            line-height: 21.5px;
        }

        @media (max-width: 575px) {
            align-items: center;
            font-size: 14px;
            line-height: 18.5px;
            flex-wrap: wrap;
            justify-content: flex-start;

        }
    }

    &__title {
        @media (max-width: 768px) {
            width: 100%;
        }

        @media (max-width: 575px) {
            max-width: 198px;
        }
    }

    &__date {
        margin-left: auto;
        min-width: 82px;
        position: relative;
        color: #1c5c94;
        align-self: center;

        @media (max-width: 768px) {
            margin-left: 0;
        }

        @media (max-width: 768px) {
            max-width: 70px;
        }

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
        height: 100%;
        object-fit: cover;
    }

    &__select-box {
        margin-left: 12px;
        min-width: 224px;
        width: 224px;
        // position: relative;

        .v-select__selection {
            margin: 0;

            span {
                white-space: pre-wrap;
            }
        }

        @media (max-width: 1024px) {
            .form__select {
                margin: 0;
                height: 48px;
                align-items: center;
                // color: #35383f;// Не работает?
            }

            margin: 0;
        }

        @media (max-width: 768px) {
            margin-bottom: 4px;
        }

        @media (max-width: 575px) {
            max-width: 264px;
            width: 100%;
        }
    }

    &__select {
        border: 1px solid #b6b6b6;
        border-radius: 10px;
        margin-right: 0;
        margin-bottom: 0;


        .v-field__input {
            padding-top: 12px;
            padding-bottom: 12px;
            white-space: nowrap;
            min-height: 47px;

            input {
                margin: 0;
            }
        }
    }

    // &__error {
    //     font-size: 12px;
    //     line-height: 12px;
    //     bottom: -12px;
    // }

    &__confidant {
        margin-left: 12px;
        padding: 4px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 224px;
        border: 1px solid #b6b6b6;
        border-radius: 10px;
        // align-self: start;
        min-height: 48px;

        @media (max-width: 768px) {
            margin-left: 0;
        }

        @media (max-width: 575px) {
            max-width: 212px;
            width: 100%;
        }

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
