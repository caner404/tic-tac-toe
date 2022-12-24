<script setup>
import IconCross from "@/components/icons/IconCross.vue";
import IconCrossOutline from "@/components/icons/IconCrossOutline.vue";
import IconCircle from "@/components/icons/IconCircle.vue";
import IconCircleOutline from "@/components/icons/IconCircleOutline.vue";
import FadeTransition from "@/components/FadeTransition.vue";
import { useMainStore } from "@/stores/main";
import { useGameStatsStore } from "@/stores/gameStats";
import { useGameboardStore } from "@/stores/gameBoard";
import { computed } from "vue";

const main = useMainStore();
const gameStats = useGameStatsStore();
const gameBoard = useGameboardStore();
const props = defineProps(["item"]);

const activateCorrectMark = computed(() => {
  if (props.item.value !== "") return;
  main.startRound(props.item);
});
const disabledBtnWhileEnemyTeam = computed(() => {
  let disabled = false;
  if (gameStats.isEnemy("cpu")) {
    disabled = gameStats.getCurrentTeam !== gameStats.getPlayerTeam;
  }
  return disabled;
});
const renderCrossOutlineHover = computed(() => {
  if (gameStats.isEnemy("cpu")) {
    return (
      gameStats.isPlayerTeamCross() && gameBoard.isGameValueEmpty(props.item)
    );
  }
  return (
    gameStats.isCurrentTeamCross() && gameBoard.isGameValueEmpty(props.item)
  );
});
const renderCircleOutlineHover = computed(() => {
  if (gameStats.isEnemy("cpu")) {
    return (
      gameStats.isPlayerTeamCircle() && gameBoard.isGameValueEmpty(props.item)
    );
  }
  return (
    gameStats.isCurrentTeamCircle() && gameBoard.isGameValueEmpty(props.item)
  );
});
</script>
<template>
  <button
    @mouseover="props.item.hover = true"
    @mouseleave="props.item.hover = false"
    @click="activateCorrectMark"
    :disabled="disabledBtnWhileEnemyTeam"
  >
    <IconCrossOutline
      :showOnHover="props.item.hover"
      v-if="renderCrossOutlineHover"
    />
    <IconCircleOutline
      :showOnHover="props.item.hover"
      v-else-if="renderCircleOutlineHover"
    />

    <FadeTransition>
      <IconCross v-if="gameBoard.isGameValueCross(props.item)" />
      <IconCircle v-else-if="gameBoard.isGameValueCircle(props.item)" />
    </FadeTransition>
  </button>
</template>
<style scoped>
button {
  background-color: var(--c-semi-dark-navy);
  box-shadow: inset 0px -8px 0px #10212a;
  border-radius: 1.5rem;
  width: 14rem;
  height: 14rem;
  text-align: center;
  color: #fff;
  cursor: pointer;
}

@media (max-width: 30em) {
  button {
    width: 9.6rem;
    height: 9.6rem;
  }
}
</style>
