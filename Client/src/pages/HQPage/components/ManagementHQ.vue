<template>
    <section class="headquarters-management">
        <h3>{{ head }}</h3>
        <div class="headquarters-management__container">
            <div class="link" @click="linkUsers()">
                <div class="manager-card">
                    <div class="manager-card__avatar">
                        <img :src="props.commander?.avatar?.photo" alt="фото" v-if="props.commander?.avatar?.photo" />
                        <img class="img_alt" src="@app/assets/user-avatar-manage.png" alt="photo" v-else />
                    </div>
                    <div class="manager-card__box">
                        <p id="name_length">
                            {{ props.commander?.first_name }}
                            {{ props.commander?.patronymic_name }}
                            {{ props.commander?.last_name }}
                        </p>
                        <p>Командир</p>
                    </div>
                </div>
            </div>
            <div class="link" @click="linkUsers(manager)" :key="manager" v-for="(manager, index) in props.leadership">
                <div class="manager-card" :class="{
                    'align-left': index % 2 === 0,
                    'align-right': index % 2 !== 0,
                }">
                    <div class="manager-card__avatar">
                        <img :src="manager.user?.avatar?.photo" alt="фото" v-if="manager.user?.avatar?.photo" />
                        <img src="@app/assets/user-avatar.png" alt="photo" v-else />
                    </div>
                    <div class="manager-card__box">
                        <h5 id="name_length">
                            {{ manager?.user?.first_name }}
                            {{ manager?.user?.patronymic_name }}
                            {{ manager?.user?.last_name }}
                        </h5>
                        <p>{{ manager.position.name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useUserStore } from '@features/store';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();
const props = defineProps({
    member: {
        type: Array,
    },
    position: {
        type: Object,
    },
    commander: {
        type: Object,
    },
    head: {
        type: String,
    },
    leadership: {
        type: Array,
    },
});

const linkUsers = (item) => {
    if (item) {
        if (item.user.id === userStore.currentUser.id) {
            router.push({ name: 'mypage' })
        } else {
            router.push({ name: 'userpage', params: { id: item.user.id } })
        }
    } else {
        if (props.commander.id === userStore.currentUser.id) {
            router.push({ name: 'mypage' })
        } else {
            router.push({ name: 'userpage', params: { id: props.commander.id } })
        }
    }

}

</script>

<style scoped lang="scss">
section.headquarters-management {
    margin-bottom: 60px;
}

.link {
    cursor: pointer;
}

section.headquarters-management h3 {
    color: #35383f;
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.headquarters-management__container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 40px;
}

.manager-card {
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    /*  */
    padding: 24px 20px;
    width: 280px;
    height: 100%;
}

.card-position {
    margin-right: 0px;
}

.manager-card__avatar {
    display: flex;
    justify-content: center;
}

.manager-card__avatar img {
    width: 120px;
    height: 120px;
    border-radius: 100%;
    object-fit: cover;
    overflow: hidden;
}

.manager-card__box {
    width: 240px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.manager-card__box #name_length {
    color: #35383f;
    text-align: center;
    font-family: 'Akrobat';
    font-size: 24px;
    font-weight: lighter;
    // font-weight: normal;
    line-height: normal;
    /*  */
    margin-bottom: 16px;
}

.manager-card__box p {
    color: #676767;
    font-family: 'Akrobat';
    text-align: center;
    font-size: 16px;
    font-weight: normal;
    line-height: 22.4px;
}

// адаптив
@media (max-width: 965px) {
    .headquarters-management__container {
        justify-items: center;
        column-gap: 40px;
    }

    .manager-card.align-left {
        margin-left: auto;
    }

    .manager-card.align-right {
        margin-right: auto;
    }
}

@media (max-width: 648px) {
    .manager-card.align-left {
        margin-left: 0;
    }

    .manager-card.align-right {
        margin-right: 0;
    }
}



@media screen and (min-width: 320px) and (max-width: 480px) {
    .manager-card {
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    padding: 24px 20px;
    width: 100%;
    height: 100%;
}
    .manager-card__box {
    width: 216px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
    .manager-card__box p{
    color: #676767;
    font-family: 'Akrobat';
    text-align: center;
    font-size: 16px;
    font-weight: normal;
    line-height: 22.4px;
    }
}
</style>
