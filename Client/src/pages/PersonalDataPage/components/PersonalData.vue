<template>
    <div class="container">
        <div class="mt-14">
            <h2 class="profile-title">Настройки профиля</h2>
            <MyWall
                :user="currentUser.currentUser.value"
                :education="education"
                class="mt-3"
                @upload-wall="uploadWall"
                @update-wall="updateWall"
                @upload="uploadAva"
                @update="updateAva"
                @updateUserData="updateUser"
                @updateEducData="updateEduc"
            ></MyWall>
            <!--Табы-->
            <div class="d-flex mt-9 mb-9 buttonWrap">
                <button
                    class="contributorBtn"
                    :class="{ active: picked === tab.name }"
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="picked = tab.name"
                >
                    {{ tab.name }}
                </button>
            </div>
            <AccordionsPersonal
                v-if="picked == 'Персональные данные'"
                :button="true"
                :user="currentUser.currentUser.value"
                @updateUserData="updateUser"
                @updateRegionData="updateRegion"
                @updateDocData="updateDoc"
                @updateEducData="updateEduc"
                @updateFileData="updateFile"
                @updateStatus="updateStatus"
                @updateParentData="updateParent"
            ></AccordionsPersonal>
            <userData
                @uploadUserPic="uploadUserPic"
                @changeBio="changeBio"
                v-else-if="picked == 'Моя страница' || picked == ''"
            ></userData>
            <privateProfile
                v-else-if="picked == 'Настройки приватности'"
            ></privateProfile>
            <changePassword
                @changeUsername="changeUsername"
                v-else-if="picked == 'Логин и пароль'"
            ></changePassword>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { AccordionsPersonal } from '@features/PersonalAccordions/components';
import { privateProfile } from '@features/PrivateProfile/components';
import { changePassword } from '@features/ChangePassword/components';
import { MyWall } from '@features/baner/components';
import { HTTP } from '@app/http';
import { useUserStore } from '@features/store/index';
import { storeToRefs } from 'pinia';
import { userData } from '@features/userData/components';

const userStore = useUserStore();
const currentUser = storeToRefs(userStore);

const uploadAva = (imageAva) => {
    console.log('photo', imageAva);
    currentUser.currentUser.value.media.photo = imageAva;
};

const updateAva = (imageAva) => {
    console.log('photoUpdate', imageAva);
    currentUser.currentUser.value.media.photo = imageAva;
};

const uploadWall = (imageWall) => {
    console.log('ban', imageWall);
    currentUser.currentUser.value.media.banner = imageWall;
};

const updateWall = (imageWall) => {
    console.log('banUpdate', imageWall);
    currentUser.currentUser.value.media.banner = imageWall;
};

const updateUser = (userData) => {
    console.log('UserUpdate', userData);
    currentUser.currentUser.value = userData;
};
const updateRegion = (userRegion) => {
    console.log('UserRegion', userRegion);
    currentUser.currentUser.value.user_region = userRegion;
};
const updateDoc = (userDoc) => {
    console.log('UserDoc', userDoc);
    currentUser.currentUser.value.documents = userDoc;
};
const updateEduc = (userEduc) => {
    console.log('UserEduc', userEduc);
    currentUser.currentUser.value.education = userEduc;
};
const updateFile = (userFile) => {
    console.log('UserFile', userFile);
    currentUser.currentUser.value.statement = userFile;
};
const updateStatus = (userStatus) => {
    console.log('UserStatus', userStatus);
    currentUser.currentUser.value.sent_verification = userStatus;
};
const updateParent = (userParent) => {
    console.log('userParent', userParent);
    currentUser.currentUser.value.parent = userParent;
};

const uploadUserPic = (userPic) => {
    console.log('photoUser', userPic);
    currentUser.currentUser.value.media.photo1 = userPic;
    console.log('Phot Uploadeddd');
};

const changeBio = (bio) => {
    console.log('bio', bio);
    currentUser.currentUser.value.bio = bio;
};

const changeUsername = (username) => {
    console.log('username', username);
    currentUser.currentUser.value.username = username;
};

// const updateUserPic = (userPic) => {
//     console.log('photoUpdate', userPic);
//     user.user.value.media.photo1 = userPic;

// };
// const updateForeign = (userForeign) => {
//     console.log('UserForeign', userForeign);
//     user.value.sent_verification = userForeign
// }
const education = ref({});

const picked = ref('Персональные данные');
const tabs = ref([
    {
        id: '1',
        name: 'Моя страница',
    },
    {
        id: '2',
        name: 'Персональные данные',
    },
    {
        id: '3',
        name: 'Настройки приватности',
    },
    {
        id: '4',
        name: 'Логин и пароль',
    },
]);
const pages = ref([
    { pageTitle: 'Личный кабинет', href: '#' },
    { pageTitle: 'Настройка профиля', href: '#' },
]);
</script>
<style lang="scss" scoped>
.profile-title {
    font-size: 40px;
    margin-bottom: 40px;
}

.contributorBtn {
    border-radius: 30px;
    background-color: white;
    color: #1c5c94;
    border: 1px solid #1c5c94;
    margin: 0px;
    padding: 10px 24px;
    width: 100%;
    margin: 7px;
    @media screen and (max-width: 768px) {
        padding: 8px 20px;
    }
}
.buttonWrap {
    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
    }
}

.active {
    background-color: #1c5c94;
    color: white;
}
.v-icon {
    color: white;
}
</style>
