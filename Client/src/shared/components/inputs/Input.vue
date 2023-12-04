<template>
    <div class="form-input" :style="{ width: width }">
        <input
            :type="type"
            :name="name"
            :id="name"
            :placeholder="placeholder"
            :value="value"
            @input="updateValue"
            @change="changeValue"
            variant="outlined"
            class="mb-2 text-field"
        />
        <TransitionGroup>
          <div class="error-wrapper"
    v-for="element of error" :key="element.$uid"
  ><div class="form-error__message">{{ element.$message }}</div></div>
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
        required: false,
    },
    width: {
        type: String,
        default: '',
    },
});

const updateValue = (e) => {
    emit('update:value', e.target.value);
};
// const changeValue

// const changeValue = (e) => {
//     emit('update:modelValue', e.target.files[0]);
// }
</script>

<style lang="scss" scoped>

.error-wrapper {
    margin-bottom: 5px;
}
.form-error__message {
    color: var(--danger);
    font-size: 12px;
}

.form-input input {
    border: 2px solid #a3a3a3;
  border-radius: 10px;
  display: block;
  font-size: 12px;
  padding: 10px 16px 10px 16px;
  margin-bottom: 20px;
  width: 100%;
}
</style>

