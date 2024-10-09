<template>
    <button v-if="!loaded" :class="[
        'btn',
        `btn_${color}`,
        { btn_rounded: rounded },
        { btn_outlined: outlined },
        { btn_icon: icon },
        { btn_iconn: iconn },
        { btn_large: size === 'large' },
    ]" :disabled="disabled" :loaded="loaded" @click="clickOnButton">
        <span v-if="icon || iconn"><img id="iconn"></span>
        <span v-else>{{ label }}</span>
    </button>
    <button v-else :class="[
        'btn',
        `btn_${color}`,
        { btn_rounded: rounded },
        { btn_outlined: outlined },
        { btn_icon: icon },
        { btn_iconn: iconn },
        { btn_large: size === 'large' },
    ]" :disabled="disabled" :loaded="loaded" @click="clickOnButton">
        <v-progress-circular class="circleLoader" indeterminate></v-progress-circular>
    </button>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';

const res = ref();

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
    iconn: {
        type: String,
        required: false,
    },
    size: {
        type: String,
        default: 'normal',
    },
});

const emit = defineEmits(['click']);

const clickOnButton = () => {
    emit('click');
};
// onMounted(() => {
//     if (props.icon) {
//         document.getElementById('icon').src = props.icon;
//     } else {
//         document.getElementById('iconn').src = props.iconn;
//     }
// })
</script>
<style lang="scss" scoped>
.btn {
    display: block;
    margin: 20px auto;
    padding: 12px 32px;
    // height: 52px;
    color: white;
    box-shadow: none;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    transition: 0.2s;
    text-transform: none;
    @media screen and (min-width: 320px) and (max-width: 480px) {
        width: 100%;
    }

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
        border-radius: 5px;
        height: 40px;
        width: 40px;
        margin: 0px;
        margin-left: 8px;
        padding: 0;
    }

    &_iconn {
        border-radius: 10px;
        height: 40px;
        width: 40px;
        margin: 0px;
        padding: 0;
    }

    &_switchh {
        border-radius: 10px;
        height: 40px;
        width: 40px;
        margin: 0px;
        margin-left: 8px;
        padding: 0;
    }

    &_large {
        height: 52px;
        padding: 16px 32px;
    }

    .circleLoader {
        width: 20px;
        height: 20px;
        display: block;
        margin: 0px auto;
    }
}

</style>
