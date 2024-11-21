<template>
    <div class="report__field-group" v-if="!isSecondTab && !isThirdTab">
        <div class="report__fieldset report__fieldset--left-block">
            <label 
                class="form__label report__label"
                for="number-of-members">
                Количество членов РО&nbsp;РСО, принявших участие во&nbsp;Всероссийском дне ударного труда&nbsp;<sup class="valid-red">*</sup>
            </label>
            <InputReport
                v-model:value="thirteenthPanelData.number_of_members"
                id="number-of-members"
                name="number-of-members"
                style="width: 100%;"
                height="40px"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="2147483647"
                @focusout="focusOut"
                :disabled="(props.tab === 'Просмотр отправленного отчета' && reportStore.isReportRevision) || (isSent && !isRevision) || (props.centralExpert || props.districtExpert)"
                :is-error-panel="isErrorPanel"
            />
        </div>
    
        <div 
            class="report__fieldset report__fieldset--comment"
            v-if="(!isSent && !(props.centralExpert || props.districtExpert) && !reportStore.isReportRevision) ||
                  (isSent && thirteenthPanelData.comment) ||
                  ((props.centralExpert || props.districtExpert) && thirteenthPanelData.comment) ||
                  (props.tab !== 'Просмотр отправленного отчета') && reportStore.isReportRevision ||
                  (props.tab === 'Просмотр отправленного отчета' && reportStore.isReportRevision && thirteenthPanelData.comment)"
        >
            <label class="form__label report__label" for="comment">
                Комментарий
            </label>
            <TextareaReport
                v-model:value="thirteenthPanelData.comment"
                id="comment"
                name="comment"
                placeholder="Напишите сообщение"
                :rows="1" 
                autoResize
                counter-visible
                :maxlength="3000"
                :max-length-text="3000"
                @focusout="focusOut"
                :disabled="(props.tab === 'Просмотр отправленного отчета' && reportStore.isReportRevision) || (isSent && !isRevision) || (props.centralExpert || props.districtExpert)"
            >
            </TextareaReport>
        </div>
    </div>

    <div v-if="isSecondTab" class="report__field-group">
        <div class="report__fieldset report__fieldset--left-block">
            <label 
                class="form__label report__label"
                for="number-of-members">
                Количество членов РО&nbsp;РСО, принявших участие во&nbsp;Всероссийском дне ударного труда&nbsp;<sup class="valid-red">*</sup>
            </label>
            <InputReport
                v-model:value="thirteenthPanelDataDH.number_of_members"
                id="number-of-members"
                name="number-of-members"
                style="width: 100%;"
                height="40px"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="2147483647"
                :disabled="centralExpert || !(districtExpert || centralExpert)"
                :is-error-panel="isErrorPanel"
            />
        </div>

        <CommentFileComponent
            v-model:value="thirteenthPanelDataDH.comment"
            name="thirteenthPanelData.comment"
            @change="uploadFileDH"
            @click="deleteFileDH"
            :file="fileDH.name"
            :fileType="fileDH.type"
            :fileSize="fileDH.size"
            :disabled="centralExpert || !(districtExpert || centralExpert)"
            :is-error-file="isErrorFile"
            :is-error-panel="isErrorPanel"
            :is-sent="centralExpert || !(districtExpert || centralExpert)"
        ></CommentFileComponent>
    </div>

    <div
        v-if="isThirdTab"
        class="report__field-group report__field-group--column"
    >
        <ReportTable
            label="Количество членов РО&nbsp;РСО, принявших участие во&nbsp;Всероссийском дне ударного труда"
            name="thirteenthPanelData.number_of_members"
            :dataRH="thirteenthPanelData.number_of_members"
            :dataDH="thirteenthPanelDataDH.number_of_members"
            v-model:value="thirteenthPanelDataCH.number_of_members"
            :maxlength="10"
            :min="0"
            :max="2147483647"
            :disabled="!(districtExpert || centralExpert) || reportStore.reportForCheckCH.thirteenth.verified_by_chq !== null"
            :is-error-panel="isErrorPanel"
        ></ReportTable>

        <CommentFileComponent
            v-model:value="thirteenthPanelDataCH.comment"
            name="thirteenthPanelDataCH.comment"
            @change="uploadFileCH"
            @click="deleteFileCH"
            :file="fileCH.name"
            :fileType="fileCH.type"
            :fileSize="fileCH.size"
            :is-error-file="isErrorFile"
            :is-disabled="!(districtExpert || centralExpert) || reportStore.reportForCheckCH.thirteenth.verified_by_chq !== null"
            :is-sent="!(districtExpert || centralExpert) || reportStore.reportForCheckCH.thirteenth.verified_by_chq !== null"
            :is-error-panel="isErrorPanel"
        ></CommentFileComponent>

        <div>
            <v-checkbox 
                v-if="!reportStore.isAllReportsVerifiedByCH"
                v-model="reportStore.returnReport.thirteenth"
                label="Вернуть в&nbsp;РО на&nbsp;доработку"
                :disabled="!(districtExpert || centralExpert) || reportStore.reportForCheckCH.thirteenth.verified_by_chq !== null"
                @change="onReturnReport" />
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, watchPostEffect, watch } from "vue";
import { InputReport, TextareaReport } from '@shared/components/inputs';
import {
    CommentFileComponent,
    // FileBoxComponent,
    ReportTable,
} from "@entities/RatingRoComponents/components";
import { reportPartTwoService } from "@services/ReportService.ts";
import { fileValidate } from "@pages/ReportRegionalHQPartTwoPage/ReportHelpers.ts";
import {useReportPartTwoStore} from "@pages/ReportRegionalHQPartTwoPage/store.ts";

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
    }
});

