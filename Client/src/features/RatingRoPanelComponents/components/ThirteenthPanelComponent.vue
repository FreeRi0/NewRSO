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
                @focusout="focusOut"
                :disabled="centralExpert"
            />
        </div>

        <CommentFileComponent
            v-model:value="thirteenthPanelDataDH.comment"
            @focusout="focusOut"
            name="thirteenthPanelData.comment"
            @change="uploadFile"
            @click="deleteFile"
            :file="thirteenthPanelDataDH.scan_file"
            :fileType="thirteenthPanelDataDH.file_type"
            :fileSize="thirteenthPanelDataDH.file_size"
            :disabled="centralExpert"
            :is-error-file="isErrorFile"
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
import { ref, watchEffect } from "vue";
import { InputReport, TextareaReport } from '@shared/components/inputs';
import {
    CommentFileComponent,
    // FileBoxComponent,
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
    isSecondTab: {
        type: Boolean,
        default: false,
    },
    isThirdTab: {
        type: Boolean,
        default: false,
    },
    data: Object,
    dataDH: Object,
    dataCH: Object,
    isErrorPanel: {
        type: Boolean,
    },
});

const ID_PANEL = '13';
const isFirstSent = ref(true);
let isErrorFile = ref(false);
let fileName = ref(null);
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

const emit = defineEmits(["getData", 'getDataDH', 'getDataCH', 'getFileDH']);

const focusOut = async () => {
    if (!(props.districtExpert || props.centralExpert)) {
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
    }
    
    if (props.districtExpert) {
        emit('getDataDH', thirteenthPanelDataDH.value, Number(ID_PANEL));
    }
};

const uploadFile = async (event) => {
    fileValidate(event.target.files[0], 7, isErrorFile);

    if (props.districtExpert) {
        fileName.value = '';
        emit('getFileDH', fileName.value, Number(ID_PANEL));

        thirteenthPanelDataDH.value.scan_file = event.target.files[0].name;
        thirteenthPanelDataDH.value.file_size = (event.target.files[0].size / Math.pow(1024, 2));
        thirteenthPanelDataDH.value.file_type = event.target.files[0].type.split('/').at(-1);
        
        if (!isErrorFile.value) {
            fileName.value = event.target.files[0]
            emit('getFileDH', fileName.value, Number(ID_PANEL));
            console.log('файл в компоненте', fileName.value);
        }
    }
};

const deleteFile = async () => {
    if (props.districtExpert) {
        thirteenthPanelDataDH.value.scan_file = '';

        if (!isErrorFile.value) {
            fileName.value = '';
            emit('getFileDH', fileName.value, Number(ID_PANEL));
            console.log('файл в компоненте', fileName.value);
        }
    }
};

watchEffect(async () => {
    if (props.districtExpert) {
        thirteenthPanelData.value = { ...props.data }
        thirteenthPanelDataDH.value = { ...props.dataDH };

        // isVerifiedDH.value = eleventhPanelDataDH.value.verified_by_dhq;
        // console.log(isVerifiedDH.value);
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