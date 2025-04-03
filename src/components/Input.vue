<script setup lang="ts"></script>
<template>
  <div class="input-container">
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.0008 19.3708L13.8038 14.2486M13.8038 14.2486C15.2104 12.8623 16.0006 10.982 16.0006 9.02149C16.0006 7.06095 15.2104 5.1807 13.8038 3.79438C12.3972 2.40807 10.4895 1.62924 8.50028 1.62924C6.51108 1.62924 4.60336 2.40807 3.19678 3.79438C1.79021 5.1807 1 7.06095 1 9.02149C1 10.982 1.79021 12.8623 3.19678 14.2486C4.60336 15.6349 6.51108 16.4137 8.50028 16.4137C10.4895 16.4137 12.3972 15.6349 13.8038 14.2486Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <input
      type="text"
      class="input"
      placeholder="Pesquisar títulos">

  </div>
</template>
<style>
.input-container {
  display: flex;
  align-items: center;
  background-color: var(--color-gray);
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  height: 40px;
}
.input-container svg {
  margin-right: 20px;
  margin-left: 10px;
}
.input {
  background-color: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 15px;
  font-weight: 400;
  width: 100%;
}
.input::placeholder {
  color: #8B8B8B;
  font-size: 15px;
  font-weight: 400;
}
.input:focus::placeholder {
  color: transparent;
}

</style>
