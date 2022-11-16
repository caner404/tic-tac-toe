<script setup>
import IconCross from "@/components/icons/IconCross.vue";
import IconCrossOutline from "@/components/icons/IconCrossOutline.vue";
import IconCircle from "@/components/icons/IconCircle.vue";
import IconCircleOutline from "@/components/icons/IconCircleOutline.vue";

import { store } from "@/store";
import { ref, computed } from "vue";

const hover = ref(false);
const crossCliked = ref(false);
const circleClicked = ref(false);

const activateCorrectMark = computed(() => {
  if (store.isPlayerTeamCross()) {
    crossCliked.value = true;
  } else {
    circleClicked.value = true;
  }
});
</script>
<template>
  <button
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="activateCorrectMark"
  >
    <IconCrossOutline
      :showOnHover="hover && !crossCliked"
      v-if="store.isPlayerTeamCross() && !crossCliked"
    />
    <IconCircleOutline
      :showOnHover="hover && !circleClicked"
      v-else-if="store.isPlayerTeamCircle() && !circleClicked"
    />

    <IconCross v-if="store.isPlayerTeamCross() && crossCliked" />
    <IconCircle v-else-if="store.isPlayerTeamCircle() && circleClicked" />
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
</style>
