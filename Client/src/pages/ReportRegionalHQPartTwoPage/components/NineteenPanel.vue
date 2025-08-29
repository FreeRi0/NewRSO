<template>
  <div
    class="form__field-group report__field-group report__field-group--column"
    v-if="
      isSent &&
      !nineteenPanelData.employees_number &&
      !employees &&
      !nineteenPanelData.officially_employed_number &&
      !nineteenPanelData.comment
    "
  >
    <p class="report__text-info">
      Информация о&nbsp;показателе региональным отделением не&nbsp;предоставлена.
    </p>
  </div>

  <div v-else class="form__field-group report__field-group">
    <div
      class="report__fieldset report__fieldset--left-block"
      v-if="
        (!isSent && !(props.centralExpert || props.districtExpert)) ||
        (isSent && nineteenPanelData.employees_number)
      "
    >
      <label class="form__label report__label" for="employees_number">
        Фактическое количество сотрудников РО&nbsp;РСО
      </label>
      <InputReport
        v-model:value="nineteenPanelData.employees_number"
        id="employees_number"
        name="employees_number"
        style="width: 100%"
        height="40px"
        type="number"
        placeholder="Введите число"
        :maxlength="10"
        :min="0"
        :max="32767"
        @focusout="focusOut"
        :disabled="isSent"
      />
    </div>

    <div
      class="report__fieldset report__fieldset--right-block"
      v-if="
        (!isSent && !(props.centralExpert || props.districtExpert)) ||
        (isSent && nineteenPanelData.officially_employed_number)
      "
    >
      <label class="form__label report__label" for="officially_employed_number">
        Количество сотрудников, официально трудоустроенных в&nbsp;РО&nbsp;РСО
      </label>
      <InputReport
        v-model:value="nineteenPanelData.officially_employed_number"
        id="officially_employed_number"
        name="officially_employed_number"
        style="width: 100%"
        height="40px"
        type="number"
        placeholder="Введите число"
        :maxlength="10"
        :min="0"
        :max="32767"
        @focusout="focusOut"
        :disabled="isSent"
      />
    </div>
    <!-- Скорректировать условие отображения -->
    <div
      class="report__fieldset report__fieldset--left-block"
      v-if="
        (!isSent && !(props.centralExpert || props.districtExpert)) ||
        (isSent && nineteenPanelData.employees)
      "
    >
      <p class="form__label report__label">
        Средняя заработная плата в&nbsp;месяц по&nbsp;занимаемым должностям
      </p>

      <!-- условие отображения v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
          (isSent && link.link)" -->
      <div class="report__employee-list">
        <div class="report__employee-item" v-for="(employee, i) in employees" :key="i">
          <InputReport
            v-model:value="employee.job_title"
            :id="i"
            :name="i"
            style="width: 100%"
            height="40px"
            type="text"
            placeholder="Введите должность"
            :max-length="255"
            :min-length="1"
            @focusout="focusOut"
            @error="setError"
            :disabled="isSent"
          />
          <div v-if="isError && i > 0" class="report__error-block">
            <span class="report__error-text">Укажите должность</span>
          </div>
          <InputReport
            v-model:value="employee.salary"
            :id="i"
            :name="i"
            style="width: 100%"
            height="40px"
            type="number"
            placeholder="Введите заработную плату"
            :maxlength="10"
            :min="0"
            :max="2147483647"
            @focusout="focusOut"
            @error="setError"
            :disabled="isSent"
          />
          <div v-if="isError && i > 0" class="report__error-block">
            <span class="report__error-text">Укажите заработную плату</span>
          </div>

          <button
            v-if="!isSent && employees.length === i + 1"
            class="report__add-button"
            @click="addEmployee"
          >
            Добавить сотрудника
          </button>

          <button
            v-if="!isSent && i > 0"
            @click="deleteEmployee(i)"
            class="report__btn-link report__btn-link--delete-field"
            aria-label="Удалить сотрудника"
          >
            <span>Удалить сотрудника</span>
          </button>
        </div>
      </div>
    </div>

    <div
      class="report__fieldset report__fieldset--comment"
      v-if="
        (!isSent && !(props.centralExpert || props.districtExpert)) ||
        (isSent && nineteenPanelData.comment)
      "
    >
      <label class="form__label report__label" for="comment"> Комментарий </label>
      <TextareaReport
        v-model:value="nineteenPanelData.comment"
        id="comment"
        name="comment"
        placeholder="Напишите сообщение"
        :rows="1"
        autoResize
        counter-visible
        :maxlength="3000"
        :max-length-text="3000"
        @focusout="focusOut"
        :disabled="isSent"
      >
      </TextareaReport>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { InputReport, TextareaReport } from "@shared/components/inputs";
import { reportPartTwoService } from "@services/ReportService.ts";

