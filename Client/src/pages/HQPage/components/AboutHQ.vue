<template>
   <section class="about-headquarters">
        <h3>{{ head }}</h3>
        <p>{{ description }}</p>
    </section>
</template>
<script setup>
const props = defineProps({
    head:{
        default: '',
    },
    description: {
        default: '',
    },
})
</script>
<style scoped lang="scss">
.about-headquarters{
    margin-top: 60px;
}
    .about-headquarters h3 {
    color: #35383F;
    font-family: "Akrobat";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.about-headquarters p {
    /* отступы */
    margin-top: 40px;
    margin-bottom: 60px;
    /*  */
    max-width: 760px;
    /* текст */
    color: #1E1E1E;
    font-family: "BertSans";
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>