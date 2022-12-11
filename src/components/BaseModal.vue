<script setup>
import IconCircle from "@/components/icons/IconCircle.vue";
import IconCross from "@/components/icons/IconCross.vue";
import BaseButton from "@/components/BaseButton.vue";
import { computed, ref } from "vue";
import { store } from "@/store";

const header = computed(() => {
  if (store.isATie()) return "";
  if (store.isEnemyCPU()) {
    return store.getPlayerWins() ? "You won!" : "Oh no , you lost...";
  }
});
const description = computed(() => {
  if (store.modalMode === "tie") return "Round tied";
  return store.modalMode !== "restart" ? "takes the round" : "restart game?";
});

const buttonTextPrimary = computed(() => {
  return store.modalMode !== "restart" ? "Next round" : "yes,restart";
});

const buttonTextSecondary = computed(() => {
  return store.modalMode !== "restart" ? "quit" : "no,cancel";
});
function restart() {
  store.restart();
}
function nextRound() {
  store.nextRound();
}
function cancel() {
  store.showModal = !store.showModal;
}
</script>
<template>
  <div class="container">
    <div class="modal">
      <h3
        v-if="store.modalMode !== 'restart' || store.modalMode !== 'tie'"
        class="modal__header"
      >
        {{ header }}
      </h3>
      <div class="modal__winner">
        <IconCircle v-if="store.modalMode === 'O'" />
        <IconCross v-else-if="store.modalMode === 'X'" />
        <p
          class="modal__wintext"
          :class="{
            circleColor: store.modalMode === 'O',
            crossColor: store.modalMode === 'X',
          }"
        >
          {{ description }}
        </p>
      </div>
      <div class="modal__buttons">
        <BaseButton
          mode="secondary"
          :text="buttonTextSecondary"
          :clickEvent="store.modalMode !== 'restart' ? restart : cancel"
        />
        <BaseButton
          mode="primary"
          :text="buttonTextPrimary"
          :clickEvent="store.modalMode !== 'restart' ? nextRound : restart"
        />
      </div>
    </div>
    <div class="overlay"></div>
  </div>
</template>
<style>
.container {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
  mix-blend-mode: normal;
}
.modal {
  background: var(--c-semi-dark-navy);
  width: 100vw;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  z-index: 999;
  opacity: 1;
  font-family: "Outfit";
  font-style: normal;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  padding: 5rem;
}
.modal__header {
  font-size: 1.6rem;
  line-height: 2rem;
  letter-spacing: 1px;
  color: var(--c-silver);
  font-style: normal;
  font-weight: 700;
}
.modal__winner {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}
.modal__wintext {
  font-size: 4rem;
  line-height: 5rem;
  color: var(--c-silver);
  font-style: normal;
  font-weight: 700;
}
.modal__buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
.circleColor {
  color: var(--c-light-yellow);
}
.crossColor {
  color: var(--c-light-blue);
}
@media (max-width: 60em) {
  .modal {
    transform: translateY(0%);
  }
}
</style>
