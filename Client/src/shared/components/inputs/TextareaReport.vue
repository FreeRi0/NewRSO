<template>
    <div
        :style="{ width: width }"
    >
        <Textarea 
            :id="name"
            :name="name"
            :value="value" 
            class="form__textarea" 
            :rows="rows"
            :maxlength="maxLength"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :autoResize="autoResize"
            @input="updateValue"
            v-bind="$attrs"
        >
        </Textarea>
    
        <div class="form__counter" v-if="counterVisible">
          {{ textLength }} / {{ maxLengthText }}
        </div>
    </div>
</template>
  
<script setup>
    import {ref, watchEffect} from 'vue';
    import Textarea from 'primevue/textarea';
    
    defineOptions({
        inheritAttrs: false,
    });
    
    const emit = defineEmits(['update:value']);
    const props = defineProps({
        name: {
            type: [String, Number],
            required: true,
        },
        placeholder: {
            type: String,
            required: false,
        },
        width: {
            type: String,
            default: '',
        },
        rows: {
            type: Number,
        },
        maxLength: {
            type: Number,
        },
        value: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        autoResize: {
            type: Boolean,
            default: false,
        },
        counterVisible: {
            type: Boolean,
            default: false,
        },
        maxLengthText: {
            type: Number,
        },
    });
    
    const textLength = ref(null);
  
    watchEffect(() => textLength.value = typeof props.value === 'string' ? props.value.length : 0)
  
    const updateValue = (event) => {
        emit('update:value', event.target.value);
    };
</script>
  
<style lang="scss" scoped>  
    .form__textarea {
        padding: 9.5px 16px;
        min-height: 40px;
        max-height: 229px;
        overflow: auto !important;
        background-color: #ffffff;
        // border: 1px solid #bec2c6;
        border: none;
        outline: 1px solid #bec2c6;
        border-radius: 10px;
        line-height: 21px;
        cursor:text;

            &::placeholder {
                color: #6d6d6d;
            }
    }

    .form__counter {
        width: fit-content;
        margin-left: auto;
        font-family: "Bert Sans";
        font-size: 12px;
        line-height: 16px;
        color: #6d6d6d;
        margin-top: 1px;
    }
</style>
  