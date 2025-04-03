<script setup lang="ts">
import Button from "./Button.vue";

defineProps<{
  image?: string;
  hiddenButton?: boolean;
  onClick?: () => void;
}>();
const emits = defineEmits<{
  (e: "click"): void;
  (e: "rate"): void;
}>();
</script>

<template>
  <div
    @click="() => emits('click')"
    class="card" :class=" onClick ? 'cursor-pointer':''"
    :style="{
      backgroundImage: image ? `url(${image})` : '',
    }"
  >
  <Button v-if="image && !hiddenButton" class="button-rate" type="secondary" @click="() => emits('rate')">
    Avaliar
  </Button>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-results);
  width: 200px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: end;
  padding-bottom: 10px;
  background-size: cover;
  background-position: center;
}
.button-rate {
opacity: 0;
visibility: hidden;
transition: opacity 0.3s ease, visibility 0.3s ease;
}
.card:hover .button-rate {
  opacity: 1;
  visibility: visible;
}
.cursor-pointer {
  cursor: pointer;
}

</style>
