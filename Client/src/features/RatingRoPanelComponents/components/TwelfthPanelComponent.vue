<template>
    <div class="report__field-group" v-if="!isSecondTab && !isThirdTab">
        <div class="report__fieldset report__fieldset--left-block">
            <label 
                class="form__label report__label"
                for="number-of-members">
                Объем средств, собранных бойцами РО&nbsp;РСО&nbsp;<sup class="valid-red">*</sup>
            </label>
            <InputReport
                v-model:value="twelfthPanelData.amount_of_money"
                id="amount-of-money"
                name="amount-of-money"
                style="width: 100%;"
                height="40px"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="9999999999"
                :step="0.01"
                @focusout="focusOut"
                :disabled="isSent || (props.centralExpert || props.districtExpert)"
                :is-error-panel="isErrorPanel"
            />
        </div>
  
        <div 
            class="report__fieldset report__fieldset--right-block"
            v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
                  (isSent && twelfthPanelData.scan_file) ||
                  ((props.centralExpert || props.districtExpert) && twelfthPanelData.scan_file)"
        >
            <p class="form__label report__label">
                Скан подтверждающего <br> документа
            </p>
            <InputReport
                v-if="!twelfthPanelData.scan_file"
                isFile
                type="file"
                accept=".jpg, .jpeg, .png, .pdf"
                id="scan_file"
                name="scan_file"
                width="100%"
                height="auto"
                @change="uploadFile"
                :disabled="isSent || (props.centralExpert || props.districtExpert)"
            />
            <FileBoxComponent
                v-else
                :file="twelfthPanelData.scan_file"
                :fileType="twelfthPanelData.file_type"
                :fileSize="twelfthPanelData.file_size"
                @click="deleteFile"
                :is-sent="isSent || (props.centralExpert || props.districtExpert)"
                :is-error-file="isErrorFile"
            ></FileBoxComponent>
        </div>
  
        <div 
            class="report__fieldset report__fieldset--comment"
            v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
                  (isSent && twelfthPanelData.comment) ||
                  ((props.centralExpert || props.districtExpert) && twelfthPanelData.comment)"
            >
            <label class="form__label report__label" for="comment">
                Комментарий
            </label>
            <TextareaReport
                v-model:value="twelfthPanelData.comment"
                id="comment"
                name="comment"
                placeholder="Напишите сообщение"
                :rows="1" 
                autoResize
                counter-visible
                :maxlength="3000"
                :max-length-text="3000"
                @focusout="focusOut"
                :disabled="isSent || (props.centralExpert || props.districtExpert)"
            >
            </TextareaReport>
        </div>
    </div>

    <div v-if="isSecondTab" class="report__field-group">
        <div class="report__fieldset report__fieldset--left-block">
            <label 
                class="form__label report__label"
                for="number-of-members">
                Объем средств, собранных бойцами РО&nbsp;РСО&nbsp;<sup class="valid-red">*</sup>
            </label>
            <InputReport
                v-model:value="twelfthPanelDataDH.amount_of_money"
                id="amount-of-money"
                name="amount-of-money"
                style="width: 100%;"
                height="40px"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="9999999999"
                :step="0.01"
                :disabled="centralExpert"
                :is-error-panel="isErrorPanel"
            />
        </div>

        <CommentFileComponent
            v-model:value="twelfthPanelDataDH.comment"
            name="twelfthPanelData.comment"
            @change="uploadFileDH"
            @click="deleteFileDH"
            :file="reportStore.reportDataDHFile.twelfth ? reportStore.reportDataDHFile.twelfth.name : null"
            :fileType="reportStore.reportDataDHFile.twelfth ? reportStore.reportDataDHFile.twelfth.type.split('/').at(-1) : null"
            :fileSize="reportStore.reportDataDHFile.twelfth ? reportStore.reportDataDHFile.twelfth.size / Math.pow(1024, 2) : null"
            :disabled="centralExpert"
            :is-error-file="isErrorFile"
            :is-error-panel="isErrorPanel"
        ></CommentFileComponent>
    </div>

    <div
        v-if="isThirdTab && centralExpert"
        class="report__field-group report__field-group--column"
    >
        <ReportTable
            label="Объем средств, собранных бойцами РО&nbsp;РСО"
            name="twelfthPanelData.amount_of_money"
            :dataRH="twelfthPanelData.amount_of_money"
            :dataDH="twelfthPanelDataDH.amount_of_money"
            v-model:value="twelfthPanelDataCH.amount_of_money"
            :maxlength="10"
            :min="0"
            :max="9999999999"
            :step="0.01"
            
            :is-error-panel="isErrorPanel"
        ></ReportTable>

        <CommentFileComponent
            v-model:value="twelfthPanelDataCH.comment"
            name="twelfthPanelDataCH.comment"
            @change="uploadFileCH"
            @click="deleteFileCH"
            :file="reportStore.reportDataCHFile.twelfth ? reportStore.reportDataCHFile.twelfth.name : null"
            :fileType="reportStore.reportDataCHFile.twelfth ? reportStore.reportDataCHFile.twelfth.type.split('/').at(-1) : null"
            :fileSize="reportStore.reportDataCHFile.twelfth ? reportStore.reportDataCHFile.twelfth.size / Math.pow(1024, 2) : null"
            
            :is-error-panel="isErrorPanel"
        ></CommentFileComponent>

        <div>
            <v-checkbox label="Вернуть в&nbsp;РО на&nbsp;доработку" />
        </div>
    </div> 
