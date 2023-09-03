<script setup>
import NavBar from "./components/NavBar.vue";
import Explorer from "./components/Explorer.vue";
</script>

<template>
  <div class="main-wrapper">
    <div class="navbar-wrapper">
      <NavBar />
    </div>
    <div class="explorer-wrapper">
      <Explorer />
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  width: 100%;
  height: 100vh;
  max-width: 1200px;
  margin: auto;
}

.navbar-wrapper {
  height: 80px;
}
.explorer-wrapper {
  width: 100%;
  height: calc(100vh - 160px);
  text-align: center;
  /*
  display: flex;
  justify-content: center;
  align-items: center;
  */
}
</style>
