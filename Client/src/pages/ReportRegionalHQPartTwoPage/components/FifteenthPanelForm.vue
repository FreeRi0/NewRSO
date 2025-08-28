<template>
    <v-expansion-panels class="area__form">
        <v-expansion-panel>
            <v-expansion-panel-title>
                <span class="area__name">{{ area.name }}</span>
                <img src="@/app/assets/icon/areaArrow.svg" class="arrow-icon" alt="arrow" />
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <div class="area__form_data">
                    <div class="area__form_data_number">
                        <div class="area__form_data_number_item">
                            <span>Общее количество обученных</span>
                            <InputReport @focusout="focusOut" v-model:value="area_from.number_trained" :is-link="false"
                                placeholder="Введите число" id="15" name="14" class="form__input number_input"
                                type="number" :max="32767" />
                        </div>
                        <div class="area__form_data_number_item">
                            <span>Общее количество трудоустроенных РО по направлению</span>
                            <InputReport @focusout="focusOut" v-model:value="area_from.number_employed" :is-link="false"
                                placeholder="Введите число" id="15" name="14" class="form__input number_input"
                                type="number" :max="32767" />
                        </div>
                        <div class="area__form_data_number_item">
                            <span>Самостоятельное трудоустройство</span>
                            <InputReport @focusout="focusOut" v-model:value="area_from.self_employment" :is-link="false"
                                placeholder="Введите число" id="15" name="14" class="form__input number_input"
                                type="number" :max="32767" />
                        </div>
                        <div class="area__form_data_number_item">
                            <span>Общее количество не трудоустроенных</span>
                            <InputReport @focusout="focusOut" v-model:value="area_from.number_unemployed"
                                :is-link="false" placeholder="Введите число" id="15" name="14"
                                class="form__input number_input" type="number" :max="32767" />
                        </div>
                    </div>

                    <div class="area__form_data_file">
                        <span>Загрузите документы, подтверждающие факт трудоустройства</span>
                        <InputReport class="form-input__file-input" v-if="!area_from.file" isFile type="file"
                            id="scan_file" name="scan_file" width="100%" @change="uploadFile($event, index)" />
                        <FileBoxComponent v-else :file="area_from.file" :fileType="area_from.file_type"
                            :fileSize="area_from.file_size" :is-sent="isSent"
                            :is-error-file="isErrorFile && !area_from.file_size" @click="deleteFile(index)" />
                        <span class="area__form_data_file_text">Формат ZIP. Максимум 40 МБ</span>
                    </div>

                    <div class="area__form_data_checkbox">
                        <div class="checkbox-row">
                            <span class="checkbox-label">Заполнение Таблицы по трудоустройству членов РО, обученных
                                осенью 2024 года</span>
                            <div class="radio-group">
                                <label class="radio-option">
                                    <input type="radio" v-model="area_from.isFillingTableAutumn2024" :value="true"
                                        class="custom-radio" />
                                    <span class="radio-custom"></span>
                                    Да
                                </label>
                                <label class="radio-option">
                                    <input type="radio" v-model="area_from.isFillingTableAutumn2024" :value="false"
                                        class="custom-radio" />
                                    <span class="radio-custom"></span>
                                    Нет
                                </label>
                            </div>
                        </div>

                        <div class="checkbox-row">
                            <span class="checkbox-label">Заполнение Таблицы по трудоустройству членов РО, обученных
                                весной 2025 года</span>
                            <div class="radio-group">
                                <label class="radio-option">
                                    <input type="radio" v-model="area_from.isFillingTableSpring2025" :value="true"
                                        class="custom-radio" />
                                    <span class="radio-custom"></span>
                                    Да
                                </label>
                                <label class="radio-option">
                                    <input type="radio" v-model="area_from.isFillingTableSpring2025" :value="false"
                                        class="custom-radio" />
                                    <span class="radio-custom"></span>
                                    Нет
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="area__form_data_save-button">
                        <button @click="clickOnButton" aria-label="Сохранить"
                            class="area__form_data_save-button_button">
                            <span class="area__form_data_save-button_label">Сохранить</span>
                        </button>
                    </div>
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup>
import { ref, defineProps } from 'vue';

import { InputReport } from '@shared/components/inputs';
import { FileBoxComponent } from '@entities/RatingRoComponents/components';

const props = defineProps({
    area: {
        type: Object,
        required: true
    }
})

