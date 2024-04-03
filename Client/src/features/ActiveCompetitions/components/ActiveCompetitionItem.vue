<template>
    <div class="competition__item">
        <div class="competition__content">
            <template v-if="!position">
                <span></span>
                <span>Отряд</span>
                <span>Конкурс</span>
                <span>Номинация</span>
            </template>

            <div class="horizontallso__confidant">
                <input
                    type="checkbox"
                    v-model="isChecked"
                    @change="onCheckbox"
                />
            </div>

            <div class="competition__detachments">
                <div
                    v-if="competition.detachment"
                    class="horizontal-item__wrapper"
                >
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
                        <p
                            class="cursor_redirect"
                            @click="clickDetacment(competition.detachment.id)"
                        >
                            {{ competition.detachment.name }}
                        </p>
                    </div>
                </div>

                <div
                    class="horizontal-item__wrapper"
                    v-if="
                        commanderIds.regionalheadquarter_commander?.id != null
                    "
                >
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
                        <p
                            class="cursor_redirect"
                            @click="
                                clickDetacment(competition.junior_detachment.id)
                            "
                        >
                            {{ competition.junior_detachment.name }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="horizontal-item__wrapper competitition">
                <img
                    class="competition__avatar_square"
                    src="@app/assets/competition/tablet-promo.png"
                    alt="banner"
                />

                <div class="containerHorizontal">
                    <p class="cursor_redirect" @click="onCompetition">
                        {{ competition.competition?.name }}
                    </p>
                </div>
            </div>

            <div class="horizontal-item__wrapper competition__nomination">
                {{ competition.detachment ? 'Тандем' : 'Дебют' }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    competition: {
        type: Object,
        default: () => ({}),
    },
    commanderIds: {
        type: Object,
        default: () => ({}),
    },
    position: {
        type: Number,
        default: 0,
    },
});

const emit = defineEmits({
    select: null,
});

const isChecked = ref(false);

const onCheckbox = (e) => {
    emit('select', props.competition, e.target.checked);
};

const clickDetacment = (id) => {
    router.push({
        name: 'DetachmentData',
        params: {
            id: id,
        },
    });
};

const onCompetition = () => {
    router.push({
        name: 'Competition',
    });
};

watch(
    () => props.competition.selected,
    (newSelected) => {
        isChecked.value = newSelected;
    },
);
</script>

<style scoped lang="scss">
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
.competition__item {
    display: grid;
    width: 100%;
    gap: 12px;
}

.blue-bg {
    background-color: #c7e3fa;
}

.competition__content {
    display: grid;
    width: 100%;
    grid-gap: 12px;
    grid-template-columns: 48px minmax(200px, 436px) 1fr 100px;

    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}

.competition__detachments {
    display: flex;
    grid-gap: 12px;
    grid-template-columns: 1fr 1fr;
}
.competition__avatar_circle {
    border-radius: 50%;
    width: 38px;
    height: 38px;
}

.competition__avatar_square {
    object-fit: cover;
    border-radius: 10px;
    width: 52px;
    height: 40px;
}

.horizontal-item__wrapper {
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
.cursor_redirect {
    cursor: pointer;
}
.competition__nomination {
    display: flex;
    justify-content: center;
}
</style>
