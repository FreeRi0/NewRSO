<template>
    <div class="report__file-box">
        <div class="report__file-name">
            <SvgIcon v-if="fileType === 'jpg'" icon-name="file-jpg" />
            <SvgIcon v-if="fileType === 'pdf'" icon-name="file-pdf" />
            <SvgIcon v-if="fileType === 'png'" icon-name="file-png" />
            <a :href=file>{{ file.split('/').at(-1) }}</a>
        </div>

        <span class="report__file-size">
            {{ fileSize.toFixed(1) }}&nbsp;Мб
        </span>

        <button 
            @click="clickOnButton"
            class="report__button-delete-file"
            v-bind="$attrs"
            v-if="!(props.centralExpert || props.districtExpert)"
        >
            Удалить
        </button>
    </div>
</template>

<script setup>
import { SvgIcon } from '@shared/index';

defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
    file: {
        type: String,
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
});

const emit = defineEmits(['click']);

const clickOnButton = () => {
    emit('click');
};
</script>