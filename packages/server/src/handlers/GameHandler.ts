import { IQueue } from '../interfaces/queue';
import { IPlayerMove } from '../interfaces/player';

export class GameHandler {
  constructor(private queue: IQueue) {
    if (queue.player1.socket) queue.player1.socket.on('move_player', this.onMovePlayer1.bind(this));
    if (queue.player2.socket) queue.player2.socket.on('move_player', this.onMovePlayer2.bind(this));
  }

  onMovePlayer1(data: IPlayerMove) {
    console.log(`[${this.queue.player1.socket ? this.queue.player1.socket.client.id : 'DEBUG'}] onMovePlayer1.`);

    // TODO: calculate absolute screen pos
    // TODO: send enemy_moved to the enemy
  }
  onMovePlayer2(data: IPlayerMove) {
    console.log(`[${this.queue.player1.socket ? this.queue.player1.socket.client.id : 'DEBUG'}] onMovePlayer2.`);

    // TODO: calculate absolute screen pos
    // TODO: send enemy_moved to the enemy
  }
}
