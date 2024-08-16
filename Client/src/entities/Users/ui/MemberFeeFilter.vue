<template>
    <UiAccordion>
        <template #header="{ toggle }">
            <UiHeading @click="toggle" variant="h4">Членский взнос</UiHeading>
        </template>
        <template #content>
            <div class="radio-buttons-field filter-text">
                <label>
                    <input
                        v-model="localModel"
                        type="radio"
                        name="fee"
                        :value="undefined"
                    />
                    Все
                </label>
            </div>
            <div class="radio-buttons-field filter-text">
                <label>
                    <input
                        v-model="localModel"
                        type="radio"
                        name="fee"
                        :value="true"
                    />
                    Оплачен
                </label>
            </div>
            <div class="radio-buttons-field filter-text">
                <label>
                    <input
                        v-model="localModel"
                        type="radio"
                        name="fee"
                        :value="false"
                    />
                    Не оплачен
                </label>
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