</template>
  
<script setup>
import { ref, watchEffect, watchPostEffect, watch } from "vue";
import { InputReport, TextareaReport } from '@shared/components/inputs';
import {
    CommentFileComponent,
    FileBoxComponent,
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
    // dataDH: Object,
    // dataCH: Object,
    isErrorPanel: {
        type: Boolean,
    },
});

const ID_PANEL = '12';
const isFirstSent = ref(true);
let isErrorFile = ref(false);
// let fileName = ref(null);
const twelfthPanelData = ref({
    amount_of_money: null,
    scan_file: '',
    file_size: null,
    file_type: '',
    comment: '',
});

const twelfthPanelDataDH = ref({
    amount_of_money: null,
    scan_file: '',
    file_size: null,
    file_type: '',
    comment: '',
});

const twelfthPanelDataCH = ref({
    amount_of_money: null,
    scan_file: '',
    file_size: null,
    file_type: '',
    comment: '',
});

const isSent = ref(false);
//const isVerifiedDH = ref(false);

const emit = defineEmits([
    'getData', 
    'getDataDH', 
    'getDataCH', 
    // 'getFileDH'
]);

const focusOut = async () => {
    // if (!(props.districtExpert || props.centralExpert)) {
    let formData = new FormData();

    twelfthPanelData.value.amount_of_money ? formData.append('amount_of_money', twelfthPanelData.value.amount_of_money) : formData.append('amount_of_money', "");
    formData.append('comment', twelfthPanelData.value.comment || '');

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
    // }

    // if (props.districtExpert) {
    //     emit('getDataDH', twelfthPanelDataDH.value, Number(ID_PANEL));
    // }    
};

