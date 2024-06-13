<template>
  <div class="password">
    <input :type="show ? 'text' : 'password'" :style="{ height: height }" class="password__input" :placeholder="placeholder" :value="value"  @input="updateValue" />
    <div class="eyeButton">
      <span @click="show = !show"> <img v-show="!show" src="@app/assets/icons/eye-slash.png" alt="eye-slash"> <img
          v-show="show" src="@app/assets/icons/eye.png" alt="eye"></span>


    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const emit = defineEmits(['update:value']);

const props = defineProps({
    placeholder: {
        type: String,
        required: false,
    },
    height: {
        type: String,
        default: '',
    },
    value: {
        type: String,
    },
});
const updateValue = (event) => {
    emit('update:value', event.target.value);
};

const show = ref(false);
</script>
<style lang="scss" scoped>
.password {
  position: relative;

  &__input {
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    font-size: 16px;
    height: 40px;
    color: #35383f;
    padding: 10px 16px;
    width: 100%;
    font-weight: 500;
    font-family: 'Bert Sans';
  }

  &__input::placeholder {
    color: #a3a3a3;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Bert Sans';
  }

  &__input:focus {
    outline: none;
  }
}

.eyeButton {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #A3A3A3;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Bert Sans';
}
</style>