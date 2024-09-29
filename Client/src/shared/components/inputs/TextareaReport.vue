<template>
    <div
        :style="{ width: width }"
        class="report__textarea-block"
    >
        <Textarea 
            :id="name"
            :name="name"
            :value="value" 
            class="report__textarea" 
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
    
        <div class="report__counter" v-if="counterVisible">
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
.report {
    &__textarea {
        padding: 9.5px 16px;
        width: 100%;
        min-height: 40px;
        max-height: 229px;
        overflow: auto !important;
        background-color: #ffffff;
        color: #35383F;
        // border: 1px solid #bec2c6;
        border: none;
        outline: 1px solid #bec2c6;
        border-radius: 10px;
        line-height: 21px;
        resize: none;

        @media (max-width: 360px) {
            font-size: 14px;
            line-height: 18.5px;
        }

        &::placeholder {
            color: #6d6d6d;
        }

        &:disabled {
            outline: 1px solid #b6b6b6;
            background-color: #f9fafb;
            color:#8e8e93;
            pointer-events: none;
        }

        &:focus {
            outline: 1px solid #1f7cc0;
        }

        &:invalid {
            outline: 1px solid #db0000;

            &::placeholder {
                color: #db0000;
            }
        }
    }
    
    &__counter {
        //margin-top: -6px;
        margin-left: auto;
        width: fit-content;
        font-family: "Bert Sans";
        font-size: 12px;
        line-height: 16px;
        // letter-spacing: -0.9px;
        color: #6d6d6d;
    }
}
</style>
  