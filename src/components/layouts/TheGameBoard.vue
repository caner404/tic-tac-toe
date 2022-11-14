<script setup>
import IconLogo from "@/components/icons/IconLogo.vue";
import IconRestart from "@/components/icons/IconRestart.vue";
import CurrentPlayerBox from "@/components/CurrentPlayerBox.vue";
import GameBoardTile from "@/components/GameBoardTile.vue";
import BaseLogoButton from "@/components/BaseLogoButton.vue";
import BaseGameStats from "@/components/BaseGameStats.vue";
import { store } from "../../store";
import { computed } from "@vue/reactivity";

const crossTitle = computed(() => {
  if (store.getPlayerTeam() === "X") {
    return store.getEnemyTeam() === "CPU" ? "YOU" : "P1";
  } else {
    return store.getEnemyTeam() === "CPU" ? "CPU" : "P1";
  }
});
const circleTitle = computed(() => {
  if (store.getPlayerTeam() === "O") {
    return store.getEnemyTeam() === "CPU" ? "YOU" : "P2";
  } else {
    return store.getEnemyTeam() === "CPU" ? "CPU" : "P2";
  }
});
</script>
<template>
  <div class="gameBoard">
    <IconLogo />
    <CurrentPlayerBox />
    <BaseLogoButton
      mode="restart"
      @click="store.isGameboardActive = !store.isGameboardActive"
    >
      <IconRestart />
    </BaseLogoButton>

    <GameBoardTile v-for="n in 9" />

    <BaseGameStats team="cross" :title="crossTitle" />
    <BaseGameStats team="ties" />
    <BaseGameStats team="circle" :title="circleTitle" />
  </div>
</template>
<style scoped>
.gameBoard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}
</style>
