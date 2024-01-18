<template>
    <div class="form-input" :style="{ width: width }">
        <input
            :type="type"
            :name="name"
            :id="name"
            :placeholder="placeholder"
            :value="value"
            :maxlength="maxLength"
            :data-maska="maska"
            :v-maska="vmaska"
            @input="updateValue"
            variant="outlined"
            class="mb-2 text-field"
            v-bind="$attrs"
        />
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
// import { vmaska } from 'maska';

defineOptions({
    inheritAttrs: false,
});

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
    maska: {
        type: String,
        required: false,
    },
    vmaska: {
        type: Boolean,
        default: false,
    },
    maxLength: {
        type: Number,
    },
});

const updateValue = (e) => {
    emit('update:value', e.target.value);
};
</script>

<style lang="scss" scoped>
.error-wrapper {
    // margin-bottom: 5px;
    position: relative;
}
.form-error__message {
    position: absolute;
    right: 0;
    color: var(--danger);
    font-size: 12px;
}

input {
    font: normal
}

.form-input input {
    box-sizing: border-box;
    border: 2px solid #a3a3a3;
    border-radius: 10px;
    display: block;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 16px 10px 16px;
    margin-bottom: 20px;
    font-family: 'Bert Sans';
    width: 100%;
    color: #35383F;
}

.form-input input::placeholder {
    color: #a3a3a3;
    font-size: 16px;
    color: #a3a3a3;
    font-weight: 500;
    font-family: 'Bert Sans';
}

.form-input-requisites input {
    border: 2px solid #a3a3a3;
    border-radius: 10px;
    display: block;
    font-size: 12px;
    padding: 10px 110px 10px 16px;
    margin-bottom: 20px;
    width: 100%;
}
</style>
