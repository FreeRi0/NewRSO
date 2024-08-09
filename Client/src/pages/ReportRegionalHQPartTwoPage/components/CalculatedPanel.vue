<template>
    <div class="form__field-group">
        <div class="form__field-group-text">
            <img src="@app/assets/icon/alert.svg" alt="alert" class="alert">
            <h2 class="report_title-h3">{{ props.text }}</h2>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    text: {
        type: String,
    },
})
</script>