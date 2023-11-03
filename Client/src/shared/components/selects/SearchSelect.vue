<template>
    <select :value="modelValue" @change="changeOption">
        <!-- <option disabled value="">Выберите из списка</option> -->
        <option v-for="item in items" :key="item.title" :value="item.title">
            <div>
                <img v-if="item.img" :src="item.srcImg" :alt="'Фото бойца'" />
                <img
                    v-else
                    :src="'@app/assets/foto-leader-squad/foto-leader-squad-stub.png'"
                    :alt="'Фото бойца (заглушка)'"
                />
            </div>
            <div v-if="item.logo">
                <img :src="item.iconStatus" :alt="'Статус бойца'" />
            </div>
            <span>{{ item.title }}</span>
            <span>{{ item.date }}</span>
        </option>
    </select>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    items: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['update:modelValue']);

const changeOption = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>
