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
            <SvgIcon v-if="fileType === 'zip' || fileType === 'x-zip-compressed'" icon-name="file-zip" />
            <a
                :href="isProduction ? safeFileUrl : file"
                :download="getFileName"
                :target="props.fileType.includes('zip') ? '' : '_blank'"
            >{{ decodeURI(file.split('/').at(-1)) }}</a>
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
import { SvgIcon } from '@shared/index';
import {computed} from "vue";

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

const getFileName = computed(() => {
  if (typeof props.file === 'string') {
    return props.file.split('/').at(-1);
  }
  return 'download.zip';
});

const isProduction = computed(() => {
  const hostname = window.location.hostname;

  return hostname.includes('лк.трудкрут.рф') || hostname.includes('xn--j1ab.xn--d1amqcgedd.xn--p1ai');
});

// Замена http на https
const safeFileUrl = computed(() => {
  if (typeof props.file !== 'string') return props.file;

  let url = props.file;

  if (url.startsWith('http://')) {
    url = url.replace('http://', 'https://');
  }

  if (url.startsWith('//')) {
    url = 'https:' + url;
  }

  return url;
});
</script>
