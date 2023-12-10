<template>
    <section class="headquarters-detachments">
        <h3>Отряды штаба</h3>
            <div class="headquarters-detachments__container">
                <div class="squad-card" v-for="detachment in detachments.slice(0,6)">
                    <div class="squad-card__ava">
                        <img :src="'./assets/headquarters/'+detachment.image" alt="ava"/>
                    </div>
                    <h5>{{ detachment.name }}</h5>
                </div>
            </div>
        </section>
</template>

<script setup>
import {ref} from "vue"
const detachments = ref([
    {
        name:"Сервисные",
        image:'squad-ava.png',
    },
    {
        name:"Проводников",
        image:'squad-ava2.png',
    },
    {
        name:"Медицинские",
        image:'squad-ava3.png',
    },
    {
        name:"Сельскохозяйственные",
        image:'squad-ava4.png',
    },
    {
        name:"Строительные",
        image:'squad-ava5.png',
    },
    {
        name:"Педагогические",
        image:'squad-ava6.png',
    },
])
</script>

<style scoped lang="scss">
    section.headquarters-detachments h3 {
    color: #35383F;
    /* Desktop/H-3 */
    font-family: "Akrobat";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    /*  */
    margin-top: 60px;
    margin-bottom: 40px;
}

.headquarters-detachments__container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    justify-items: center;
    /*  */
    padding: 40px 0;
    margin-bottom: 36px;
    /* плашка */
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
    background-color: white;
}

.squad-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    /*  */
    width: 280px;
    margin-bottom: 40px;
}

.squad-card__ava {
    margin-bottom: 10px;
}

.squad-card h5 {
    color: #35383F;
    text-align: center;
    font-family: "BertSans";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
}
</style>