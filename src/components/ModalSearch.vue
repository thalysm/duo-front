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
  "setMovie": [id: number, title: string, image: string | null];
}>();
const internalValue = ref(false);

watch(
  () => props.modelValue,
  (value) => {
    internalValue.value = value;
    if (value) {
      moviesList.value = []; // Limpa a lista ao abrir o modal
      search.value = ""; // Limpa o campo de busca ao abrir o modal
      clearTimeout(timeout!);
      loading.value = false; // Reseta o estado de carregamento ao abrir o modal
    }
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
    moviesList.value = []; // Limpa a lista antes de buscar novos resultados
    loading.value = true;
    const response = await getMovieByName(name);
    console.log(response.data);
    moviesList.value = response.data.slice(0, 12); // Limitar a 12 resultados
  } catch (error) {
    console.error("Error fetching movies:", error);
  } finally {
    loading.value = false;
  }
};

const selectMovie = (movie:IMovie) => {
  emit("setMovie", movie.id, movie.title, movie.poster_path || null);

};

const closeModal = () => {
  internalValue.value = false;
  search.value = ""; // Limpa o campo de busca ao fechar o modal
  moviesList.value = []; // Limpa a lista ao fechar o modal
  clearTimeout(timeout!); // Limpa o timeout para evitar chamadas desnecessárias
};

</script>

<template>
  <Modal v-model="internalValue" @onClose="internalValue = false">
    <div class="header">

      <Input v-model="search"
      v-if="internalValue"
      > </Input>
      <svg @click="closeModal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

    </div>
    <div v-if="loading" class="loading-indicator">Carregando...</div>
    <div v-if="!loading && moviesList.length === 0" class="no-results">Digite para procurar</div>
    <div class="cards-results-search">
      <div class="card-result" v-for="movie in moviesList" :key="movie.id">
        <CardResult
          hiddenButton
          @click="selectMovie(movie)"
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  gap: 10px;
}
.header svg {
  cursor: pointer;
  color: var(--color-primary);
  width: 24px;
  height: 24px;
}
@media screen and (max-width: 768px) {
  .cards-results-search {
    max-width: 100%;
    max-height: 100%;
    gap: 10px;
    margin-top: 20px;
  }
  .movie-title {
    font-size: 14px;
  }
  .no-results, .loading-indicator {
    width: 100%;
    height: auto;
  }
  }
</style>
