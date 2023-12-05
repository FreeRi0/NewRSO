<template>
    <div class="statement-wrapper">
        <div class="statement-item">
            <img src="@app/assets/icon/addFile.svg" alt="addFile">
            <FileUpload  mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"  :maxFileSize="7000000" customUpload @uploader="customBase64Uploader" chooseLabel="Выбрать файл" />
        </div>
    </div>
</template>
<script>

</script>
<style lang="scss">
.statement-title {
    font-size: 16px;
    font-weight: bold;
}

.statement-item {
    display: flex;
    margin-top: 12px;
    margin-right: 30px;
}

.statement-item p,
.statement-item a {
    text-decoration: none;
    font-size: 16px;
    display: block;
    margin-left: 8px;
}

.statement-item a {
    color: #1c5c94;
}
.statement-wrapper {
    display: flex;
    margin-bottom: 40px;
    align-items: flex-start;
}

.p-icon {
  display: none;
}

.p-button-label {
    color: #1c5c94;
}
</style>
