<template>
    <div>
        <div class="member__content">
            <div class="member__image">
                <img
                    v-if="img"
                    :src="'./assets/foto-leader-squad/' + srcImg"
                    alt="Фото бойца"
                />
                <img
                    v-else
                    :src="'./assets/foto-leader-squad/foto-leader-squad-stub.png'"
                    alt="'Фото бойца (заглушка)'"
                />
            </div>
            <div class="member__status" v-if="logo">
                <img
                    :src="'./assets/icon/icon-status/' + iconStatus"
                    alt="Статус бойца"
                />
            </div>
            <div class="member__container">
                <p class="member__title">{{ title }}</p>
                <p class="member__date">{{ date }}</p>
            </div>
        </div>

        <div class="member__select-box">
            <Select
                class="member__select"
                variant="outlined"
                clearable
                :items="positions"
                name="select_position"
                id="select-position"
                placeholder="Выберите должность"
                v-model:value="v.position.$model"
                :error="v.position.$errors"
                @update:value="changeOption"
            ></Select>
        </div>

        <div class="member__confidant">
            <Checkbox
                label="Доверенное лицо"
                :id="title"
                :value="title"
                v-model:checked="confidant2"
                @update:checked="changeConfidant"
            ></Checkbox>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Select } from '@shared/components/selects';
import { Checkbox } from '@shared/components/checkboxes';
import { useVuelidate } from '@vuelidate/core';
import { useRouter } from 'vue-router';
import {
    helpers,
    minLength,
    required,
    maxLength,
    numeric,
    email,
    sameAs,
} from '@vuelidate/validators';

const props = defineProps({
    id: {
        type: Number,
        // default: ,
    },
    img: {
        type: Boolean,
        default: false,
    },
    srcImg: {
        type: String,
        default: '',
    },
    logo: {
        type: Boolean,
        default: false,
    },
    iconStatus: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
    date: {
        type: String,
        default: '',
    },
    position: {
        type: String,
        default: '',
    },
    confidant: {
        type: Boolean,
        default: false,
    },
    submited: {
        type: Boolean,
        default: false,
    },
    // membersList: {
    //     type: Array,
    //     default: () => [],
    // },
});

const confidant2 = ref(props.confidant);
const emit = defineEmits(['updateMember']);

const changeOption = (event) => {
    // console.log(event);
    emit(
        'updateMember',
        {
            position: event,
        },
        props.id,
    );
};
const changeConfidant = (event) => {
    // console.log(event);
    emit(
        'updateMember',
        {
            confidant: event,
        },
        props.id,
    );
};

const position = ref(props.position);

// const membersList = ref(props.membersList);

const rules = computed(() => ({
    position: {
        required: helpers.withMessage(`* обязательно для заполнения`, required),
    },
    // membersList: {
    //     //--------------------------------------------------------------------------------------
    //     required,
    //     $each: {
    //         position: {
    //             required: helpers.withMessage(
    //                 `* обязательно для заполнения`,
    //                 required,
    //             ),
    //         },
    //     },
    // },
}));

const v = useVuelidate(rules, {
    position,
    // membersList,
});

const UploadData = async () => {
    v.value.$touch();
    if (v.value.$error) {
        swal.fire({
            icon: 'error',
            title: 'Упсс...',
            text: 'Что-то пошло не так!',
        });
    } else {
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Данные успешно сохранены',
            showConfirmButton: false,
            timer: 1500,
        });
        // функция очистки полей формы после успешной отправки данных на сервер
    }
};

watch(
    () => props.submited,
    (newSubmited) => {
        if (!newSubmited) return;
        UploadData();
    },
);

const positions = ref([
    { title: 'Комиссар' },
    { title: 'Мастер-методист' },
    { title: 'Специалист' },
    { title: 'Медик' },
]);
</script>
