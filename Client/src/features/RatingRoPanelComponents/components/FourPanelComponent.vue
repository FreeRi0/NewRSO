<template>
  <div class="report__field-group" v-if="!isSecondTab && !isThirdTab">
    <div class="report__fieldset report__fieldset--left-block" style="width: 150%">
      <label class="form__label report__label" for="employed_after_training">
        Количество трудоустроенных по&nbsp;профобучению<sup class="valid-red">*</sup>
      </label>
      <InputReport
        v-model:value="fourthPanelData.employed_after_training"
        id="employed_after_training"
        name="employed_after_training"
        style="width: 100%"
        height="40px"
        type="number"
        placeholder="Введите число"
        :maxlength="10"
        :min="0"
        :max="2147483647"
        @focusout="focusOut"
        :disabled="
          (props.tab === 'Просмотр отправленного отчета' &&
            reportStore.isReportRevision) ||
          (isSent && !isRevision) ||
          props.centralExpert ||
          props.districtExpert
        "
        :is-error-panel="isErrorPanel"
      />

      <div class="form__field-report" style="width: 75%">
        <v-checkbox
          v-model="fourthPanelData.employment_report_submitted"
          label="Отчет о&nbsp;трудоустройстве сдан в&nbsp;отдел профобучения ЦШ&nbsp;РСО"
          @change="focusOut"
        />
      </div>
    </div>

    <!-- <div
      class="report__fieldset report__fieldset--comment"
      v-if="
        (!isSent &&
          !(props.centralExpert || props.districtExpert) &&
          !reportStore.isReportRevision) ||
        (isSent && fourthPanelData.comment) ||
        ((props.centralExpert || props.districtExpert) && fourthPanelData.comment) ||
        (props.tab !== 'Просмотр отправленного отчета' && reportStore.isReportRevision) ||
        (props.tab === 'Просмотр отправленного отчета' &&
          reportStore.isReportRevision &&
          fourthPanelData.comment)
      "
    >
      <label class="form__label report__label" for="comment"> Комментарий </label>
      <TextareaReport
        v-model:value="fourthPanelData.comment"
        id="comment"
        name="comment"
        placeholder="Напишите сообщение"
        :rows="1"
        autoResize
        counter-visible
        :maxlength="3000"
        :max-length-text="3000"
        @focusout="focusOut"
        :disabled="
          (props.tab === 'Просмотр отправленного отчета' &&
            reportStore.isReportRevision) ||
          (isSent && !isRevision) ||
          props.centralExpert ||
          props.districtExpert
        "
      >
      </TextareaReport>
    </div> -->
  </div>

  <div v-if="isSecondTab" class="report__field-group">
    <div class="report__fieldset report__fieldset--left-block">
      <label class="form__label report__label" for="employed_after_training">
        Количество трудоустроенных по&nbsp;профобучению<sup class="valid-red">*</sup>
      </label>
      <InputReport
        v-model:value="fourthPanelDataDH.employed_after_training"
        id="employed_after_training"
        name="employed_after_training"
        style="width: 100%"
        height="40px"
        type="number"
        placeholder="Введите число"
        :maxlength="10"
        :min="0"
        :max="2147483647"
        :disabled="centralExpert || !(districtExpert || centralExpert)"
        :is-error-panel="isErrorPanel"
      />

      <!-- Добавить чекбокс?-->
    </div>

    <!-- <CommentFileComponent
      v-model:value="fourthPanelDataDH.comment"
      name="fourthPanelData.comment"
      @change="uploadFileDH"
      @click="deleteFileDH"
      :file="fileDH.name"
      :fileType="fileDH.type"
      :fileSize="fileDH.size"
      :disabled="centralExpert || !(districtExpert || centralExpert)"
      :is-error-file="isErrorFile"
      :is-error-panel="isErrorPanel"
      :is-sent="centralExpert || !(districtExpert || centralExpert)"
    ></CommentFileComponent> -->
  </div>

  <div v-if="isThirdTab" class="report__field-group report__field-group--column">
    <ReportTable
      label="Количество трудоустроенных по&nbsp;профобучению"
      name="fourthPanelData.employed_after_training"
      :dataRH="fourthPanelData.employed_after_training"
      :dataDH="fourthPanelDataDH.employed_after_training"
      v-model:value="fourthPanelDataCH.employed_after_training"
      :maxlength="10"
      :min="0"
      :max="2147483647"
      :disabled="
        !(districtExpert || centralExpert) ||
        reportStore.reportForCheckCH.fourth.verified_by_chq !== null
      "
      :is-error-panel="isErrorPanel"
    ></ReportTable>

    <!-- Добавить чекбокс?-->

    <!-- <CommentFileComponent
      v-model:value="fourthPanelDataCH.comment"
      name="fourthPanelDataCH.comment"
      @change="uploadFileCH"
      @click="deleteFileCH"
      :file="fileCH.name"
      :fileType="fileCH.type"
      :fileSize="fileCH.size"
      :is-error-file="isErrorFile"
      :is-disabled="
        !(districtExpert || centralExpert) ||
        reportStore.reportForCheckCH.fourth.verified_by_chq !== null
      "
      :is-sent="
        !(districtExpert || centralExpert) ||
        reportStore.reportForCheckCH.fourth.verified_by_chq !== null
      "
      :is-error-panel="isErrorPanel"
    ></CommentFileComponent> -->

    <div>
      <v-checkbox
        v-if="
          centralExpert
            ? !reportStore.reportForCheckCH.fourth.verified_by_chq
            : !reportStore.isAllReportsVerifiedByCH
        "
        v-model="reportStore.returnReport.fourth"
        label="Вернуть в&nbsp;РО на&nbsp;доработку"
        :disabled="
          !(districtExpert || centralExpert) ||
          reportStore.reportForCheckCH.fourth.verified_by_chq !== null
        "
        @change="onReturnReport"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, watchPostEffect, watch } from "vue";
