<template>
    <div class="squads-banner">
        <div class="squads-banner__text">
            {{ desc }}
        </div>
        <router-link
            v-if="
            !roles.roles.value.detachment_commander && currentUser.currentUser.value || roles.roles.value.educationalheadquarter_commander || roles.roles.value.regionalheadquarter_commander ||
                roles.roles.value.localheadquarter_commander || roles.roles.value.districtheadquarter_commander ||
                roles.roles.value.centralComId
            "
            :to="{ name: name }"
            :target="target"
            ><p v-if="button"  class="create">{{ label }}</p></router-link
        >
        <router-link
            v-if="
                roles.roles.value.regionalheadquarter_commander ||
                roles.roles.value.localheadquarter_commander ||
                roles.roles.value.districtheadquarter_commander ||
                roles.roles.value.centralComId
            "
            :to="{ name: name }"
            ><p v-if="educCom" class="create">{{ label }}</p></router-link
        >
        <router-link
            v-if="
                roles.roles.value.districtheadquarter_commander ||
                roles.roles.value.centralComId
            "
            :to="{ name: name }"
            ><p v-if="regCom" class="create">{{ label }}</p></router-link
        >
        <router-link
            v-if="
                roles.roles.value.regionalheadquarter_commander ||
                roles.roles.value.districtheadquarter_commander ||
                roles.roles.value.centralComId
            "
            :to="{ name: name }"
            ><p v-if="locCom" class="create">{{ label }}</p></router-link
        >
      <router-link
          v-if="roles.roles.value.detachment_commander || roles.roles.value.localheadquarter_commander"
          :to="{ name: name }">
        <p v-if="eventCreate" class="create">{{ label }}</p>
      </router-link>

    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRoleStore } from '@layouts/store/role';
import { useUserStore } from '@features/store/index';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const currentUser = storeToRefs(userStore);
const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);
const props = defineProps({
    label: {
        type: String,
        default: 'lorem ipsum',
    },
    name: {
        type: String,
        default: 'CreateLSO',
    },
    desc: {
        type: String,
        default: 'lorem ipsum s',
    },
    button: {
        type: Boolean,
        default: false,
    },
    locCom: {
        type: Boolean,
        default: false,
    },
    regCom: {
        type: Boolean,
        default: false,
    },
    educCom: {
        type: Boolean,
        default: false,
    },
    actionCom: {
        type: Boolean,
        default: false,
    },
    target: {
      type: String,
      default: ''
    },
    eventCreate: {
      type: Boolean,
      default: false,
    }
});

// watch(
//     () => roles.roles.value,

//     (newRole) => {
//         if (Object.keys(roles.roles.value).length === 0) {
//             return;
//         }
//         roleStore.getRoles();
//     },
// );
</script>
<style lang="scss" scoped>
.squads-banner {
    padding: 26px 40px;
    background-image: url('@app/assets/createBanner.png');
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 10px;
    margin: 40px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
        padding: 34px 80px 34px 20px;
    }
    @media screen and (max-width: 575px) {
        padding: 18px 20px 18px 20px;
    }
    &__text {
        color: #ffffff;
        font-size: 29px;
        font-family: 'Akrobat';
        width: 740px;
        @media screen and (max-width: 1024px) {
            font-size: 24px;
            width: 64%;
        }
        @media screen and (max-width: 768px) {
            font-size: 24px;
            width: 100%;
            margin-bottom: 20px;
        }
        @media screen and (max-width: 575px) {
            font-size: 20px;
        }
    }
}

.create {
    background-color: #ffffff;
    padding: 16px 40px;
    border-radius: 10px;
}
</style>
