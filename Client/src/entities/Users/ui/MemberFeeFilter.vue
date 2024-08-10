<template>
    <UiAccordion>
        <template #header="{ toggle }">
            <UiHeading @click="toggle" variant="h4">Членский взнос</UiHeading>
        </template>
        <template #content>
            <div class="radio-buttons-field filter-text">
                <input
                    v-model="localModel"
                    type="radio"
                    id="fee0"
                    name="fee"
                    :value="undefined"
                />
                <label for="fee0">Все</label>
            </div>
            <div class="radio-buttons-field filter-text">
                <input
                    v-model="localModel"
                    type="radio"
                    id="fee2"
                    name="fee"
                    :value="true"
                />
                <label for="fee2">Оплачен</label>
            </div>
            <div class="radio-buttons-field filter-text">
                <input
                    v-model="localModel"
                    type="radio"
                    id="fee3"
                    name="fee"
                    :value="false"
                />
                <label for="fee3">Не оплачен</label>
            </div>
        </template>
    </UiAccordion>
</template>
<script setup lang="ts">
import { UiAccordion, UiHeading } from '@shared/ui';
import { ref, watch } from 'vue';

const props = defineProps<{ modelValue?: boolean }>();
const emit = defineEmits(['update:modelValue']);

const localModel = ref(props.modelValue);

watch(localModel, (newValue) => {
    emit('update:modelValue', newValue);
});
</script>
