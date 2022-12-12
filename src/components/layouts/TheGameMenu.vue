<script setup>
import IconLogo from "@/components/icons/IconLogo.vue";
import StartGameButton from "@/components/StartGameButton.vue";
import MarkdDialog from "@/components/MarkDialog.vue";
import { store } from "@/store";
</script>
<template>
  <div class="gameMenu">
    <IconLogo />
    <MarkdDialog />
    <StartGameButton mode="cpu" enemy="cpu" @click="store.startGame('cpu')" />
    <StartGameButton
      mode="player"
      enemy="player"
      @click="store.startGame('player')"
    />
  </div>
</template>
<style scoped>
.gameMenu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 2rem;
  width: 100%;
  max-width: 46rem;
  padding: 2rem;
}
</style>
