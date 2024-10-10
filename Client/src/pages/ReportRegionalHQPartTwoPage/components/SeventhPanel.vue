<template>
    <!-- <v-card class="panel-card">
        <v-expansion-panels v-model="panel" class="mb-2">
            <v-expansion-panel
                ><v-expansion-panel-title> </v-expansion-panel-title
                ><v-expansion-panel-text> </v-expansion-panel-text
            ></v-expansion-panel>
        </v-expansion-panels>
    </v-card> -->
</template>
<script setup>
// const panel = ref(false);

// const collapsed = () => {
//     panel.value = false;
// };
</script>
<style lang="scss" scoped>
.panel-card {
    box-shadow: none;
}

.v-expansion-panel-title[aria-expanded='true'] {
    display: none;
}
.v-tab-item--selected {
    background: #f3f4f5;
}

.v-tab.v-tab.v-btn {
    min-width: 280px;
    border-radius: 10px 10px 0 0;
    letter-spacing: initial;
    border: none;
}

.panel-card-text {
    padding: 0;
}

.panel-tab-btn {
    text-transform: initial;
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21.1px;
    text-align: left;
    margin-right: 8px;
}

.v-expansion-panel-title {
    background: #f3f4f5;
    margin: 0px;
    border-radius: 0px;
    font-family: Akrobat;
    font-size: 18px;
    font-weight: 600;
    line-height: 21.6px;
    text-align: left;
    padding-left: 40px;
}
</style>
