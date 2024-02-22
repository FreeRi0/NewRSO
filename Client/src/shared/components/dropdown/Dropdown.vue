<template>
    <div class="dropdown" @click="isOpen = !isOpen">
        <div class="dropdown__overlay" v-if="isOpen"></div>

        <button class="dropdown__button" type="button">
            <span>{{ title }}</span>

            <div v-if="image" class="dropdown__box-image">
                <img v-if="url" :src="url" :alt="desc" />
                <img
                    v-else
                    src="@app/assets/user-avatar.png"
                    alt="Фото бойца (заглушка)"
                />
            </div>

            <transition name="fade" appear>
                <div>
                    <svg
                        v-if="!isOpen"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M19.9201 8.94922L13.4001 15.4692C12.6301 16.2392 11.3701 16.2392 10.6001 15.4692L4.08008 8.94922"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M4.07992 15.0508L10.5999 8.53078C11.3699 7.76078 12.6299 7.76078 13.3999 8.53078L19.9199 15.0508"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </transition>
        </button>

        <transition name="fade" appear>
            <ul class="dropdown__list" v-if="isOpen">
                <li
                    v-for="(item, i) in items"
                    :key="i"
                    class="dropdown__item dropdown__item_not"
                    v-show="
                        item.show &&
                        (item.button ||
                            item.link ||
                            !item.hasOwnProperty('params') ||
                            (item.hasOwnProperty('params') && item.params.id))
                    "
                >
                    <button
                        class="dropdown__button-item"
                        v-if="item.button"
                        @click="LogOut"
                    >
                        {{ item.title }}
                    </button>
                    <a
                        v-else-if="item.link"
                        class="dropdown__link"
                        :href="item.link"
                        >{{ item.title }}</a
                    >

                    <router-link
                        v-else-if="
                            item.hasOwnProperty('params') && item.params.id
                        "
                        class="dropdown__link"
                        :to="{ name: item.name, params: item.params }"
                        >{{ item.title }}</router-link
                    >

                    <router-link
                        v-else-if="!item.hasOwnProperty('params')"
                        class="dropdown__link"
                        :to="{ name: item.name }"
                        >{{ item.title }}</router-link
                    >
                    <router-link
                        v-else-if="
                            !item.hasOwnProperty('params') &&
                            (roles.roles.value.regionalheadquarter_commander ||
                                roles.roles.value.detachment_commander)
                        "
                        class="dropdown__link"
                        :to="{ name: item.name }"
                        ><p>
                            {{ item.title }}
                        </p></router-link
                    >
                </li>
            </ul>
        </transition>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useRoleStore } from '@layouts/store/role';
import { storeToRefs } from 'pinia';
const emit = defineEmits(['updateUser']);
const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);
const router = useRouter();
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    image: {
        type: Boolean,
        default: false,
    },
    url: {
        type: String,
        default: '',
    },
    desk: {
        type: String,
        default: '',
    },
    items: {
        type: Array,
        default: () => [],
    },
    isOpen: {
        type: Boolean,
        default: false,
    },
    params: {
        type: String,
        //   default: () => ({}),
    },
    detCom: {
        type: Boolean,
        default: false,
    },
    regCom: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        default: '',
    },
    link: {
        type: String,
        default: '',
    },
    button: {
        type: Boolean,
        default: false,
    },
});

// const route = useRoute();
// let id = route.params.id

const LogOut = () => {
    localStorage.removeItem('Token');
    emit('updateUser', {});
    router.push('/');
};
</script>

<style lang="scss">
// .dropdown .dropdown-list {
//   transform: translateX(-50%);
// }

.dropdown {
    z-index: 2;

    &__overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    &__box-image {
        border-radius: 50%;
        height: 56px;
        overflow: hidden;

        img {
            width: 100%;
            height: auto;
        }
    }

    &__button-item {
        color: #ffffff;
        padding: 11px 0;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.dropdown__item_not::before {
    background-color: inherit;
}
</style>
