<script setup>
import IconCross from "@/components/icons/IconCross.vue";
import IconCrossOutline from "@/components/icons/IconCrossOutline.vue";
import IconCircle from "@/components/icons/IconCircle.vue";
import IconCircleOutline from "@/components/icons/IconCircleOutline.vue";

import { store } from "@/store";
import { ref, computed } from "vue";

const props = defineProps(["item"]);
const hover = ref(false);
const boxClicked = ref(false);

const activateCorrectMark = computed(() => {
  if (props.item.value !== "") return;
  boxClicked.value = !boxClicked.value;
  store.executeGameLogic(props.item);
});
</script>
<template>
  <button
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="activateCorrectMark"
  >
    <IconCrossOutline
      :showOnHover="hover && !boxClicked && store.isPlayerTeamCross()"
      v-if="
        store.isPlayerTeamCross() &&
        !boxClicked &&
        store.isGameValueEmpty(props.item)
      "
    />
    <IconCircleOutline
      :showOnHover="hover && !boxClicked && store.isPlayerTeamCircle()"
      v-else-if="
        store.isPlayerTeamCircle() &&
        !boxClicked &&
        store.isGameValueEmpty(props.item)
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