import {
  InputReport,
  // TextareaReport,
} from "@shared/components/inputs";
import {
  // CommentFileComponent,
  ReportTable,
} from "@entities/RatingRoComponents/components";
import { reportPartTwoService } from "@services/ReportService.ts";
import { useReportPartTwoStore } from "@pages/ReportRegionalHQPartTwoPage/store.ts";

const reportStore = useReportPartTwoStore();

const props = defineProps({
  districtExpert: {
    type: Boolean,
  },
  centralExpert: {
    type: Boolean,
  },
  isSecondTab: {
    type: Boolean,
    default: false,
  },
  isThirdTab: {
    type: Boolean,
    default: false,
  },
  data: Object,
  isErrorPanel: {
    type: Boolean,
  },
  tab: {
    type: String,
  },
});

const ID_PANEL = "4";
const isFirstSent = ref(true);
const isRevision = ref(false);

const fourthPanelData = ref({
  employed_after_training: null,
  employment_report_submitted: false,
  // comment: "",
});

const fourthPanelDataDH = ref({
  employed_after_training: null,
  employment_report_submitted: false,
  // comment: "",
});

const fourthPanelDataCH = ref({
  employed_after_training: null,
  employment_report_submitted: false,
  // comment: "",
});

const isSent = ref(false);

const emit = defineEmits(["getData", "getDataDH", "getDataCH"]);

const focusOut = async () => {
  let formData = new FormData();

  formData.append(
    "employed_after_training",
    fourthPanelData.value.employed_after_training || ""
  );
  formData.append(
    "employment_report_submitted",
    fourthPanelData.value.employment_report_submitted
  );
  // formData.append("comment", fourthPanelData.value.comment || "");

  try {
    if (isFirstSent.value) {
      const { data } = await reportPartTwoService.createReport(formData, ID_PANEL, false);
      emit("getData", data, Number(ID_PANEL));
    } else {
      const { data } = await reportPartTwoService.createReportDraft(
        formData,
        ID_PANEL,
        false
      );
      emit("getData", data, Number(ID_PANEL));
    }
  } catch (e) {
    console.log("focusOut error:", e);
  }
};

const onReturnReport = (event) => {
  let formData = new FormData();
  formData.append(
    "employed_after_training",
    fourthPanelDataCH.value.employed_after_training
  );
  formData.append(
    "employment_report_submitted",
    fourthPanelData.value.employment_report_submitted
  );
  // formData.append("comment", fourthPanelDataCH.value.comment || "");

  if (event.target.checked) {
    reportStore.returnReport.fourth = true;
    // formData.append("reasons[comment]", fourthPanelDataCH.value.comment);
  } else {
    reportStore.returnReport.fourth = false;
  }

  emit("getDataCH", formData, Number(ID_PANEL));
};

