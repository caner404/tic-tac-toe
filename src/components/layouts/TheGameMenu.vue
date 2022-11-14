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
    <StartGameButton mode="cpu" enemy="cpu" @click="store.initGameWithCPU()" />
    <StartGameButton
      mode="player"
      enemy="player"
      @click="store.initGameWithPlayer()"
    />
  </div>
</template>
<style scoped>
.gameMenu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 3rem;
  width: 46rem;
}
</style>
