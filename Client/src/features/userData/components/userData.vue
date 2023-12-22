<template>
    <div class="MyPage">
        <p>Кратко о себе</p>
        <TextArea class="mt-5"></TextArea>
        <v-row class="mt-8">
            <v-col v-for="n in 4" :key="n" class="d-flex">
                <userPhoto></userPhoto>
            </v-col>
        </v-row>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { TextArea } from '@shared/components/inputs';
import { userPhoto } from '@shared/components/imagescomp';

import { ref, computed, onMounted } from 'vue';
import { HTTP } from '@app/http';
</script>
<style lang="scss">

.MyPage {
  border: 1px solid #0000001A;
  border-radius: 10px;
  padding: 40px;
  margin-bottom: 80px;
}
</style>
