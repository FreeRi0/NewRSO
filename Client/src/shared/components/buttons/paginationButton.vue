<template>
  <div v-if="shouldShowPaginationButtons" class="pagination-buttons">
    <Button :label="buttonConfig.label" @click="buttonConfig.action" />
  </div>
</template>
<script setup>
import { Button } from './index';
import { computed } from 'vue';

const props = defineProps({
  limit: {
    type: Number,
    default: 10
  },
  sortedElements: {
    type: Array,
    required: true
  },
  element: {
    type: Object,
    required: true
  },
  next: {
    type: Function,
    required: true
  },
  prev: {
    type: Function,
    required: true
  }
})

const shouldShowPaginationButtons = computed(() =>
  props.element.count && props.element.count > props.limit
);

const buttonConfig = computed(() => {
  return props.sortedElements.length < props.element.count
    ? {
      label: 'Показать еще',
      action: props.next
    }
    : {
      label: 'Свернуть все',
      action: props.prev
    };
});
</script>