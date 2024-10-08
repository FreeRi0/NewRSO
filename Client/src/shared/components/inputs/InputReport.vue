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
           class="form-input__report" :step="step"
           :class="{ 'link__input': isLink, 'form-input__report--error': (isErrorPanel && !value), 'form__input--error': isErrorDate, }"
           @input="updateValue"
           v-bind="$attrs" :disabled="disabled" :min="props.minDate"/>
    <div class="form__counter" v-if="counterVisible">
      {{ textInputLength }} / {{ maxCounter }}
    </div>
    <div v-if="isFile" class="form-input__text">
      <span>Перетащите файлы или выберите на&nbsp;компьютере</span>
      <span>
        <SvgIcon iconName="add-file"/>
        Выбрать файл
      </span>
    </div>
    <div v-if="isFileDistrict" class="form-input__icon">
      <SvgIcon iconName="add-file"/>
    </div>
    <div v-if="isError" class="form-input__error-block">
      <span class="form-input__error-text">
        {{ isErrorMessage }}
        </span>
    </div>
    <div v-if="isErrorDate" class="form-input__error-block">
      <span class="form-input__error-text">
        Дата окончания не может быть меньше даты начала
      </span>
    </div>
    <div v-show="isLinkError && props.isLink && (value || value === null)"> <span class="form-input__error-text">Не верный формат
        url</span></div>

  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
// import { MaskInput } from 'vue-3-mask';
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
  step: {
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
  // isError: {
  //   type: Boolean,
  //   default: false,
  // },
  isErrorDate: {
    type: Boolean,
  },
  isErrorPanel: {
    type: Boolean,
  },
  minDate: String
});

// let isError = ref(props.isError);
let isLinkError = ref(false);

const textInputLength = ref(null);
const urlRegex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

function isValidURL(url) {
  return urlRegex.test(url);
}

const validateLink = (value) => {
  if (value && props.isLink == true) {
    const isValid = isValidURL(value);
    isLinkError.value = !isValid;
    emit('error', isLinkError.value);
    console.log('err_link_1', isLinkError.value);
  }
};

let isError = ref(false);
let isErrorMessage = ref('');

watchEffect(() => {
  textInputLength.value = typeof props.value === 'string' ? props.value.length : 0;

  // if (typeof props.max === 'number' && props.value > props.max) {
  //   isError.value = true;
  // } else {
  //   isError.value = false;
  // }
});

watchEffect(() => {
  validateLink(props.value)
});

const updateValue = (event) => {
  emit('update:value', event.target.value);
  // emit('update:value', event.target.maxLength ? event.target.value = event.target.value.slice(0, event.target.maxLength) : event.target.value);

  // console.log(event.target.validity);//------------------------------------------
  if (!event.target.validity.valid) {
    isError.value = true;

    if (event.target.validity.badInput) {
      isErrorMessage.value = 'Введите правильное число';
    } else if (event.target.validity.stepMismatch && !props.step) {
      isErrorMessage.value = 'Введите целое число';
    } else if (event.target.validity.stepMismatch && props.step) {
      isErrorMessage.value = 'Введите до 2-х знаков после запятой';
    } else if (event.target.validity.rangeOverflow) {
      isErrorMessage.value = `Превышено максимальное значение ${props.max}`;
    } else {
      isErrorMessage.value = '';
    }
  } else {
    isError.value = false;
  }

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
    bottom: -12px;
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

  &.form__input--error {
    border-color: #db0000;
    color: #db0000;

    &::placeholder {
      color: #db0000;
    }
  }

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
