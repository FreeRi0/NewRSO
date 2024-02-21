<template>
    <div class="hq-container">
        <div class="horizontallso__confidant">
            <input type="checkbox" v-model="isChecked" @change="onCheckbox" />
        </div>
        <div class="horizontallso-item__wrapper">
            <div class="horizontallso-img">
                <img
                    :src="headquarter[index]?.emblem"
                    alt="logo"
                    v-if="headquarter[index]?.emblem"
                />
                <img
                    src="@app/assets/foto-leader-squad/foto-leader-squad-01.png"
                    alt="photo"
                    v-else
                />
            </div>
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{ headquarter.name }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    headquarter: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits({
    select: null,
});

const isChecked = ref(false);

const onCheckbox = (e) => {
    emit('select', props.headquarter, e.target.checked);
};

watch(
    () => props.headquarter.selected,
    (newSelected) => {
        isChecked.value = newSelected;
    },
);
</script>

<style scoped lang="scss">
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
</style>
