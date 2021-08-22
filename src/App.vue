<template>
  <div class="App">
    <div class="App__ListHolder">
      <list />
    </div>
    <div class="App__ResultHolder">
      <search />
      <results />
    </div>
  </div>
</template>

<script>
import List from "./components/list.vue";
import Results from "./components/results.vue";
import Search from "./components/search.vue";

export default {
  components: { List, Results, Search },
  name: "App",
  created() {
    this.$store.dispatch("loadAllPokemons");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.App {
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  font-family: "Open Sans", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media screen and (max-width: 900px) {
    display: block;
  }

  &__ListHolder {
    max-width: 350px;
    height: 100%;
    flex: 1;
    background-color: green;
    overflow: auto;

    @media screen and (max-width: 900px) {
      width: 100%;
      max-width: inherit;
      height: auto;
      min-height: 100px;
      overflow: inherit;
    }
  }

  &__ResultHolder {
    min-width: 300px;
    height: 100%;
    flex: 1;
    overflow: auto;

    @media screen and (max-width: 900px) {
      width: 100%;
      height: auto;
      min-height: 100px;
      overflow: inherit;
    }
  }
}
</style>
