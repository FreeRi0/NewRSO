<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15.5" fill="#1F7CC0" stroke="#1F7CC0" />
      <path
        d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
        stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>  
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