watchEffect(
  () => {
    if (props.centralExpert || props.districtExpert) {
      if (reportStore.reportDataCH.fourth) {
        // fourthPanelDataCH.value.comment = reportStore.reportDataCH.fourth.comment;
        fourthPanelDataCH.value.employed_after_training =
          reportStore.reportDataCH.fourth.employed_after_training;
        // fourthPanelDataCH.value.employment_report_submitted =
        //   reportStore.reportDataCH.fourth.employment_report_submitted;
      }
      if (reportStore.reportDataDH.fourth) {
        // fourthPanelDataDH.value.comment = reportStore.reportDataDH.fourth.comment;
        fourthPanelDataDH.value.employed_after_training =
          reportStore.reportDataDH.fourth.employed_after_training;
        // fourthPanelDataDH.value.employment_report_submitted =
        //   reportStore.reportDataDH.fourth.employment_report_submitted;
      }
    } else {
      if (props.data) {
        isFirstSent.value = false;
        isRevision.value = reportStore.isReportReject.fourth;
        fourthPanelData.value.employed_after_training =
          props.data.employed_after_training;
        fourthPanelData.value.employment_report_submitted =
          props.data.employment_report_submitted;
        // fourthPanelData.value.comment = props.data.comment;
        isSent.value = props.data.is_sent;
        isFirstSent.value =
          reportStore.isReportReject.fourth && !props.data.central_version;
      }
    }
    if (reportStore.reportReject.fourth && reportStore.isReportReject.fourth) {
      reportStore.returnReport.fourth = true;
    }
  },
  {
    flush: "post",
  }
);

watchPostEffect(() => {
  if (props.data) {
    isFirstSent.value = false;
    fourthPanelData.value.employed_after_training = props.data.employed_after_training;
    fourthPanelData.value.employment_report_submitted =
      props.data.employment_report_submitted;
    // fourthPanelData.value.comment = props.data.comment;
    isSent.value = props.data.is_sent;

    isFirstSent.value = reportStore.isReportReject.fourth && !props.data.central_version;
  }
  if (!(props.centralExpert || props.districtExpert)) {
    fourthPanelDataDH.value = reportStore.reportDataDH.fourth;
    fourthPanelDataCH.value = reportStore.reportDataCH.fourth;

    if (reportStore.isReportReject.fourth) {
      reportStore.returnReport.fourth = true;
    } else {
      reportStore.returnReport.fourth = false;
    }
  }
});

watch(fourthPanelDataDH.value, () => {
  if (props.districtExpert) {
    reportStore.reportDataDH.fourth = fourthPanelDataDH.value;

    let formData = new FormData();
    formData.append(
      "employed_after_training",
      fourthPanelDataDH.value.employed_after_training
    );
    // formData.append(
    //   "employment_report_submitted",
    //   fourthPanelDataDH.value.employment_report_submitted
    // );
    // formData.append("comment", fourthPanelDataDH.value.comment || "");
    emit("getDataDH", formData, Number(ID_PANEL));
  }
});

// watch(fileDH.value, () => {
//   if (props.districtExpert) {
//     reportStore.reportDataDH.fourth = fourthPanelDataDH.value;

//     let formData = new FormData();
//     formData.append(
//       "employed_after_training",
//       fourthPanelDataDH.value.employed_after_training
//     );
//     formData.append("comment", fourthPanelDataDH.value.comment || "");
//     formData.append("scan_file", reportStore.reportDataDHFile.fourth || "");
//     emit("getDataDH", formData, Number(ID_PANEL));
//   }
// });

watch(fourthPanelDataCH.value, () => {
  if (props.centralExpert) {
    reportStore.reportDataCH.fourth = fourthPanelDataCH.value;

    let formData = new FormData();
    formData.append(
      "employed_after_training",
      fourthPanelDataCH.value.employed_after_training
    );
    // formData.append(
    //   "employment_report_submitted",
    //   fourthPanelDataCH.value.employment_report_submitted
    // );
    // formData.append("comment", fourthPanelDataCH.value.comment || "");

    // if (reportStore.returnReport.fourth)
    //   formData.append("reasons[comment]", fourthPanelDataCH.value.comment);
    emit("getDataCH", formData, Number(ID_PANEL));
  }
});

// watch(fileCH.value, () => {
//   if (props.centralExpert) {
//     reportStore.reportDataCH.fourth = fourthPanelDataCH.value;

//     let formData = new FormData();
//     formData.append(
//       "employed_after_training",
//       fourthPanelDataCH.value.employed_after_training
//     );
//     formData.append("comment", fourthPanelDataCH.value.comment || "");
//     formData.append(
//       "scan_file",
//       reportStore.reportDataCHFile.fourth ||
//         reportStore.reportForCheckCH.fourth.central_version?.scan_file ||
//         ""
//     );
//     if (reportStore.returnReport.fourth)
//       formData.append("reasons[comment]", fourthPanelDataCH.value.comment);
//     emit("getDataCH", formData, Number(ID_PANEL));
//   }
// });
</script>

<style lang="scss" scoped>
.valid-red {
  color: #db0000;
}
.v-tab-item--selected {
  background: #f3f4f5;
}
.v-tab.v-tab.v-btn {
  min-width: 280px;
  border-radius: 10px 10px 0 0;
  letter-spacing: initial;
  border: none;
}
</style>
