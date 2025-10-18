<template>
    <v-expansion-panels class="area__form" :multiple="false">
        <v-expansion-panel>
            <v-expansion-panel-title>
                <span class="area__name">{{ area.name }}</span>
                <img src="@/app/assets/icon/areaArrow.svg" class="arrow-icon" alt="arrow" />
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <div class="area__form_data">
                    <div class="area__form_data_number">
                        <div class="area__form_data_number_item">
                            <span>Общее количество обученных<span class="valid-red">&nbsp;*</span></span>
                            <InputReport @focusout="focusOut" v-model:value="area_from.number_trained" :is-link="false"
                                placeholder="Введите число" id="15" name="14" class="form__input number_input"
                                type="number" :max="32767" style="width: 100%;"
                                :disabled="isSent || (props.tab === 'Просмотр отправленного отчета' && reportStore.isReportRevision) || (props.centralExpert || props.districtExpert)" />
                        </div>
                        <div class="area__form_data_number_item">
                            <span>Общее количество трудоустроенных РО по направлению<span
                                    class="valid-red">&nbsp;*</span></span>
                            <InputReport @focusout="focusOut" v-model:value="area_from.number_employed" :is-link="false"
                                placeholder="Введите число" id="15" name="14" class="form__input number_input"
                                type="number" :max="32767" style="width: 100%;"
                                :disabled="isSent || (props.tab === 'Просмотр отправленного отчета' && reportStore.isReportRevision) || (props.centralExpert || props.districtExpert)" />
                        </div>
                        <div class="area__form_data_number_item">
                            <span>Самостоятельное трудоустройство<span class="valid-red">&nbsp;*</span></span>
                            <InputReport @focusout="focusOut" v-model:value="area_from.self_employment" :is-link="false"
                                placeholder="Введите число" id="15" name="14" class="form__input number_input"
                                type="number" :max="32767" style="width: 100%;"
                                :disabled="isSent || (props.tab === 'Просмотр отправленного отчета' && reportStore.isReportRevision) || (props.centralExpert || props.districtExpert)" />
                        </div>
                        <div class="area__form_data_number_item">
                            <span>Общее количество не трудоустроенных<span class="valid-red">&nbsp;*</span></span>
                            <InputReport @focusout="focusOut" v-model:value="area_from.number_unemployed"
                                :is-link="false" placeholder="Введите число" id="15" name="14"
                                class="form__input number_input" type="number" :max="32767" style="width: 100%;"
                                :disabled="isSent || (props.tab === 'Просмотр отправленного отчета' && reportStore.isReportRevision) || (props.centralExpert || props.districtExpert)" />
                        </div>
                    </div>

                    <div class="area__form_data_file">
                        <span>Загрузите документы, подтверждающие факт трудоустройства</span>
                        <InputReport class="form-input__file-input" v-if="!area_from.file" isFile type="file"
                            id="scan_file" name="scan_file" width="100%" @change="uploadFile($event)"
                            accept=".zip,application/zip,application/x-zip-compressed"
                            :disabled="isSent || (props.tab === 'Просмотр отправленного отчета' && reportStore.isReportRevision) || (props.centralExpert || props.districtExpert)" />
                        <FileBoxComponent v-else :file="area_from.file" fileType="zip" :fileSize="area_from.file_size"
                            :is-sent="isSent" :is-error-file="isErrorFile && !area_from.file_size"
                            @click="deleteFile" />
                        <span class="area__form_data_file_text">Формат ZIP. Максимум 40 МБ</span>
                    </div>
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup>
import { ref, defineProps, watchEffect } from 'vue';
import { useReportPartTwoStore } from "@pages/ReportRegionalHQPartTwoPage/store.ts";

import { InputReport } from '@shared/components/inputs';
import { FileBoxComponent } from '@entities/RatingRoComponents/components';

const props = defineProps({
    area: {
        type: Object,
        required: true
    },
    isSent: {
        type: Boolean,
        default: false
    },
    districtExpert: {
        type: Boolean,
        default: false
    },
    centralExpert: {
        type: Boolean,
        default: false
    },
    tab: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['updateArea', 'saveData']);
const reportStore = useReportPartTwoStore();

const area_from = ref({
    name: props.area.name,
    number_trained: '',
    number_employed: '',
    self_employment: '',
    number_unemployed: '',
    file: '',
    file_size: null,
    file_type: '',
    isFillingTableAutumn2024: null,
    isFillingTableSpring2025: null,
});

watchEffect(() => {
    if (props.area) {
        area_from.value = {
            name: props.area.name,
            number_trained: props.area.number_trained ?? '',
            number_employed: props.area.number_employed ?? '',
            self_employment: props.area.self_employment ?? '',
            number_unemployed: props.area.number_unemployed ?? '',
            file: props.area.file || '',
            file_size: props.area.file_size || null,
            file_type: props.area.file_type || '',
            isFillingTableAutumn2024: props.area.isFillingTableAutumn2024 || null,
            isFillingTableSpring2025: props.area.isFillingTableSpring2025 || null,
        };
    }
});

const focusOut = async () => {
    emit('updateArea', area_from.value);
};

const uploadFile = async (event) => {
    if (!event.target.files || !event.target.files[0]) return;

    const file = event.target.files[0];

    if (!file.name.toLowerCase().endsWith('.zip')) return

    area_from.value.file_size = (file.size / Math.pow(1024, 2));
    area_from.value.file_type = file.type.split('/').at(-1);

    area_from.value.file = file;

    area_from.value = { ...area_from.value };
    emit('updateArea', area_from.value);
};

const deleteFile = async () => {
    area_from.value.file = '';
    area_from.value.file_size = null;
    area_from.value.file_type = '';

    emit('updateArea', area_from.value);
};

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
                    line-height: 100%;
                    letter-spacing: 0%;
                    vertical-align: middle;
                    color: #6D6D6D;
                }
            }


            &_save-button {
                margin-top: 16px;
                margin-bottom: 16px;

                &_button {
                    border: 0px #fff solid;
                    border-radius: 6px;
                    background-color: #D2E4F2;
                    height: 40px;
                    width: 100px;
                    cursor: pointer;
                    transition: all 0.2s ease;

                    &:disabled {
                        background-color: #E0E0E0;
                        cursor: not-allowed;
                        opacity: 0.6;
                    }

                    &:not(:disabled):hover {
                        background-color: #B8D4E8;
                    }
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

.valid-red {
    color: #db0000;
}
</style>