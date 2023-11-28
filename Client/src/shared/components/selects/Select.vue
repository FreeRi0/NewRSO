<template>
    <v-select
        class="form__select"
        :items="items"
        @update:model-value="changeOption"
        v-bind="$attrs"
        :model-value="value"
        :placeholder="placeholder"
    >
        <template #item:item="{ props }">
            <v-list-item v-bind="props"> </v-list-item>
        </template>
    </v-select>
    <TransitionGroup>
        <div class="error-wrapper" v-for="element of error" :key="element.$uid">
            <div class="form-error__message">{{ element.$message }}</div>
        </div>
    </TransitionGroup>
</template>

<script setup>
// import { ref } from 'vue';

defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
    value: {
        type: String,
        default: '',
    },
    items: {
        type: Array,
        default: () => [],
    },
    placeholder: {
        type: String,
        required: false,
    },
    error: {
        type: Array,
        required: false,
    },
});

const emit = defineEmits(['update:value']);

const changeOption = (event) => {
    // console.log(event);
    emit('update:value', event);
};
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
