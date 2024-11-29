<template>
    <div :style="{ width: width }">
        <div class="report__textarea-block">
            <Textarea 
                :id="name"
                :name="name"
                :value="value" 
                :class="[
                    'report__textarea',
                    (isErrorPanel && !value) ? 'report__textarea--error' : '',
                ]"
                :rows="textRows"
                :maxlength="maxLength"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="readonly"
                :autoResize="autoResize"
                @input="updateValue"
                v-bind="$attrs"
            >
            </Textarea>
        </div>

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
        isSent: {
            type: Boolean,
        },
        isErrorPanel: {
            type: Boolean,
        },
    });
    
    const textLength = ref(null);
    const textRows = ref(1);

    watchEffect(() => {
      textLength.value = typeof props.value === 'string' ? props.value.length : 0
      textRows.value = props.value ? props.value.split('\n').length : 1;
    });
  
    const updateValue = (event) => {
        emit('update:value', event.target.value);
    };
</script>
  
<style lang="scss" scoped>  
.report {
    &__textarea-block {
        max-height: 229px;
        overflow-y: auto;
        padding: 2px 2px 1px 2px;
    }

    &__textarea {
        padding: 9.5px 16px;
        width: 100%;
        min-height: 40px;
        overflow: auto !important;
        background-color: #ffffff;
        color: #35383F;
        border: none;
        outline: 1px solid #bec2c6;
        border-radius: 10px;
        line-height: 21px;
        resize: none;

        &::placeholder {
            color: #6d6d6d;
        }

        &--error {
            outline: 1px solid #db0000;
            color: #db0000;

            &::placeholder {
                color: #db0000;
            }
        }

        @media (max-width: 360px) {
            font-size: 14px;
            line-height: 18.5px;
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
        margin-left: auto;
        width: fit-content;
        font-family: "Bert Sans";
        font-size: 12px;
        line-height: 16px;
        color: #6d6d6d;
    }
}
</style>
  