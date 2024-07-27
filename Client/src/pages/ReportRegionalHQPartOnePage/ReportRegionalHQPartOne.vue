<template>
  <div class="container">
    <h1 class="title title--mb">Отчет о деятельности регионального отделения РСО за 2024 год. Часть 1</h1>
    <h2 class="report_title-h2">Свод статистических данных по трудоустройству бойцов студенческих отрядов РО за 2024 год на 1 сентября 2024 года</h2>

    <report-regional-form
        :reportData="reportData"
        @sentReport="sentReport"
        isNewReport
        :isButtonDisabled="isButtonDisabled"
    />
  </div>
  <ReportModalSuccess
      v-if="showModalSuccess"
      @closeModal="closeModalSuccess"
  />
  <ReportModalWarning
      v-if="showModalWarning"
      @reportConfirmation="reportConfirmation"
  />
</template>

<script setup>
import { inject, ref } from "vue";
import ReportRegionalForm from "@pages/ReportRegionalHQPartOnePage/components/ReportRegionalForm.vue";
import { createReport } from "@services/ReportService.ts";
import ReportModalSuccess from "@pages/ReportRegionalHQPartOnePage/components/ReportModalSuccess.vue";
import ReportModalWarning from "@pages/ReportRegionalHQPartOnePage/components/ReportModalWarning.vue";

const swal = inject('$swal');

const defaultReportData = {
  participants_number: '',
  employed_sso: '',
  employed_smo: '',
  employed_specialized_detachments: '',
  employed_spo: '',
  employed_sservo: '',
  employed_production_detachments: '',
  employed_sop: '',
  employed_ssho: '',
  employed_top: '',
};

const reportData = ref(defaultReportData);
const showModalWarning = ref(false);
const showModalSuccess = ref(false);
const isButtonDisabled = ref(false);

const reportConfirmation = async (value) => {
  if (value) {
    try {
      await createReport(reportData.value)
      showModalWarning.value = false;
      showModalSuccess.value = true;
      isButtonDisabled.value = true;
    } catch (e) {
      swal.fire({
        position: 'center',
        icon: 'error',
        title: `Не удалось отправить отчет`,
        showConfirmButton: false,
        timer: 1500,
      });
      showModalWarning.value = false;
    }
  } else {
    showModalWarning.value = false;
  }
};
const sentReport = (data) => {
  showModalWarning.value = true;
  reportData.value = data;
};

const closeModalSuccess = (value) => {
  showModalSuccess.value = value;
}
</script>
<style lang="scss" scoped>
.report_title-h2 {
  font-family: Bert Sans;
  font-size: 22px;
  font-weight: 400;
  line-height: 29.01px;
  text-align: left;
  margin-bottom: 40px;
}
.form {
  &-container {
    display: flex;
    margin-bottom: 8px;
    gap: 80px;
    @media (max-width: 768px) {
      display: initial;
    }
  }

  &-col {
    width: 50%;
    @media (max-width: 768px) {
      width: initial;
    }
  }

  &-input {
    width: 100%;
    height: 40px;
  }
}
</style>