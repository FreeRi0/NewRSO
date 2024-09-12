<template>
    <div class="report__field-group" v-if="!isSecondTab && !isThirdTab">
        <div class="report__fieldset report__fieldset--left-block">
            <label 
                class="form__label report__label"
                for="number-of-members">
                Количество человек, входящих в&nbsp;группу РО&nbsp;РСО в&nbsp;социальной сети &laquo;ВКонтакте&raquo;&nbsp;<sup class="valid-red">*</sup>
            </label>
            <InputReport
                v-model:value="eleventhPanelData.participants_number"
                id="number-of-members"
                name="number-of-members"
                style="width: 100%;"
                height="40px"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :max="32767"
                @focusout="focusOut"
                :disabled="isDisabled"
            />
        </div>
  
        <div class="report__fieldset report__fieldset--right-block" >
            <p
                class="form__label report__label"
                >
                Скриншот численности <br> группы РО&nbsp;РСО&nbsp;<sup class="valid-red">*</sup>
            </p>
            <InputReport
                v-if="!eleventhPanelData.scan_file"
                isFile
                type="file"
                accept=".jpg, .jpeg, .png, .pdf"
                id="scan_file"
                name="scan_file"
                width="100%"
                height="auto"
                @change="uploadFile"
                :disabled="isDisabled"
            />
            <FileBoxComponent
                v-else
                :file="eleventhPanelData.scan_file"
                :fileType="eleventhPanelData.file_type"
                :fileSize="eleventhPanelData.file_size"
                @click="deleteFile"
            ></FileBoxComponent>
        </div>
  
        <div class="report__fieldset report__fieldset--comment" v-if="
            !(isCentralHeadquarterCommander || isDistrictHeadquarterCommander) || 
            (isCentralHeadquarterCommander && eleventhPanelData.comment) || 
            (isDistrictHeadquarterCommander && eleventhPanelData.comment)">
            <label class="form__label report__label" for="comment">
                Комментарий
            </label>
            <TextareaReport
                v-model:value="eleventhPanelData.comment"
                id="comment"
                name="comment"
                placeholder="Напишите сообщение"
                :rows="1" 
                autoResize
                counter-visible
                :maxlength="3000"
                :max-length-text="3000"
                @focusout="focusOut"
                :disabled="isDisabled"
            >
            </TextareaReport>
        </div>
    </div>

    <div v-if="isSecondTab" class="report__field-group">
        <div class="report__fieldset report__fieldset--left-block">
            <label 
                class="form__label report__label"
                for="number-of-members">
                Количество человек, входящих в&nbsp;группу РО&nbsp;РСО в&nbsp;социальной сети &laquo;ВКонтакте&raquo;&nbsp;<sup class="valid-red">*</sup>
            </label>
            <InputReport
                v-model:value="eleventhPanelData.participants_number"
                id="number-of-members"
                name="number-of-members"
                style="width: 100%;"
                height="40px"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :max="32767"
                @focusout="focusOut"
                :disabled="isCentralHeadquarterCommander"
            />
        </div>

        <CommentFileComponent
            v-model:value="eleventhPanelData.comment"
            name="eleventhPanelData.comment"
            @change="uploadFile"
            @focusout="focusOut"
            @click="deleteFile"
            :file="eleventhPanelData.scan_file"
            :fileType="eleventhPanelData.file_type"
            :fileSize="eleventhPanelData.file_size"
            :disabled="isCentralHeadquarterCommander"
        ></CommentFileComponent>
    </div>

    <div v-if="isThirdTab" class="report__field-group report__field-group--column">
        <ReportTable
            label="Количество человек, входящих в&nbsp;группу РО&nbsp;РСО в&nbsp;социальной сети &laquo;ВКонтакте&raquo;"
            name="eleventhPanelData.comment"
            :dataRH="54"
            :dataDH="178"
            v-model:value="eleventhPanelData.participants_number"
        ></ReportTable>

        <CommentFileComponent></CommentFileComponent>

        <div>
          <v-checkbox
              label="Вернуть в РО на доработку"
          />
        </div>
    </div>
    
</template>
  
<script setup>
import { ref, watchEffect } from "vue";
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { CommentFileComponent, FileBoxComponent, ReportTable } from '@entities/RatingRoComponents/components';
import { getReport, reportPartTwoService } from "@services/ReportService.ts";
// import { SvgIcon } from '@shared/index';

const props = defineProps({
    isDistrictHeadquarterCommander: {
        type: Boolean
    },
    isCentralHeadquarterCommander: {
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
});

const ID_PANEL = '11';
const isFirstSent = ref(true);
const scanFile = ref([]);
const eleventhPanelData = ref({
    participants_number: '',
    scan_file: '',
    file_size: null,
    file_type: '',
    comment: '',
});

const focusOut = async () => {
    let formData = new FormData();
    formData.append('participants_number', eleventhPanelData.value.participants_number);
    formData.append('comment', eleventhPanelData.value.comment);

    if (isFirstSent.value) {
        await reportPartTwoService.createReport(formData, ID_PANEL, true);
    } else {
        await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
    }
};

const uploadFile = async (event) => {
    scanFile.value = event.target.files[0];
    let formData = new FormData();
    formData.append('participants_number', eleventhPanelData.value.participants_number);
    formData.append('scan_file', scanFile.value);
    formData.append('comment', eleventhPanelData.value.comment);
    // formData.append('file_size', seventeenthPanelData.value.file_size);
    // formData.append('file_type', seventeenthPanelData.value.file_type);
    // formData.append('file_size', (scanFile.value.size/( 1024 * 1024 )).toFixed(1));
    // formData.append('file_type', scanFile.value.type);

    console.log(scanFile.value);

    if (isFirstSent.value) {
        let { scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
        eleventhPanelData.value.scan_file = scan_file.split('/').at(-1);
    } else {
        let { data : { scan_file } } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
        eleventhPanelData.value.scan_file = scan_file.split('/').at(-1);
    }
};

const deleteFile = async () => {
    eleventhPanelData.value.scan_file = '';
    let formData = new FormData();
    formData.append('participants_number', eleventhPanelData.value.participants_number);
    formData.append('scan_file', '');
    formData.append('comment', eleventhPanelData.value.comment);
    formData.append('file_size', eleventhPanelData.value.file_size);
    formData.append('file_type', eleventhPanelData.value.file_type);

    console.log(formData);

    if (isFirstSent.value) {
        await reportPartTwoService.createReport(formData, ID_PANEL, true);
    } else {
        await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
    }
};

watchEffect(async () => {
    console.log('regionalHeadquarterCommander: ', !(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander));
    try {
    const { data } = props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander ? await reportPartTwoService.getReportDH(ID_PANEL) : await reportPartTwoService.getReport(ID_PANEL);
    console.log(data);
    if (data) {
        isFirstSent.value = false;
        eleventhPanelData.value.participants_number = data.participants_number;
        eleventhPanelData.value.comment = data.comment;
        eleventhPanelData.value.scan_file = data.scan_file.split('/').at(-1)
        eleventhPanelData.value.file_size = data.file_size;
        eleventhPanelData.value.file_type = data.file_type;
    }
    } catch (e) {
    console.log(e)
    }
});

</script>
<style lang="scss" scoped>
.valid-red {
    color: #db0000;
}
.v-tab-item--selected {
    background: #F3F4F5;
}
.v-tab.v-tab.v-btn {
    min-width: 280px;
    border-radius: 10px 10px 0 0;
    letter-spacing: initial;
    border: none;
}

.hr {
    width: 100%;
    border-top: 1px solid #B6B6B6;
}
</style>