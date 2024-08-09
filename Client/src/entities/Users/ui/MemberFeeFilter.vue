<template>
    <div class="radio-buttons-field filter-text">
        <input v-model="model" type="radio" id="fee2" name="fee" value="paid" />
        <label for="fee2">Оплачен</label>
    </div>
    <div class="radio-buttons-field filter-text">
        <input
            v-model="model"
            type="radio"
            id="fee3"
            name="fee"
            value="notPaid"
        />
        <label for="fee3">Не оплачен</label>
    </div>
</template>
<script setup lang="ts">
const model = defineModel();
</script>
