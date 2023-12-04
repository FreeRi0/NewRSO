<template>
    <label :for="id">{{ label }}</label>
    <!-- <input
        type="checkbox"
        :name="name"
        :id="id"
        :value="value"
        :checked="checked"
        @input="handleClick($event)"
    /> -->

    <input
        variant="outlined"
        type="checkbox"
        :name="name"
        :id="id"
        :value="value"
        :checked="checked"
        @input="handleClick($event)"
    />
    <!-- <v-checkbox
            :label="label"
            type="checkbox"
            :name="name"
            :id="id"
            :model-value="value"
            :checked="checked"
            @input="handleClick($event)"
        /> -->

    <!-- <div class="card flex justify-content-center">
        <label>{{ label }}</label>
        <Checkbox v-model="checked" :binary="true" />
    </div> -->
</template>

<script setup>
const emits = defineEmits(['update:checked', 'updateCheckboxGroup']);

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        default: '',
    },
    value: {
        type: String,
        default: '',
    },
    checked: {
        type: Boolean,
        default: false,
    },
    group: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'checkbox',
    },
});

const handleClick = (event) => {
    if (props.group) {
        emits('updateCheckboxGroup', {
            optionId: props.id,
            checked: event.target.checked,
        });
    } else {
        emits('update:checked', event.target.checked);
    }
};
</script>

<style lang="scss"></style>
