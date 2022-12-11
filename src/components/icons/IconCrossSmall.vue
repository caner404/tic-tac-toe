<script setup>
const props = defineProps(["isActivePlayer", "mode"]);
</script>
<template>
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
        style="stroke: none; fill-rule: evenodd; fill-opacity: 1"
        :class="{ modalMode: mode === 'modal' }"
        d="M 7.03125 0.539062 L 15 8.503906 L 22.96875 0.539062 C 23.515625 -0.0117188 24.40625 -0.0117188 24.957031 0.539062 L 29.460938 5.042969 C 30.011719 5.59375 30.011719 6.484375 29.460938 7.03125 L 21.496094 15 L 29.460938 22.96875 C 30.011719 23.515625 30.011719 24.40625 29.460938 24.957031 L 24.957031 29.460938 C 24.40625 30.011719 23.515625 30.011719 22.96875 29.460938 L 15 21.496094 L 7.03125 29.460938 C 6.484375 30.011719 5.59375 30.011719 5.042969 29.460938 L 0.539062 24.957031 C -0.0117188 24.40625 -0.0117188 23.515625 0.539062 22.96875 L 8.503906 15 L 0.539062 7.03125 C -0.0117188 6.484375 -0.0117188 5.59375 0.539062 5.042969 L 5.042969 0.539062 C 5.59375 -0.0117188 6.484375 -0.0117188 7.03125 0.539062 Z M 7.03125 0.539062 "
      />
    </g>
  </svg>
</template>
<style scoped>
svg path.modalMode {
  fill: var(--c-light-blue);
}
svg path {
  fill: var(--c-silver);
}
svg.active path {
  fill: var(--c-semi-dark-navy);
}
</style>
