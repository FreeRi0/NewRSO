<template>
    <div class="checked">
        <router-link
            class="checked-item__wrapper"
            :to="{
                name: 'PersonalDataUser',
                params: { id: participant.user.id },
            }"
        >
            <div class="checked-img">
                <img
                    :src="participant.user.avatar?.photo"
                    alt="logo"
                    v-if="participant.user.avatar?.photo"
                />
                <img src="@app/assets/user-avatar.png" alt="photo" v-else />
            </div>
            <div class="containerHorizontal">
                <div class="d-flex">
                    <p class="horizontallso-item__list-full">
                        {{ participant.user.last_name }}
                    </p>
                    <p class="horizontallso-item__list-full">
                        {{ participant.user.first_name }}
                    </p>
                    <p class="horizontallso-item__list-full">
                        {{ participant.user.patronymic_name }}
                    </p>
                </div>
                <div class="checked-item__list-date">
                    <span
                        style="
                            border-left: 2px solid #b6b6b6;
                            padding-right: 8px;
                        "
                    ></span>
                    <p>{{ participant.user.date_of_birth }}</p>
                </div>
            </div>
        </router-link>

            <div class="actionVal">{{ action }}</div>

        <div class="checked__confidant ml-3">
            <input
                type="checkbox"
                v-model="checked"
                @change="updateMembership"
            />
        </div>
    </div>
</template>
<script setup>

import { useRoute } from 'vue-router';
import { ref } from 'vue';

const props = defineProps({
    participant: {
        type: Object,
        require: true,
    },
    action: {
        type: String,
        default: '',
    },
});
const checked = ref(true);

const emit = defineEmits({
    select: null,
});

const updateMembership = (e) => {
    emit('select', props.participant, e.target.checked);
};


</script>
<style lang="scss" scoped>
.checked {
    display: flex;
    align-items: center;
    &-img {
        align-items: center;
        width: 36px;
        height: 36px;
        justify-content: start;
        img {
            display: flex;
            position: relative;
            align-items: center;
            width: 36px;
            height: 36px;
            border-radius: 100%;
        }
    }
}
.checked-item__wrapper {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
    align-items: center;

    padding: 4px 20px;

    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;

    width: 100%;
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
}

.checked-item img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: cover;
}

.actionVal {
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    padding: 12px 70px;
    height: 48px;
    margin-left: 12px;
}

.checked-item p {
    margin-left: 10px;
}

.error {
    color: #db0000;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Acrobat';
    margin-top: 10px;
    text-align: center;
}
.checked-item__list-date {
    width: 95px;
    display: grid;
    grid-template-columns: auto 1fr 0fr;
}

.checked-itemo__list-img {
    margin-right: 13px;
}

.checked-item__list-full {
    color: #35383f;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
}

.checked-item__list-date p {
    color: #1c5c94;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
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
.horizontallso-item__list-full {
    margin-right: 10px;
}
.save {
    // background-color: white;
    // color: #35383f;
    // border: 1px solid black;
    width: 168px;
    height: 48px;
    padding: 12px 32px;
    margin: 0px;
    span {
        font-size: 16px;
    }
}

.v-field {
    border-radius: 10px;
}
.sort-select {
    height: 46px;
    width: 185px;
}

.form__select {
    margin-bottom: 0px;
    border: none;
}
</style>
