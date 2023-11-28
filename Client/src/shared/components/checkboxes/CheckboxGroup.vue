<template>
    <div v-for="option in options" :key="option.id">
    <Checkbox
      :label="option.name"
      :id="option.id"
      :name="name"
      :value="option.id"
      :checked="value.includes(option.id)"
      group
      @updateCheckboxGroup="check"
    />
    </div>
</template>
<script setup>
import { Checkbox } from '@shared/components/checkboxes';

const emit = defineEmits(['update:value']);
const props = defineProps({
    value: {
        type: Array,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    options: {
        type: Array,
        required: true,
        // validator: (value) => {
        //     const hasNameKey = value.every((option) =>
        //         Object.keys(option).includes('name'),
        //     );
        //     const hasIdKey = value.every((option) =>
        //         Object.keys(option).includes('id'),
        //     );
        //     return hasNameKey && hasIdKey;
        // },
    },
});

const check = (params) => {
    let updateValue = [...props.value];
    if (params.checked) {
        updateValue.push(params.optionId);
    } else {
        updateValue.splice(updateValue.indexOf(params.optionId), 1);
    }
    emit('update:value', updateValue);
};
</script>
<style lang="scss"></style>
