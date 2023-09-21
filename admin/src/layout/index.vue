<template>
    <div class="h-screen w-screen flex">
        <Sidebar></Sidebar>
        <div class=" flex-1">
            <Header></Header>
            <Main></Main>
        </div>
    </div>
</template>

<script setup>
import Header from "./header/index.vue";
import Sidebar from "./sidebar/index.vue";
import Main from './main/index.vue'
</script>

<style lang="scss" scoped></style>

