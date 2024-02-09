<template>
  <div v-if="events.length > 0">
      <applicationCompetitionItem
          v-for="event in events"
          :event="event"
          @change="changeEvents"
          :selectedEvents="selectedComp"
          :key="event.id"
      />
  </div>
  <p v-else>Заявок нет...</p>
</template>
<script setup>
import { ref } from 'vue';
import { applicationCompetitionItem } from '@entities/Competitions/components';
const emit = defineEmits(['change']);
const props = defineProps({
  events: {
      type: Array,
      required: true,
  },
  selectedEvents: {
      type: Array,
  },
});

const changeEvents = (CheckedEvent, EventId) => {

  emit('changeEv', CheckedEvent, EventId);
  console.log('EventId', EventId)
};
</script>