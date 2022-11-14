<script setup>
const props = defineProps(["isActivePlayer"]);
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :class="{ active: isActivePlayer }">
    <path
      d="M56.1 0c8.765 0 15.87 7.106 15.87 15.87 0 8.766-7.105 15.871-15.87 15.871-8.765 0-15.87-7.105-15.87-15.87C40.23 7.106 47.334 0 56.1 0Zm0 9.405a6.466 6.466 0 1 0 0 12.931 6.466 6.466 0 0 0 0-12.931Z"
      fill="#a8bfc9"
    />
  </svg>
</template>
<style scoped>
svg {
  width: 10.5rem;
  height: 3.2rem;
}
svg.active path {
  fill: var(--c-semi-dark-navy);
}
</style>
