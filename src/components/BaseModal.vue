<script setup>
import IconCircle from "@/components/icons/IconCircle.vue";
import IconCross from "@/components/icons/IconCross.vue";
import IconCircleSmall from "@/components/icons/IconCircleSmall.vue";
import IconCrossSmall from "@/components/icons/IconCrossSmall.vue";
import BaseButton from "@/components/BaseModalButton.vue";
import FadeTransition from "@/components/FadeTransition.vue";
import { computed } from "vue";
import { useGameStatsStore } from "@/stores/gameStats";
import { useMainStore } from "@/stores/main";

const main = useMainStore();
const gamestats = useGameStatsStore();

const header = computed(() => {
  if (gamestats.isATie()) return "";
  if (gamestats.isEnemy("cpu")) {
    return gamestats.getPlayerWins ? "You won!" : "Oh no , you lost...";
  }
});
const description = computed(() => {
  if (main.modalMode === "tie") return "Round tied";
  return main.modalMode !== "restart" ? "takes the round" : "restart game?";
});

const buttonTextPrimary = computed(() => {
  return main.modalMode !== "restart" ? "Next round" : "yes,restart";
});

const buttonTextSecondary = computed(() => {
  return main.modalMode !== "restart" ? "quit" : "no,cancel";
});
function restart() {
  main.restart();
}
function nextRound() {
  main.nextRound();
}
function cancel() {
  main.showModal = !main.showModal;
}
</script>
<template>
  <FadeTransition>
    <div class="container">
      <div class="modal">
        <h3
          v-if="main.modalMode !== 'restart' || main.modalMode !== 'tie'"
          class="modal__header"
        >
          {{ header }}
        </h3>
        <div class="modal__winner">
          <IconCircle v-if="main.modalMode === 'O'" class="iconActive" />
          <IconCross v-else-if="main.modalMode === 'X'" class="iconActive" />
          <IconCircleSmall
            v-if="main.modalMode === 'O'"
            class="iconActiveMobile"
            mode="modal"
          />
          <IconCrossSmall
            v-else-if="main.modalMode === 'X'"
            class="iconActiveMobile"
            mode="modal"
          />
          <p
            class="modal__wintext"
            :class="{
              circleColor: main.modalMode === 'O',
              crossColor: main.modalMode === 'X',
            }"
          >
            {{ description }}
          </p>
        </div>
        <div class="modal__buttons">
          <BaseButton
            mode="secondary"
            :text="buttonTextSecondary"
            :emitEventType="main.modalMode === 'restart' ? 'cancel' : 'quit'"
            @cancel="cancel"
            @quit="restart"
          />
          <BaseButton
            mode="primary"
            :text="buttonTextPrimary"
            :emitEventType="
              main.modalMode !== 'restart' ? 'nextRound' : 'restart'
            "
            @next-round="nextRound"
            @restart="restart"
          />
        </div>
      </div>
      <div class="overlay"></div>
    </div>
  </FadeTransition>
</template>
<style scoped>
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
.iconActive {
  display: visible;
}
.iconActiveMobile {
  display: none;
}
@media (max-width: 60em) {
  .modal {
    transform: translateY(0%);
  }
}
@media (max-width: 30em) {
  .modal {
    padding: 5rem 2.5rem;
  }
  .modal__winner {
    gap: 1rem;
  }
  .modal__wintext {
    font-size: 2.4rem;
    line-height: 3rem;
    letter-spacing: 1.5px;
    gap: 1rem;
  }
  .iconActive {
    display: none;
  }
  .iconActiveMobile {
    display: block;
  }
}
</style>
