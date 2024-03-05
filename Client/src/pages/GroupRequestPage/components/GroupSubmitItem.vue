<template>
    <div class="hq-container">
        <div class="horizontallso__confidant">
            <input type="checkbox" v-model="isChecked" @change="onCheckbox" />
        </div>
        <div class="horizontallso-item__wrapper">
            <div class="horizontallso-img">
                <img
                    class="competition__avatar_circle"
                    :src="user?.avatar"
                    alt="avatar"
                />
            </div>
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{ user.first_name + ' ' + user.last_name }}
                </p>
                <p class="birth-date">{{ user.date_of_birth }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits({
    select: null,
});

const isChecked = ref(false);

const onCheckbox = (e) => {
    emit('select', props.user, e.target.checked);
};

watch(
    () => props.user.selected,
    (newSelected) => {
        isChecked.value = newSelected;
    },
);
</script>

<style scoped lang="scss">
.birth-date {
    color: #1c5c94;
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: right;
}
.hq-container {
    display: grid;
    width: 100%;
    grid-gap: 12px;
    grid-template-columns: 48px auto;

    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}
.horizontallso-item__wrapper {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    padding: 4px 20px;
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
    margin-left: 12px;
    margin-bottom: 12px;
}
.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.horizontallso-item__list-full {
    color: #35383f;
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
}
.horizontallso__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    margin-bottom: 12px;
    input {
        width: 100%;
        height: 100%;
    }
}
.competition__avatar_circle {
    border-radius: 50%;
    width: 38px;
    height: 38px;
}
</style>
