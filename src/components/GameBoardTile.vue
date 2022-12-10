<script setup>
import IconCross from "@/components/icons/IconCross.vue";
import IconCrossOutline from "@/components/icons/IconCrossOutline.vue";
import IconCircle from "@/components/icons/IconCircle.vue";
import IconCircleOutline from "@/components/icons/IconCircleOutline.vue";

import { store } from "@/store";
import { ref, computed } from "vue";

const props = defineProps(["item"]);

const activateCorrectMark = computed(() => {
  if (props.item.value !== "") return;
  store.executeGameLogic(props.item);
});
</script>
<template>
  <button
    @mouseover="props.item.hover = true"
    @mouseleave="props.item.hover = false"
    @click="activateCorrectMark"
  >
    <IconCrossOutline
      :showOnHover="props.item.hover"
      v-if="store.isPlayerTeamCross() && store.isGameValueEmpty(props.item)"
    />
    <IconCircleOutline
      :showOnHover="props.item.hover"
      v-else-if="
        store.isPlayerTeamCircle() && store.isGameValueEmpty(props.item)
      "
    />

    <IconCross v-if="store.isGameValueCross(props.item)" />
    <IconCircle v-else-if="store.isGameValueCircle(props.item)" />
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
