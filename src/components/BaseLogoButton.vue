<script setup>
import { computed } from "@vue/reactivity";
const props = defineProps({
  mode: String,
  isActivePlayer: Boolean,
});

const classObject = computed(() => ({
  circle: props.mode === "circle",
  cross: props.mode === "cross",
  restart: props.mode === "restart",
  active: props.isActivePlayer,
}));
</script>
<template>
  <button :class="classObject">
    <slot></slot>
  </button>
</template>
<style scoped>
button {
  transition: background-color 0.4s cubic-bezier(0.16, 1.12, 1, 1);
}
.circle,
.cross {
  cursor: pointer;
  flex: 1;
  padding: 1.5rem;
  border-radius: 1rem;
}
.cross:hover:not(.active),
.circle:hover:not(.active) {
  background-color: rgba(168, 191, 201, 0.05);
}
.active {
  background-color: var(--c-silver);
}

.restart {
  cursor: pointer;
  background: var(--c-silver);
  box-shadow: inset 0px -4px 0px #658997;
  border-radius: 1rem;
  width: 5.2rem;
  height: 5.2rem;
  justify-self: end;
}
.restart:hover,
.restart:active {
  background-color: var(--c-silver-hover);
}
.restart:active {
  box-shadow: inset 0px 0px 0px #658997;
}
</style>
