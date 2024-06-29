<template>
    <div class="competition__item">
        <div class="competition__content">
            <div :class="{
                horizontal_item__wrapper: true,
                first_row: slimScreen    
            }">
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

            <div :class="{
                competition__detachments: true,
                second_row_first: slimScreen
            }">
                <div class="horizontal_item__wrapper">
                    <img v-if="application.headquarters.banner" class="competition__avatar_circle" :src="application.headquarters.banner"
                        alt="Banner" />

                    <div v-else class="competition__avatar_circle blue-bg"></div>

                    <div class="containerHorizontal">
                        <p class="cursor_redirect">
                            {{ application.headquarters.name }}
                        </p>
                    </div>
                </div>
            </div>

            <div :class="{horizontal_item__wrapper: true, second_row_second: slimScreen}">{{ action }}</div>

            <div :class="{horizontal__confidant: true, second_row_third: slimScreen}">
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
import { ref, onMounted } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const slimScreen = ref(false);

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

const clickUser = (user) => {
    router.push({
        name: 'PersonalDataUser',
        params: {
            id: user.id,
        },
    });
}

const onCheckbox = (e) => {
    emit('select', props.application, e.target.checked);
};

onMounted(() => {
    const onResize = () => window.innerWidth < 1024 ? slimScreen.value = true : slimScreen.value = false;
    onResize();
    window.addEventListener('resize', onResize);
});
</script>

<style scoped lang="scss">
.horizontal__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    margin-bottom: 12px;
    @media screen and (max-width: 1024px) {
        margin-bottom: 0px;
    }
    input {
        width: 100%;
        height: 100%;
    }
}
.competition__content {
    display: grid;
    grid-gap: 12px;
    @media screen and (max-width: 1980px) {
        grid-template-columns: auto auto 224px 50px;
    }
    @media screen and (max-width: 1024px) {
        grid-template-columns: repeat(19, 1fr);
        grid-template-rows: 1fr 1fr;
        margin-bottom: 12px;
    }
}
.first_row {   
    grid-column: span 19;
}
.second_row_first {
    grid-column: span 13;
}
.second_row_second {
    grid-column: span 4;
}
.second_row_third {
    grid-column: span 2;
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
.horizontal_item__wrapper {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
    align-items: center;

    padding: 4px 20px;
    @media screen and (max-width: 1024px) {
        margin-bottom: 0px;
    }
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
