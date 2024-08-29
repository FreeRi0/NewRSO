<template>
    <div class="report__field-group">
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
  
        <div class="report__fieldset report__fieldset--right-block" v-if="!isSecondTab">
            <label
                class="form__label report__label"
                for="scan_file">
                Скриншот численности <br> группы РО&nbsp;РСО&nbsp;<sup class="valid-red">*</sup>
            </label>
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
            <div 
                v-else
                class="report__file-box">
                <span class="report__file-name">
                    <SvgIcon v-if="eleventhPanelData.file_type === 'jpg'" icon-name="file-jpg" />
                    <SvgIcon v-if="eleventhPanelData.file_type === 'pdf'" icon-name="file-pdf" />
                    <SvgIcon v-if="eleventhPanelData.file_type === 'png'" icon-name="file-png" />
                    {{ eleventhPanelData.scan_file }}
                </span>

                <span class="report__file-size">
                    {{ eleventhPanelData.file_size }} Мб
                </span>

                <button 
                    @click="deleteFile"
                    class="report__button-delete-file"
                >
                    Удалить
                </button>
            </div>
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

        <div class="report__fieldset report__fieldset--comment-district" v-if="isSecondTab">
            <label class="form__label report__label" for="comment">
                Комментарий&nbsp;<sup class="valid-red">*</sup>
            </label>
            <InputReport
                is-file-district
                type="file"
                accept=".jpg, .jpeg, .png, .pdf"
                id="scan_file"
                name="scan_file"
                width="20px"
                height="20px"
                @change="uploadFile"
            />
            <TextareaReport
                v-model:value="eleventhPanelData.commentd"
                id="comment-district"
                name="comment-district"
                placeholder="Примечания, ссылки"
                :rows="1" 
                autoResize
                counter-visible
                :maxlength="3000"
                :max-length-text="3000"
                @focusout="focusOut"
                :disabled="isDisabled"
            >
            </TextareaReport>
            <!-- Блок для отображения скана эксперта ОШ -->
            <div class="report__file-box" v-if="eleventhPanelData.scan_file">
                <span class="report__file-name">
                    <SvgIcon v-if="eleventhPanelData.file_type === 'jpg'" icon-name="file-jpg" />
                    <SvgIcon v-if="eleventhPanelData.file_type === 'pdf'" icon-name="file-pdf" />
                    <SvgIcon v-if="eleventhPanelData.file_type === 'png'" icon-name="file-png" />
                    {{ eleventhPanelData.scan_file }}
                </span>

                <span class="report__file-size">
                    {{ eleventhPanelData.file_size }} Мб
                </span>

                <button 
                    @click="deleteFile"
                    class="report__button-delete-file"
                >
                    Удалить
                </button>
            </div>
        </div>
    </div> 
</template>
  
<script setup>
import { ref, watchEffect } from "vue";
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { getReport, reportPartTwoService } from "@services/ReportService.ts";
import { SvgIcon } from '@shared/index';

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
// .panel-card {
//   box-shadow: none;
// }

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
// .panel-card-text {
//   padding: 0;
// }
// .panel-tab-btn {
//   text-transform: initial;
//   font-family: Bert Sans;
//   font-size: 16px;
//   font-weight: 400;
//   line-height: 21.1px;
//   text-align: left;
//   margin-right: 8px;
// }

.hr {
width: 100%;
border-top: 1px solid #B6B6B6;
}

.v-table {
margin-bottom: 16px;
border-radius: 10px;
border: 1px solid #B6B6B6;
}

.report-table {
&__tr {
    background-color: #FFFFFF;
    text-align: center;
}
&__th {
    font-family: Akrobat;
    font-size: 16px;
    font-weight: 500;
    line-height: 19.2px;
    text-align: center;

    &__br-left {
    border-radius: 10px 0 0 0;
    border-right: 1px solid #B6B6B6;
    }

    &__br-right {
    border-radius: 0 10px 0 0;
    border-left: 1px solid #B6B6B6;
    }
}
&__td {
    text-align: center;
    font-family: Akrobat;
    font-size: 16px;
    font-weight: 500;
    color: #8E8E93;

    &__center {
    border-left: 1px solid #B6B6B6;
    border-right: 1px solid #B6B6B6;
    }
}
}
</style>