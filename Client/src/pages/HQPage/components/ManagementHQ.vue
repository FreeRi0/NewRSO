<template>
    <section class="headquarters-management">
        <h3>{{ head }}</h3>
            <div class="headquarters-management__container">
                <div class="manager-card" v-for="(manager, index) in managers" :class="{'align-left': index % 2 === 0, 'align-right': index % 2 !== 0}">
                    <div class="manager-card__avatar">
                        <img :src="'./assets/headquarters/'+manager.image" alt="avatar"/>
                    </div>
                    <div class="manager-card__box">
                        <h5>{{ manager.name }}</h5>
                        <p>{{ manager.status }}</p>
                    </div>
                </div>
            </div>
        </section>
</template>

<script setup>
import {ref} from "vue"
const props = defineProps({
    head:{
        default: 'Руководство штаба',
    },
})
const managers = ref([
    {
        name:"Александрова Вероника Александровна",
        status:"Командир",
        image:'manager.png',
    },
    {
        name:"Александров Александр Александрович",
        status:"Комиссар",
        image:'manager2.png',
    },
    {
        name:"Александрова Катерина Александровна",
        status:"Мастер-методист",
        image:'manager3.png',
    },
    {
        name:"Петрова Александра Александровна",
        status:"Медик",
        image:'manager4.png',
    },
    
])
</script>
<style scoped lang="scss">
section.headquarters-management{
    margin-bottom: 60px;
}
    section.headquarters-management h3 {
    color: #35383F;
    font-family: "Akrobat";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.headquarters-management__container {
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 40px;
}

.manager-card {
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    /*  */
    padding: 24px 20px;
    width: 280px;
}

.card-position {
    margin-right: 0px;
}

.manager-card__avatar {
    display: flex;
    justify-content: center;
}

.manager-card__box {
    width: 240px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.manager-card__box h5 {
    color: #35383F;
    text-align: center;
    font-family: "BertSans";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    /*  */
    margin-bottom: 16px;
}

.manager-card__box p {
    color: #676767;
    text-align: center;
    font-family: "BertSans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
}

// адаптив
@media (max-width: 965px) {
    .headquarters-management__container{
        justify-items: center;
        column-gap: 40px;
    }
    .manager-card.align-left{
        margin-left: auto;
    }
    .manager-card.align-right {
        margin-right: auto;
    }
}

@media (max-width: 648px){
    .manager-card.align-left{
        margin-left: 0;
    }
    .manager-card.align-right {
        margin-right: 0;
    }
}

@media (max-width: 450px){
    .headquarters-management__container{
        grid-template-columns: repeat(auto-fill, minmax(156px, 1fr));
        column-gap: 16px;
        row-gap: 16px;
    }
    .manager-card{
        padding: 16px;
        width: 156px;
        height: 173px;
    }
    .manager-card__box{
        width: 127px;
    }
    .manager-card__box h5{
        font-size: 12px;
        margin-bottom: 8px;
    }
    .manager-card__box p{
        font-size: 12px;
    }
    .manager-card__avatar img{
        width: 60px;
    }
}
</style>