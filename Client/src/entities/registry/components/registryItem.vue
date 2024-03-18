<template>
    <router-link
        :to="{ name: item.route, params: { id: item.id } }"
        class="horizontal-item"
    >
        <div class="horizontal-img">
            <img :src="item.emblem" alt="logo" v-if="item.emblem" />
            <img
                :src="item.avatar?.photo"
                alt="logo"
                v-else-if="item.avatar?.photo"
            />
            <img src="@app/assets/hq-emblem.png" alt="logo" v-else />
        </div>
        <div class="containerHorizontal">
            <p
                class="headquarters-wrapper__item-category-full ml-2"
                v-if="item.name"
            >
                {{ item.name }}

            </p>
            <div
                class="d-flex"
                v-else-if="
                    item.first_name || item.last_name || item.patronymic_name
                "
            >
                <p class="horizontallso-item__list-full">
                    {{ item.last_name }}
                </p>
                <p class="horizontallso-item__list-full ml-1">
                    {{ item.first_name }}
                </p>
                <p class="horizontallso-item__list-full ml-1">
                    {{ item.patronymic_name }}
                </p>
            </div>
            <div
                class="horizontallso-item__list-date"
                v-if="item.date_of_birth"
            >
                <span
                    style="border-left: 2px solid #b6b6b6; padding-right: 8px"
                ></span>
                <p>{{ item.date_of_birth }}</p>
            </div>
        </div>
    </router-link>
    <div class="horizontal-info d-flex" v-if="showInfo">
        <p v-if="item.events_count">
            Проведённые мероприятия: {{ item.events_count }}
        </p>
        <div class="d-flex">
            <!-- <p v-if="item?.local_headquarter" class="mr-7">МШ:</p>
            <p v-if="item?.educational_headquarter" class="mr-7">ШОО:</p>
            <p v-if="item?.detachment" class="mr-7">ЛСО:</p> -->
            <p v-if="item.membership_fee === true">Членский Взнос: Оплачен</p>
            <p v-else-if="item.membership_fee === false">
                Членский Взнос: Неоплачен
            </p>
            <div class="d-flex" v-if="item.participants_count">
                <img src="@app/assets/icon/people.svg" alt="people" />
                <p class="ml-3">{{ item.participants_count }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    showInfo: {
        type: Boolean,
        default: false,
    },
});
</script>
<style lang="scss" scoped>
.horizontal {
    &-item {
        // border: 1px solid grey;
        // border-radius: 10px;
        // display: flex;
        // align-items: center;
        // margin-bottom: 12px;
        // padding: 4px 20px;

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
    &-info {
        border: 1px solid grey;
        border-radius: 0px 0px 10px 10px;
        padding: 12px;
        margin-bottom: 12px;
        margin-top: -12px;
        margin-left: 8px;
        margin-right: 8px;
        justify-content: space-between;
        p {
            color: #6a6a6a;
            font-size: 16px;
            font-weight: 500;
            font-style: acrobat;
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
    margin-left: 10px;
    @media (max-width: 1024px) {
        flex-direction: column;
        align-items: flex-start;
        margin-left: 8px;
    }
}

.horizontallso-item p {
    margin-left: 10px;
}

.horizontallso-item__list-date {
    display: grid;
    grid-template-columns: auto 1fr 0fr;
    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
}

.horizontallso-item__list-date p {
    color: #1c5c94;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
}
</style>
