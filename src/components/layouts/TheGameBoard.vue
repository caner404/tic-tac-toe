<script setup>
import IconLogo from "@/components/icons/IconLogo.vue";
import IconRestart from "@/components/icons/IconRestart.vue";
import CurrentPlayerBox from "@/components/CurrentPlayerBox.vue";
import GameBoardTile from "@/components/GameBoardTile.vue";
import BaseLogoButton from "@/components/BaseLogoButton.vue";
import BaseGameStats from "@/components/BaseGameStats.vue";
import FadeTransition from "@/components/FadeTransition.vue";

import { store } from "@/store";
import { computed } from "@vue/reactivity";

const crossTitle = computed(() => {
  if (store.isPlayerTeamCross()) {
    return store.getEnemyType() === "CPU" ? "YOU" : "P1";
  } else {
    return store.getEnemyType() === "CPU" ? "CPU" : "P1";
  }
});
const circleTitle = computed(() => {
  if (store.isPlayerTeamCircle()) {
    return store.getEnemyType() === "CPU" ? "YOU" : "P2";
  } else {
    return store.getEnemyType() === "CPU" ? "CPU" : "P2";
  }
});
const crossScore = computed(() => {
  return store.isPlayerTeamCross()
    ? store.getPlayerScore()
    : store.getEnemyScore();
});
const circleScore = computed(() => {
  return store.isPlayerTeamCircle()
    ? store.getPlayerScore()
    : store.getEnemyScore();
});
const tieScore = computed(() => {
  return store.getTieScore();
});
const gameBoardItems = store.getGameBoardItems();
const restartGame = function () {
  store.isGameboardActive = true;
  store.showModal = !store.showModal;
  store.modalMode = "restart";
};
</script>
<template>
  <FadeTransition>
    <div class="gameBoard">
      <IconLogo />
      <CurrentPlayerBox />
      <BaseLogoButton mode="restart" @click="restartGame">
        <IconRestart />
      </BaseLogoButton>

      <GameBoardTile v-for="item in gameBoardItems" :item="item" />

      <BaseGameStats team="cross" :title="crossTitle" :score="crossScore" />
      <BaseGameStats team="ties" :score="tieScore" />
      <BaseGameStats team="circle" :title="circleTitle" :score="circleScore" />
    </div>
  </FadeTransition>
</template>
<style scoped>
.gameBoard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  width: 100%;
  max-width: 48rem;
}

@media (max-width: 60em) {
  .gameBoard {
    gap: 1.5rem;
  }
}
@media (max-width: 30em) {
  .gameBoard {
    padding: 2rem;
  }
  .gameBoard > :nth-child(-n + 3) {
    margin-bottom: 5rem;
  }
}
</style>
