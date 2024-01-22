<template>
    <div>
        <div class="member__content">
            <div class="member__image">
                <img
                    :src="
                        item.user?.avatar?.photo ??
                        '/assets/foto-leader-squad/foto-leader-squad-stub.png'
                    "
                    alt="Фото бойца"
                />
            </div>
            <div class="member__container">
                <p class="member__title">
                    {{
                        item.user?.last_name +
                        ' ' +
                        item.user?.first_name +
                        ' ' +
                        item.user?.patronymic_name
                    }}
                </p>
                <p class="member__date">{{ item.user?.date_of_birth }}</p>
            </div>
        </div>

        <div class="member__select-box">
            <Select
                class="member__select"
                variant="outlined"
                clearable
                :items="functions"
                name="select_position"
                id="select-position"
                placeholder="Выберите должность"
                v-model="position"
                @update:value="changeOption"
            ></Select>
        </div>

        <div class="member__confidant">
            <FormCheckbox
                label="Доверенное лицо"
                :id="item.user.id"
                :value="item.user.last_name"
                v-model:checked="item.is_trusted"
                @update:checked="changeConfidant"
            ></FormCheckbox>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { Select } from '@shared/components/selects';
import { FormCheckbox } from '@shared/components/checkboxes';
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
import { HTTP } from '@app/http';

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
    submited: {
        type: Boolean,
        default: false,
    },
    functions: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['updateMember']);
const confidant = ref(props.item.is_trusted);
const position = ref(props.item.position);

const changeOption = (event) => {
    console.log(event);
    emit(
        'updateMember',
        {
            position: event,
        },
        props.item.id,
    );
};
const changeConfidant = (event) => {
    console.log(event);
    emit(
        'updateMember',
        {
            confidant: event,
        },
        props.item.id,
    );
};

// const membersList = ref(props.membersList);

// const rules = computed(() => ({
//     position: {
//         required: helpers.withMessage(`* обязательно для заполнения`, required),
//     },
//     // membersList: {
//     //     //--------------------------------------------------------------------------------------
//     //     required,
//     //     $each: {
//     //         position: {
//     //             required: helpers.withMessage(
//     //                 `* обязательно для заполнения`,
//     //                 required,
//     //             ),
//     //         },
//     //     },
//     // },
// }));

// const v = useVuelidate(rules, {
//     position,
//     // membersList,
// });

// const UploadData = async () => {
//     v.value.$touch();
//     if (v.value.$error) {
//         swal.fire({
//             icon: 'error',
//             title: 'Упсс...',
//             text: 'Что-то пошло не так!',
//         });
//     } else {
//         swal.fire({
//             position: 'top-center',
//             icon: 'success',
//             title: 'Данные успешно сохранены',
//             showConfirmButton: false,
//             timer: 1500,
//         });
//         // функция очистки полей формы после успешной отправки данных на сервер
//     }
// };

// watch(
//     () => props.submited,
//     (newSubmited) => {
//         if (!newSubmited) return;
//         UploadData();
//     },
// );

const functions = ref(props.functions);

const onChangePosition = async () => {
    await HTTP.get('positions/')

        .then((res) => {
            // console.log(props.address);
            functions.value = res.data;
            // console.log(res.data);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
    // console.log(data);
    // functions.value = data;
};

onMounted(() => {
    // console.log('jhjih');
    onChangePosition();
});

// onErrorCaptured((error, instance, info) => {
//     console.log(error, instance, info);
// });

watch(
    () => props.submited,
    (newSubmited) => {
        if (!newSubmited) return;
        // UploadData();
        onChangePosition();
    },
);
</script>
