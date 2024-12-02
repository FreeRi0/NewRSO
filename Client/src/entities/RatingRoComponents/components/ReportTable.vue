<template>
    <div class="report__fieldset">
        <label class="form__label report__label">
            {{ label }}&nbsp;<sup class="valid-red">*</sup>
        </label>
        <ul class="report-tableCH">
            <li class="report-tableCH__block">
                <span class="report-tableCH__th">Данные РО</span>
                <span v-show="typeof (dataRH) === 'number'" class="report-tableCH__td">{{ dataRH }}</span>
                <span v-show="typeof (dataRH) === 'boolean'" class="report-tableCH__td">{{ dataRH ? 'Да' : 'Нет' }}</span>
            </li>
            <li class="report-tableCH__block report-tableCH__block--center">
                <span class="report-tableCH__th">Корректировка ОШ</span>
                <span v-show="typeof (dataDH) === 'number'" class="report-tableCH__td">{{ dataDH }}</span>
                <span v-show="typeof (dataDH) === 'boolean'" class="report-tableCH__td">{{ dataDH ? 'Да' : 'Нет' }}</span>
            </li>
            <li class="report-tableCH__block">
                <span class="report-tableCH__th">Корректировка ЦШ</span>
                <span :class="['report-tableCH__td', 'report-tableCH__td--bgtransparent', props.disabled ? 'report-tableCH__td--bgcolor' : '']">
                    <InputReport 
                        v-if="isNinthPanel" 
                        :value="value ? 'Да' : 'Нет'" 
                        :disabled="isNinthPanel"
                        :id="name" 
                        :name="name" 
                        style="width: 100%;" 
                        type="text" 
                        :placeholder="Нет"
                        :maxlength="maxlength" 
                        :is-error-panel="isErrorPanel" 
                        @input="updateValue" 
                    />
                    <InputReport 
                        v-else 
                        :value="value" 
                        :id="name" 
                        :name="name" 
                        style="width: 100%;" 
                        type="number"
                        placeholder="0" 
                        :maxlength="maxlength" 
                        :min="min" 
                        :max="max" 
                        :step="step"
                        :is-error-panel="isErrorPanel" 
                        :disabled="disabled" 
                        @input="updateValue"
                    />
                </span>
                
            </li>
        </ul>
    </div>
</template>

<script setup>
import { InputReport } from '@shared/components/inputs';

const emit = defineEmits(['update:value']);

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    dataRH: {
        type: Number || Boolean,
    },
    dataDH: {
        type: Number || Boolean,
    },
    value: {
        type: [String, Number],
    },
    name: {
        type: String
    },
    maxlength: {
        type: Number,
    },
    max: {
        type: Number,
    },
    min: {
        type: Number,
    },
    step: {
        type: Number,
    },
    isNinthPanel: {
        type: Boolean,
        default: false,
    },
    isErrorPanel: {
        type: Boolean,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const updateValue = (event) => {
    emit('update:value', event.target.value);
}
</script>

<style lang="scss" scoped>
.valid-red {
    color: #db0000;
}
</style>