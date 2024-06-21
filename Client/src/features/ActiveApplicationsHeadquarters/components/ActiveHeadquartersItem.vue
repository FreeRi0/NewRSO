<template>
    <div class="competition__item">
        <div class="competition__content">
            <template v-if="!position">
                <span></span>
                <span>Боец</span>
                <span>Штаб</span>
            </template>

            <div class="horizontal__confidant">
                <input type="checkbox" v-model="isChecked" @change="onCheckbox" />
            </div>

            <div class="horizontal-item__wrapper">
                <img
                    v-if="application.user.media?.avatar"
                    class="competition__avatar_circle"
                    :src="application.user.media.avatar"
                    alt="Banner"
                />

                <div
                    v-else
                    class="competition__avatar_circle blue-bg"
                >
                </div>
                <div class="containerHorizontal">
                    <p class="cursor_redirect" @click="clickUser(application.user)">
                        {{ application.user.first_name }} {{ application.user.last_name }} {{ application.user.patronymic_name }}
                    </p>
                </div>
            </div>

            <div class="competition__detachments">
                <div class="horizontal-item__wrapper">
                    <img v-if="application.headquarters.banner" class="competition__avatar_circle" :src="application.headquarters.banner"
                        alt="Banner" />

                    <div v-else class="competition__avatar_circle blue-bg"></div>

                    <div class="containerHorizontal">
                        <p class="cursor_redirect" @click="clickDetacment(detachmentData.id)">
                            {{ application.headquarters.name }}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    application: {
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
    emit('select', props.application, e.target.checked);
};

watch(
    () => props.application.selected,
    (newSelected) => {
        isChecked.value = newSelected;
    },
);
</script>

<style scoped lang="scss">
.horizontal__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    margin-bottom: 12px;

    //max-height: 48px;
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
    grid-template-columns: 48px auto auto;

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
