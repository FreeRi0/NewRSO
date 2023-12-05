<template>
    <div class="statement-wrapper">
        <div class="statement-item">
            <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.8355 1.25844C12.6113 1.37294 13.3318 1.73974 13.8824 2.30713C15.2454 3.71146 15.2287 5.94982 13.8449 7.33361L13.5759 7.60259L10.4638 10.7146L6.98631 14.1921C5.66848 15.5099 3.52973 15.503 2.22047 14.1766C0.919578 12.8588 0.930576 10.7367 2.24506 9.43237L7.34427 4.37262C7.90114 3.82005 8.79998 3.82178 9.35473 4.37649C9.91102 4.93275 9.91104 5.83466 9.35476 6.39094L4.00621 11.7395L4.71332 12.4466L10.0619 7.09805C11.0087 6.15124 11.0087 4.61614 10.0618 3.66936C9.11761 2.72522 7.58774 2.72228 6.63991 3.66277L1.5407 8.72253C-0.165097 10.4151 -0.179369 13.169 1.50879 14.8791C3.20781 16.6003 5.98326 16.6093 7.69341 14.8992L11.1709 11.4217L14.283 8.3097L14.552 8.04072C16.3222 6.27052 16.3436 3.40714 14.6 1.61067C13.8612 0.849372 12.8834 0.370366 11.8355 0.25V1.25844Z"
                    fill="#1F7CC0"
                />
            </svg>
            <FileUpload
                mode="basic"
                name="demo[]"
                url="/api/upload"
                accept=".pdf, .jpeg, .png"
                :maxFileSize="7000000"
                customUpload
                @uploader="customBase64Uploader"
                chooseLabel="Выбрать файл"
            />
        </div>
    </div>
</template>

<script setup></script>

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