const uploadFile = async (event) => {    
    fileValidate(event.target.files[0], 7, isErrorFile);

    twelfthPanelData.value.scan_file = event.target.files[0].name;
    twelfthPanelData.value.file_size = (event.target.files[0].size / Math.pow(1024, 2));
    twelfthPanelData.value.file_type = event.target.files[0].type.split('/').at(-1);

    if (!isErrorFile.value) {
        let formData = new FormData();
        formData.append('scan_file', event.target.files[0]);

        try {
            if (isFirstSent.value) {
                let { data } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
                twelfthPanelData.value.scan_file = data.scan_file.split('/').at(-1);
                emit('getData', data, Number(ID_PANEL));
            } else {
                let { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
                twelfthPanelData.value.scan_file = data.scan_file.split('/').at(-1);
                emit('getData', data, Number(ID_PANEL));
            }
        } catch (e) {
            console.log('uploadFile error:', e);
        }
    }
};

const uploadFileDH = async (event) => {
    twelfthPanelDataDH.value.scan_file = event.target.files[0];

    // fileValidate(event.target.files[0], 7, isErrorFile);

    // if (!isErrorFile.value) {
        reportStore.reportDataDHFile.twelfth = event.target.files[0];
    // }
}

const uploadFileCH = async (event) => {
  twelfthPanelDataCH.value.scan_file = event.target.files[0];
  reportStore.reportDataCHFile.twelfth = event.target.files[0];
}

const deleteFile = async () => {
    twelfthPanelData.value.scan_file = "";

    if(!isErrorFile.value) {
        let formData = new FormData();
        formData.append('scan_file', '');
        try {
            if (isFirstSent.value) {
                let { data :  scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
                emit('getData', scan_file, Number(ID_PANEL));
            } else {
                let { data :  scan_file } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
                emit('getData', scan_file, Number(ID_PANEL));
            }
        } catch (e) {
            console.log('deleteFile error:', e);
        } 
    }
};

const deleteFileDH = async () => {
    twelfthPanelDataDH.value.scan_file = "";

    // if (!isErrorFile.value) {
        reportStore.reportDataDHFile.twelfth = null;
    // }
}

const deleteFileCH = async () => {
  twelfthPanelDataCH.value.scan_file = '';
  reportStore.reportDataCHFile.twelfth = null;
}

watchEffect(async () => {
    if (props.centralExpert || props.districtExpert) {
        if (reportStore.reportDataCH.twelfth) {
            twelfthPanelDataCH.value.comment = reportStore.reportDataCH.twelfth.comment;
            twelfthPanelDataCH.value.amount_of_money = reportStore.reportDataCH.twelfth.amount_of_money;
        }
        if (reportStore.reportDataDH.twelfth) {
            twelfthPanelDataDH.value.comment = reportStore.reportDataDH.twelfth.comment;
            twelfthPanelDataDH.value.amount_of_money = reportStore.reportDataDH.twelfth.amount_of_money;
        }

    } else {
        if (props.data) {
            // console.log(props.data);
            isFirstSent.value = false;
            twelfthPanelData.value.amount_of_money = props.data.amount_of_money;
            twelfthPanelData.value.comment = props.data.comment;
            twelfthPanelData.value.scan_file = props.data.scan_file;
            twelfthPanelData.value.file_size = props.data.file_size;
            twelfthPanelData.value.file_type = props.data.file_type;
            isSent.value = props.data.is_sent;
        }
    }
}, {
    flush: 'post'
});

watchPostEffect(() => {
  if (props.data) {
    isFirstSent.value = false;
    twelfthPanelData.value.amount_of_money = props.data.amount_of_money;
    twelfthPanelData.value.comment = props.data.comment;
    twelfthPanelData.value.scan_file = props.data.scan_file;
    twelfthPanelData.value.file_size = props.data.file_size;
    twelfthPanelData.value.file_type = props.data.file_type;
    isSent.value = props.data.is_sent;
  }
});

watch(twelfthPanelDataDH.value, () => {
  reportStore.reportDataDH.twelfth = twelfthPanelDataDH.value;

  let formData = new FormData();

  twelfthPanelDataDH.value.amount_of_money 
  ? formData.append('amount_of_money', twelfthPanelDataDH.value.amount_of_money) 
  : formData.append('amount_of_money', '');

  formData.append('comment', twelfthPanelDataDH.value.comment || '');

  reportStore.reportDataDHFile.twelfth 
  ? formData.append('scan_file', reportStore.reportDataDHFile.twelfth) 
  : formData.append('scan_file', '');

  emit('getDataDH', formData, Number(ID_PANEL));
});

watch(twelfthPanelDataCH.value, () => {
  reportStore.reportDataCH.twelfth = twelfthPanelDataCH.value;

  let formData = new FormData();

  twelfthPanelDataCH.value.amount_of_money 
  ? formData.append('amount_of_money', twelfthPanelDataCH.value.amount_of_money) 
  : formData.append('amount_of_money', '');

  formData.append('comment', twelfthPanelDataCH.value.comment || '');

  reportStore.reportDataCHFile.twelfth 
  ? formData.append('scan_file', reportStore.reportDataCHFile.twelfth) 
  : formData.append('scan_file', '');

  emit('getDataCH', formData, Number(ID_PANEL));
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