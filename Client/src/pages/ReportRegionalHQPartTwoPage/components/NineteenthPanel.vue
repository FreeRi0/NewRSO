<template>
  <div class="form__field-group report__field-group report__field-group--column"
    v-if="isSent && 
          !nineteenthPanelData.employed_student_start &&
          !nineteenthPanelData.employed_student_end &&
          !nineteenthPanelData.comment">
    <p class="report__text-info">
      Информация о&nbsp;показателе региональным отделением не&nbsp;предоставлена.
    </p>
  </div>

  <div v-else class="form__field-group report__field-group">
    <div class="report__fieldset report__fieldset--left-block"
      v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
            (isSent && nineteenthPanelData.employed_student_start)">
      <label
        class="form__label report__label"
        for="employed-student-start"
      >
        Фактическое количество трудоустроенных студентов в&nbsp;третий трудовой семестр
      </label>
      <InputReport
        v-model:value="nineteenthPanelData.employed_student_start"
        id="employed-student-start"
        name="employed-student-start"
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
            (isSent && nineteenthPanelData.employed_student_end)">
      <label
        class="form__label report__label"
        for="employed-student-end"
      >
        Фактическое количество трудоустроенных в&nbsp;штат принимающей организации по&nbsp;итогам третьего трудового семестра
      </label>
      <InputReport
        v-model:value="nineteenthPanelData.employed_student_end"
        id="employed-student-end"
        name="employed-student-end"
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
            (isSent && nineteenthPanelData.comment)">
      <label
        class="form__label report__label"
        for="comment"
      >
        Комментарий
      </label>
      <TextareaReport
        v-model:value="nineteenthPanelData.comment"
        id="comment"
        name="comment"
        placeholder="Укажите принимающие организации и&nbsp;количество людей по&nbsp;каждой из&nbsp;них"
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

const ID_PANEL = '18';// номер показателя для 2024 - 19, для 2025 - 18
const isFirstSent = ref(true);

const nineteenthPanelData = ref({
  employed_student_start: null,
  employed_student_end: null,
  comment: '',
});

const focusOut = async () => {
  // console.log(nineteenthPanelData.value);

  if (nineteenthPanelData.value.employed_student_start === '') {
    nineteenthPanelData.value.employed_student_start = null;
  }
  
  if (nineteenthPanelData.value.employed_student_end === '') {
    nineteenthPanelData.value.employed_student_end = null;
  }

  try {
    if (isFirstSent.value) {
      const { data } = await reportPartTwoService.createReport(nineteenthPanelData.value, ID_PANEL);
      emit('getData', data, Number(ID_PANEL));
    } else {
      const { data } = await reportPartTwoService.createReportDraft(nineteenthPanelData.value, ID_PANEL);
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
    nineteenthPanelData.value.employed_student_start = props.data.employed_student_start;
    nineteenthPanelData.value.employed_student_end = props.data.employed_student_end;
    nineteenthPanelData.value.comment = props.data.comment;
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
</style>