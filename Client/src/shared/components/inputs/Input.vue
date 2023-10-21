<template>
    <div class="form-input" :style="{ width: width }">
        <v-text-field
            :type="type"
            :name="name"
            :id="name"
            :placeholder="placeholder"
            :value="value"
            @input="updateValue"
            variant="outlined"
            class="mb-2 text-field"
        ></v-text-field>
        <TransitionGroup>
          <v-alert
    density="compact"
    type="error"
    v-for="element of error" :key="element.$uid"
  ><div class="form-error__message">{{ element.$message }}</div></v-alert>
          </TransitionGroup
        >
    </div>
</template>

<script setup>
const emit = defineEmits(['update:value']);
const props = defineProps({
    error: {
        type: Array,
        required: false,
    },
    value: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        default: '380px',
    },
});

const updateValue = (e) => {
    emit('update:value', e.target.value);
};
</script>

<style lang="scss" scoped></style>