const props = defineProps({
  districtExpert: {
    type: Boolean,
  },
  centralExpert: {
    type: Boolean,
  },
  isError: {
    type: Boolean,
    default: false,
  },
  data: Object,
  isSent: {
    type: Boolean,
  },
});

const emit = defineEmits(["getData"]);

const employee_err = ref(false);
const setError = (err) => {
  employee_err.value = err;
};

const ID_PANEL = "19";
const isFirstSent = ref(true);

const nineteenPanelData = ref({
  employees_number: null,
  officially_employed_number: null,
  employees: [],
  comment: "",
});

const employees = ref([
  {
    job_title: "",
    salary: null,
  },
]);

const addEmployee = () => {
  employees.value.push({
    job_title: "",
    salary: null,
  });
};

const deleteEmployee = async (index) => {
  employees.value = employees.value.filter((el, i) => index !== i);
  nineteenPanelData.value.employees = [...employees.value];

  const { data } = await reportPartTwoService.createReportDraft(
    nineteenPanelData.value,
    ID_PANEL
  );
  emit("getData", data, Number(ID_PANEL));
};

const focusOut = async () => {
  console.log(nineteenPanelData.value);

  nineteenPanelData.value.employees = [...employees.value];

  try {
    if (isFirstSent.value) {
      const { data } = await reportPartTwoService.createReport(
        nineteenPanelData.value,
        ID_PANEL
      );
      emit("getData", data, Number(ID_PANEL));
    } else {
      const { data } = await reportPartTwoService.createReportDraft(
        nineteenPanelData.value,
        ID_PANEL
      );
      emit("getData", data, Number(ID_PANEL));
    }
  } catch (e) {
    console.log("focusOut error:", e);
  }
};

watchEffect(
  () => {
    // console.log("не эксперт: ", !(props.districtExpert || props.centralExpert));
    // console.log(props.data);
    if (props.data) {
      isFirstSent.value = false;
      nineteenPanelData.value.employees_number = props.data.employees_number;
      nineteenPanelData.value.officially_employed_number =
        props.data.officially_employed_number;
      employees.value = [...props.data.employees];
      nineteenPanelData.value.comment = props.data.comment;
    }
  },
  {
    flush: "post",
  }
);
</script>

<style lang="scss" scoped>
.report {
  &__field-group {
    grid-template-columns: 1fr 1fr;
    // grid-template-columns: minmax(27.35%, 44.9%) minmax(27.35%, 44.9%);

    &--column {
      grid-template-columns: 1fr;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__fieldset {
    @media (max-width: 1024px) {
      display: flex;
      flex-direction: column;

      .form-input {
        margin-top: auto;
      }
    }

    &--left-block {
      @media (max-width: 768px) {
        max-width: 100%;
      }

      .report__label {
        max-width: 247px;

        @media (max-width: 768px) {
          max-width: 100%;
        }
      }
    }
  }

  &__employee-list {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 12px;
  }

  &__employee-item {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 8px;

    @media (max-width: 767px) {
      max-width: calc(100% - 28px);
    }
  }

  &__add-button {
    margin-top: 12px;

    @media (max-width: 1024px) {
      max-width: 244px;
      width: 100%;
    }
  }

  &__btn-link {
    @media (max-width: 1024px) {
      padding: 9.5px 0;
    }

    &--delete-field {
      position: absolute;
      right: -160px;

      @media (max-width: 1024px) {
        position: absolute;
      }

      @media (max-width: 767px) {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid #939393;
        top: 7px;
        right: -28px;

        span {
          display: none;
        }

        &::before,
        &::after {
          position: absolute;
          content: "";
          width: 1px;
          height: 14px;
          background-color: #939393;
          top: 4px;
          left: 10.5px;
          rotate: 45deg;
        }

        &::after {
          rotate: -45deg;
        }
      }
    }
  }
}

//Стили для радио-кнопок
.form__label-radio {
  display: flex;
  gap: 40px;
  padding-top: 8px;

  @media (max-width: 568px) {
    gap: 32px;
  }
}

.custom-radio {
  display: none;
  /* -стандартное отображение*/
}

.custom-radio + label {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  font-family: "Bert Sans";
  font-weight: 600;
  line-height: 21px;
  color: #000000;
}

.custom-radio + label::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #1f7cc0;
  /* Внешний синий круг */
}

.custom-radio + label::after {
  content: "";
  position: absolute;
  left: 5px;
  /* Отступ от внешнего круга */
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #1f7cc0;
  /* Внутренний синий круг */
  background-color: transparent;
  /* Пустота внутри внутреннего круга */
}

.custom-radio:checked + label::after {
  background-color: #1f7cc0;
  /* Заполнение внутреннего круга синим цветом при выборе */
}

.custom-radio:disabled + label {
  pointer-events: none;
}
</style>
