<script setup lang="ts">
import { ref, watch } from "vue";
import Modal from "./Modal.vue";
import Input from "./Input.vue";
import CardResult from "./CardResult.vue";

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
    <Input> </Input>
    <div class="cards-results-search">
      <div class="card-result">
        <CardResult
          hiddenButton
          @click=""
          image="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zBiHKhXklvTFwj4M1uEUcQGAVJ.jpg"
        />
        <p class="movie-title">Avatar: O último mestre do ar</p>
      </div>
      <div class="card-result">
        <CardResult
          hiddenButton
          @click=""
          image="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zBiHKhXklvTFwj4M1uEUcQGAVJ.jpg"
        />
        <p class="movie-title">Avatar: O último mestre do ar</p>
      </div>
      <div class="card-result">
        <CardResult
          hiddenButton
          @click=""
          image="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zBiHKhXklvTFwj4M1uEUcQGAVJ.jpg"
        />
        <p class="movie-title">Avatar: O último mestre do ar</p>
      </div>
      <div class="card-result">
        <CardResult
          hiddenButton
          @click=""
          image="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zBiHKhXklvTFwj4M1uEUcQGAVJ.jpg"
        />
        <p class="movie-title">Avatar: O último mestre do ar</p>
      </div>
    </div>
  </Modal>
</template>

<style>
.cards-results-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 50px;
}
.card-result {
  max-width: min-content;
}
.movie-title {
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  margin-top: 10px;
}
</style>
