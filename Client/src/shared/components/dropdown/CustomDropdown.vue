<template>
    <div class='invents'>
        <div class='invents-block invents-select'></div>
        <div class='invents-block invents-select invents-panel'></div>
        <div class='invents-block invents-select invents-panel'></div>
        <div class='invents-block invents-select invents-panel'></div>
    </div>
</template>

<script setup>
const prop = defineProps({
    items:{
        type: Array,
        required: true
    },
    default:{
        type: String,
        required: true
    }
})
const SelectModes = [
    {
        title: String,
        func: Function
    }];
</script>

<style lang='scss' scoped>

</style>