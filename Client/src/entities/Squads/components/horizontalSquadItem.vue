<template>
    <div v-if="props.competition === true" class="CompItem">
        <div class="CompItem_wrapper"> <router-link v-if="member.detachment"
                :to="{ name: 'lso', params: { id: member.detachment.id } }" class="CompItem_item">
                <div class="horizontal-img">
                    <img :src="member.detachment?.banner" alt="logo" v-if="member.detachment?.banner" />
                    <img src="@app/assets/hq-emblem.png" alt="logo" v-else />
                </div>
                <div class="containerHorizontal">
                    <p class="horizontal-item-title">
                        {{ member.detachment?.name }}
                    </p>
                </div>
            </router-link>

            <router-link :to="{ name: 'lso', params: { id: member.junior_detachment.id } }" class=" CompItem_item">
                <div class="horizontal-img">
                    <img :src="member.junior_detachment?.banner" alt="logo" v-if="member.junior_detachment?.banner" />
                    <img src="@app/assets/hq-emblem.png" alt="logo" v-else />
                </div>
                <div class="containerHorizontal">
                    <p class="horizontal-item-title">
                        {{ member.junior_detachment?.name }}
                    </p>
                </div>
            </router-link>
        </div>

        <div class="reg_wrap">
            <div class="regItem" v-if="member?.junior_detachment !== null">
                <p class="horizontal-item-title">
                    {{ member.junior_detachment?.regional_headquarter_name }}
                </p>
            </div>
            <div class="regItem_img">
                <img src="@app/assets/hq-emblem.png" alt="image">
            </div>
            <div class="mini" v-if="rating">
                <p v-if="place.place">Место в рейтинге: {{ place.place }}</p>
                <p v-else>Место в рейтинге: -</p>
            </div>
        </div>

    </div>

    <div v-else-if="props.competition === false">
        <router-link class="horizontal-item" :to="{ name: 'lso', params: { id: squad.id } }">
            <div class="horizontal-img">
                <img :src="squad.emblem" alt="logo" v-if="squad.emblem" />
                <img src="@app/assets/hq-emblem.png" alt="logo" v-else />
            </div>
            <div class="containerHorizontal ml-2">
                <p class="horizontal-item-title">{{ squad.name }}</p>
            </div>
        </router-link>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { HTTP } from '@app/http';
import { useRoleStore } from '@layouts/store/role';
const props = defineProps({
    squad: {
        type: Object,
        required: true,
    },
    rating: {
        type: Boolean,
        default: false,
    },
    competition: {
        type: Boolean,
        default: false,
    },
    member: {
        type: Object,
    },
});
const roleStore = useRoleStore();
const place = ref([]);

let id = props.member?.junior_detachment?.id;

const getPlaces = async () => {
    const response = await HTTP.get(`detachments/${id}/competitions/1/place/`);
    let data = response.data;
    place.value = data;
};

onMounted(() => {
    if (props.competition) {
        getPlaces();
    }
});
</script>
<style lang="scss" scoped>
.reg_wrap {
    display: flex;
    column-gap: 12px;
    width: 100%;
    @media screen and (max-width: 820px) {
    //   width: 100%;
      justify-content: center;
      align-items: center;
    }
}

.regItem {
    width: 100%;
    height: 48px;
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
    padding: 0px 12px;
    font-size: 16px;
    display: grid;
    font-family: 'Bert Sans';
    align-items: baseline;
    align-items: center;

    @media screen and (max-width: 820px) {
        display: none;
    }

    &_img {
        display: none;

        @media screen and (max-width: 820px) {
            display: flex;
            width: 100%;
            border: 1px solid #b6b6b6;
            background: #fff;
            border-radius: 10px;
            justify-content: center;
            align-items: center;
            max-width: 60px;
            height: 48px;

        }

        img {
            width: 38px;
            height: 38px;
        }
    }
}

.CompItem {
    display: flex;
    column-gap: 12px;


    @media screen and (max-width: 820px) {
        // align-items: flex-start;
         margin-bottom: 20px;
        flex-direction: column;
        align-items: center;
    }

    @media screen and (max-width: 575px) {
        flex-direction: column;
        align-items: center;
    }

    &_item {
        width: 252px;
        max-width: 100%;
        height: 48px;
        display: grid;
        grid-template-columns: auto 1fr auto auto;
        align-items: baseline;
        font-family: 'Bert Sans';
        align-items: center;
        padding: 4px 20px;

        border-radius: 10px;
        border: 1px solid #b6b6b6;
        background: #fff;
        margin-bottom: 12px;

        @media screen and (max-width: 820px) {
            width: 100%;
            max-width: 100%;
            font-size: 12px;
        }

    }

    &_wrapper {
        display: flex;
        column-gap: 12px;


        // @media screen and (max-width: 820px) {
        //     display: grid;
        //     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        // }
        @media screen and (max-width: 820px) {
          width: 100%;
          grid-template-columns: 1fr;
        }
    }
}

.horizontal {
    &-item {
        display: grid;
        grid-template-columns: auto 1fr auto auto;
        align-items: baseline;
        align-items: center;
        // width: 100%;
        padding: 4px 20px;

        border-radius: 10px;
        border: 1px solid #b6b6b6;
        background: #fff;
        margin-bottom: 12px;

        &-title {
            margin-left: 10px;
        }
    }

    &-img {
        img {
            width: 40px;
            height: 40px;
            border-radius: 100%;
        }
    }
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 575px) {
        flex-wrap: wrap;
        justify-content: space-between;
        margin-left: 10px;
    }
}

.mini {
    width: 100%;
    max-width: 180px;
    height: 48px;
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
    margin-bottom: 12px;
    font-family: 'Bert Sans';
    font-size: 16px;
    padding: 0px 20px;
    @media screen and (max-width: 820px) {
     max-width: 100%;
     padding: 16px 20px;
     font-size: 12px;
     margin-bottom: 0;

    }
}
</style>
