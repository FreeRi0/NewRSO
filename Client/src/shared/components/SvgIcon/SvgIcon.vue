<template>
  <div v-html="icons" :class="{ rotate_icon: flip}">
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
    name: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 32
    },
    height: {
      type: [Number, String],
      default: 32
    },
    flip: {
      type:[Boolean],
      default: false
    }
})

const icons = ref();

watch(
    () => props.name,
    async (name) => {
      const { default: icon } = await import(`/assets/${name}.svg?raw`);
      icons.value = icon;
      if(props.width){
        let regex = /width="\d+"/g;
        icons.value = icons.value.replace(regex, `width="${props.width}"`);
      }
      if(props.height){
        let regex = /height="\d+"/g;
        icons.value = icons.value.replace(regex, `height="${props.height}"`);
      }
    },
    { immediate: true },
);
</script>

<style scoped lang="scss">
.rotate_icon {
transform: rotate(180deg);
}
</style>