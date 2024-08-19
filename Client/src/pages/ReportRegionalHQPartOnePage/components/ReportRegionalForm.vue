<template>
  <form class="form__field-group Report-Regional-Form__style" @submit.prevent="sentReport">
    <h2 v-if="!isNewReport" class="report_title-h3">Свод статистических данных по трудоустройству бойцов студенческих
      отрядов РО за 2024 год на 1 сентября 2024 года</h2>
    <div class="form__field">
      <label class="form__label" for="participants_number">Количество членов РО <sup class="valid-red">*</sup></label>
      <InputReport v-model:value="reportDataChildren.participants_number" id="participants_number"
        name="participants_number" class="form__input" type="number" placeholder="Введите число" aria-required="true"
        :disabled="!isNewReport" />
    </div>
    <p>Количество трудоустроенных по направлениям:</p>
    <div class="form-container">
      <div class="form-col">
        <div class="form__field">
          <label class="form__label" for="sso">ССО <sup class="valid-red">*</sup></label>
          <InputReport v-model:value="reportDataChildren.employed_sso" id="sso" name="sso" class="form__input"
            type="number" placeholder="Введите число" :disabled="!isNewReport" />
        </div>
        <div class="form__field">
          <label class="form__label" for="smo">СМО <sup class="valid-red">*</sup></label>
          <InputReport v-model:value="reportDataChildren.employed_smo" id="smo" name="smo" class="form__input"
            type="number" placeholder="Введите число" :disabled="!isNewReport" />
        </div>
        <div class="form__field">
          <label class="form__label" for="specialized_detachment">Профильные отряды <sup
              class="valid-red">*</sup></label>
          <InputReport v-model:value="reportDataChildren.employed_specialized_detachments" id="specialized_detachment"
            name="specialized_detachment" class="form__input" type="number" placeholder="Введите число"
            :disabled="!isNewReport" />
        </div>
        <div class="form__field">
          <label class="form__label" for="spo">СПО <sup class="valid-red">*</sup></label>
          <InputReport v-model:value="reportDataChildren.employed_spo" id="spo" name="spo" class="form__input"
            type="number" placeholder="Введите число" :disabled="!isNewReport" />
        </div>
        <div class="form__field">
          <label class="form__label" for="sservo">ССервО <sup class="valid-red">*</sup></label>
          <InputReport v-model:value="reportDataChildren.employed_sservo" id="sservo" name="sservo" class="form__input"
            type="number" placeholder="Введите число" :disabled="!isNewReport" />
        </div>
        <div class="form__field">
          <label class="form__label" for="production_detachments">Производственные отряды <sup
              class="valid-red">*</sup></label>
          <InputReport v-model:value="reportDataChildren.employed_production_detachments" id="production_detachments"
            name="production_detachments" class="form__input" type="number" placeholder="Введите число"
            :disabled="!isNewReport" />
        </div>
        <div class="form__field">
          <label class="form__label" for="sop">СОП <sup class="valid-red">*</sup></label>
          <InputReport v-model:value="reportDataChildren.employed_sop" id="sop" name="sop" class="form__input"
            type="number" placeholder="Введите число" :disabled="!isNewReport" />
        </div>
        <div class="form__field">
          <label class="form__label" for="ssho">ССхО <sup class="valid-red">*</sup></label>
          <InputReport v-model:value="reportDataChildren.employed_ssho" id="ssho" name="ssho" class="form__input"
            type="number" placeholder="Введите число" :disabled="!isNewReport" />
        </div>
        <div class="form__field">
          <label class="form__label" for="top">ТОП <sup class="valid-red">*</sup></label>
          <InputReport v-model:value="reportDataChildren.employed_top" id="top" name="top" class="form__input"
            type="number" placeholder="Введите число" :disabled="!isNewReport" />
        </div>
      </div>
    </div>
  </form>
  <Button v-if="isNewReport" variant="text" label="Отправить отчет" size="large" :onclick="sentReport"
    :disabled="isButtonDisabled" />
</template>

<script setup>
import { InputReport } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { ref, watchEffect } from "vue";

const emit = defineEmits(['sentReport']);
const props = defineProps({
  reportData: {
    type: Object,
  },
  isNewReport: {
    type: Boolean,
    default: false,
  },
  isButtonDisabled: {
    type: Boolean,
    default: false,
  }
});

const reportDataChildren = ref(null);
watchEffect(() => {
  reportDataChildren.value = { ...props.reportData };
})

const sentReport = () => {
  emit('sentReport', reportDataChildren.value)
};
</script>
<style lang="scss" scoped>
.valid-red {
  color: #db0000;
}

.form {
  &-container {
    display: flex;
    margin-bottom: 8px;

    @media (max-width: 1200px) {
      flex-wrap: wrap;
    }

    @media (max-width: 768px) {
      display: initial;
    }
  }

  &-col {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    justify-content: space-between;

    @media (max-width: 643px) {
      justify-content: center;
    }
  }

  &-input {
    max-width: 340px;
    height: 40px;
  }
}

.form__field-group {
  display: flex;
  flex-direction: column;
  border: none;
  background-color: #F3F4F5;

  @media (max-width: 643px) {
    align-items: center;
  }
}

.form__field-group p {
  color: #6D6D6D;
}

.report_title-h3 {
  font-family: Akrobat;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
  text-align: left;
  padding-bottom: 32px;
}
</style>