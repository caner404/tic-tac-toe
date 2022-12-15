<script setup>
import IconCross from "@/components/icons/IconCross.vue";
import IconCrossOutline from "@/components/icons/IconCrossOutline.vue";
import IconCircle from "@/components/icons/IconCircle.vue";
import IconCircleOutline from "@/components/icons/IconCircleOutline.vue";
import FadeTransition from "@/components/FadeTransition.vue";

import { store } from "@/store";
import { ref, computed } from "vue";

const props = defineProps(["item"]);

const activateCorrectMark = computed(() => {
  if (props.item.value !== "") return;
  store.executeGameLogic(props.item);
});
const disabledBtnWhileEnemyTeam = computed(() => {
  let disabled = false;
  if (store.isEnemyCPU()) {
    disabled = store.getCurrentTeam() !== store.getPlayerTeam();
  }
  return disabled;
});
const renderCrossOutlineHover = computed(() => {
  if (store.isEnemyCPU()) {
    return store.isPlayerTeamCross() && store.isGameValueEmpty(props.item);
  }
  return store.getCurrentTeam() === "X" && store.isGameValueEmpty(props.item);
});
const renderCircleOutlineHover = computed(() => {
  if (store.isEnemyCPU()) {
    return store.isPlayerTeamCross() && store.isGameValueEmpty(props.item);
  }
  return store.getCurrentTeam() === "O" && store.isGameValueEmpty(props.item);
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
      <IconCross v-if="store.isGameValueCross(props.item)" />
      <IconCircle v-else-if="store.isGameValueCircle(props.item)" />
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
