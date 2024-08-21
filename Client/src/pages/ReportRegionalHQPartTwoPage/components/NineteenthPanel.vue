<template>
  <div class="form__field-group report__field-group">
    <div class="report__fieldset report__fieldset--left-block">
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
      />
    </div>

    <div class="report__fieldset report__fieldset--right-block">
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
      />
    </div>
  
    <div class="report__fieldset report__fieldset--comment">
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
      >
      </TextareaReport>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { getReport, reportPartTwoService } from "@services/ReportService.ts";

const ID_PANEL = '19';
const isFirstSent = ref(true);

const nineteenthPanelData = ref({
  employed_student_start: '',
  employed_student_end: '',
  comment: '',
});

const focusOut = async () => {
  let formData = new FormData();
  formData.append('employed_student_start', nineteenthPanelData.value.employed_student_start);
  formData.append('employed_student_end', nineteenthPanelData.value.employed_student_end);
  formData.append('comment', nineteenthPanelData.value.comment);

  if (isFirstSent.value) {
    await reportPartTwoService.createReport(formData, ID_PANEL, true);
  } else {
    await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  }
};

watchEffect(async () => {
  try {
    const { data } = await reportPartTwoService.getReport(ID_PANEL);
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
    margin-bottom: 0;
  }

  &__fieldset {
    &--left-block {
      .report__label {
        max-width: 240px;
      }
    }
  }
}
</style>