<template>
    <div class="report__file-box">
        <div class="report__file-name">
            <SvgIcon v-if="fileType === 'jpg' ||
                    fileType === 'jpeg' ||
                    fileType === 'JPG' ||
                    fileType === 'JPEG'"
                    icon-name="file-jpg" />
            <SvgIcon v-if="fileType === 'pdf' || fileType === 'PDF'" icon-name="file-pdf" />
            <SvgIcon v-if="fileType === 'png'" icon-name="file-png" />
            <a target="_blank" :href=file>{{ decodeURI(file.split('/').at(-1)) }}</a>
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
            Прикрепите файл формата jpg, png, pdf не&nbsp;более 7&nbsp;Мб
        </div>
    </div>
</template>

<script setup>
// import { ref, watchEffect } from 'vue';
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
        type: [Number, String],
        default: null,
    },
    // districtExpert: {
    //     type: Boolean,
    // },
    // centralExpert: {
    //     type: Boolean,
    // },
    isSent: {
        type: Boolean,
    },
    isErrorFile: {
        type: Boolean,
    },
});

const emit = defineEmits(['click']);

const clickOnButton = () => {
    emit('click');
};

// watchEffect(() => {
    
// })
</script>
