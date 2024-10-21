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
                :disabled="isSent || (props.centralExpert || props.districtExpert)"
                :is-error-panel="isErrorPanel"
            />
        </div>
    
        <div 
            class="report__fieldset report__fieldset--comment"
            v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
                  (isSent && thirteenthPanelData.comment) ||
                  ((props.centralExpert || props.districtExpert) && thirteenthPanelData.comment)"
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
                :disabled="centralExpert"
                :is-error-panel="isErrorPanel"
            />
        </div>

        <CommentFileComponent
            v-model:value="thirteenthPanelDataDH.comment"
            name="thirteenthPanelData.comment"
            @change="uploadFileDH"
            @click="deleteFileDH"
            :file="reportStore.reportDataDHFile.thirteenth ? reportStore.reportDataDHFile.thirteenth.name : null"
            :fileType="reportStore.reportDataDHFile.thirteenth ? reportStore.reportDataDHFile.thirteenth.type.split('/').at(-1) : null"
            :fileSize="reportStore.reportDataDHFile.thirteenth ? reportStore.reportDataDHFile.thirteenth.size / Math.pow(1024, 2) : null"
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
            label="Количество членов РО&nbsp;РСО, принявших участие во&nbsp;Всероссийском дне ударного труда"
            name="thirteenthPanelData.number_of_members"
            :dataRH="thirteenthPanelData.number_of_members"
            :dataDH="thirteenthPanelDataDH.number_of_members"
            v-model:value="thirteenthPanelDataCH.number_of_members"
        ></ReportTable>

        <CommentFileComponent></CommentFileComponent>

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
    // dataDH: Object,
    // dataCH: Object,
    isErrorPanel: {
        type: Boolean,
    },
});

const ID_PANEL = '13';
const isFirstSent = ref(true);
let isErrorFile = ref(false);
// let fileName = ref(null);
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

const thirteenthPanelDataCH = ref({
    number_of_members: null,
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

    thirteenthPanelData.value.number_of_members ? formData.append('number_of_members', thirteenthPanelData.value.number_of_members) : formData.append('number_of_members', "");
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
    // }
    
    // if (props.districtExpert) {
    //     emit('getDataDH', thirteenthPanelDataDH.value, Number(ID_PANEL));
    // }
};

const uploadFileDH = async (event) => {
    thirteenthPanelDataDH.value.scan_file = event.target.files[0];

    // fileValidate(event.target.files[0], 7, isErrorFile);
        
    // if (!isErrorFile.value) {
        reportStore.reportDataDHFile.thirteenth = event.target.files[0];
    // }
};

const deleteFileDH = async () => {
    thirteenthPanelDataDH.value.scan_file = '';

    // if (!isErrorFile.value) {
        reportStore.reportDataDHFile.thirteenth = null;
    // }
};

watchEffect(async () => {
    if (props.districtExpert) {
        if (reportStore.reportDataDH.thirteenth) {
            thirteenthPanelDataDH.value.comment = reportStore.reportDataDH.thirteenth.comment;
            thirteenthPanelDataDH.value.number_of_members = reportStore.reportDataDH.thirteenth.number_of_members;
        }
    } else {
        if (props.data) {
            // console.log(props.data);
            isFirstSent.value = false;
            thirteenthPanelData.value.number_of_members = props.data.number_of_members;
            thirteenthPanelData.value.comment = props.data.comment;
            isSent.value = props.data.is_sent;
        }
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
  }
});

watch(thirteenthPanelDataDH.value, () => {
  reportStore.reportDataDH.thirteenth = thirteenthPanelDataDH.value;

  let formData = new FormData();

  thirteenthPanelDataDH.value.number_of_members 
  ? formData.append('number_of_members', thirteenthPanelDataDH.value.number_of_members) 
  : formData.append('number_of_members', '');

  formData.append('comment', thirteenthPanelDataDH.value.comment || '');

  reportStore.reportDataDHFile.thirteenth 
  ? formData.append('scan_file', reportStore.reportDataDHFile.thirteenth) 
  : formData.append('scan_file', '');

  emit('getDataDH', formData, Number(ID_PANEL));
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