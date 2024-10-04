<template>
  <div :is-file="isFile" :class="[
    'form-input',
    isFile ? 'form-input__file-input' : '',
    isFileDistrict ? 'form-input__add-file' : '',
    isLink ? 'form-input__link' : '',
    (isErrorPanel && !value) ? 'form-input__file-error' : '',
  ]" :style="{ width: width }">
    <input :type="type" :name="name" :style="{
      height: height,
    }" :value="value" :id="name" :placeholder="placeholder" :maxlength="maxLength" :readonly="readonly" :max="max"
      class="form-input__report"
      :class="{ 'link__input': isLink, 'form-input__report--error': (isErrorPanel && !value) }" @input="updateValue"
      v-bind="$attrs" :disabled="disabled" />
    <div class="form__counter" v-if="counterVisible">
      {{ textInputLength }} / {{ maxCounter }}
    </div>
    <div v-if="isFile" class="form-input__text">
      <span>Перетащите файлы или выберите на&nbsp;компьютере</span>
      <span>
        <SvgIcon iconName="add-file" />
        Выбрать файл
      </span>
    </div>
    <div v-if="isFileDistrict" class="form-input__icon">
      <SvgIcon iconName="add-file" />
    </div>
    <div v-if="isError" class="form-input__error-block">
      <span class="form-input__error-text">Превышено&nbsp;максимальное&nbsp;значение&nbsp;{{ max }}</span>
    </div>
    <div v-show="isLinkError && props.isLink && value"> <span class="form-input__error-text">Не верный формат
        url</span></div>

  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { MaskInput } from 'vue-3-mask';
import { SvgIcon } from '@shared/index';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits(['update:value', 'error']);
const props = defineProps({
  name: {
    type: [String, Number],
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    required: false,
  },
  width: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '',
  },
  maxLength: {
    type: Number,
  },
  max: {
    type: [String, Number],
    default: "9999-12-31",
  },
  value: {
    type: [String, Number],
  },
  linkVal: {
    type: [String, Number],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  counterVisible: {
    type: Boolean,
    default: false,
  },
  maxCounter: {
    type: Number,
  },
  isFile: {
    type: Boolean,
    default: false,
  },
  isFileDistrict: {
    type: Boolean,
    default: false,
  },
  isLink: {
    type: Boolean,
    default: false,
  },
  isError: {
    type: Boolean,
    default: false,
  },
  isErrorPanel: {
    type: Boolean,
  },
});

let isError = ref(props.isError);
let isLinkError = ref(false);

const textInputLength = ref(null);
// const urlRegex = /^https:\/\/(?:[a-zA-Z0-9а-я](?:[a-zA-Z0-9а-я-]{0,61}[a-zA-Z0-9а-я])?\.)+[a-zA-Z0-9а-я][a-zA-Z0-9а-я-]{0,61}[a-zA-Z0-9а-я]$/i;
//const urlRegex = /^(https?:\/\/)?[\w\-\._~:/?#[\]@!$&'()*+,;=%]+$/;
// const urlRegex = new RegExp('^(?:http|ftp)s?:\\/\\/(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\\.)+(?:[A-Z]{2,6}\\.?|[A-Z0-9-]{2,}\\.?)|localhost|\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|\\[?[A-F0-9]*:[A-F0-9:]+\\]?)\\?(::\\d+)?(?:\\/?|\\/\\S+)$', 'i');
// const urlRegex = new RegExp('^(https?:\\/\\/)?' + // проверка протокола
//   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // проверка имени домена
//   '((\\d{1,3}\\.){3}\\d{1,3}))' + // проверка ip адреса (версия 4, не 6)
//   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // проверка порта и пути
//   '(\\?[;&a-z\\d%_.~+=-]*)?' + // проверка параметров запроса
//   '(\\#[-a-z\\d_]*)?$', 'i');                            // проверка хэша
const urlRegex = new RegExp(/^(https?:\/\/)?[\w\-\._~:/?#[\]@!$&'()*+,;=%а-яА-Я]+$/u);
function isValidURL(url) {
  return urlRegex.test(url);
}

const validateLink = (value) => {
  if (value !== '' && props.isLink == true) {
    const isValid = isValidURL(value);
    isLinkError.value = !isValid;
    emit('error', isLinkError.value);
    console.log('err_link_1', isLinkError.value);
  }
};

watchEffect(() => textInputLength.value = typeof props.value === 'string' ? props.value.length : 0)

watchEffect(() => {
  if (typeof props.max === 'number' && props.value > props.max) {
    isError.value = true;
    // console.log(props.max, props.value, isError.value);
  } else {
    isError.value = false;
  }
});

watchEffect(() => {
  validateLink(props.value)
});


const updateValue = (event) => {
  emit('update:value', event.target.value);
  // emit('update:value', event.target.maxLength ? event.target.value = event.target.value.slice(0, event.target.maxLength) : event.target.value);
};
</script>

<style lang="scss" scoped>
.link__input {
  width: 100%;
  max-width: 720px;

  @media screen and (max-width: 1024px) {
    max-width: 100%;
  }
}

.form-input {
  position: relative;

  &.form-input__file-input,
  &.form-input__add-file {
    .form-input__report[type='file'] {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  &.form-input__file-input {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 720px;
    min-height: 86px;
    position: relative;
    border-radius: 12px;
    background-color: transparent;
    border: 1.5px dashed #1F7CC0;
  }

  &.form-input__file-error {
    border-color: #db0000;

    span:last-child {
      color: #db0000;
    }
  }

  &__add-file,
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }

  &__text {
    padding: 16px 8px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    align-items: center;
    font-family: "Bert Sans";
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    color: #6d6d6d;

    @media (max-width: 360px) {
      font-size: 14px;
      line-height: 18.5px;
    }

    span:last-child {
      display: flex;
      align-items: center;
      column-gap: 12px;
      color: #1f7cc0;

      @media (max-width: 360px) {
        font-size: 16px;
        line-height: 24px;
      }
    }
  }

  &__error-text {
    position: absolute;
    bottom: -10px;
    width: 100%;
    display: block;
    color: #db0000;
    font-family: "Bert Sans";
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
  }
}

.form-input__link {
  width: 100%;
  max-width: 720px;
}

.form-input__report {
  padding: 8px 16px;
  background-color: #ffffff;
  border: 1px solid #bec2c6;
  border-radius: 10px;
  line-height: 21px;
  cursor: pointer;

  @media (max-width: 360px) {
    font-size: 14px;
    line-height: 18.5px;
  }

  &::placeholder {
    color: #6d6d6d;
  }

  &:disabled {
    border-color: #b6b6b6;
    background-color: #f9fafb;
    color: #8e8e93;
    pointer-events: none;
  }

  &:focus[type='text'] {
    border-color: transparent;
    outline: 1px solid #1f7cc0;
  }
}

.form-input__report:invalid,
.form-input__report--error {
  border-color: #db0000;
  color: #db0000;

  &::placeholder {
    color: #db0000;
  }
}


.report-table__td input.form-input__report {
  border: none;
  border-radius: 0;
  text-align: center;
  padding: 0;
}

.form__counter {
  width: fit-content;
  margin-left: auto;
  font-family: "Bert Sans";
  font-size: 12px;
  line-height: 16px;
  color: #6d6d6d;
  margin-top: 1px;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
  appearance: none;
  -moz-appearance: textfield;
}
</style>
