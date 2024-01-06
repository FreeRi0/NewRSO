<template>
    <div class='invents-block'>
        <input type='checkbox' class='invents-checkbox'>
    </div>
    <div class='invents-select invents-action'>

    </div>
</template>

<script setup>
const props = defineProps({
    action:{
        id: Number,
        image: String,
        name: String,
    }
});
</script>

<style lang='scss' scoped>

</style>