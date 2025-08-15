<template>
  <div class="form__field-group report__field-group report__field-group--column"
    v-if="isSent && 
          !twentiethPanelData.premises_available &&
          !twentiethPanelData.equipped_workplaces &&
          !twentiethPanelData.event_spaces">
    <p class="report__text-info">
      Информация о&nbsp;показателе региональным отделением не&nbsp;предоставлена.
    </p>
  </div>
    
  <div v-else class="form__field-group report__field-group report__field-group--column">
        <div>
            <p class="form__label report__label">Наличие помещения 
                <!-- <sup class="valid-red">*</sup> -->
            </p>
            <div class="form__label-radio">
                <div style="display: flex; align-items: center">
                    <input
                        class="custom-radio"
                        v-model="twentiethPanelData.premises_available"
                        id="premises_available-true"
                        type="radio"
                        :value="true"
                        @change="focusOut"
                        :disabled="isSent"
                    />
                    <label for="premises_available-true">Да</label>
                </div>
                <div style="display: flex; align-items: center">
                    <input
                        class="custom-radio"
                        v-model="twentiethPanelData.premises_available"
                        id="premises_available-false"
                        type="radio"
                        :value="false"
                        @change="focusOut"
                        :disabled="isSent"
                    />
                    <label for="premises_available-false">Нет</label>
                </div>
            </div>
        </div>

        <div>
            <p class="form__label report__label">Наличие оборудованных рабочих мест 
                <!-- <sup class="valid-red">*</sup> -->
            </p>
            <div class="form__label-radio">
                <div style="display: flex; align-items: center">
                    <input
                        class="custom-radio"
                        v-model="twentiethPanelData.equipped_workplaces"
                        id="equipped_workplaces-true"
                        type="radio"
                        :value="true"
                        @change="focusOut"
                        :disabled="isSent"
                    />
                    <label for="equipped_workplaces-true">Да</label>
                </div>
                <div style="display: flex; align-items: center">
                    <input
                        class="custom-radio"
                        v-model="twentiethPanelData.equipped_workplaces"
                        id="equipped_workplaces-false"
                        type="radio"
                        :value="false"
                        @change="focusOut"
                        :disabled="isSent"
                    />
                    <label for="equipped_workplaces-false">Нет</label>
                </div>
            </div>
        </div>

        <div class="mb-20">
            <p class="form__label report__label">Наличие доступа к&nbsp;помещениям для совместной работы <br/>и&nbsp;проведения мероприятий различного уровня 
                <!-- <sup class="valid-red">*</sup> -->
            </p>
            <div class="form__label-radio">
                <div style="display: flex; align-items: center">
                    <input
                        class="custom-radio"
                        v-model="twentiethPanelData.event_spaces"
                        id="event_spaces-true"
                        type="radio"
                        :value="true"
                        @change="focusOut"
                        :disabled="isSent"
                    />
                    <label for="event_spaces-true">Да</label>
                </div>
                <div style="display: flex; align-items: center">
                    <input
                        class="custom-radio"
                        v-model="twentiethPanelData.event_spaces"
                        id="event_spaces-false"
                        type="radio"
                        :value="false"
                        @change="focusOut"
                        :disabled="isSent"
                    />
                    <label for="event_spaces-false">Нет</label>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { ref, watchEffect } from 'vue';
// import { InputReport, TextareaReport } from '@shared/components/inputs';
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

const ID_PANEL = '20';
const isFirstSent = ref(true);

const twentiethPanelData = ref({
  premises_available: null,
  equipped_workplaces: null,
  event_spaces: null,
});

const focusOut = async () => {
  console.log(twentiethPanelData.value);

  // if (nineteenthPanelData.value.employed_student_start === '') {
  //   nineteenthPanelData.value.employed_student_start = null;
  // }
  
  // if (nineteenthPanelData.value.employed_student_end === '') {
  //   nineteenthPanelData.value.employed_student_end = null;
  // }

  try {
    if (isFirstSent.value) {
      const { data } = await reportPartTwoService.createReport(twentiethPanelData.value, ID_PANEL);
      emit('getData', data, Number(ID_PANEL));
    } else {
      const { data } = await reportPartTwoService.createReportDraft(twentiethPanelData.value, ID_PANEL);
      emit('getData', data, Number(ID_PANEL));
    }
  } catch (e) {
    console.log('focusOut error:', e);
  }
};

// const focusOut = async () => {
//   let formData = new FormData();
//   formData.append('comment', twentiethPanelData.value.comment || '');

//   try {
//     if (isFirstSent.value) {
//       const { data } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
//       emit('getData', data, Number(ID_PANEL));
//     } else {
//       const { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
//       emit('getData', data, Number(ID_PANEL));
//     }
//   } catch (e) {
//     console.log('focusOut error:', e);
//   }
// };

watchEffect(() => {
  // console.log("не эксперт: ", !(props.districtExpert || props.centralExpert));
  console.log(props.data);
  if (props.data) {
    isFirstSent.value = false;
    // ссылка на документацию, названия полей--------------------------------------------------
    twentiethPanelData.value.premises_available = props.data.premises_available;
    twentiethPanelData.value.equipped_workplaces = props.data.equipped_workplaces;
    twentiethPanelData.value.event_spaces = props.event_spaces;
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
    margin-bottom: 0;
    

    &--column {
      grid-template-columns: 1fr;
      gap: 32px;
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

.mb-20 {
  margin-bottom: 20px;
}

.form__label {
  margin-bottom: 12px;
}

.form__label-radio {
  display: flex;
  gap: 40px;

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