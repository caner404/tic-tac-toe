<script setup>
import IconCrossSmall from "@/components/icons/IconCrossSmall.vue";
import IconCircleSmall from "@/components/icons/IconCircleSmall.vue";

import { computed } from "vue";
import { useGameStatsStore } from "@/stores/gameStats";

const gameStats = useGameStatsStore();
const currentTeamCross = computed(() => {
  return gameStats.isCurrentTeamCross();
});
const currentTeamCircle = computed(() => {
  return gameStats.isCurrentTeamCircle();
});
</script>
<template>
  <div class="currentPlayerBox">
    <IconCrossSmall v-if="currentTeamCross" />
    <IconCircleSmall v-else-if="currentTeamCircle" />
    <p>turn</p>
  </div>
</template>
<style scoped>
.currentPlayerBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  background-color: var(--c-semi-dark-navy);
  border-radius: 1rem;
  box-shadow: inset 0px -4px 0px #10212a;
  padding: 1.5rem 2.5rem;
}
p {
  text-transform: uppercase;
  line-height: 2rem;
  text-align: center;
  color: var(--c-silver);
  font-weight: 700;
}
@media (max-width: 30em) {
  .currentPlayerBox {
    padding: 1rem;
    gap: 0rem;
  }
  p {
    font-size: 1.4rem;
    line-height: 1.8rem;
    letter-spacing: 0.9px;
  }
}
</style>
