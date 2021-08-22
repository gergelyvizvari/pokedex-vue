<template>
  <div class="SingleHolder">
    <div class="Image">
      <img v-if="pokemon.loaded" :src="pokemon.data.sprites.front_default" />
    </div>
    <div class="Details" v-if="!pokemon.loaded">
      {{ pokemon.name }}
      <b>Please wait</b>
    </div>
    <div class="Details" v-else>
      <div class="Details__NameColumn">
        <div class="name">
          <strong>{{ pokemon.name }}</strong>
        </div>
        <div>Weight: {{ pokemon.data.weight }}kg</div>
        <div>height: {{ pokemon.data.height }}cm</div>
      </div>
      <div class="Details__Abilities">
        Abilities:<br />
        <div
          v-for="ability in pokemon.data.abilities"
          :key="ability.ability.name"
          class="ability"
        >
          {{ ability.ability.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pokemon"],
};
</script>

<style lang="scss" scoped>
@import "./../index.scss";
.SingleHolder {
  display: flex;
  flex-direction: row;
  width: calc(100% - 100px);

  .Image {
    width: 80px;
    height: auto;
    display: flex;
    align-items: center;
  }
  .Details {
    box-shadow: 0 10px 10px 5px $grey;
    padding: 20px;
    margin: 20px;
    flex: 1;
    display: flex;
    flex-direction: row;
    @media screen and (max-width: 800px) {
      flex-direction: column;
    }

    color: $darkGrey;
    font-weight: bold;
    line-height: 30px;

    &__NameColumn {
      .name {
        color: black;
      }
    }

    &__Abilities {
      margin-left: 30px;
      @media screen and (max-width: 800px) {
        margin-left: 0;
        margin-top: 10px;
      }
      .ability {
        background-color: $grey;
        margin: 4px;
        border-radius: 16px;
        line-height: 20px;
        padding: 2px 6px;
        font-size: 14px;
        text-align: center;
        display: inline-block;
      }
    }
  }
}
</style>
