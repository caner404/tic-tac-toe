<script setup>
import { computed } from "@vue/reactivity";
import IconCircleSmall from "@/components/icons/IconCircleSmall.vue";
import IconCrossSmall from "@/components/icons/IconCrossSmall.vue";
import BaseLogoButton from "@/components//BaseLogoButton.vue";
import { useGameStatsStore } from "@/stores/gameStats";

const gameStats = useGameStatsStore();

const isActivePlayerCircle = computed(() => {
  return gameStats.isPlayerTeamCircle();
});
const isActivePlayerCross = computed(() => {
  return gameStats.isPlayerTeamCross();
});
</script>
<template>
  <div class="mark" data-test="mark">
    <h3 class="mark-heading">Pick Player 1's Mark</h3>
    <div class="mark-container">
      <BaseLogoButton
        mode="cross"
        :isActivePlayer="isActivePlayerCross"
        @click="gameStats.changeTeam()"
      >
        <IconCrossSmall :isActivePlayer="isActivePlayerCross" />
      </BaseLogoButton>
      <BaseLogoButton
        mode="circle"
        :isActivePlayer="isActivePlayerCircle"
        @click="gameStats.changeTeam()"
      >
        <IconCircleSmall :isActivePlayer="isActivePlayerCircle" />
      </BaseLogoButton>
    </div>
    <p class="mark-reminder">Remember: x goes first</p>
  </div>
</template>
<style scoped>
.mark {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  text-transform: uppercase;
  background-color: var(--c-semi-dark-navy);
  box-shadow: inset 0px -8px 0px #10212a;
  border-radius: 1.5rem;
  padding: 2rem;
}
.mark-heading {
  font-weight: 700;
  line-height: 2rem;
  text-align: center;
  color: var(--c-silver);
  letter-spacing: 1px;
}
.mark-reminder {
  font-size: 1.4rem;
  line-height: 1.8rem;
  text-align: center;
  color: var(--c-silver);
  opacity: 0.5;
  mix-blend-mode: normal;
  letter-spacing: 1px;
}
.mark-container {
  display: flex;
  justify-content: stretch;
  align-items: center;
  align-self: stretch;
  border-radius: 1rem;
  padding: 1rem;
  background-color: var(--c-dark-navy);
}
</style>
