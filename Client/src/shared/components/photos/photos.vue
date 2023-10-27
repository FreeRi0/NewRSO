<template>
    <div v-for="photo in photos" :key="photo.id">
        <v-img
            :width="261"
            aspect-ratio="1/1"
            cover
            :src="imageSrc(photo.image)"
        ></v-img>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';


const photos = ref([
  {
    image: 'user-photo'
  }
])

const imageSrc = (name) => {
  return new URL (`@/app/assets/${name}.jpg`, import.meta.url).href;
}

</script>
<style lang="scss"></style>