const ID_PANEL = '13';
const isFirstSent = ref(true);
const isRevision = ref(false);
let isErrorFile = ref(false);

const thirteenthPanelData = ref({
    number_of_members: null,
    scan_file: '',
    file_size: null,
    file_type: '',
    comment: '',
});

const thirteenthPanelDataDH = ref({
    number_of_members: null,
    scan_file: '',
    file_size: null,
    file_type: '',
    comment: '',
});

const fileDH = ref({
  name: '',
  type: '',
  size: null,
})

const thirteenthPanelDataCH = ref({
    number_of_members: null,
    scan_file: '',
    file_size: null,
    file_type: '',
    comment: '',
});

const fileCH = ref({
  name: '',
  type: '',
  size: null,
})

const isSent = ref(false);

const emit = defineEmits([
    'getData', 
    'getDataDH', 
    'getDataCH', 
]);

const focusOut = async () => {
    let formData = new FormData();

    // thirteenthPanelData.value.number_of_members ? formData.append('number_of_members', thirteenthPanelData.value.number_of_members) : formData.append('number_of_members', "");
    formData.append('number_of_members', thirteenthPanelData.value.number_of_members || '');
    formData.append('comment', thirteenthPanelData.value.comment || '');

    try {
        if (isFirstSent.value) {
            const { data } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
            emit('getData', data, Number(ID_PANEL));
        } else {
            const { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
            emit('getData', data, Number(ID_PANEL));
        }
    } catch (e) {
        console.log('focusOut error:', e)
    }
};

const uploadFileDH = async (event) => {
    if (event.target.files) {
        fileValidate(event.target.files[0], 7, isErrorFile);
        
        if (isErrorFile.value) {
            reportStore.reportDataDHFile.thirteenth = null;
            fileDH.value.name = event.target.files[0].name;
            fileDH.value.type = event.target.files[0].type.split('/').at(-1);
            fileDH.value.size = event.target.files[0].size / Math.pow(1024, 2);
        } else {
            reportStore.reportDataDHFile.thirteenth = event.target.files[0];
        }
    }
};

const uploadFileCH = async (event) => {
    if (event.target.files) {
        fileValidate(event.target.files[0], 7, isErrorFile);

        if (isErrorFile.value) {
            reportStore.reportDataCHFile.thirteenth = null;
            fileCH.value.name = event.target.files[0].name;
            fileCH.value.type = event.target.files[0].type.split('/').at(-1);
            fileCH.value.size = event.target.files[0].size / Math.pow(1024, 2);
        } else {
            reportStore.reportDataCHFile.thirteenth = event.target.files[0];
        }
    }
}

const deleteFileDH = async () => {
    fileDH.value.name = null;
    reportStore.reportDataDHFile.thirteenth = null;
};

const deleteFileCH = async () => {
    fileCH.value.name = null;
    reportStore.reportDataCHFile.thirteenth = null;
    if (reportStore.reportForCheckCH.thirteenth.central_version) {
        reportStore.reportForCheckCH.thirteenth.central_version.scan_file = null;
    }
}

const onReturnReport = (event) => {
  let formData = new FormData();
  formData.append('number_of_members', thirteenthPanelDataCH.value.number_of_members);
  formData.append('comment', thirteenthPanelDataCH.value.comment || '');
  formData.append('scan_file', reportStore.reportDataCHFile.thirteenth || reportStore.reportForCheckCH.thirteenth.central_version?.scan_file || '');
  
  if (event.target.checked) {
    reportStore.returnReport.thirteenth = true;
    formData.append('reasons[comment]', thirteenthPanelDataCH.value.comment);
  } else {
    reportStore.returnReport.thirteenth = false;
  }

  emit('getDataCH', formData, Number(ID_PANEL));
}

watchEffect(async () => {
    if (props.centralExpert || props.districtExpert) {
        if (reportStore.reportDataCH.thirteenth) {
            thirteenthPanelDataCH.value.comment = reportStore.reportDataCH.thirteenth.comment;
            thirteenthPanelDataCH.value.number_of_members = reportStore.reportDataCH.thirteenth.number_of_members;
        }
        if (reportStore.reportDataDH.thirteenth) {
            thirteenthPanelDataDH.value.comment = reportStore.reportDataDH.thirteenth.comment;
            thirteenthPanelDataDH.value.number_of_members = reportStore.reportDataDH.thirteenth.number_of_members;
        }
    } else {
        if (props.data) {
            // console.log(props.data);
            isFirstSent.value = false;
            isRevision.value = reportStore.isReportReject.thirteenth;
            thirteenthPanelData.value.number_of_members = props.data.number_of_members;
            thirteenthPanelData.value.comment = props.data.comment;
            isSent.value = props.data.is_sent;

            isFirstSent.value = reportStore.isReportReject.thirteenth && !props.data.central_version;
        }
    }
    if (props.districtExpert) {
        if (reportStore.reportDataDHFile.thirteenth) {
            fileDH.value.name = reportStore.reportDataDHFile.thirteenth.name;
            fileDH.value.type = reportStore.reportDataDHFile.thirteenth.type.split('/').at(-1);
            fileDH.value.size = reportStore.reportDataDHFile.thirteenth.size / Math.pow(1024, 2);
        }
    } else if (props.centralExpert) {
        if (reportStore.reportDataDH.thirteenth) {
            fileDH.value.name = reportStore.reportDataDH.thirteenth.scan_file;
            fileDH.value.type = reportStore.reportDataDH.thirteenth.file_type;
            fileDH.value.size = reportStore.reportDataDH.thirteenth.file_size;
        }
        if (reportStore.reportForCheckCH.thirteenth.verified_by_chq === true) {
            fileCH.value.name = reportStore.reportForCheckCH.thirteenth.scan_file;
            fileCH.value.type = reportStore.reportForCheckCH.thirteenth.file_type;
            fileCH.value.size = reportStore.reportForCheckCH.thirteenth.file_size;
        } else
        if (reportStore.reportForCheckCH.thirteenth.rejecting_reasons && !reportStore.reportDataCHFile.thirteenth) {
            fileCH.value.name = reportStore.reportForCheckCH.thirteenth.central_version.scan_file || '';
            fileCH.value.type = reportStore.reportForCheckCH.thirteenth.central_version.file_type || '';
            fileCH.value.size = reportStore.reportForCheckCH.thirteenth.central_version.file_size || '';
        } else
        if (reportStore.reportDataCHFile.thirteenth) {
            fileCH.value.name = reportStore.reportDataCHFile.thirteenth.name;
            fileCH.value.type = reportStore.reportDataCHFile.thirteenth.type.split('/').at(-1);
            fileCH.value.size = reportStore.reportDataCHFile.thirteenth.size / Math.pow(1024, 2);
        } 
    }
    if (reportStore.reportReject.thirteenth && reportStore.isReportReject.thirteenth) {
        reportStore.returnReport.thirteenth = true;
    }
}, {
    flush: 'post'
});

watchPostEffect(() => {
  if (props.data) {
    isFirstSent.value = false;
    thirteenthPanelData.value.number_of_members = props.data.number_of_members;
    thirteenthPanelData.value.comment = props.data.comment;
    isSent.value = props.data.is_sent;

    isFirstSent.value = reportStore.isReportReject.thirteenth && !props.data.central_version;
  }
  if (!(props.centralExpert || props.districtExpert)) {
    thirteenthPanelDataDH.value = reportStore.reportDataDH.thirteenth;
    fileDH.value.name = reportStore.reportDataDH.thirteenth.scan_file;
    fileDH.value.type = reportStore.reportDataDH.thirteenth.file_type;
    fileDH.value.size = reportStore.reportDataDH.thirteenth.file_size;

    thirteenthPanelDataCH.value = reportStore.reportDataCH.thirteenth;
    fileCH.value.name = reportStore.reportDataCH.thirteenth.scan_file;
    fileCH.value.type = reportStore.reportDataCH.thirteenth.file_type;
    fileCH.value.size = reportStore.reportDataCH.thirteenth.file_size;

    if (reportStore.isReportReject.thirteenth) {
      reportStore.returnReport.thirteenth = true;
    } else {
      reportStore.returnReport.thirteenth = false;
    }
  }
});

watch(thirteenthPanelDataDH.value, () => {
    if (props.districtExpert) {
        reportStore.reportDataDH.thirteenth = thirteenthPanelDataDH.value;

        let formData = new FormData();
        formData.append('number_of_members', thirteenthPanelDataDH.value.number_of_members);
        formData.append('comment', thirteenthPanelDataDH.value.comment || '');
        formData.append('scan_file', reportStore.reportDataDHFile.thirteenth || '');
        emit('getDataDH', formData, Number(ID_PANEL));
    }
});

watch(fileDH.value, ()=> {
    if (props.districtExpert) {
        reportStore.reportDataDH.thirteenth = thirteenthPanelDataDH.value;

        let formData = new FormData();
        formData.append('number_of_members', thirteenthPanelDataDH.value.number_of_members);
        formData.append('comment', thirteenthPanelDataDH.value.comment || '');
        formData.append('scan_file', reportStore.reportDataDHFile.thirteenth || '');
        emit('getDataDH', formData, Number(ID_PANEL));
    }
});

watch(thirteenthPanelDataCH.value, () => {
    if (props.centralExpert) {
        reportStore.reportDataCH.thirteenth = thirteenthPanelDataCH.value;

        let formData = new FormData();
        formData.append('number_of_members', thirteenthPanelDataCH.value.number_of_members);
        formData.append('comment', thirteenthPanelDataCH.value.comment || '');
        formData.append('scan_file', reportStore.reportDataCHFile.thirteenth || reportStore.reportForCheckCH.thirteenth.central_version?.scan_file || '');
        if (reportStore.returnReport.thirteenth) formData.append('reasons[comment]', thirteenthPanelDataCH.value.comment);
        emit('getDataCH', formData, Number(ID_PANEL));
    }
});

watch(fileCH.value, ()=> {
    if (props.centralExpert) {
        reportStore.reportDataCH.thirteenth = thirteenthPanelDataCH.value;

        let formData = new FormData();
        formData.append('number_of_members', thirteenthPanelDataCH.value.number_of_members);
        formData.append('comment', thirteenthPanelDataCH.value.comment || '');
        formData.append('scan_file', reportStore.reportDataCHFile.thirteenth || reportStore.reportForCheckCH.thirteenth.central_version?.scan_file || '');
        if (reportStore.returnReport.thirteenth) formData.append('reasons[comment]', thirteenthPanelDataCH.value.comment);
        emit('getDataCH', formData, Number(ID_PANEL));
    }
});
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