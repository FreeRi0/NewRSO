<template>
    <div class="container">
        <div class="privateProfile">
            <div class="privateProfile-sort">
                <div class="privateProfile-filters">
                    <div class="privateProfile-select">
                        <div>Кто видит мой номер телефона</div>
                        <sortByEducation
                            class="education"
                            v-model="selectedPhone"
                            :options="educations"
                        ></sortByEducation>
                    </div>
                    <div class="privateProfile-select">
                        <div>Кто видит мою электронную почту</div>
                        <sortByEducation
                            class="education"
                            v-model="selectedMail"
                            :options="educations"
                        ></sortByEducation>
                    </div>
                    <div class="privateProfile-select">
                        <div>Кто видит мои ссылки на соцсети</div>
                        <sortByEducation
                            class="education"
                            v-model="selectedMedia"
                            :options="educations"
                        ></sortByEducation>
                    </div>
                    <div class="privateProfile-select">
                        <div>Кто видит информацию обо мне</div>
                        <sortByEducation
                            class="education"
                            v-model="selectedInfo"
                            :options="educations"
                        ></sortByEducation>
                    </div>
                    <div class="privateProfile-select">
                        <div>Кто видит мои фотографии</div>
                        <sortByEducation
                            class="education"
                            v-model="selectedPhoto"
                            :options="educations"
                        ></sortByEducation>
                    </div>
                    <Button label="Сохранить" color="primary"></Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { sortByEducation } from '@shared/components/selects';
import { Button } from '@shared/components/buttons';
import { ref, computed } from 'vue';
const educations = ref([
    {
        value: 'Мой отряд',
        name: 'Мой отряд',
    },
    { value: 'Только руководители', name: 'Только руководители' },
]);
const selectedPhone = ref(0);
const selectedMail = ref(0);
const selectedMedia = ref(0);
const selectedInfo = ref(0);
const selectedPhoto = ref(0);
</script>
<style lang="scss">
.privateProfile-select {
    display: flex;
    justify-content: space-between;
}
</style>
