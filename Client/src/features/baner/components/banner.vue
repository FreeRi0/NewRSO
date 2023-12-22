<template>
    <div class="user-metric">
        <bannerPhoto :banner="user?.media?.banner"></bannerPhoto>
        <Avatar :avatar="user?.media?.photo"></Avatar>
        <div class="user-metric__bottom">
            <!-- Данные пользователя  -->
            <div class="user-data__wrapper">
                <div v-if="user" class="user-data__name">
                    <h4>{{ user.first_name }}</h4>
                    <h4>{{ user.last_name }}</h4>
                    <!-- <slot name="banner"></slot> -->
                </div>
                <h4 v-if="user">{{ user.email }}</h4>
                <div></div>

                <div class="user-data__list-wrapper">
                    <ul class="user-data__list">
                        <li class="user-data__title"><p>Кандидат</p></li>
                        <li v-if="education">
                            <p>{{ education.study_faculty }}</p>
                        </li>
                        <li v-if="education">
                            <p>{{ education.study_specialty }}</p>
                        </li>
                        <li v-if="education">
                            <p>Курс{{ education.study_year }}</p>
                        </li>
                        <li v-if="region" class="user-data__regional-office">
                            <p>{{ region.name }}</p>
                        </li>
                    </ul>
                </div>
                <!-- Контакты пользователя  -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { testUpload, Avatar } from '@shared/components/imagescomp';
import { bannerPhoto } from '@shared/components/imagescomp';
import { HTTP } from '@app/http';
import { useRoute} from 'vue-router';


// let user = ref({});
// let education = ref(null);
// let region = ref(null);
// const route = useRoute();
// const id = route.params.id;


const props = defineProps({
    banner: {
        type: String
    },
    avatar: {
        type: String
    },

    user: {
        type: Object,
    },
    education: {
        type: Object,
    }
})
// const getUser = async () => {
//     await HTTP.get(`/rsousers/${id}/`, {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token ' + localStorage.getItem('Token'),
//         },
//     })
//         .then((response) => {
//             user.value = response.data;
//             console.log(user.value);
//         })
//         .catch(function (error) {
//             console.log('an error occured ' + error);
//         });
// };

// const getAuthUser = async () => {
//     await HTTP.get('/rsousers/me/', {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token ' + localStorage.getItem('Token'),
//         },
//     })
//         .then((response) => {
//             user.value = response.data;
//             console.log(user.value);
//         })
//         .catch(function (error) {
//             console.log('an error occured ' + error);
//         });
// }

// const getEducation = async () => {
//     await HTTP.get('/users/me/education', {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token ' + localStorage.getItem('Token'),
//         },
//     })
//         .then((response) => {
//             education.value = response.data;
//             console.log(education.value);
//         })
//         .catch(function (error) {
//             console.log('an error occured ' + error);
//         });
// };

// const getRegion = async () => {
//     await HTTP.get('/regions/', {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token ' + localStorage.getItem('Token'),
//         },
//     })
//         .then((response) => {
//             region.value = response.data;
//             console.log(region.value);
//         })
//         .catch(function (error) {
//             console.log('an error occured ' + error);
//         });
// };






// onMounted(() => {
//     // getUser()
//     // getAuthUser()
//     // getEducation();
//     // getRegion();
// });



// const getRegion = async (id) => {
//     await HTTP
//         .get('regions/{id}/', {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Token ' + localStorage.getItem('Token'),
//             },
//         })
//         .then((response) => {
//             region.value = response.data;
//             console.log(region.value);
//         })
//         .catch(function (error) {
//             console.log('an error occured ' + error);
//         });
// };
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

.ps__title h2 {
    /* Desktop/H-1 */
    font-family: 'Akrobat';
    font-size: 52px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: #35383f;
}

.user-metric__bottom {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 3;
    grid-row-end: 5;
}

/* Данные пользователя */
.user-data__wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 32px 0 32px 300px;
}

.user-data__name {
    margin-bottom: 32px;
}

.user-data__name h4 {
    color: #35383f;
    /* Desktop/H-3 */
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #35383f;
}

.user-data__list-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 700px;
    margin-bottom: 32px;
}

.user-data__list-wrapper ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
}

.user-data__list-wrapper li {
    border-right: 1px solid #35383f;
    height: 20px;
    margin: auto 5px;
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
