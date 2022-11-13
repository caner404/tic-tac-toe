<script setup>
import IconLogo from "@/components/icons/IconLogo.vue";
import IconRestart from "@/components/icons/IconRestart.vue";
import CurrentPlayerBox from "@/components/CurrentPlayerBox.vue";
import { store } from "../../store";
</script>
<template>
  <div class="gameBoard">
    <IconLogo />
    <CurrentPlayerBox />
    <button
      class="restart"
      @click="store.isGameboardActive = !store.isGameboardActive"
    >
      <IconRestart />
    </button>
    <button class="gameButton">1</button>
    <button class="gameButton">2</button>
    <button class="gameButton">3</button>
    <button class="gameButton">4</button>
    <button class="gameButton">5</button>
    <button class="gameButton">6</button>
    <button class="gameButton">7</button>
    <button class="gameButton">8</button>
    <button class="gameButton">9</button>
    <div class="stats stats--cross">
      <p class="stats-description">X (YOU)</p>
      <p class="stats-value">0</p>
    </div>
    <div class="stats stats--ties">
      <p class="stats-description">TIES</p>
      <p class="stats-value">0</p>
    </div>
    <div class="stats stats--circle">
      <p class="stats-description">O (CPU)</p>
      <p class="stats-value">0</p>
    </div>
  </div>
</template>
<style scoped>
.gameBoard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.restart {
  background: var(--c-silver);
  box-shadow: inset 0px -4px 0px #658997;
  border-radius: 1rem;
  width: 5.2rem;
  height: 5.2rem;
  justify-self: end;
}

.gameButton {
  background-color: var(--c-semi-dark-navy);
  box-shadow: inset 0px -8px 0px #10212a;
  border-radius: 1.5rem;
  width: 14rem;
  height: 14rem;
  text-align: center;
  color: #fff;
}
.stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1.5rem;
  padding: 1rem;
  color: var(--c-dark-navy);
  text-align: center;
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
.stats--circle {
  background-color: var(--c-light-yellow);
}
.stats--ties {
  background-color: var(--c-silver);
}
.stats--cross {
  background-color: var(--c-light-blue);
}
</style>
