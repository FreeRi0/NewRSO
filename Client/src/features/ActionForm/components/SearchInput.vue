<template>
    <div class='squads-search'>
        <input
            type='text'
            id='search'
            class='squads-search__input'
            placeholder='Найти мероприятие'
            :value = 'value'
            @input = "SearchByInput"
        />
        <svg
            width='28'
            height='28'
            viewBox='0 0 28 28'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M18.511 19.0914L24 24.8M21 12.84C21 14.5884 20.5015 16.2975 19.5675 17.7512C18.6335 19.205 17.306 20.338 15.7528 21.0071C14.1997 21.6762 12.4906 21.8512 10.8417 21.5101C9.1929 21.169 7.67835 20.3271 6.4896 19.0908C5.30085 17.8545 4.4913 16.2794 4.16333 14.5646C3.83535 12.8498 4.00368 11.0724 4.64703 9.45708C5.29037 7.84178 6.37984 6.46116 7.77766 5.48981C9.17548 4.51846 10.8189 4 12.5 4C14.7544 4 16.9164 4.93135 18.5104 6.58918C20.1045 8.247 21 10.4955 21 12.84Z'
                stroke='#898989'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
            />
        </svg>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search:value'])

const text = ref('')

const props = defineProps({
    value:{
        type: String
    }
})

const SearchByInput = (event) => {
    emit("search:value", event.target.value)
}

</script>

<style lang="scss">
    .squads-search {
        position: relative;
        box-sizing: border-box;

        svg {
            position: absolute;
            top: 10px;
            left: 16px;
        }

        &__input {
            width: 100%;
            padding: 13px 0px 10px 60px;
            border-radius: 10px;
            border: 1px solid black;
        }
    }
</style>