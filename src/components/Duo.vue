<script setup lang="ts">
import Card from "./Card.vue";
import Button from "./Button.vue";
import CardResult from "./CardResult.vue";
import ModalSearch from "./ModalSearch.vue";
import { computed, onMounted, ref } from "vue";
import ModalFeedback from "./ModalFeedback.vue";
import { generateMovies } from "../services/movies";
import type { IMovie } from "../model/movie";
import { TYPE_TOAST, useToast } from "b-toast";

const showModal = ref(false);
const showRate = ref(false);
const selectedCard = ref<number | null>(null);
const selectedList = ref<0 | 1>(0);
const toast = useToast();

const listOne = ref<Record<number,any>>({
  0:{
    id: null,
    title: null,
    image: null,
  },
  1:{
    id: null,
    title: null,
    image: null,
  },
  2:{
    id: null,
    title: null,
    image: null,
  },
  3:{
    id: null,
    title: null,
    image: null,
  },
  4:{
    id: null,
    title: null,
    image: null,
  },
})
const listTwo = ref<Record<number,any>>({
  0:{
    id: null,
    title: null,
    image: null,
  },
  1:{
    id: null,
    title: null,
    image: null,
  },
  2:{
    id: null,
    title: null,
    image: null,
  },
  3:{
    id: null,
    title: null,
    image: null,
  },
  4:{
    id: null,
    title: null,
    image: null,
  },
})

const showModalSearch = (id: number, list: 0 | 1) => {
 selectedCard.value = id;
  showModal.value = true;
  selectedList.value = list;
};

const setSelectedCard = ( id:number, title: string ,image: string | null) => {
  showModal.value = false;
  if (selectedCard.value === null) return;
  if (selectedList.value === 0) {
    listOne.value[selectedCard.value].id = id;
    listOne.value[selectedCard.value].title = title;
    listOne.value[selectedCard.value].image = image;
    localStorage.setItem("listOne", JSON.stringify(listOne.value));
    return;
  } else {
    listTwo.value[selectedCard.value].id = id;
    listTwo.value[selectedCard.value].title = title;
    listTwo.value[selectedCard.value].image = image;
    localStorage.setItem("listTwo", JSON.stringify(listTwo.value));
  }
};

const recommendations = ref<IMovie[]>([]);
const recommendation = ref<{id: number, similarity: number}>({id:-1, similarity: -1});

const setSelectedCardRecommendation = (id: number, similarity: number) => {
  showRate.value = true;
  recommendation.value.id = id;
  recommendation.value.similarity = similarity;
};


const generateRecommendation = async () => {
  const payload = {
    user1_movies: Object.values(listOne.value).map((item) => item.id),
    user2_movies: Object.values(listTwo.value).map((item) => item.id),
  };

  try {
    const response = await generateMovies(payload);
    recommendations.value = response.data.recommendations;
  } catch (error) {
    console.error("Error generating recommendation:", error);
    toast.show("Erro ao gerar recomendação. Tente novamente mais tarde.", {
      type: TYPE_TOAST.ERROR,
    });
  }

}

  onMounted(() => {
    const storedListOne = localStorage.getItem("listOne");
    const storedListTwo = localStorage.getItem("listTwo");

    if (storedListOne) {
      listOne.value = JSON.parse(storedListOne);
    }
    if (storedListTwo) {
      listTwo.value = JSON.parse(storedListTwo);
    }
  });

  const clearLists = () => {
    listOne.value = {
      0:{
        id: null,
        title: null,
        image: null,
      },
      1:{
        id: null,
        title: null,
        image: null,
      },
      2:{
        id: null,
        title: null,
        image: null,
      },
      3:{
        id: null,
        title: null,
        image: null,
      },
      4:{
        id: null,
        title: null,
        image: null,
      },
    };
    listTwo.value = {
      0:{
        id: null,
        title: null,
        image: null,
      },
      1:{
        id: null,
        title: null,
        image: null,
      },
      2:{
        id: null,
        title: null,
        image: null,
      },
      3:{
        id: null,
        title: null,
        image: null,
      },
      4:{
        id: null,
        title: null,
        image: null,
      },
    };
    localStorage.removeItem("listOne");
    localStorage.removeItem("listTwo");
  };

  const listId = computed(() => {
    return [...Object.values(listOne.value), ...Object.values(listTwo.value)].map((item) => item.id);
  });

