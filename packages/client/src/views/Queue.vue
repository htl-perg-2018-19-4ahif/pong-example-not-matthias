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
import { IUser } from '@/interfaces/user';

@Component
export default class Queue extends Vue {
  private player1: string = this.$store.state.lobby.queue.player1;
  private player2: string = this.$store.state.lobby.queue.player2;

  /**
   * Register handlers
   */
  private created() {
    this.$socket.on('enemy_joined', this.onEnemyJoined);
    this.$socket.on('enemy_left', this.onEnemyLeft);
  }

  /**
   * Join queue.
   */
  private mounted() {
    this.$socket.emit('join_queue', this.$store.state.user.username);
  }

  /**
   * Leave the queue.
   */
  private destroyed() {
    this.$store.dispatch('leaveQueue');
    // TODO: show message that the user left the queue
  }

  //
  // Server reponse handlers
  //
  private onEnemyJoined(username: string) {
    this.$store.dispatch('enemyJoinQueue', username);
  }

  private onEnemyLeft(username: string) {
    this.$store.dispatch('enemyLeaveQueue');
  }
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
