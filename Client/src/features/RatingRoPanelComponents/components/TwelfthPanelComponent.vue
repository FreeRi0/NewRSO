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
                :disabled="isSent"
                :is-error-panel="isErrorPanel"
            />
        </div>
  
        <div 
            class="report__fieldset report__fieldset--right-block"
            v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
                  (isSent && twelfthPanelData.scan_file)"
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
                :disabled="isSent"
            />
            <FileBoxComponent
                v-else
                :file="twelfthPanelData.scan_file"
                :fileType="twelfthPanelData.file_type"
                :fileSize="twelfthPanelData.file_size"
                @click="deleteFile"
                :is-sent="isSent"
                :is-error-file="isErrorFile"
            ></FileBoxComponent>
        </div>
  
        <div 
            class="report__fieldset report__fieldset--comment"
            v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
                  (isSent && twelfthPanelData.comment)"
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
                :disabled="isSent"
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
                @update:value="changeValue"
                :disabled="centralExpert"
            />
        </div>

        <CommentFileComponent
            v-model:value="twelfthPanelData.comment"
            @update:value="changeValue"
            name="twelfthPanelData.comment"
            @change="uploadFile"
            @click="deleteFile"
            :file="fileName"
            :fileType="twelfthPanelData.file_type"
            :fileSize="twelfthPanelData.file_size"
            :disabled="centralExpert"
            :is-error-file="isErrorFile"
        ></CommentFileComponent>
    </div>

    <div
        v-if="isThirdTab && centralExpert"
        class="report__field-group report__field-group--column"
    >
        <ReportTable
            label="Объем средств, собранных бойцами РО&nbsp;РСО"
            name="twelfthPanelData.amount_of_money"
            :dataRH="54"
            :dataDH="178"
            v-model:value="twelfthPanelData.amount_of_money"
        ></ReportTable>

        <CommentFileComponent></CommentFileComponent>

        <div>
            <v-checkbox label="Вернуть в&nbsp;РО на&nbsp;доработку" />
        </div>
    </div> 
</template>
  
<script setup>
import { ref, watchEffect } from "vue";
import { InputReport, TextareaReport } from '@shared/components/inputs';
import {
    CommentFileComponent,
    FileBoxComponent,
    ReportTable,
} from "@entities/RatingRoComponents/components";
import { reportPartTwoService } from "@services/ReportService.ts";
import { fileValidate } from "@pages/ReportRegionalHQPartTwoPage/ReportHelpers.ts";

const props = defineProps({
    districtExpert: {
    type: Boolean,
    },
    centralExpert: {
        type: Boolean,
    },
    isDisabled: {
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
});

const ID_PANEL = '12';
const isFirstSent = ref(true);
let isErrorFile = ref(false);
const twelfthPanelData = ref({
    amount_of_money: null,
    scan_file: '',
    file_size: null,
    file_type: '',
    comment: '',
});
const isSent = ref(false);

const emit = defineEmits(["update:value", "getData"]);

const changeValue = (event) => {
  emit("update:value", event);
};

const focusOut = async () => {
    // console.log(twelfthPanelData.value);
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
};

const fileName = ref('');

const uploadFile = async (event) => {    
    twelfthPanelData.value.file_size = (event.target.files[0].size / Math.pow(1024, 2));
    twelfthPanelData.value.file_type = event.target.files[0].type.split('/').at(-1);

    fileValidate(event.target.files[0], 7, isErrorFile);
    if (isErrorFile.value) {
        twelfthPanelData.value.scan_file = event.target.files[0].name;
        fileName.value = event.target.files[0].name;
        // console.log('ФАЙЛ НЕ ОТПРАВЛЯЕТСЯ');
    } else if (props.districtExpert) {
        fileName.value = event.target.files[0].name;
    } else {
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
        console.log('focusOut error:', e);
    }
  }
};

const deleteFile = async () => {
    if (isErrorFile.value) {
        twelfthPanelData.value.scan_file = "";
        fileName.value = '';
    } else if (props.districtExpert) { 
        fileName.value = '';
    } else {
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
            console.log('focusOut error:', e);
        } 
    }
};

watchEffect(async () => {
    // console.log("не эксперт: ", !(props.districtExpert || props.centralExpert));

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
}, {
    flush: 'post'
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