<script setup>
import IconLogoCross from "./icons/IconLogoCross.vue";
import IconLogoCircle from "./icons/IconLogoCircle.vue";
</script>
<template>
  <div class="mark">
    <h3 class="mark-heading">Pick Player 1's Mark</h3>
    <div class="mark-container">
      <button class="mark-cross">
        <IconLogoCross />
      </button>
      <button class="mark-circle">
        <IconLogoCircle />
      </button>
    </div>
    <p class="mark-reminder">Remember: x goes first</p>
  </div>
</template>
<style scoped>
.mark {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  text-transform: uppercase;
  background-color: var(--c-semi-dark-navy);
  box-shadow: inset 0px -8px 0px #10212a;
  border-radius: 1.5rem;
  padding: 2rem;
}
.mark-heading {
  font-weight: 700;
  line-height: 2rem;
  text-align: center;
  color: var(--c-silver);
  letter-spacing: 1px;
}
.mark-reminder {
  font-size: 1.4rem;
  line-height: 1.8rem;
  text-align: center;
  color: var(--c-silver);
  opacity: 0.5;
  mix-blend-mode: normal;
  letter-spacing: 1px;
}
.mark-container {
  display: flex;
  justify-content: stretch;
  align-items: center;
  align-self: stretch;
  border-radius: 1rem;
  padding: 1rem;
  background-color: var(--c-dark-navy);
}
.mark-circle,
.mark-cross {
  cursor: pointer;
  flex: 1;
  padding: 1.5rem;
}

.mark-circle {
  background-color: var(--c-silver);
  border-radius: 1rem;
}
</style>
