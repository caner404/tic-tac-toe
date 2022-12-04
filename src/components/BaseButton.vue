<script setup>
import { computed } from "@vue/reactivity";
const props = defineProps(["mode", "text"]);

const classObject = computed(() => ({
  secondary: props.mode === "secondary",
  primary: props.mode === "primary",
}));
</script>
<template>
  <button :class="classObject">{{ text }}</button>
</template>
<style>
.primary,
.secondary {
  cursor: pointer;
  border-radius: 1rem;
  font-family: "Outfit";
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2rem;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--c-dark-navy);
  padding: 1rem 1.5rem;
}
.primary {
  background: var(--c-light-yellow);
  box-shadow: inset 0px -4px 0px #cc8b13;
}
.primary:active,
.primary:hover {
  background-color: var(--c-light-yellow-hover);
}
.secondary {
  background: var(--c-silver);
  box-shadow: inset 0px -4px 0px #658997;
}
.secondary:hover,
.secondary:active {
  background-color: var(--c-silver-hover);
}
</style>
