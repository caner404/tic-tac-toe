<script setup>
const props = defineProps({
  mode: String,
  enemy: String,
});
</script>
<template>
  <button :class="mode">
    New Game (VS <span>{{ enemy }}</span
    >)
  </button>
</template>
<style scoped>
button {
  font-family: "Outfit";
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.5rem;
  text-align: center;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  color: var(--c-dark-navy);
  border-radius: 1.5rem;
  padding: 2.1rem 1rem;
  cursor: pointer;
}
.player {
  background-color: var(--c-light-blue);
  box-shadow: inset 0px -8px 0px #118c87;
}
.player:hover,
.player:active {
  background-color: var(--c-light-blue-hover);
}
.player:active {
  box-shadow: inset 0px 0px 0px #118c87;
}

.cpu {
  background-color: var(--c-light-yellow);
  box-shadow: inset 0px -8px 0px #cc8b13;
}
.cpu:hover,
.cpu:active {
  background-color: var(--c-light-yellow-hover);
}
.cpu:active {
  box-shadow: inset 0px 0px 0px #cc8b13;
}
</style>
