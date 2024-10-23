<template>
    <div class="report__fieldset">
        <label
            class="form__label report__label"
        >
        {{ label }}&nbsp;<sup class="valid-red">*</sup>
        </label>
        <v-table>
            <tbody>
                <tr class="report-table__tr">
                    <td class="report-table__th report-table__th__br-left">Данные РО</td>
                    <td class="report-table__th report-table__td__center">Корректировка ОШ</td>
                    <td class="report-table__th report-table__th__br-right">Корректировка ЦШ</td>
                </tr>
                <tr class="report-table__tr">
                    <td class="report-table__td">{{ dataRH }}</td>
                    <td class="report-table__td report-table__td__center">{{ dataDH }}</td>
                    <td class="report-table__td">
                        <InputReport
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
                            @input="updateValue"
                        />
                </td>
                </tr>
            </tbody>
        </v-table>
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
        type: Number,
    },
    dataDH: {
        type: Number,
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
    isErrorPanel: {
        type: Boolean,
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