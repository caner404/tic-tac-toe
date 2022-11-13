<script setup>
import TheGameMenu from "@/components/layouts/TheGameMenu.vue";
import TheGameBoard from "@/components/layouts/TheGameBoard.vue";
import { store } from "./store";
</script>

<template>
  <main>
    <TheGameMenu v-show="!store.isGameboardActive" />
    <TheGameBoard v-show="store.isGameboardActive" />
  </main>
</template>

<style scoped></style>
