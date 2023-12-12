<template>
   <input type="checkbox" v-model="model" :value="value" />
  <span>{{ label }}</span>
</template>
<script setup>
export default {
    props:{
      modelValue: { type: [Array, Boolean] },
      value: { type: [Boolean, Object] },
      label: { type: String }
    },
    computed:{
      model:{
         get() {
            return this.modelValue;
          },
          set(value) {
            this.$emit("update:modelValue", value);
          }
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>