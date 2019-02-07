<template>
  <v-container text-xs-center class="pt-5">
    <!-- Player 1 -->
    <div class="player-1 pa-3 pl-4 my-4">
      <h1 class="display-3">{{ player1 }}</h1>
    </div>

    <!-- vs -->
    <h1 class="display-1">vs.</h1>

    <!-- Player 2 -->
    <div class="player-2 pa-3 pl-4 my-4">
      <h1 class="display-3">{{ player2 }}</h1>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IPlayer } from '@/interfaces/player';
import { IQueue } from '@/interfaces/queue';

@Component
export default class Queue extends Vue {
  private player1: string = 'Loading';
  private player2: string = 'Loading';

  /**
   * Register handlers
   */
  private created() {
    this.$socket.on('enemy_joined', this.onEnemyJoined);
    this.$socket.on('enemy_left', this.onEnemyLeft);
    this.$socket.on('queue_joined', this.onQueueJoined);
  }

  /**
   * Join queue.
   */
  private mounted() {
    console.log('mounted');

    this.$socket.emit('join_queue', { name: this.$store.state.user.username });
  }

  /**
   * Leave the queue.
   */
  private destroyed() {
    // TODO: show message that the user left the queue

    this.$store.dispatch('playerLeaveQueue');
  }

  /**
   * Update usernames from the store
   */
  private updateUsernames() {
    if (this.$store.state.queue.queue.player1) this.player1 = this.$store.state.queue.queue.player1;
    if (this.$store.state.queue.queue.player2) this.player2 = this.$store.state.queue.queue.player2;
  }

  //
  // Server reponse handlers
  //
  private onQueueJoined(queue: IQueue) {
    // Player1 - Waiting for opponent
    if (queue.player1.name && !queue.player2.name) {
      this.$store.dispatch('playerJoinQueue', queue.player1.name);
    }

    // Player2 - Game is ready
    if (queue.player1.name && queue.player2.name) {
      this.$store.dispatch('playerJoinQueue', queue.player2.name);
      this.$store.dispatch('enemyJoinQueue', queue.player1.name);
    }

    // Update the usernames
    this.updateUsernames();
  }

  private onEnemyJoined(player: IPlayer) {
    this.$store.dispatch('enemyJoinQueue', player.name);
    this.updateUsernames();
  }

  private onEnemyLeft() {
    this.$store.dispatch('enemyLeaveQueue');
    this.updateUsernames();
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