</script>

<template>
  <ModalSearch v-model="showModal" @setMovie="setSelectedCard" />
  <ModalFeedback v-model="showRate" :movie-recommendation="recommendation" :listId="listId" />
  <div class="background">
    <div class="menu">
      <h1 class="title">D<span class="title-complete">uo</span></h1>
      <div class="divider"></div>
    </div>
    <div class="title-list">
      <h2 class="list one">Primeira Lista</h2>
      <h2 class="list two">Segunda Lista</h2>
    </div>
    <div class="cards">
      <Card @click="showModalSearch(0,0)" type="primary" :image="listOne[0].image?`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${listOne[0].image}`:undefined"/>
      <Card @click="showModalSearch(1,0)" type="primary" :image="listOne[1].image?`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${listOne[1].image}`:undefined"/>
      <Card @click="showModalSearch(2,0)" type="primary" :image="listOne[2].image?`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${listOne[2].image}`:undefined"/>

      <Card @click="showModalSearch(0,1)" type="secondary" :image="listTwo[0].image?`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${listTwo[0].image}`:undefined"/>
      <Card @click="showModalSearch(1,1)" type="secondary" :image="listTwo[1].image?`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${listTwo[1].image}`:undefined"/>
      
      <Card @click="showModalSearch(3,0)" type="primary" :image="listOne[3].image?`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${listOne[3].image}`:undefined"/>
      <Card @click="showModalSearch(4,0)" type="primary" :image="listOne[4].image?`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${listOne[4].image}`:undefined"/>
      
      <Card @click="showModalSearch(2,1)" type="secondary" :image="listTwo[2].image?`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${listTwo[2].image}`:undefined"/>
      <Card @click="showModalSearch(3,1)" type="secondary" :image="listTwo[3].image?`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${listTwo[3].image}`:undefined"/>
      <Card @click="showModalSearch(4,1)" type="secondary" :image="listTwo[4].image?`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${listTwo[4].image}`:undefined"/>
    </div>
    <div class="action-button">
      <Button @click="clearLists" type="secondary">
        Limpar listas
      </Button>

      <Button @click="generateRecommendation">
        Gerar recomendação
      </Button>
    </div>
    <div class="cards-results">
      <CardResult v-for="recomend in recommendations"  @rate="setSelectedCardRecommendation(recomend.id,recomend.similarity)" :image="`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${recomend.poster_path}`"/>
      

    </div>
  </div>
</template>

<style>
.background {
  background-color: var(--color-background);
  color: #ffffff;
  max-width: 1080px;
  margin: 0 auto;
  margin-top: 10px;
  padding-bottom: 20px;
}
.title {
  font-size: 30px;
  font-weight: bold;
  color: var(--color-primary);
}
.title-complete {
  color: #ffffff;
}
.divider {
  width: 100%;
  height: 2px;
  background-color: var(--color-highlight);
  margin-top: 10px;
}
.title-list {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.list {
  font-size: 24px;
  font-weight: 600;
}
.list.one {
  color: var(--color-primary);
}
.list.two {
  color: var(--color-secondary);
}
.cards, .cards-results {
  padding-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  
}
.action-button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
}
@media (max-width: 768px) {
  .cards, .cards-results {
    grid-template-columns: 1fr 1fr;
    place-items: center;
  }
  .card:nth-child(1){
    order: 0;    
  }
  .card:nth-child(2){
    order: 4;    
  }
  .card:nth-child(3){
    order: 2;    
  }
  .card:nth-child(4){
    order: 3;    
  }
  .card:nth-child(5){
    order: 1;    
  }
  .card:nth-child(6){
    order: 8;    
  }
  .card:nth-child(7){
    order: 6;    
  }
  .card:nth-child(8){
    order: 7;    
  }
  .card:nth-child(9){
    order: 5;    
  }
  .card:nth-child(10){
    order: 9;    
  }
  .title-list{
    justify-content: space-around;
  }
  .cards-results .card:last-child {
    display: none;
  }
  .title {
    padding-left: 10px;
  }
}

</style>
