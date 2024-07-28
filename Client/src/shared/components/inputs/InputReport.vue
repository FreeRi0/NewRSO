<template>
  <div class="form-input" :style="{ width: width }">
    <input
        :type="type"
        :name="name"
        :style="{ height: height,
         background: 'white'}"
        :value="value"
        :id="name"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :readonly="readonly"
        max="9999-12-31"
        class="mb-2"
        @input="updateValue"
        v-bind="$attrs"
        :disabled="disabled"
    />
  </div>
</template>

<script setup>
import { MaskInput } from 'vue-3-mask';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits(['update:value']);
const props = defineProps({
  name: {
    type: String,
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
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const updateValue = (event) => {
  emit('update:value', event.target.value);
};
</script>

<!--<style lang="scss" scoped>-->
<!--.error-wrapper {-->
<!--  // margin-bottom: 5px;-->
<!--  position: relative;-->
<!--}-->

<!--.form-error__message {-->
<!--  position: absolute;-->
<!--  right: 0;-->
<!--  color: var(&#45;&#45;danger);-->
<!--  font-size: 12px;-->
<!--}-->

<!--input {-->
<!--  font: normal;-->
<!--}-->

<!--input:focus {-->
<!--  outline: none;-->
<!--}-->

<!--.form-input input {-->
<!--  box-sizing: border-box;-->
<!--  border: 1px solid #a3a3a3;-->
<!--  border-radius: 10px;-->
<!--  display: block;-->
<!--  font-size: 16px;-->
<!--  font-weight: 500;-->
<!--  padding: 10px 16px 10px 16px;-->
<!--  margin-bottom: 20px;-->
<!--  font-family: 'Bert Sans';-->
<!--  width: 100%;-->
<!--  color: #35383f;-->
<!--}-->

<!--.form-input input::placeholder {-->
<!--  color: #a3a3a3;-->
<!--  font-size: 16px;-->
<!--  font-weight: 500;-->
<!--  font-family: 'Bert Sans';-->
<!--}-->

<!--.form-input-requisites input {-->
<!--  border: 2px solid #a3a3a3;-->
<!--  border-radius: 10px;-->
<!--  display: block;-->
<!--  font-size: 12px;-->
<!--  padding: 10px 110px 10px 16px;-->
<!--  margin-bottom: 20px;-->
<!--  width: 100%;-->
<!--}-->
<!--</style>-->
