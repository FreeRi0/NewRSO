<template>
    <div class="report__file-box">
        <div class="report__file-name">
            <SvgIcon v-if="fileType === 'jpg' ||
                    fileType === 'jpeg' ||
                    fileType === 'JPG' ||
                    fileType === 'JPEG'"
                    icon-name="file-jpg" />
            <SvgIcon v-if="fileType === 'pdf'" icon-name="file-pdf" />
            <SvgIcon v-if="fileType === 'png'" icon-name="file-png" />
            <a :href=file>{{ file.split('/').at(-1) }}</a>
        </div>

        <span class="report__file-size" v-if="fileSize">
            {{ fileSize.toFixed(1) }}&nbsp;Мб
        </span>

        <button 
            @click="clickOnButton"
            class="report__button-delete-file"
            v-bind="$attrs"
            aria-label="Удалить файл"
            v-if="!isSent"
        >
            <span>Удалить</span>
        </button>

        <div v-if="isErrorFile" class="report__error-text">
            {{ isErrorMessage }}
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { SvgIcon } from '@shared/index';

defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
    file: {
        type: [ String, Object],
        default: null,
    },
    fileType: {
        type: String,
        default: null,
    },
    fileSize: {
        type: Number,
        default: null,
    },
    districtExpert: {
        type: Boolean,
    },
    centralExpert: {
        type: Boolean,
    },
    isErrorMessage: {
        type: String,
        default: '',
    },
    isSent: {
        type: Boolean,
    },
});

const emit = defineEmits(['click']);
// const emit = defineEmits(['click', 'fileError']);

const clickOnButton = () => {
    emit('click');
};

const MAX_SIZE_FILE = 7;
// const MAX_SIZE_FILE = 3;
const isErrorFile = ref(false);

const checkValidFile = () => {
    // console.log('до', isErrorFile.value);
    if (props.fileSize > MAX_SIZE_FILE) {
        isErrorFile.value = true;
    } else {
        isErrorFile.value = false;
    }
}

watchEffect(() => {
    // const isValid = checkValidFile();
    // isErrorFile.value = !isValid;
    // emit('fileError', isErrorFile.value);
    // console.log('ошибка файла', isErrorFile.value);
    checkValidFile();
})
</script>