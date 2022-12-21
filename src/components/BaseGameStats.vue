<script setup>
import { computed } from "@vue/reactivity";
const props = defineProps({
  team: String,
  title: String,
  score: Number,
});

const computeTitle = computed(() => {
  return props.title != null ? `(${props.title})` : "";
});
const teamTitle = computed(() => {
  if (props.team === "ties") return props.team;
  return props.team === "cross" ? "X" : "O";
});
</script>
<template>
  <div class="stats" :class="team">
    <p class="stats-title" data-test="stats-title">
      {{ teamTitle }} {{ computeTitle }}
    </p>
    <p class="stats-value" data-test="stats-value">{{ score }}</p>
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
.stats-title {
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
