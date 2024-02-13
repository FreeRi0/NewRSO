<template>
     <div class="horizontalSquad">
        <router-link
            :to="{
                name: 'PersonalDataUser',
                params: { id: detachment.user.id },
            }"
            class="horizontalSquad-item__wrapper mr-3"
        >
            <div class="horizontalSquad-img">
                <img
                    :src="detachment?.user?.media?.photo"
                    alt="logo"
                    v-if="detachment?.user?.media?.photo"
                />
                <img src="@app/assets/user-avatar.png" alt="photo" />
            </div>
            <div class="containerHorizontal">
                <div class="d-flex">
                    <p class="horizontallso-item__list-full">
                        {{ detachment.user.last_name }}
                    </p>
                    <p class="horizontallso-item__list-full">
                        {{ detachment.user.first_name }}
                    </p>
                    <p class="horizontallso-item__list-full">
                        {{ detachment.user.patronymic_name }}
                    </p>
                </div>
                <div class="horizontallso-item__list-date">
                    <span
                        style="
                            border-left: 2px solid #b6b6b6;
                            padding-right: 8px;
                        "
                    ></span>
                    <p>{{ detachment.user.date_of_birth }}</p>
                </div>
            </div>
        </router-link>
        <div class="horizontalSquad-item__wrapper">
            <div class="horizontallso-img">
                <img :src="squad.emblem" alt="logo" v-if="squad.emblem" />
                <img src="@app/assets/hq-emblem.png" alt="photo" v-else />
            </div>
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{ squad.name }}
                </p>
            </div>
        </div>
        <div class="d-flex">
            <div class="horizontalSquad-item__wrapper">{{ action }}</div>

            <div class="horizontalSquad__confidant ml-3">
                <input
                    type="checkbox"
                    v-model="checked"
                    @change="updateSquads"
                />
            </div>
        </div>
    </div>
    <!-- <p v-if="isError" class="error">{{ isError.detail }}</p> -->
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { HTTP } from '@app/http';
import { useRoleStore } from '@layouts/store/role';
import { storeToRefs } from 'pinia';
const props = defineProps({
    detachment: {
        type: Object,
    },
    squad: {
        type: Object,
    },
    action: {
        type: String,
        default: '',
    },
});
const roleStore = useRoleStore();
roleStore.getRoles();
const roles = storeToRefs(roleStore);
const emit = defineEmits({
    select: null,
});
const updateSquads = (e) => {
    // console.log('dddddddft', checked.value);
    // emit('change', checked.value, props.detachment.id);
    emit('select', props.detachment, e.target.checked);
};

const checked = ref(true);
const squad = ref({});

const viewSquad = async () => {
    let id = roles?.roles?.value?.detachment_commander.id;
    console.log('roles', roles.roles.value);
    console.log('id', id);
    await HTTP.get(`/detachments/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            squad.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};
onMounted(() => {
    viewSquad();
});

console.log('squad', props.squad);
</script>
<style lang="scss" scoped>
.horizontalSquad {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 12px;
    // flex-wrap: wrap;
    // align-items: flex-start;
    &-img {
        align-items: center;
        width: 36px;
        height: 36px;
        justify-content: start;
        img {
            display: flex;
            width: 36px;
            height: 36px;
            border-radius: 100%;
            position: relative;
            align-items: center;
        }
    }
    &-info {
        border: 1px solid #b6b6b6;
        border-radius: 10px;
        padding: 11px 20px;
        height: 46px;
        text-align: center;

        width: 185px;
        p {
            display: block;
            font-size: 16px;
            font-weight: 400;
            color: #35383f;
        }
    }
}
.horizontalSquad-item__wrapper {
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
}
.horizontallso-img {
    img {
        width: 36px;
        height: 36px;
        border-radius: 100%;
    }
}
.horizontalSquad-item img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: cover;
}

.horizontalSquad-item p {
    margin-left: 10px;
}

.horizontallso-item__list-date {
    display: grid;
    grid-template-columns: auto 1fr 0fr;
}

.horizontalSquad-item__list-img {
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

.horizontalSquad__confidant {
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

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
