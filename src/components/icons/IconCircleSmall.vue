<script setup>
import FadeTransition from "@/components/FadeTransition.vue";
const props = defineProps(["isActivePlayer", "mode"]);
</script>
<template>
  <FadeTransition>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="30px"
      height="30px"
      viewBox="0 0 30 30"
      version="1.1"
      :class="{ active: isActivePlayer }"
    >
      <g id="surface1">
        <path
          style="stroke: none; fill-rule: nonzero; fill-opacity: 1"
          :class="{ modalMode: mode === 'modal' }"
          d="M 15 0 C 23.285156 0 30 6.714844 30 15 C 30 23.285156 23.285156 30 15 30 C 6.714844 30 0 23.285156 0 15 C 0 6.714844 6.714844 0 15 0 Z M 15 8.890625 C 11.625 8.890625 8.890625 11.625 8.890625 15 C 8.890625 18.375 11.625 21.109375 15 21.109375 C 18.375 21.109375 21.109375 18.375 21.109375 15 C 21.109375 11.625 18.375 8.890625 15 8.890625 Z M 15 8.890625 "
        />
      </g>
    </svg>
  </FadeTransition>
</template>
<style scoped>
svg path.modalMode {
  fill: var(--c-light-yellow);
}
svg path {
  fill: var(--c-silver);
}
svg.active path {
  fill: var(--c-semi-dark-navy);
}
</style>
