<template>
  <p v-if="error" class="error">{{ error }}</p>
</template>

<script setup>
defineProps({
  error: {
      type: String,
      default: ''
  }
});
</script>

<style scoped>
.error {
  color: #db0000;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Acrobat';
  margin-top: 10px;
  text-align: center;
}
</style>