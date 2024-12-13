<template>
  <router-link :to="{ name: 'lso', params: { id: squad.id } }" class="squad-link">
    <div class="horizontal-img">
      <img :src="getEmblemSrc(squad.emblem)" alt="logo" />
    </div>
    <div class="containerHorizontal">
      <p class="horizontal-item-title">
        {{ squad.name }}
      </p>
    </div>
  </router-link>
</template>

<script setup>
import defaultAvatar from '@app/assets/hq-emblem-squad.png';
const props = defineProps({
  squad: {
    type: Object,
    required: true,
  },
});

const getEmblemSrc = (emblem) => emblem || defaultAvatar;


</script>

<style lang="scss" scoped>
.squad-link {
  display: contents;
}

.horizontal-img img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.horizontal-item-title {
  margin-left: 10px;
}
</style>