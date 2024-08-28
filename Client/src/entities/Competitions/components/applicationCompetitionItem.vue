<template>
    <div class="horizontallso">
        <div class="horizontallso__confidant ">
            <input type="checkbox" v-model="checked" @change="updateCheckEvents" />
        </div>

        <router-link v-if="event.personal" class="horizontallso-item__wrapper " :to="{
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
        <!-- <router-link v-else class="horizontallso-item__wrapper" :to="{
            name: 'DetachmentData',
            params: { id: event.headquarter_author.id },
        }"> -->
        <div v-else class="horizontallso-item__wrapper">
            <div class="horizontallso-img">
                <img v-if="event.headquarter_author?.banner" :src="event.headquarter_author.banner" alt="logo" />
                <img v-else-if="event.emblem" :src="event.emblem" alt="logo" />
                <img v-else src="@app/assets/user-avatar.png" alt="photo" />
            </div>
            <div class="containerHorizontal">
                    <div class="d-flex">
                        <p class="horizontallso-item__list-full" v-if="event.headquarter_author">
                            {{ event.headquarter_author.name }}
                        </p>
                        <p class="horizontallso-item__list-full" v-else>
                            {{ event.headquarter_name }}
                        </p>
                    </div>
            </div>
        </div>
        <!-- </router-link> -->

        <div class="horizontallso-item__events " v-if="width > 768" @click="onEvent">
            <div class="containerHorizontal">
                <div class="d-flex">
                    <p class="horizontallso-item__list-full" v-if="event.group">
                        Групповая
                    </p>
                    <p class="horizontallso-item__list-full" v-else-if="event.personal">
                        Индивидуальная
                    </p>
                    <p class="horizontallso-item__list-full" v-else-if="event.multi">
                        Многоэтапная
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
            <div class="containerHorizontal"  v-if="width > 600">
                <p class="horizontallso-item__list-full evname">
                    {{ event.event.name }}
                </p>
            </div>
        </router-link>        
    </div>
    <div class="second_line">
        <div class="horizontallso-item__events" v-if="width < 768" @click="onEvent">
            <div class="containerHorizontal">
                <div class="d-flex">
                    <p class="horizontallso-item__list-full" v-if="event.group">
                        Групповая
                    </p>
                    <p class="horizontallso-item__list-full" v-else-if="event.personal">
                        Индивидуальная
                    </p>
                    <p class="horizontallso-item__list-full" v-else-if="event.multi">
                        Многоэтапная
                    </p>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoleStore } from '@layouts/store/role';
import { useRouter } from 'vue-router';

const router = useRouter();

const width = ref();

const roleStore = useRoleStore();
roleStore.getRoles();

const props = defineProps({
    event: {
        type: Object,
        required: true,
    }
});

console.log(props.event);

const emit = defineEmits({
    select: null,
});
const checked = ref(false);

const onEvent = () => {
    if(props.event.group){
        router.push({
            name: `GroupPage`,
            params: {
                id: props.event.organizer_id,
                eventId: props.event.event.id,
            },
    });
    } else if (props.event.multi){
        router.push({
            name: `MultiPage`,
            params: {
                id: props.event.id,
                eventId: props.event.event.id,
            },
    });
    }
}

const updateCheckEvents = (e) => {
    emit('select', props.event, e.target.checked);
};

const onResize = () => {
    width.value = window.innerWidth;
};

watch(
    () => props.event.chosen,
    (newSelected) => {
        checked.value = newSelected;
    },
);

onMounted(() => {
    onResize();
    window.addEventListener('resize', onResize);
});
</script>

<style lang="scss" scoped>
.d-flex{
    display: flex !important;
    width: 100%;
}
.second_line {
    display: grid;
    grid-template-columns: 164px;
}
.horizontallso {
    display: grid;
    width: 100%;
    grid-gap: 12px;
    grid-template-columns: 48px minmax(268px, 528px) 164px minmax(65px, 404px);
    @media screen and (max-width: 768px){
        grid-template-columns: 48px minmax(268px, 528px) minmax(65px, 404px);
        // grid-template-rows: 1fr 1fr;
    }

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

.horizontallso-item__wrapper {
    display: grid;
    grid-template-columns: 36px minmax(122px ,438px);
    align-items: baseline;
    align-items: center;

    padding: 4px 20px;

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

.horizontallso-item__events{
    display: grid;
    grid-template-columns: minmax(122px ,438px);
    align-items: baseline;
    align-items: center;

    padding: 4px 20px;

    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
    margin-bottom: 12px;
    width: 100%;
    height: 46px;
}


.horizontallso-item__list-full {
    color: #35383f;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
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

.evname {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
