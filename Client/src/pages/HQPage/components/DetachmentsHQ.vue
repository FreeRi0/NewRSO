<template>
    <section class="headquarters-detachments">
        <h3>Отряды штаба</h3>
        <div class="headquarters-detachments__container">
            <div class="squad-card">
                <div class="squad-card__ava">
                    <img
                        src="@app/assets/headquarters/squad-ava.png"
                        alt="photo"
                    />
                </div>
                <a href="/AllSquads">
                    <h5>{{ area.name }}</h5>
                </a>
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
// const areaId = ref(null);

const area = ref({});

const aboutArea = async () => {
    // let id = area.value.id;
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
