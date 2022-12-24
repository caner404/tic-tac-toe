<script setup>
import IconLogo from "@/components/icons/IconLogo.vue";
import IconRestart from "@/components/icons/IconRestart.vue";
import CurrentPlayerBox from "@/components/CurrentPlayerBox.vue";
import GameBoardTile from "@/components/GameBoardTile.vue";
import BaseLogoButton from "@/components/BaseLogoButton.vue";
import BaseGameStats from "@/components/BaseGameStats.vue";
import FadeTransition from "@/components/FadeTransition.vue";

import { useMainStore } from "@/stores/main";
import { useGameStatsStore } from "@/stores/gameStats";
import { useGameboardStore } from "@/stores/gameBoard";
import { computed } from "@vue/reactivity";

const main = useMainStore();
const gameStats = useGameStatsStore();
const gameBoard = useGameboardStore();

const crossTitle = computed(() => {
  if (gameStats.isPlayerTeamCross()) {
    return gameStats.getEnemyType === "CPU" ? "YOU" : "P1";
  } else {
    return gameStats.getEnemyType === "CPU" ? "CPU" : "P1";
  }
});
const circleTitle = computed(() => {
  if (gameStats.isPlayerTeamCircle()) {
    return gameStats.getEnemyType === "CPU" ? "YOU" : "P2";
  } else {
    return gameStats.getEnemyType === "CPU" ? "CPU" : "P2";
  }
});
const crossScore = computed(() => {
  return gameStats.isPlayerTeamCross()
    ? gameStats.getPlayerScore
    : gameStats.getEnemyScore;
});
const circleScore = computed(() => {
  return gameStats.isPlayerTeamCircle()
    ? gameStats.getPlayerScore
    : gameStats.getEnemyScore;
});
const tieScore = computed(() => {
  return gameStats.getTieScore;
});
const gameBoardItems = gameBoard.getGameBoardItems;
const restartGame = function () {
  gameBoard.isGameboardActive = true;
  main.showModal = !main.showModal;
  main.modalMode = "restart";
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
