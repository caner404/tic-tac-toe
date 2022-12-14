<script></script>
<template>
  <Transition appear name="fade">
    <slot></slot>
  </Transition>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, visibility 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  visibility: hidden;
}
</style>
