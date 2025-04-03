<script setup lang="ts">
defineProps<{
  type: "primary" | "secondary";
  image?: string;
}>();
const emits = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <div @click="() => emits('click')"
    class="card" :class="`card-${type}`"
    :style="{
      backgroundImage: image ? `url(${image})`:'',
    }"
  >
    <svg v-if="!image"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.5V19.5M19.5 12H4.5"
        :stroke="
          type == 'primary' ? 'var(--color-primary)' : 'var(--color-secondary)'
        "
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-gray);
  width: 200px;
  height: 250px;
  border: 1px solid var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
      background-position: center;
      cursor: pointer;
}
.card-secondary {
  border: 1px solid var(--color-secondary);
}
</style>
