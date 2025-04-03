<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "primary" | "secondary" | "tertiary";
  }>(),
  { type: "primary" }
);
const emits = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <button
    @click="() => emits('click')"
    class="button"
    :class="`button-${type}`"
  >
    <slot></slot>
  </button>
</template>

<style>
.button {
  background-color: var(--color-primary);
  color: #ffffff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}
.button-primary {
  background-color: var(--color-primary);
  color: #ffffff;
}
.button-primary:hover {
  background-color: #CC0149;
}
.button-secondary {
  background-color: rgba(0, 0, 0, 0.8);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}
.button-secondary:hover {
  background-color: #000000;
}
.button-tertiary {
  background-color: #ffffff;
  color: var(--color-primary);
}
.button-tertiary:hover {
  background-color: #E2E2E2;
}
</style>
