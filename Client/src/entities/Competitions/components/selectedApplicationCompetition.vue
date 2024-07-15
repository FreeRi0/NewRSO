<template>
    <div>
        <div class="horizontallso">
            <router-link v-if="!event.group" class="horizontallso-item__wrapper " :to="{
                name: 'PersonalDataUser',
                params: { id: event.user.id },
            }">
                <div class="horizontallso-img">
                    <img :src="event?.user?.avatar?.photo" alt="logo" v-if="event?.user?.avatar?.photo" />
                    <img v-else src="@app/assets/user-avatar.png" alt="photo" />
                </div>
                <div class="containerHorizontal">
                        <div class="d-flex">
                            <p class="horizontallso-item__list-full">
                                {{ event.user.last_name }} {{ event.user.first_name }} {{ event.user.patronymic_name }}
                            </p>
                        </div>
                </div>
            </router-link>
            <div class="horizontallso-item__wrapper" v-else>
                <div class="horizontallso-img">
                    <img v-if="event.headquarter_author.banner" :src="event.headquarter_author.banner" alt="logo" />
                    <img v-else src="@app/assets/user-avatar.png" alt="photo" />
                </div>
                <div class="containerHorizontal">
                        <div class="d-flex">
                            <p class="horizontallso-item__list-full">
                                {{ event.headquarter_author.name }}
                            </p>
                        </div>
                </div>
            </div>

            <div class="horizontallso-item__wrapper" v-if="width>660">
                <div class="containerHorizontal">
                    <div class="d-flex">
                        <p class="horizontallso-item__list-full">
                            {{ event.event.application_type }}
                        </p>
                    </div>
                </div>
            </div>

            <router-link class="horizontallso-item__wrapper " :to="{
                name: 'ActionData',
                params: { id: event.event.id },
            }">
                <div class="horizontallso-img">
                    <img :src="event.event.banner" alt="logo" v-if="event.event.banner" />
                    <img src="@app/assets/user-avatar.png" alt="photo" v-else />
                </div>
                <div class="containerHorizontal" v-if="width>500">
                    <p class="horizontallso-item__list-full evname">
                        {{ event.event.name }}
                    </p>
                </div>
            </router-link>
        </div>
        

        <div class="second_line">
            <div></div>
            <div class="horizontallso-item__wrapper" style="margin-bottom: 0px;">{{ action }}</div>
            <div class="horizontallso__confidant">
                <input type="checkbox" v-model="checked" @change="updateCheckEvents" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    event: {
        type: Object,
        required: true,
    },
    action: {
        type: String,
        default: '',
    },
});

const width = ref();

const checked = ref(true);

const emit = defineEmits({
    select: null,
});

const updateCheckEvents = (e) => {
    emit('select', props.event, e.target.checked);
};

const onResize = () => {
    width.value = window.innerWidth;
    console.log(width.value);
};

onMounted(() => {
    onResize();
    window.addEventListener('resize', onResize);
});
</script>

<style lang="scss" scoped>
.horizontallso {
    display: grid;
    width: 100%;
    grid-gap: 12px;
    grid-template-columns: minmax(268px, 528px) 164px 1fr;

    &-img {
        align-items: center;
        width: 36px;
        height: 36px;
        justify-content: start;

        img {
            display: flex;
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

.second_line {
    display: grid;
    margin-bottom: 12px;
    grid-gap: 12px;
    grid-template-columns: 1fr 164px 48px;
    justify-self: end;
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
    width: 100%;
}

.actionVal {
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    padding: 12px 70px;
    height: 48px;
    margin-left: 12px;
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

.evname {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
</style>
