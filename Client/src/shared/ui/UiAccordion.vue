<template>
    <div class="accordion">
        <div class="heading">
            <slot :isOpen="isOpen" :toggle="toggle" name="header" />
            <i
                :class="[
                    'mdi-chevron-down mdi v-icon notranslate v-theme--light v-icon--size-default icon',
                    ,
                    { open: isOpen },
                ]"
            />
        </div>
        <Transition name="accordion">
            <div
                :class="['accordion-content', { 'accordion-open': isOpen }]"
                v-show="isOpen"
            >
                <slot name="content" />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const toggle = () => {
    isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.open {
    transform: rotate(-180deg);
    transition: transform 0.3s ease;
}
/* .accordion-content.accordion-open {
    overflow: auto;
} */

.icon {
    position: absolute;
    top: 6px;
    right: 6px;
}
.heading {
    position: relative;
    padding-right: 3px;
    cursor: pointer;
}
.accordion-content {
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    position: relative;
}

.accordion-enter-from,
.accordion-leave-to {
    max-height: 0px;
}

.accordion-enter-to,
.accordion-leave-from {
    max-height: 9999px;
}
</style>
