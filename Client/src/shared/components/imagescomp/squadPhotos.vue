<template >
 <div class="avatar-upload my_photo__edit">
        <!-- Заглушка по умолчанию  -->
        <div class="avatar-preview my_photo__plug">
            <img
                :src="squadPhotos"
                alt="Фото отряда"
                v-if="squadPhotos"
            />

            <img
                src="@/app/assets/user-banner.jpg"
                alt="Фото отряда(пусто)"
                v-else
            />
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { HTTP } from '@app/http';

const props = defineProps({
 squadPhotos: Array
})

</script>
<style lang="scss">

</style>