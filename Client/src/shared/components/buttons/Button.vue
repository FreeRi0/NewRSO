<template>
    <button
        :class="[
            'btn',
            `btn_${color}`,
            { btn_rounded: rounded },
            { btn_outlined: outlined },
            { btn_icon: icon },
            { btn_large: size === 'large' },
        ]"
        :disabled="disabled"
        :loaded="loaded"
        @click="clickOnButton"
    >
        <span v-if="icon">

        </span>
        <span v-else>{{ label }}</span>
        <v-progress-circular indeterminate v-if="loaded"></v-progress-circular>
    </button>
</template>
<script setup>
import { ref, computed} from 'vue';

const res = ref();

const icons = ref([
    {
        name: "switch",
        icon: "switch.svg",
    },
    {
        name: "darhboard",
        icon: "darhboard.svg",
    },
    {
        name: "menu",
        icon: "menu.svg",
    }
])

const props = defineProps({
    label: {
        type: String,
        default: 'Button',
    },
    color: {
        type: String,
        default: 'primary',
    },
    disabled: {
        type: Boolean,
        required: false,
    },
    loaded: {
        type: Boolean,
        required: false,
    },
    rounded: {
        type: Boolean,
        required: false,
    },
    outlined: {
        type: Boolean,
        required: false,
    },
    icon: {
        type: String,
        required: false,
    },
    size: {
        type: String,
        default: 'normal',
    },
});

// const res = computed(() => {
//  return icons.value.find((item) => item.name  == name);
// })


const emit = defineEmits(['click']);

const clickOnButton = () => {
    emit('click');
};
</script>
<style lang="scss" scoped>
.btn {
    display: block;
    margin: 20px auto;
    padding: 16px 32px;
    // height: 52px;
    color: white;
    box-shadow: none;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    transition: 0.2s;
    text-transform: none;
    &_primary {
        background: var(--primary);
        border: 1px solid var(--primary);
    }
    &_second {
        background: var(--second);
        border: 1px solid var(--second);
    }
    &_success {
        background: var(--success);
        border: 1px solid var(--success);
    }
    &_info {
        background: var(--info);
        border: 1px solid var(--info);
    }
    &_warning {
        background: var(--warning);
        border: 1px solid var(--warning);
    }
    &_danger {
        background: var(--danger);
        border: 1px solid var(--danger);
    }
    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
    &_rounded {
        border-radius: 15px;
    }
    &_outlined {
        background: transparent;
        color: #000;
        &:hover {
            color: #fff;
        }
    }
    &_icon {
        border: 1px solid #35383f;
        border-radius: 5px;
        height: 32px;
        width: 32px;
        margin: 0px;
        margin-right: 8px;
        padding: 0;
    }
    &_large {
        height: 52px;
        padding: 16px 32px;
    }
}
</style>