const area_from = ref({
    number_trained: '',
    number_employed: '',
    self_employment: '',
    number_unemployed: '',

    file: '',

    isFillingTableAutumn2024: null,
    isFillingTableSpring2025: null,
})

const emit = defineEmits(['formData', 'formDataDH', 'formDataCH', 'uploadFile', 'error']);

const focusOut = async () => {
    emit('formData', props.area);
}

// const uploadFile = async (event, index) => {
//     fileValidate(event.target.files[0], 7, isErrorFile);
//     if (isErrorFile.value) {
//         events.value[index].regulations = event.target.files[0].name
//     } else {
//         const { data } = await reportPartTwoService.createReportDraft(setFormData(event.target.files[0], index), '4', true);
//         emit('getData', data, 4);
//     }
// };
// const deleteFile = async (index) => {
//     if (isFirstSent.value) {
//         const { data } = await reportPartTwoService.createReport(setFormData(null, index, false, true), '4', true);
//         emit('getData', data, 4);
//     } else {
//         const { data } = await reportPartTwoService.createReportDraft(setFormData(null, index, false, true), '4', true);
//         emit('getData', data, 4);
//     }

// };
</script>

<style scoped lang="scss">
.area {
    &__form {
        margin-bottom: 16px;

        &_data {
            margin-top: 32px;

            &_number {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 32px;
                margin-bottom: 32px;

                &_item {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
            }

            &_file {
                margin-bottom: 16px;

                &_text {
                    font-family: Bert Sans;
                    font-weight: 400;
                    font-style: Regular;
                    font-size: 12px;
                    leading-trim: NONE;
                    line-height: 100%;
                    letter-spacing: 0%;
                    vertical-align: middle;
                    color: #6D6D6D;
                }
            }

            &_checkbox {}

            &_save-button {
                margin-top: 16px;
                margin-bottom: 16px;

                &_button {
                    border: 0px #fff solid;
                    border-radius: 6px;
                    background-color: #D2E4F2;
                    height: 40px;
                    width: 100px
                }

                &_label {
                    font-family: Bert Sans;
                    font-weight: 400;
                    font-style: Regular;
                    font-size: 16px;
                    line-height: 100%;
                    letter-spacing: 0%;
                    text-align: center;
                    color: #1F7CC0
                }
            }
        }
    }

    &__name {
        flex-grow: 1;
    }
}

.arrow-icon {
    transition: transform 0.3s ease;
    width: 16px;
    height: 16px;
    transform: rotate(180deg)
}

.checkbox-row {
    display: flex;
    align-items: center;
    padding: 16px 0px 16px 0px;
}

.checkbox-label {
    color: #1C5C94;
    flex: 1;
    text-decoration: underline;
    font-weight: 500;
    font-size: 16px;
    max-width: max-content;
    padding-right: 40px;
}

.radio-group {
    display: flex;
    gap: 40px;
    align-items: center;
}

// .radio-option {
//     display: flex;
//     align-items: center;
//     gap: 4px;
//     cursor: pointer;
//     font-size: 14px;
//     color: #333333;
//     transition: color 0.2s ease;
//     white-space: nowrap;

//     &:hover {
//         color: #1976d2;
//     }
// }

.custom-radio {
    // display: none;
    /* -стандартное отображение*/
}

.custom-radio+label {
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    line-height: 20px;
}

.custom-radio+label::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #1F7CC0;
    /* Внешний синий круг */
}

.custom-radio+label::after {
    content: '';
    position: absolute;
    left: 5px;
    /* Отступ от внешнего круга */
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid #1F7CC0;
    /* Внутренний синий круг */
    background-color: transparent;
    /* Пустота внутри внутреннего круга */
}

.custom-radio:checked+label::after {
    background-color: #1F7CC0;
    /* Заполнение внутреннего круга синим цветом при выборе */
}

.custom-radio:disabled+label {
    pointer-events: none;
}

.v-expansion-panel-title--active .arrow-icon {
    transform: rotate(0deg);
}

.v-expansion-panel-title {
    background: #FFFFFF;
    border: 1px #BEC2C6 solid;
    margin-bottom: 0px;
}

.v-expansion-panel {
    background-color: #F3F4F5;
}

.v-expansion-panel--active>.v-expansion-panel-title:not(.v-expansion-panel-title--static) {
    min-height: 56px;
}

.v-expansion-panel--active>.v-expansion-panel-title {
    border: 1px #BEC2C6 solid;

}
</style>