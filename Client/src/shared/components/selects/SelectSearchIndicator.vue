<template>
    <div class="select-container">
        <div class="select-header" @click="toggleOpen">
            <span class="header-text">Добавить мероприятие</span>
            <img src="@/app/assets/icon/dropdown-arrow.svg" alt="стрелка" class="icon" :class="{ open: isOpen }" />
        </div>

        <div v-show="isOpen" class="dropdown">
            <div class="search-box">
                <img src="@/app/assets/icon/search-icon.svg" alt="Поиск" class="search-icon" />
                <input type="text" v-model="search" placeholder="Введите название" />
                <img v-if="search" src="@/app/assets/icon/close-location.svg" alt="Очистить" class="clear-btn"
                    @click="search = ''" />
            </div>


            <div class="options">
                <template v-if="filteredEvents.length">
                    <div v-for="event in filteredEvents" :key="event.id" class="option-event"
                        @click="selectEvent(event)">
                        {{ event.name }}
                    </div>
                </template>
                <div v-else class="no-results">
                    Ничего не найдено
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    events: {
        type: Array,
        default: () => []
    },
    modelValue: {
        type: Object,
        default: null
    }
})

const emit = defineEmits(['select'])

const isOpen = ref(false)
const search = ref('')

const toggleOpen = () => {
    isOpen.value = !isOpen.value
}

const filteredEvents = computed(() => {
    if (!search.value) return props.events
    return props.events.filter(e =>
        e.name.toLowerCase().includes(search.value.toLowerCase())
    )
})

const selectEvent = (event) => {
    emit('update:modelValue', event)
    isOpen.value = false
    search.value = ''
}
</script>

<style scoped lang="scss">
.select-container {
    font-family: sans-serif;
}

.select-header {
    border: 1px solid #1F7CC0;
    border-radius: 8px;
    padding: 8px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #1F7CC0;
}

.header-text {
    padding-right: 12px;
    font-size: 14px;
}

.icon {
    width: 24px;
    height: 24px;
}

.icon.open {
    transform: rotate(180deg);
}

.dropdown {
    border: 1px solid #1F7CC0;
    border-top: none;
    border-radius: 8px;
    background: #f9f9f9;
}

.search-box {
    position: relative;
    padding: 8px;
}

.search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
}

.search-box input {
    width: 100%;
    padding: 10px 32px 6px 40px;
    border-radius: 8px;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

.clear-btn {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    cursor: pointer;
}


.options {
    max-height: 150px;
    overflow-y: auto;
}

.option-event {
    padding: 8px 12px;
    cursor: pointer;
}

.option-event:hover {
    color: #1F7CC0;
}

.no-results {
    padding: 8px 12px;
    color: #8e8e93;
    font-style: italic;
}
</style>