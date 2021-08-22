<template>
  <div class="Holder">
    <single-result v-for="poke in pokemons" :key="poke.name" :pokemon="poke" />
  </div>
</template>

<script>
import SingleResult from "./single-result.vue";

export default {
  components: { SingleResult },
  name: "results",
  computed: {
    pokemons() {
      const selected = this.$store.state.selected;
      return this.$store.state.pokemons.filter((pokemon) => {
        return selected.includes(pokemon.name);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Holder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
