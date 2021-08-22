<template>
  <div class="Holder">
    <input
      placeholder="Search..."
      class="Search__Input"
      v-model="search"
      @change="onSearchChange"
    />
    <div class="Search__Error" v-if="error">{{ error }}</div>
    <div class="Search__NoMatch" v-if="hasNoResult">No moatch</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      error: "",
    };
  },
  mounted() {
    window.eventHub.$on("clearSearch", this.clearSearch);
  },
  beforeDestroy() {
    window.eventHub.$off("add-todo", this.clearSearch);
  },
  methods: {
    clearSearch() {
      this.search = "";
    },
    onSearchChange() {
      if (this.search.length < 3) {
        this.error = "Search should be more that 3 character";
        return;
      }
      this.error = "";
      this.$store.dispatch("searchPokemons", this.search);
    },
  },
  computed: {
    hasNoResult() {
      return (
        this.$store.state.isSearch && !this.$store.state.hasMatch && !this.error
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../index";
.Holder {
  display: flex;
  flex-direction: column;

  .Search {
    &__Input {
      display: block;
      outline: none;
      box-shadow: 0 0 4px 5px $grey;
      border: solid 1px $darkGrey;
      border-radius: 4px;
      padding: 8px;
      margin: 16px;
    }
    &__Error {
      color: $orange;
      text-align: center;
      margin-top: -14px;
    }
    &__NoMatch {
      color: $orange;
      text-align: center;
      margin-top: -14px;
    }
  }
}
</style>
