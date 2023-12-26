<template>
    <label :for="id">{{ label }}</label>
    <!-- <input
        type="checkbox"
        :name="name"
        :id="id"
        :value="value"
        :checked="checked"
        @input="handleClick($event)"
    /> -->

    <input
        variant="outlined"
        type="checkbox"
        :name="name"
        :id="id"
        :value="value"
        :checked="checked"
        @input="handleClick($event)"
    />
    <!-- <v-checkbox
            :label="label"
            type="checkbox"
            :name="name"
            :id="id"
            :model-value="value"
            :checked="checked"
            @input="handleClick($event)"
        /> -->

    <!-- <div class="card flex justify-content-center">
        <label>{{ label }}</label>
        <Checkbox v-model="checked" :binary="true" />
    </div> -->
</template>

<script setup>

</script>

<style lang="scss"></style>
