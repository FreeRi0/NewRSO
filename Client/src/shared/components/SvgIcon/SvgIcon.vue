<template>
    <img 
      class="svg-icon"
      :class="{ rotate_icon: flip}"
      :width="width"
      :height="height"
      :src="src"
    />
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

const src = ref(null);

watch(
    () => props.name,
    async (name) => {
      console.log(props.flip);
        src.value = `/assets/${name}.svg`;
    },
    { immediate: true },
);
</script>

<style scoped lang="scss">
.rotate_icon {
transform: rotate(180deg);
}
</style>