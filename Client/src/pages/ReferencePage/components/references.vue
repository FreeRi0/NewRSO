<template>
    <div class="container">
        <div class="referencesMenu">
            <h2 class="referencesMenu-title">Оформление справок</h2>
            <div class="referencesMenu-wrapper">
                <div class="referencesMenu-item">
                <p>Справка о членстве в РСО (для работодателя)</p>
                   <router-link :to="{ name: 'reference' }">
                   <div class="round-btn">
                    <img src="@app/assets/icon/arrow-right.svg" alt="arrow-right">
                   </div></router-link>
                </div>
                <div class="referencesMenu-item">
                <p>Справка о членстве в РСО (для внутреннего пользования)</p>
                   <router-link :to="{ name: 'referenceForYou' }">
                   <div class="round-btn">
                    <img src="@app/assets/icon/arrow-right.svg" alt="arrow-right">
                   </div></router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup></script>
<style lang="scss">
.referencesMenu {
    padding: 100px 0px 350px 0px;
    &-title {
        font-size: 52px;
        font-weight: 600;
    }
    &-wrapper {
        margin-top: 40px;
    }
    &-item {
        border-bottom: 1px solid grey;
        display: flex;
        justify-content: space-between;
        padding: 16px 0px;
        margin-top: 8px;
     p {
        font-size: 24px;
     }
    }
}

.round-btn {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    background-color: #1c5c94;;
    padding: 4px;
}
</style>
