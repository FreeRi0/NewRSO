<template>
    <div class="competition__item">
        <div class="competition__content">
            <div class="horizontal-item__wrapper">
                <img
                    v-if="application.user?.media?.avatar"
                    class="competition__avatar_circle"
                    :src="application.user.media.avatar"
                     alt="avatar"
                />

                <div
                    v-else
                    class="competition__avatar_circle blue-bg"
                ></div>
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

            <div class="horizontal-item__wrapper">{{ action }}</div>

            <div class="horizontal__confidant">
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
    application: {
        type: Object,
        default: () => ({}),
    },
    action: {
        type: String,
        default: '',
    }
});

const emit = defineEmits({
    select: null,
});

const isChecked = ref(true);

const onCheckbox = (e) => {
    emit('select', props.application, e.target.checked);
};
</script>

<style scoped lang="scss">
.horizontal__confidant {
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
    grid-template-columns: auto auto 224px 50px;
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
.blue-bg {
    background-color: #c7e3fa;
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
