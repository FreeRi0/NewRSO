<template>
    <div>
        <textarea
            :name="name"
            :id="name"
            :placeholder="placeholder"
            :value="value"
            :rows="rows"
            :maxlength="maxLength"
            @input="updateValue"
            @change="changeValue"
            v-bind="$attrs"
        ></textarea>
        <TransitionGroup>
            <div
                class="error-wrapper"
                v-for="element of error"
                :key="element.$uid"
            >
                <div class="form-error__message">{{ element.$message }}</div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup>
const emit = defineEmits(['update:value']);

defineOptions({
    inheritAttrs: false,
});

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
    rows: {
        type: Number,
        default: 1,
    },
    placeholder: {
        type: String,
        required: false,
    },
    maxLength: {
        type: Number,
    },
});

const updateValue = (e) => {
    // console.log(event);
    emit('update:value', e.target.value);
};

// const changeValue = (e) => {
//     emit('update:modelValue', e.target.files[0]);
// }
</script>

<style lang="scss" scoped>
.error-wrapper {
    position: relative;
}
.form-error__message {
    position: absolute;
    right: 0;
    color: var(--danger);
    font-size: 12px;
}
</style>
