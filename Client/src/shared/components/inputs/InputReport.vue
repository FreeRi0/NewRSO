<template>
  <div :is-file="isFile" :class="isFile ? 'form-input form-input__file-input' : 'form-input'" :style="{ width: width }">
    <input :type="type" :name="name" :style="{
      height: height,
    }" :value="value" :id="name" :placeholder="placeholder" :maxlength="maxLength" :readonly="readonly"
      max="9999-12-31" class="form-input__report" @input="updateValue" v-bind="$attrs" :disabled="disabled" />
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
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { MaskInput } from 'vue-3-mask';
import { SvgIcon } from '@shared/index';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits(['update:value']);
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
  value: {
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
});

const textInputLength = ref(null);

watchEffect(() => textInputLength.value = typeof props.value === 'string' ? props.value.length : 0)

const updateValue = (event) => {
  emit('update:value', event.target.value);
  // emit('update:value', event.target.maxLength ? event.target.value = event.target.value.slice(0, event.target.maxLength) : event.target.value);
};
</script>

<style lang="scss" scoped>
.form-input {
  &.form-input__file-input {
    max-width: 720px;
    height: 86px;
    position: relative;
    border-radius: 12px;
    background-color: transparent;
    border: 1.5px dashed #1F7CC0;

    .form-input__report[type='file'] {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
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
    color: #6d6d6d;

    span:last-child {
      display: flex;
      align-items: center;
      column-gap: 12px;
      color: #1f7cc0;
    }
  }
}

.form-input__report {
  padding: 8px 16px;
  background-color: #ffffff;
  border: 1px solid #bec2c6;
  border-radius: 10px;
  line-height: 21px;
  cursor: pointer;

  &::placeholder {
    color: #6d6d6d;
  }
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
