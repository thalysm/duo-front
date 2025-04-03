<script setup lang="ts">
import { ref, watch } from "vue";
import Modal from "./Modal.vue";
import Button from "./Button.vue";
import Rating from "./Rating.vue";

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();
const internalValue = ref(false);

watch(
  () => props.modelValue,
  (value) => {
    internalValue.value = value;
  },
  {
    immediate: true,
  }
);
watch(
  () => internalValue.value,
  (value) => {
    emit("update:modelValue", value);
  }
);
</script>
<template>
  <Modal v-model="internalValue" @onClose="internalValue = false">
    <div class="modal-feedback">
      <img src="@/assets/recomendation.svg" alt="">
      <h3>Avalie essa recomendação</h3>
      <p>Nos ajude a melhorar o sistema de recomendação, contribua com sua avalição.</p>
      <div v-if="internalValue">
        <Rating></Rating>
      </div>
      <div class="buttons">
        <Button type="tertiary">Cancelar</Button>
        <Button>Avaliar</Button>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
.modal-feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  max-width: 560px;
  padding: 20px;
}
h3 {
  font-size: 24px;
  font-weight: 580;
  color: var(--color-primary);
}
p {
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
}
.buttons {
  display: flex;
  gap: 10px;
  margin-top: 40px;
}
</style>
