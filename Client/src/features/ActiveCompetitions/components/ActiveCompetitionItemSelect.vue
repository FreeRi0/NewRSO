<template>
    <div class="competition__item">
        <div class="competition__content">
            <div class="competition__detachments">
                <div
                    v-if="competition.detachment"
                    class="horizontallso-item__wrapper"
                >
                    <img
                        class="competition__avatar_circle"
                        :src="competition.detachment.banner"
                        alt="Banner"
                    />

                    <div class="containerHorizontal">
                        <p>{{ competition.detachment.name }}</p>
                    </div>
                </div>

                <div
                    class="horizontallso-item__wrapper"
                    v-if="
                        commanderIds.regionalheadquarter_commander?.id != null
                    "
                >
                    <img
                        class="competition__avatar_circle"
                        :src="competition.junior_detachment.banner"
                        alt="Banner"
                    />

                    <div class="containerHorizontal">
                        <p>{{ competition.junior_detachment.name }}</p>
                    </div>
                </div>
            </div>

            <div class="horizontallso-item__wrapper competitition">
                <img
                    class="competition__avatar_square"
                    :src="competition.competition?.banner"
                    alt=""
                />

                <div class="containerHorizontal">
                    <p>{{ competition.competition?.name }}</p>
                </div>
            </div>

            <div class="horizontallso-item__wrapper competition__nomination">
                {{ competition.detachment ? 'Тандем' : 'Дебют' }}
            </div>

            <div class="horizontallso-item__wrapper">{{ action }}</div>

            <div class="horizontallso__confidant">
                <input
                    type="checkbox"
                    v-model="isChecked"
                    @change="onCheckbox"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    competition: {
        type: Object,
        default: () => ({}),
    },
    action: {
        type: String,
        default: '',
    },
    commanderIds: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits({
    select: null,
});

const isChecked = ref(true);

const onCheckbox = (e) => {
    emit('select', props.competition, e.target.checked);
};
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
.competition__content {
    display: grid;
    grid-gap: 12px;
    grid-template-columns: 1fr minmax(142px, 276px) 96px 118px 50px;
}

.competition__detachments {
    display: flex;
    grid-gap: 12px;
    grid-template-columns: 1fr 1fr;

    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
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
</style>
