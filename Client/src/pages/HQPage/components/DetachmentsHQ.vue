<template>
    <section class="headquarters-detachments">
        <h3>Отряды штаба</h3>
        <div class="headquarters-detachments__container">
            <div class="squad-card" v-for="detachment in area">
                <div class="squad-card__ava">
                    <img
                        :src="detachment.avatar.photo"
                        alt="photo"
                        v-if="detachment.avatar"
                    />
                    <img
                        src="@app/assets/headquarters/squad-ava.png"
                        alt="photo"
                        v-else
                    />
                </div>
                <a href="/AllSquads"
                    ><h5>{{ area.name }}</h5></a
                >
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';
const route = useRoute();
let id = route.params.id;

const area = ref({});

const props = defineProps({
    area: {
        type: Array,
    },
});

const aboutArea = async () => {
    await HTTP.get(`/areas/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            area.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};
onMounted(() => {
    aboutArea();
});

// const detachments = ref([
//     {
//         name: 'Сервисные',
//         image: 'squad-ava.png',
//     },
//     {
//         name: 'Проводников',
//         image: 'squad-ava2.png',
//     },
//     {
//         name: 'Медицинские',
//         image: 'squad-ava3.png',
//     },
//     {
//         name: 'Сельскохозяйственные',
//         image: 'squad-ava5.png',
//     },
//     {
//         name: 'Строительные',
//         image: 'squad-ava4.png',
//     },
//     {
//         name: 'Педагогические',
//         image: 'squad-ava6.png',
//     },
// ]);
</script>

<style scoped lang="scss">
section.headquarters-detachments h3 {
    color: #35383f;
    /* Desktop/H-3 */
    font-family: 'Akrobat';
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
    color: #35383f;
    text-align: center;
    font-family: 'BertSans';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
}
</style>
