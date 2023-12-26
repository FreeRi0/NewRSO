<template>
  <div>
    <div class="member__content">
      <div class="member__image">
        <img v-if="item.user.avatar" :src="item.user.avatar.photo" alt="Фото бойца" />
        <img
          v-else
          :src="'./assets/foto-leader-squad/foto-leader-squad-stub.png'"
          alt="Фото бойца (заглушка)"
        />
      </div>
      <div class="member__container">
        <p class="member__title">
          {{
            item.user.last_name +
            " " +
            item.user.first_name +
            " " +
            item.user.patronymic_name
          }}
        </p>
        <p class="member__date">{{ item.user.date_of_birth }}</p>
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
        v-model:value="position"
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
import { ref, computed, watch } from "vue";
import { Select } from "@shared/components/selects";
import { Checkbox } from "@shared/components/checkboxes";
import { useVuelidate } from "@vuelidate/core";
import { useRouter } from "vue-router";
import {
  helpers,
  minLength,
  required,
  maxLength,
  numeric,
  email,
  sameAs,
} from "@vuelidate/validators";

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  submited: {
    type: Boolean,
    default: false,
  },
  functions: {
    type: Array,
    default: () => [],
  },
  // membersList: {
  //     type: Array,
  //     default: () => [],
  // },
});

const emit = defineEmits(["updateMember"]);

// const confidant2 = ref(props.confidant);

const confidant2 = ref(props.item.is_trusted);
const position = ref(props.item.position);

const changeOption = (event) => {
  // console.log(event);
  emit(
    "updateMember",
    {
      position: event,
    },
    props.item.id
  );
};
const changeConfidant = (event) => {
  // console.log(event);
  emit(
    "updateMember",
    {
      confidant: event,
    },
    props.item.id
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
  await axios
    .get("api/v1/positions/")

    .then((res) => {
      // console.log(props.address);
      functions.value = res.data;
      console.log(res.data);
    })
    .catch(function (error) {
      console.log("an error occured " + error);
    });
};

onMounted(() => {
  onChangePosition();
});

watch(
  () => props.submited,
  (newSubmited) => {
    if (!newSubmited) return;
    // UploadData();
    onChangePosition();
  }
);
</script>
