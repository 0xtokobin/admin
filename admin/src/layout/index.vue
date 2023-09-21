<template>
    <Header />
    <div class=" h-full">
        <div class="flex h-full">
            <Sidebar />
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
