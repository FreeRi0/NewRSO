<template>
    <div class="horizontallso">
        <div class="horizontallso__confidant mr-3" v-if="roleStore.roles.regionalheadquarter_commander
">
            <input
                type="checkbox"
                v-model="checked"
                @change="updateMembership"
            />
        </div>
        <router-link
            :to="{
                name: 'PersonalDataUserContributor',
                params: { id: participant.id },
            }"
            class="horizontallso-item__wrapper"
        >
            <div class="horizontallso-img">
                <img
                    :src="participant.media?.photo"
                    alt="logo"
                    v-if="participant.media?.photo"
                />
                <img src="@app/assets/user-avatar.png" alt="photo" v-else />
            </div>
            <div class="containerHorizontal">
                <div class="d-flex">
                    <p class="horizontallso-item__list-full">
                        {{ participant.last_name }}
                    </p>
                    <p class="horizontallso-item__list-full">
                        {{ participant.first_name }}
                    </p>
                    <p class="horizontallso-item__list-full">
                        {{ participant.patronymic_name }}
                    </p>
                </div>
                <div class="horizontallso-item__list-date">
                    <span
                        style="
                            border-left: 2px solid #b6b6b6;
                            padding-right: 8px;
                        "
                    ></span>
                    <p>{{ participant.date_of_birth }}</p>
                </div>
            </div>
        </router-link>

        <div class="horizontallso-info">
            <p v-if="participant.membership_fee">Оплачен</p>
            <p v-else>Не оплачен</p>
        </div>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRoleStore } from '@layouts/store/role';

const roleStore = useRoleStore();
const props = defineProps({
    participant: {
        type: Object,
        require: true,
    },
});

const emit = defineEmits({
    select: null,
});
const checked = ref(false);

const updateMembership = (e) => {
    emit('select', props.participant, e.target.checked);
};

watch(
    () => props.participant.selected,
    (newSelected) => {
        checked.value = newSelected;
    },
);
</script>
<style lang="scss" scoped>
.horizontallso {
    display: flex;
    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
    &-img {
        align-items: center;
        width: 36px;
        height: 36px;
        justify-content: start;
        img {
            width: 36px;
            height: 36px;
            display: flex;
            position: relative;
            align-items: center;
            border-radius: 100%;
        }
    }
    &-info {
        border: 1px solid #b6b6b6;
        border-radius: 10px;
        padding: 11px 20px;
        height: 46px;
        margin-right: 12px;
        margin-left: 12px;
        text-align: center;

        width: 185px;
        @media (max-width: 768px) {
            margin-right: 0px;
            margin-left: 0px;
            margin-bottom: 12px;
        }
        p {
            display: block;
            font-size: 16px;
            font-weight: 400;
            color: #35383f;
        }
    }
}
.horizontallso-item__wrapper {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
    align-items: center;

    padding: 4px 20px;

    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
    margin-bottom: 12px;
    width: 100%;
    @media (max-width: 1024px) {
        padding: 0px 5px;
        height: 48px;
    }
    @media (max-width: 768px) {
        margin-top: 12px;
    }
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
    @media (max-width: 1024px) {
        flex-direction: column;
        align-items: flex-start;
        margin-left: 8px;
    }
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
    display: grid;
    grid-template-columns: auto 1fr 0fr;
    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
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
    margin-right: 10px;
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
</style>
