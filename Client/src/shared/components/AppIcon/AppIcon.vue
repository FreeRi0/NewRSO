<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
});

const _iconRaw = ref(null),
    _viewBox = ref('0 0 20 20'),
    _colorAttribute = ref('fill');

watch(
    () => props.name,
    async (name) => {
        const { default: icon } = await import(`/assets/icons/${name}.svg?raw`);

        const fillRegex = / fill="[^"]*"/g;
        const strokeRegex = / stroke="[^"]*"/g;

        if (!icon.match(fillRegex)) _colorAttribute.value = 'stroke';

        const svgString = icon.replace(fillRegex, '').replace(strokeRegex, '');
        _viewBox.value = svgString.match(/viewBox="([^"]*)"/)[1];
        _iconRaw.value = svgString.trim().match(/^<svg[^>]*>([^]*)<\/svg>$/)[1];
    },
    { immediate: true },
);
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="_viewBox"
        :[_colorAttribute]="'currentColor'"
        width="1em"
        height="1em"
        class="v-icon"
        v-html="_iconRaw"
    />
</template>

<style scoped lang="scss">
.v-icon {
    color: #fff;
    font-size: 20px;
}
</style>