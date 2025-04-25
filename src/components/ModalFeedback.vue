<script setup lang="ts">
import { ref, watch } from "vue";
import Modal from "./Modal.vue";
import Button from "./Button.vue";
import Rating from "./Rating.vue";
import type { IRating } from "../model/rating";
import { sendRating } from "../services/ratings";
import { TYPE_TOAST, useToast } from "b-toast";

const toast = useToast();

const props = defineProps<{
  modelValue: boolean;
  movieRecommendation: {id: number, similarity: number};
  listId: number[];
}>();
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();
const internalValue = ref(false);
const rating = ref<number | null>(null);

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

const closeModal = () => {
  rating.value = null;
  internalValue.value = false;
};


const createRating = async () => {
  if (rating.value === null) {
    return;
  }
  const payload: IRating = {
    rating: rating.value,
    movie_id: props.movieRecommendation.id,
    movies_associated: props.listId,
    similarity: props.movieRecommendation.similarity,
  };

  

  try {
    await sendRating(payload);
    closeModal();
    toast.show("Avaliação enviada com sucesso!");
  } catch (error) {
    console.error("Error sending rating:", error);
    toast.show("Erro ao enviar avaliação. Tente novamente mais tarde.", {
      type: TYPE_TOAST.ERROR,
    });
  }

  internalValue.value = false;
};

</script>
<template>
  <Modal v-model="internalValue" @onClose="internalValue = false">
    <div class="modal-feedback">
      <img src="@/assets/recomendation.svg" alt="">
      <h3>Avalie essa recomendação</h3>
      <p>Nos ajude a melhorar o sistema de recomendação, contribua com sua avalição.</p>
      <div v-if="internalValue">
        <Rating v-model="rating"></Rating>
      </div>
      <div class="buttons">
        <Button @click="closeModal" type="tertiary">Cancelar</Button>
        <Button @click="createRating">Avaliar</Button>
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
@media screen and (max-width: 768px) {
  .modal-feedback {
    max-width: 100%;
    padding: 10px;
    height: 100%;
  }
  h3 {
    font-size: 20px;
  }
  p {
    font-size: 12px;
  }
}
</style>
