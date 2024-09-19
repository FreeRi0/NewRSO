<template>
  <div class="form__field-group report__field-group report__field-group--column"
    v-if="(props.centralExpert || props.districtExpert) &&
          !nineteenthPanelData.employed_student_start &&
          !nineteenthPanelData.employed_student_end &&
          !nineteenthPanelData.comment">
    <p class="report__text-info">
      Информация о&nbsp;показателе региональным отделением не&nbsp;предоставлена.
    </p>
  </div>

  <div v-else class="form__field-group report__field-group">
    <div class="report__fieldset report__fieldset--left-block"
      v-if="!(props.centralExpert || props.districtExpert) ||
            (props.districtExpert && nineteenthPanelData.employed_student_start) ||
            (props.centralExpert && nineteenthPanelData.employed_student_start)">
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
        :max="32767"
        @focusout="focusOut"
        :disabled="props.centralExpert || props.districtExpert"
      />
    </div>

    <div class="report__fieldset report__fieldset--right-block"
      v-if="!(props.centralExpert || props.districtExpert) ||
            (props.districtExpert && nineteenthPanelData.employed_student_end) ||
            (props.centralExpert && nineteenthPanelData.employed_student_end)">
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
        :max="32767"
        @focusout="focusOut"
        :disabled="props.centralExpert || props.districtExpert"
      />
    </div>
  
    <div class="report__fieldset report__fieldset--comment"
      v-if="!(props.centralExpert || props.districtExpert) ||
            (props.districtExpert && nineteenthPanelData.comment) ||
            (props.centralExpert && nineteenthPanelData.comment)">
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
        placeholder="Напишите сообщение"
        :rows="1" 
        autoResize
        counter-visible
        :maxlength="3000"
        :max-length-text="3000"
        @focusout="focusOut"
        :disabled="props.centralExpert || props.districtExpert"
      >
      </TextareaReport>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { getReport, reportPartTwoService } from "@services/ReportService.ts";

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  reportId: {
    type: String,
    default: '1',
  }
});

const ID_PANEL = '19';
const isFirstSent = ref(true);

const nineteenthPanelData = ref({
  employed_student_start: null,
  employed_student_end: null,
  comment: '',
});

const focusOut = async () => {
  console.log(nineteenthPanelData.value);
  // let formData = new FormData();
  // nineteenthPanelData.value.employed_student_start ? formData.append('employed_student_start', nineteenthPanelData.value.employed_student_start) : formData.delete('employed_student_start');
  // nineteenthPanelData.value.employed_student_end ? formData.append('employed_student_end', nineteenthPanelData.value.employed_student_end) : formData.append('employed_student_end', '');

  // formData.append('employed_student_start', nineteenthPanelData.value.employed_student_start);
  // formData.append('employed_student_end', nineteenthPanelData.value.employed_student_end);

  // if (isFirstSent.value) {
  //   await reportPartTwoService.createReport(formData, ID_PANEL);
  // } else {
  //   await reportPartTwoService.createReportDraft(formData, ID_PANEL);
  // }
  //--------------------------------------------------------------------------------------------

  if (nineteenthPanelData.value.employed_student_start === '') {
    nineteenthPanelData.value.employed_student_start = null;
  }
  
  if (nineteenthPanelData.value.employed_student_end === '') {
    nineteenthPanelData.value.employed_student_end = null;
  }

  // console.log ("start -", typeof(nineteenthPanelData.value.employed_student_start), "end - ", typeof(nineteenthPanelData.value.employed_student_end));

  console.log(nineteenthPanelData.value.employed_student_start, nineteenthPanelData.value.employed_student_end);

  if (isFirstSent.value) {
    await reportPartTwoService.createReport(nineteenthPanelData.value, ID_PANEL);
  } else {
    await reportPartTwoService.createReportDraft(nineteenthPanelData.value, ID_PANEL);
  }
};

watchEffect(async () => {
  // console.log("не эксперт: ", !(props.districtExpert || props.centralExpert));
  try {
    const { data } = 
      props.districtExpert || props.centralExpert
        ? await reportPartTwoService.getReportDH(ID_PANEL, props.reportId)
        : await reportPartTwoService.getReport(ID_PANEL);
    console.log(data);
    if (data) {
      isFirstSent.value = false;
      nineteenthPanelData.value.employed_student_start = data.employed_student_start;
      nineteenthPanelData.value.employed_student_end = data.employed_student_end;
      nineteenthPanelData.value.comment = data.comment;
    }
  } catch (e) {
    console.log(e)
  }
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