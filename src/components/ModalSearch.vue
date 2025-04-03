<script setup lang="ts">
import { ref, watch } from "vue";
import Modal from "./Modal.vue";
import Input from "./Input.vue";
import CardResult from "./CardResult.vue";
import { getMovieByName } from "../services/movies";
import type { IMovie } from "../model/movie";

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

const search = ref("");
let timeout: NodeJS.Timeout | null = null; 
watch(
  () => search.value,
  (value) => {
    clearTimeout(timeout!);
    timeout = setTimeout(() => {
    if (value) {
      getMovies(value);}
      else {
        moviesList.value = []; // Limpa a lista se o campo de busca estiver vazio
      }
    }, 500); // meio segundo de delay
  },
);

const moviesList = ref<IMovie[]>([]);
const loading = ref(false);

const getMovies = async (name: string) => {
  try {
    loading.value = true;
    const response = await getMovieByName(name);
    console.log(response.data);
    moviesList.value = response.data.slice(0, 12); // Limitar a 10 resultados
  } catch (error) {
    console.error("Error fetching movies:", error);
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <Modal v-model="internalValue" @onClose="internalValue = false">
    <Input v-model="search"> </Input>
    <div v-if="loading" class="loading-indicator">Carregando...</div>
    <div v-if="!loading && moviesList.length === 0" class="no-results">Digite para procurar</div>
    <div class="cards-results-search">
      <div class="card-result" v-for="movie in moviesList" :key="movie.id">
        <CardResult
          hiddenButton
          @click=""
          :image="`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`"
        />
        <p class="movie-title">{{movie.title}}</p>
      </div>
    </div>
  </Modal>
</template>

<style>
.cards-results-search {
  display: flex;
  justify-content: space-between;
  align-items: top;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 50px;
  max-width: 860px;
  max-height: 310px;
  overflow-y: auto;
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
.no-results {
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  margin-top: 10px;
  width: 860px;
  height: 310px;
}
.loading-indicator {
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  margin-top: 10px;
  width: 860px;
  height: 310px;
}
</style>
