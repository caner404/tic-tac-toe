<script setup>
import TheGameMenu from "@/components/layouts/TheGameMenu.vue";
import TheGameBoard from "@/components/layouts/TheGameBoard.vue";
import BaseModal from "@/components/BaseModal.vue";
import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();
</script>

<template>
  <main>
    <TheGameMenu v-if="!mainStore.gameBoard.isGameboardActive" />
    <TheGameBoard v-else-if="mainStore.gameBoard.isGameboardActive" />
    <BaseModal v-if="mainStore.showModal" />
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
