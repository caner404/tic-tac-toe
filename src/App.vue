<script setup>
import TheGameMenu from "@/components/layouts/TheGameMenu.vue";
import TheGameBoard from "@/components/layouts/TheGameBoard.vue";
import BaseModal from "@/components/BaseModal.vue";
import { store } from "./store";
</script>

<template>
  <main>
    <TheGameMenu v-if="!store.isGameboardActive" />
    <TheGameBoard v-else-if="store.isGameboardActive" />
    <BaseModal v-if="store.showModal" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  color: var(--c-semi-dark-navy);
  background: var(--c-dark-navy);
}
</style>
