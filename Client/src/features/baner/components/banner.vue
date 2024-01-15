<template>
    <div class="user-metric">
        <bannerPhoto :banner="user?.media?.banner" v-if="user"></bannerPhoto>
        <Avatar :avatar="user?.media?.photo" v-if="user"></Avatar>
        <div class="user-metric__bottom">
            <!-- Данные пользователя  -->
            <div class="user-data__wrapper" v-if="user">
                <div v-if="user" class="user-data__name">
                    <p>{{ user.last_name }}</p>
                    <p>{{ user.first_name }}</p>
                    <p>{{ user.patronymic_name }}</p>
                </div>

                <div class="user-data__list-wrapper">
                    <ul class="user-data__list">
                        <li class="user-data__title"><p>Кандидат</p></li>
                        <li class="user-data__regional-office">
                            <p>{{ user?.user_region?.reg_town }}</p>
                            <!-- <span v-if="user?.user_region?.reg_region"
                                >{{
                                    regionals[user?.user_region?.reg_region - 1]
                                        ?.name
                                }}
                            </span> -->
                        </li>
                        <li v-if="education">
                            <p>{{ user?.education?.study_faculty }}</p>
                        </li>

                        <li v-if="education">
                            <p>{{ user?.education?.study_specialty }}</p>
                        </li>

                        <li v-if="education">
                            <p>Курс {{ user?.education?.study_year }}</p>
                        </li>
                    </ul>
                </div>
                <div class="user-data__contact">
                    <p>{{ user.phone_number }}</p>
                    <p class="ml-5">{{ user.email }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { testUpload, Avatar } from '@shared/components/imagescomp';
import { bannerPhoto } from '@shared/components/imagescomp';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';

const props = defineProps({
    banner: {
        type: String,
    },
    avatar: {
        type: String,
    },
    edited: {
        type: Boolean,
    },
    user: {
        type: Object,
    },
    currentUser: {
        type: Object,
    },
    education: {
        type: Object,
    },
    user_region: {
        type: Object,
    },
});

const user_region = ref({});
const regionals = ref([]);


const getRegionals = async () => {
    await HTTP.get(`/regionals/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            regionals.value = response.data;
            console.log(regionals.value);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};
</script>
<style lang="scss" scoped>
.profile-settings-top {
    padding-top: 40px;
    margin-bottom: 40px;
}

.user-metric {
    display: grid;
    grid-template-columns: 30px 135px 135px 2fr 16px;
    grid-template-rows: 100px 100px 112px auto;
    margin-bottom: 40px;
    /*  */
    border-radius: 10px 10px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(244, 244, 244, 0);
}

.ps__title {
    margin: 40px 0;
}

// .ps__title h2 {
//     /* Desktop/H-1 */
//     font-family: 'Akrobat';
//     font-size: 52px;
//     font-style: normal;
//     font-weight: 700;
//     line-height: normal;
//     color: #35383f;

// }

.user-metric__bottom {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 3;
    grid-row-end: 5;
    padding: 36px 38px 32px 300px;
    @media screen and (max-width: 768px) {
        padding: 116px 90px 36px 60px;
    }
    @media screen and (max-width: 575px) {
        padding: 116px 14px 32px 14px;
    }
}

/* Данные пользователя */
.user-data__wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.user-data__name {
    display: flex;
    margin-bottom: 32px;
    @media screen and (max-width: 768px) {
        margin-bottom: 20px;
    }
    @media screen and (max-width: 575px) {
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
}

.user-data__contact {
    display: flex;
    p {
        color: #35383f;
    }
    @media screen and (max-width: 575px) {
        flex-direction: column;
        align-items: center;
    }
}

.user-data__name p {
    color: #35383f;
    /* Desktop/H-3 */
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #35383f;
    margin-right: 8px;
}

.user-data__list-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 700px;
    margin-bottom: 32px;
    @media screen and (max-width: 768px) {
        margin-bottom: 20px;
    }
}

.user-data__list-wrapper ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
    @media screen and (max-width: 575px) {
        justify-content: center;
    }
}

.user-data__list-wrapper li {
    border-right: 1px solid #35383f;
    height: 20px;
    margin: auto 3px;
}

.user-data__list-wrapper li:last-child {
    border-right: none;
}

.user-data__list p,
.user-data__list time {
    color: #35383f;
    /*  */
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 5px;
}

.user-data__introductions {
    display: flex;
    align-items: center;
}

.user-data__introductions p,
.user-data__introductions img {
    margin-right: 5px;
}
</style>
