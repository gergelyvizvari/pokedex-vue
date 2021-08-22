<template>
  <div class="Holder">
    <h1>Pokédex</h1>
    <div>List of pokémon</div>
    <div v-if="isLoaded" class="PokeList">
      <div
        class="PokeList__Button"
        v-for="(poke, ind) in pokemons"
        :key="`${ind}-${poke.name}`"
        @click="() => selectPokemon(poke.name)"
      >
        {{ poke.name }}
      </div>
    </div>
    <div v-else>
      Please wait
    </div>

    <div class="Paginator">
      <div>
        <div
          class="Paginator__Button prev"
          v-if="hasPreviousPage"
          @click="previousPage"
        >
          prev
        </div>
      </div>
      <div>
        <div
          class="Paginator__Button next"
          v-if="hasNextPage"
          @click="nextPage"
        >
          next
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      currentPage: 0,
      perPage: 10,
    };
  },
  methods: {
    selectPokemon(pokeName) {
      window.eventHub.$emit("clearSearch");
      this.$store.dispatch("selectPokemon", pokeName);
    },
    nextPage() {
      this.currentPage += 1;
    },
    previousPage() {
      this.currentPage -= 1;
    },
  },
  computed: {
    isLoaded() {
      return this.$store.state.loaded;
    },
    pokemons() {
      const from = this.currentPage * this.perPage;
      const pokemons = [...this.$store.state.pokemons];
      return pokemons.slice(from, from + this.perPage);
    },
    hasNextPage() {
      const from = this.currentPage * this.perPage;
      return from + this.perPage < this.$store.state.total;
    },
    hasPreviousPage() {
      return this.currentPage > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../index.scss";

.Holder {
  background-color: #642e2f;
  color: white;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  height: 100%;

  .PokeList {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: scroll;

    &__Button {
      background-color: white;
      border-radius: 4px;
      color: $black;
      margin-top: 10px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px;
      min-height: 40px;
      height: 40px;
      cursor: pointer;

      &:hover {
        background-color: $darkGrey;
        color: white;
      }
    }
  }
  .Paginator {
    display: flex;
    justify-content: space-between;
    width: 100%;
    &__Button {
      background-color: $orange;
      border-radius: 4px;
      color: $black;
      margin-top: 10px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px;
      height: 40px;
      cursor: pointer;
      width: 60px;
      color: white;
    }
  }
}
</style>
