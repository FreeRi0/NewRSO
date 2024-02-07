<template>
  <div class="squads-wrapper" v-if="members.length > 0">
    <squadItem v-for="member in members" :member="member" :competition="true" :rating="false" :key="member.id" />
  </div>

  <h2 class="mt-10" v-else>Отряд не найден...</h2>
</template>
<script setup>
import { ref } from 'vue';
import { squadItem } from '@entities/Squads';
const props = defineProps({
  members: {
      type: Array,
      required: true,
  },
});
</script>
<style lang="scss"></style>