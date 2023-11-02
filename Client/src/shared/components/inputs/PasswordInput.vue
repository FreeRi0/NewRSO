<template>
    <div class="form-input" :style="{ width: width }">
        <v-text-field
            :name="name"
            :id="name"
            :placeholder="placeholder"
            :value="value"
            @input="updateValue"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            variant="outlined"
            class="mb-2 text-field"
        ></v-text-field>
        <TransitionGroup>
            <div
                class="error-wrapper"
                v-for="element of error"
                :key="element.$uid"
            >
                <div class="form-error__message">{{ element.$message }}</div>
            </div>
        </TransitionGroup>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.error-wrapper {
    margin-bottom: 5px;
}
.form-error__message {
    color: var(--danger);
    font-size: 12px;
}</style>
