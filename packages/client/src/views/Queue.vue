<template>
  <v-container text-xs-center class="pt-5">
    <!-- Player 1 -->
    <div class="player-1 pa-3 pl-4 my-4">
      <h1 class="display-3">{{ player1 || "Loading" }}</h1>
    </div>

    <!-- vs -->
    <h1 class="display-1">vs.</h1>

    <!-- Player 2 -->
    <div class="player-2 pa-3 pl-4 my-4">
      <h1 class="display-3">{{ player2 || "Loading..." }}</h1>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Queue extends Vue {
  private player1: string = 'not-matthias';
  private player2: string = '';
}
</script>


<style scoped>
.player-1 {
  background-color: white;
  border: 1px solid #ddd;
  border-left: 8px solid orange;
}
.player-2 {
  background-color: white;
  border: 1px solid #ddd;
  border-left: 8px solid blue;
}
</style>
