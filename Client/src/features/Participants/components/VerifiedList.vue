<template>
  <participantItem
      v-for="participant in verified"
      :participant="participant"
      :position="position"
      :key="participant.id"
      v-if="verified.length > 0"
  />
  <h2 class="notFound" v-else>Участники не найдены...</h2>
</template>
<script setup>
import { participantItem } from '@entities/Participants';
const props = defineProps({
  verified: {
      type: Array,
      required: true,
  },
});
</script>
