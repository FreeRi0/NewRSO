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
                :max="32767"
                @focusout="focusOut"
                :disabled="isSent"
                :is-error-panel="isErrorPanel"
            />
        </div>
  
        <div class="report__fieldset report__fieldset--right-block">
            <p class="form__label report__label">
                Скан подтверждающего <br> документа&nbsp;<sup class="valid-red">*</sup>
            </p>
            <InputReport
                v-if="!thirteenthPanelData.scan_file"
                isFile
                type="file"
                accept=".jpg, .jpeg, .png, .pdf"
                id="scan_file"
                name="scan_file"
                width="100%"
                height="auto"
                @change="uploadFile"
                :disabled="isSent"
                :is-error-panel="isErrorPanel"
            />
            <FileBoxComponent
                v-else
                :file="thirteenthPanelData.scan_file"
                :fileType="thirteenthPanelData.file_type"
                :fileSize="thirteenthPanelData.file_size"
                @click="deleteFile"
                :is-sent="isSent"
            ></FileBoxComponent>
        </div>
    
        <div 
            class="report__fieldset report__fieldset--comment"
            v-if="
                !(districtExpert || centralExpert) ||
                (districtExpert && thirteenthPanelData.comment) ||
                (centralExpert && thirteenthPanelData.comment)
            "
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
                :max="32767"
                @update:value="changeValue"
                :disabled="centralExpert"
            />
        </div>

        <CommentFileComponent
            v-model:value="thirteenthPanelData.comment"
            name="thirteenthPanelData.comment"
            @change="uploadFile"
            @focusout="focusOut"
            @click="deleteFile"
            :file="thirteenthPanelData.scan_file"
            :fileType="thirteenthPanelData.file_type"
            :fileSize="thirteenthPanelData.file_size"
            :disabled="centralExpert"
        ></CommentFileComponent>
    </div>

    <div
        v-if="isThirdTab && centralExpert"
        class="report__field-group report__field-group--column"
    >
        <ReportTable
            label="Количество членов РО&nbsp;РСО, принявших участие во&nbsp;Всероссийском дне ударного труда"
            name="thirteenthPanelData.number_of_members"
            :dataRH="200"
            :dataDH="210"
            v-model:value="thirteenthPanelData.number_of_members"
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
    isErrorPanel: {
        type: Boolean,
    },
});

const ID_PANEL = '13';
const isFirstSent = ref(true);
const scanFile = ref([]);
const thirteenthPanelData = ref({
    number_of_members: null,
    scan_file: '',
    file_size: null,
    file_type: '',
    comment: '',
});
const isSent = ref(false);

const emit = defineEmits(["update:value", "getData"]);

const changeValue = (event) => {
  // console.log(event);
  emit("update:value", event);
};

const focusOut = async () => {
    let formData = new FormData();

    // formData.append('number_of_members', thirteenthPanelData.value.number_of_members);
    thirteenthPanelData.value.number_of_members ? formData.append('number_of_members', thirteenthPanelData.value.number_of_members) : formData.append('number_of_members', "");
    formData.append('comment', thirteenthPanelData.value.comment);

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
    // formData.append('number_of_members', thirteenthPanelData.value.number_of_members);
    // formData.append('comment', thirteenthPanelData.value.comment);

    formData.append('scan_file', scanFile.value);
    thirteenthPanelData.value.file_size = (scanFile.value.size / Math.pow(1024, 2));
    thirteenthPanelData.value.file_type = scanFile.value.type.split('/').at(-1);
    // console.log(twelfthPanelData.value.file_type);
    // console.log(scanFile.value);

    try {
        if (isFirstSent.value) {
            let { scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
            thirteenthPanelData.value.scan_file = scan_file;
            emit('getData', scan_file, Number(ID_PANEL));
        } else {
            let { data : scan_file } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
            thirteenthPanelData.value.scan_file = scan_file;
            emit('getData', scan_file, Number(ID_PANEL));
        }
    } catch (e) {
        console.log('focusOut error:', e)
    }
};

const deleteFile = async () => {
    thirteenthPanelData.value.scan_file = '';
    let formData = new FormData();
    // formData.append('number_of_members', thirteenthPanelData.value.number_of_members);
    // formData.append('comment', thirteenthPanelData.value.comment);
    formData.append('scan_file', '');
    // formData.append('file_size', thirteenthPanelData.value.file_size);
    // formData.append('file_type', thirteenthPanelData.value.file_type);

    try {
        if (isFirstSent.value) {
            let { data : scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
            emit('getData', scan_file, Number(ID_PANEL));
        } else {
            let { data : scan_file } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
            emit('getData', scan_file, Number(ID_PANEL));
        }
    } catch (e) {
        console.log('focusOut error:', e)
    }    
};

watchEffect(async () => {
    // console.log("не эксперт: ", !(props.districtExpert || props.centralExpert));

    if (props.data) {
        console.log(props.data);
        isFirstSent.value = false;
        thirteenthPanelData.value.number_of_members = props.data.number_of_members;
        thirteenthPanelData.value.comment = props.data.comment;
        thirteenthPanelData.value.scan_file = props.data.scan_file;
        thirteenthPanelData.value.file_size = props.data.file_size;
        thirteenthPanelData.value.file_type = props.data.file_type;
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