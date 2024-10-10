<template>
    <div class="report__fieldset report__fieldset--comment-expert">
        <label class="form__label report__label" :for="name">Комментарий&nbsp;<sup class="valid-red">*</sup></label>

        <InputReport is-file-district type="file" :disabled="isSixPanel" accept=".jpg, .jpeg, .png, .pdf" id="scan_file"
            name="scan_file" width="20px" height="20px" @change="onChange" />

        <TextareaReport :value="value" :id="name" :name="name" placeholder="Примечания, ссылки" :rows="1" autoResize
            counter-visible :maxlength="3000" :max-length-text="3000" :disabled="isDisabled" v-bind="$attrs">
        </TextareaReport>
        <FileBoxComponent v-if="file" :file="file" :fileType="fileType" :fileSize="fileSize" @click="clickOnButton"
            :is-error-file="isErrorFile"></FileBoxComponent>
    </div>
</template>

<script setup>
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { FileBoxComponent } from '@entities/RatingRoComponents/components';

const emit = defineEmits(['onChange', 'click', 'focusOut']);
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        default: '',
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    file: {
        type: String,
        default: null,
    },
    isSixPanel: {
        type: Boolean,
        default: false,
    },
    fileType: {
        type: String,
        default: null,
    },
    fileSize: {
        type: Number,
        default: null,
    },
    isErrorFile: {
        type: Boolean,
        default: false,
    }
});

const onChange = (event) => {
    emit('onChange', event.target.value);
};

// const focusOutField = (event) => {
//     emit('focusOut', event.target.value);
// };

const clickOnButton = () => {
    emit('click');
};
</script>

<style lang="scss" scoped>
.valid-red {
    color: #db0000;
}
</style>