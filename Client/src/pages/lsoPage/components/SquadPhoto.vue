<template>
   <section class="my_photo">
        <div class="container">
            <div class="my-photo-wrapper">
                <!-- Форма Мои фото  -->
                <div id="my_photo">
                    <fieldset form="my_photo">
                        <!-- Контейнер для фото  -->
                        <div class="avatar-upload my_photo__edit">
                            <!-- Заглушка по умолчанию  -->
                            <div class="avatar-preview my_photo__plug">
                                <img src="@app/assets/lso/squad-photo.png" alt="">
                            </div>
                            <!-- Добавить фото -->
                            <div class="avatar-edit my_photo__add">
                                <label for="imageUpload1">
                                    <img style="cursor:pointer;" src="@app/assets/lso/pen-circle.svg" alt="">
                                    <input type="file" id="imageUpload1" name="photo1" accept="image/*" />
                                </label>
                            </div>
                        </div>

                        <!-- Контейнер для фото  -->
                        <div class="avatar-upload my_photo__edit">
                            <!-- Заглушка по умолчанию  -->
                            <div class="avatar-preview my_photo__plug">
                                <img src="@app/assets/lso/squad-photo2.png" alt="">
                            </div>
                            <!-- Добавить фото -->
                            <div class="avatar-edit my_photo__add">
                                <label for="imageUpload2">
                                    <img style="cursor:pointer;" src="@app/assets/lso/pen-circle.svg" alt="">
                                    <input type="file" id="imageUpload2" name="photo2" accept="image/*" />
                                </label>
                            </div>
                        </div>

                        <!-- Контейнер для фото  -->
                        <div class="avatar-upload my_photo__edit">
                            <!-- Заглушка по умолчанию  -->
                            <div class="avatar-preview my_photo__plug">
                                <img src="@app/assets/lso/squad-photo3.png" alt="">
                            </div>
                            <!-- Добавить фото -->
                            <div class="avatar-edit my_photo__add">
                                <label for="imageUpload3">
                                    <img style="cursor:pointer;" src="@app/assets/lso/pen-circle.svg" alt="">
                                    <input type="file" id="imageUpload3" name="photo3" accept="image/*" />
                                </label>
                            </div>
                        </div>

                        <!-- Контейнер для фото  -->
                        <div class="avatar-upload my_photo__edit">
                            <!-- Заглушка по умолчанию  -->
                            <div class="avatar-preview my_photo__plug">
                                <img src="@app/assets/lso/squad-photo4.png" alt="">
                            </div>
                            <!-- Добавить фото -->
                            <div class="avatar-edit my_photo__add">
                                <label for="imageUpload4">
                                    <img style="cursor:pointer;" src="@app/assets/lso/pen-circle.svg" alt="">
                                    <input type="file" id="imageUpload4" name="photo4" accept="image/*" />
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    </section>
</template>
<script>

</script>
<style scoped lang="scss">
    section.my_photo {
    margin-bottom: 20px;
}

/* Форма Мои фото */
#my_photo {
    display: grid;
}

#my_photo fieldset {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    justify-content: center;
    column-gap: 20px;
    border: none;
    margin-bottom: 40px;
}


/* Контейнер для фото */
#my_photo .my_photo__edit {
    display: grid;
    grid-template-columns: 1fr 68px;
    grid-template-rows: 1fr 68px;
    border-radius: 10px;
}

/* Заглушка по умолчанию */
.avatar-preview,
.my_photo__plug {
    display: grid;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
    border-radius: 10px;
}

#my_photo .avatar-preview img,
#my_photo .my_photo__plug img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}

/* Добавить фото */
.my_photo__add,
.avatar-edit {
    display: grid;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    justify-content: center;
    align-content: center;
    z-index: 9;
}

.my_photo__add label[name="my_photo_add"] {
    width: 48px;
    height: 48px;
    cursor: pointer;
}

.my_photo__add label[for="my_photo_add"] img {
    cursor: pointer;
}

#my_photo input[name="photo1"],
input[name="photo2"],
input[name="photo3"],
input[name="photo4"] {
    display: none;
}

/* Сохранить Очистить */
.btn__save-reset {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 40px;
}

</style>