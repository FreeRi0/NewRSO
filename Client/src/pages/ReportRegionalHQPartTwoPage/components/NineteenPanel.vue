<template>
  <div class="form__field-group report__field-group report__field-group--column"
    v-if="isSent && 
          !nineteenPanelData.employees_number &&
          !nineteenPanelData.officially_employed &&
          !nineteenPanelData.average_salary &&
          !nineteenPanelData.comment">
    <p class="report__text-info">
      Информация о&nbsp;показателе региональным отделением не&nbsp;предоставлена.
    </p>
  </div>

  <div v-else class="form__field-group report__field-group">
    <div class="report__fieldset report__fieldset--left-block"
      v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
            (isSent && nineteenPanelData.employees_number)">
      <label
        class="form__label report__label"
        for="employees_number"
      >
        Количество сотрудников
      </label>
      <InputReport
        v-model:value="nineteenPanelData.employees_number"
        id="employees_number"
        name="employees_number"
        style="width: 100%;"
        height="40px"
        type="number"
        placeholder="Введите число"
        :maxlength="10"
        :min="0"
        :max="2147483647"
        @focusout="focusOut"
        :disabled="isSent"
      />
    </div>

    <div class="report__fieldset report__fieldset--right-block"
      v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
            (isSent && nineteenPanelData.officially_employed)">
      <p class="form__label report__label">Официальное трудоустройство сотрудников в&nbsp;РО&nbsp;РСО</p>
      <div class="form__label-radio">
          <div style="display: flex; align-items: center">
              <input
                  class="custom-radio"
                  v-model="nineteenPanelData.officially_employed"
                  id="officially_employed-true"
                  type="radio"
                  :value="true"
                  @change="focusOut"
                  :disabled="isSent"
              />
              <label for="officially_employed-true">Да</label>
          </div>
          <div style="display: flex; align-items: center">
              <input
                  class="custom-radio"
                  v-model="nineteenPanelData.officially_employed"
                  id="officially_employed-false"
                  type="radio"
                  :value="false"
                  @change="focusOut"
                  :disabled="isSent"
              />
              <label for="officially_employed-false">Нет</label>
          </div>
      </div>
    </div>

    <div class="report__fieldset report__fieldset--left-block"
      v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
            (isSent && nineteenPanelData.average_salary)">
      <label
        class="form__label report__label"
        for="average_salary"
      >
        Средняя зп&nbsp;в&nbsp;месяц&nbsp;по&nbsp;должностям
      </label>
      <InputReport
        v-model:value="nineteenPanelData.average_salary"
        id="average_salary"
        name="average_salary"
        style="width: 100%;"
        height="40px"
        type="number"
        placeholder="Введите число"
        :maxlength="10"
        :min="0"
        :max="2147483647"
        @focusout="focusOut"
        :disabled="isSent"
      />
    </div>
  
    <div class="report__fieldset report__fieldset--comment"
      v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
            (isSent && nineteenPanelData.comment)">
      <label
        class="form__label report__label"
        for="comment"
      >
        Комментарий
      </label>
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
import { ref, watchEffect } from 'vue';
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { reportPartTwoService } from "@services/ReportService.ts";

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  data: Object,
  isSent: {
    type: Boolean,
  },
});

const emit = defineEmits(['getData']);

const ID_PANEL = '19';
const isFirstSent = ref(true);

const nineteenPanelData = ref({
  employees_number: null,
  officially_employed: null,
  average_salary: null,
  comment: '',
});

const focusOut = async () => {
  console.log(nineteenPanelData.value);

  // if (nineteenPanelData.value.employed_student_start === '') {
  //   nineteenPanelData.value.employed_student_start = null;
  // }
  
  // if (nineteenPanelData.value.employed_student_end === '') {
  //   nineteenPanelData.value.employed_student_end = null;
  // }

  try {
    if (isFirstSent.value) {
      const { data } = await reportPartTwoService.createReport(nineteenPanelData.value, ID_PANEL);
      emit('getData', data, Number(ID_PANEL));
    } else {
      const { data } = await reportPartTwoService.createReportDraft(nineteenPanelData.value, ID_PANEL);
      emit('getData', data, Number(ID_PANEL));
    }
  } catch (e) {
    console.log('focusOut error:', e);
  }
};

watchEffect(() => {
  // console.log("не эксперт: ", !(props.districtExpert || props.centralExpert));
  // console.log(props.data);
  if (props.data) {
    isFirstSent.value = false;
    nineteenPanelData.value.employees_number = props.data.employees_number;
    nineteenPanelData.value.officially_employed = props.data.officially_employed;
    nineteenPanelData.value.average_salary = props.data.average_salary;
    nineteenPanelData.value.comment = props.data.comment;
  }
}, {
  flush: 'post'
});
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
}

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
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #1F7CC0;
  /* Внешний синий круг */
}

.custom-radio + label::after {
  content: '';
  position: absolute;
  left: 5px;
  /* Отступ от внешнего круга */
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #1F7CC0;
  /* Внутренний синий круг */
  background-color: transparent;
  /* Пустота внутри внутреннего круга */
}

.custom-radio:checked + label::after {
  background-color: #1F7CC0;
  /* Заполнение внутреннего круга синим цветом при выборе */
}

.custom-radio:disabled + label {
  pointer-events: none;
}
</style>