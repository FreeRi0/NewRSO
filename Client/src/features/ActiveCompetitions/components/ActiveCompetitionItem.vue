<template>
    <div class="competition__item">
        <div class="competition__content">
            <span></span>
            <span>Отряд</span>
            <span>Конкурс</span>
            <span>Номинация</span>

            <v-checkbox v-model="isChecked" @change="onCheckbox" />

            <div class="competition__detachments">
                <div v-if="competition.detachment" class="horizontallso-item__wrapper">
                    <img
                        v-if="competition.detachment.banner"
                        class="competition__avatar_circle"
                        :src="competition.detachment.banner"
                        alt="Banner"
                    />

                    <div
                        v-else
                        class="competition__avatar_circle blue-bg"
                    ></div>

                    <div class="containerHorizontal">
                        <p>{{ competition.detachment.name }}</p>
                    </div>
                </div>

                <div class="horizontallso-item__wrapper">
                    <img
                        v-if="competition.junior_detachment.banner"
                        class="competition__avatar_circle"
                        :src="competition.junior_detachment.banner"
                        alt="Banner"
                    />

                    <div
                        v-else
                        class="competition__avatar_circle blue-bg"
                    ></div>

                    <div class="containerHorizontal">
                        <p>{{ competition.junior_detachment.name }}</p>
                    </div>
                </div>
            </div>

            <div class="horizontallso-item__wrapper competitition">
                <img
                    v-if="competition.competition?.banner"
                    class="competition__avatar_square"
                    :src="competition.competition?.banner"
                    alt=""
                />

                <div v-else class="competition__avatar_square blue-bg"></div>

                <div class="containerHorizontal">
                    <p>{{ competition.competition?.name }}</p>
                </div>
            </div>

            <div class="horizontallso-item__wrapper competition__nomination">
                {{ competition.detachment ? 'Тандем' : 'Дебют' }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    competition: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits({
    select: null,
});

const isChecked = ref(false);

const onCheckbox = (e) => {
    emit('select', props.competition, e.target.checked);
};

watch(
    () => props.competition.selected,
    (newSelected) => {
        isChecked.value = newSelected;
    },
);
</script>

<style scoped lang="scss">
.competition__item {
    display: grid;
    width: 100%;
    grid-template-columns: auto 1fr;
}

.blue-bg {
    background-color: #c7e3fa;
}

.competition__content {
    display: grid;
    width: 100%;
    grid-gap: 12px;
    grid-template-columns: 48px minmax(200px, 436px) 1fr auto;
}

.competition__detachments {
    display: grid;
    grid-gap: 12px;
}
.competition__avatar_circle {
    border-radius: 50%;
    width: 38px;
    height: 38px;
}

.competition__avatar_square {
    border-radius: 10px;
    width: 52px;
    height: 40px;
}

.horizontallso-item__wrapper {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
    align-items: center;

    padding: 4px 20px;

    gap: 10px;
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
    margin-bottom: 12px;
    width: 100%;
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.horizontallso-item img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: cover;
}

.horizontallso-item p {
    margin-left: 10px;
}

.horizontallso-item__list-date {
    // width: 95px;
    display: grid;
    grid-template-columns: auto 1fr 0fr;
}

.horizontallso-item__list-img-status {
    position: absolute;
    width: 18px;
    max-height: 18px;
    top: -17px;
    right: -15px;
}

.horizontallso-itemo__list-img {
    margin-right: 13px;
}

.horizontallso-item__list-full {
    color: #35383f;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
}

.horizontallso-item__list-date p {
    color: #1c5c94;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
}

.horizontallso__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    height: 48px;
    width: 48px;
    input {
        width: 24px;
        height: 24px;
    }
}

.sort-select {
    height: 46px;
}

.checked__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    height: 48px;
    margin: 0px 12px;
    width: 48px;
    input {
        width: 24px;
        height: 24px;
    }
}
</style>
