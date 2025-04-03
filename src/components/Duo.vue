<script setup lang="ts">
import Card from "./Card.vue";
import Button from "./Button.vue";
import CardResult from "./CardResult.vue";
import ModalSearch from "./ModalSearch.vue";
import { ref } from "vue";
import ModalFeedback from "./ModalFeedback.vue";

const showModal = ref(false);
const showRate = ref(false);

</script>

<template>
  <ModalSearch v-model="showModal" />
  <ModalFeedback v-model="showRate" />
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
      <Card @click="showModal=true" type="primary" image="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zBiHKhXklvTFwj4M1uEUcQGAVJ.jpg"/>
      <Card type="primary" image="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zBiHKhXklvTFwj4M1uEUcQGAVJ.jpg"/>
      <Card type="primary" image="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zBiHKhXklvTFwj4M1uEUcQGAVJ.jpg"/>

      <Card type="secondary" image="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zBiHKhXklvTFwj4M1uEUcQGAVJ.jpg"/>
      <Card type="secondary" image="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zBiHKhXklvTFwj4M1uEUcQGAVJ.jpg"/>

      <Card type="primary"/>
      <Card type="primary" image="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zBiHKhXklvTFwj4M1uEUcQGAVJ.jpg"/>

      <Card type="secondary" image="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zBiHKhXklvTFwj4M1uEUcQGAVJ.jpg"/>
      <Card type="secondary" />
      <Card type="secondary" image="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zBiHKhXklvTFwj4M1uEUcQGAVJ.jpg"/>
    </div>
    <div class="action-button">

      <Button @click="() => console.log('Button clicked!')">
        Gerar recomendação
      </Button>
    </div>
    <div class="cards-results">
      <CardResult  @rate="showRate=true" image="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zBiHKhXklvTFwj4M1uEUcQGAVJ.jpg"/>
      <CardResult  image="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zBiHKhXklvTFwj4M1uEUcQGAVJ.jpg"/>
      <CardResult  image="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zBiHKhXklvTFwj4M1uEUcQGAVJ.jpg"/>
      <CardResult  />
      <CardResult  />

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
}
</style>
