<template>
  <p v-if="visibleError" class="error">{{ visibleError }}</p>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  error: {
    type: String,
    default: ''
  }
});

const visibleError = ref('');
let timeoutId = null;

const showError = (err) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  
  visibleError.value = getError(err);
  
  timeoutId = setTimeout(() => {
    visibleError.value = '';
  }, 3000);
};

const getError = (err) => {
  if (Array.isArray(err)) {
    return err.join(', ');
  }
  return err;
};

watch(() => props.error, (newError) => {
  if (newError) {
    showError(newError);
  }
}, { immediate: true });
</script>

<style scoped>
.error {
  color: #db0000;
  font-size: 14px;
  margin: 10px auto;
  font-weight: 600;
  font-family: 'Acrobat';
  text-align: center;
}
</style>