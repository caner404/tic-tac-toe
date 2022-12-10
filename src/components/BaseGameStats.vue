<script setup>
import { computed } from "@vue/reactivity";
const props = defineProps(["team", "title", "score"]);
const computeTitle = computed(() => {
  return props.title != null ? `(${props.title})` : "";
});
</script>
<template>
  <div class="stats" :class="team">
    <p class="stats-description">{{ team }} {{ computeTitle }}</p>
    <p class="stats-value">{{ score }}</p>
  </div>
</template>
<style scoped>
.stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1.5rem;
  padding: 1rem;
  color: var(--c-dark-navy);
  text-align: center;
  text-transform: uppercase;
}
.stats-description {
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.8rem;
}
.stats-value {
  font-weight: 700;
  font-size: 2.4rem;
  line-height: 3rem;
  text-transform: uppercase;
}
.circle {
  background-color: var(--c-light-yellow);
}
.ties {
  background-color: var(--c-silver);
}
.cross {
  background-color: var(--c-light-blue);
}
</style>
