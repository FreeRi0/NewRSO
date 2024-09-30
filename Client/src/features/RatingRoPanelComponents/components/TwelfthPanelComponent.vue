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
                :max="32767"
                @focusout="focusOut"
                :disabled="isSent"
            />
        </div>
  
        <div class="report__fieldset report__fieldset--right-block">
            <p class="form__label report__label">
                Скан подтверждающего <br> документа&nbsp;<sup class="valid-red">*</sup>
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
            ></FileBoxComponent>
        </div>
  
        <div 
            class="report__fieldset report__fieldset--comment"
            v-if="
                !(districtExpert || centralExpert) ||
                (districtExpert && twelfthPanelData.comment) ||
                (centralExpert && twelfthPanelData.comment)
            ">
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
                :max="32767"
                @update:value="changeValue"
                :disabled="centralExpert"
            />
        </div>

        <CommentFileComponent
            v-model:value="twelfthPanelData.comment"
            name="twelfthPanelData.comment"
            @change="uploadFile"
            @focusout="focusOut"
            @click="deleteFile"
            :file="twelfthPanelData.scan_file"
            :fileType="twelfthPanelData.file_type"
            :fileSize="twelfthPanelData.file_size"
            :disabled="centralExpert"
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
});

const ID_PANEL = '12';
const isFirstSent = ref(true);
const scanFile = ref([]);
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
    console.log(twelfthPanelData.value);
    let formData = new FormData();
    
    // formData.append('amount_of_money', twelfthPanelData.value.amount_of_money);
    twelfthPanelData.value.amount_of_money ? formData.append('amount_of_money', twelfthPanelData.value.amount_of_money) : formData.append('amount_of_money', "");
    formData.append('comment', twelfthPanelData.value.comment);

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

const uploadFile = async (event) => {
    scanFile.value = event.target.files[0];
    let formData = new FormData();
    // formData.append('amount_of_money', twelfthPanelData.value.amount_of_money);
    // formData.append('comment', twelfthPanelData.value.comment);

    formData.append('scan_file', scanFile.value);
    twelfthPanelData.value.file_size = (scanFile.value.size / Math.pow(1024, 2));
    twelfthPanelData.value.file_type = scanFile.value.type.split('/').at(-1);
    // console.log(twelfthPanelData.value.file_type);
    // console.log(scanFile.value);

    try {
        if (isFirstSent.value) {
            let { scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
            twelfthPanelData.value.scan_file = scan_file;
            emit('getData', scan_file, Number(ID_PANEL));
        } else {
            let { data : scan_file } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
            twelfthPanelData.value.scan_file = scan_file;
            emit('getData', scan_file, Number(ID_PANEL));
        }
    } catch (e) {
        console.log('focusOut error:', e);
    }
};

const deleteFile = async () => {
    twelfthPanelData.value.scan_file = '';
    let formData = new FormData();
    // formData.append('amount_of_money', twelfthPanelData.value.amount_of_money);
    formData.append('scan_file', '');
    // formData.append('comment', twelfthPanelData.value.comment);
    // formData.append('file_size', twelfthPanelData.value.file_size);
    // formData.append('file_type', twelfthPanelData.value.file_type);

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
};

watchEffect(async () => {
    // console.log("не эксперт: ", !(props.districtExpert || props.centralExpert));

    if (props.data) {
        console.log(props.data);
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