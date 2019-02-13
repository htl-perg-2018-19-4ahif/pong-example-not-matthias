import { IQueue } from '../interfaces/queue';
import { IPlayerMove } from '../interfaces/player';
import { IVector2 } from '../interfaces/math';
import { sleep } from '../utils/sleep';

export class GameHandler {
  constructor(private queue: IQueue) {
    if (queue.player1.socket) queue.player1.socket.on('move_player', this.onMovePlayer1.bind(this));
    if (queue.player2.socket) queue.player2.socket.on('move_player', this.onMovePlayer2.bind(this));

    if (queue.player1.socket) queue.player1.socket.on('leave_game', this.onLeaveGamePlayer1.bind(this));
    if (queue.player2.socket) queue.player2.socket.on('leave_game', this.onLeaveGamePlayer2.bind(this));
  }

  //
  // Both
  //

  /**
   * Start the countdown for the game.
   */
  async startCountdown() {
    // Countdown
    for (let i = 3; i > 0; i--) {
      if (this.queue.player1.socket) this.queue.player1.socket.emit('count', i);
      if (this.queue.player2.socket) this.queue.player2.socket.emit('count', i);

      await sleep(2000);
    }

    // Start the game
    const ballVelocity: IVector2 = { x: -3, y: 5 };
    const ballVelocityInverted: IVector2 = { x: -ballVelocity.x, y: ballVelocity.y };

    if (this.queue.player1.socket) this.queue.player1.socket.emit('start_game', ballVelocity);
    if (this.queue.player2.socket) this.queue.player2.socket.emit('start_game', ballVelocityInverted);
  }

  //
  // Player 2
  //

  /**
   * Player1 moves the paddle, notify player2.
   * @param data the new coordinates.
   */
  onMovePlayer1(data: IPlayerMove) {
    if (this.queue.player2.socket) this.queue.player2.socket.emit('enemy_moved', data);
  }

  /**
   * Player1 left the game, notify player2.
   */
  onLeaveGamePlayer1() {
    if (this.queue.player2.socket) this.queue.player2.socket.emit('enemy_left_game');
  }

  //
  // Player 2
  //

  /**
   * Player2 moves the paddle, notify player1.
   * @param data the new coordinates.
   */
  onMovePlayer2(data: IPlayerMove) {
    if (this.queue.player1.socket) {
      // Notify the enemy
      this.queue.player1.socket.emit('enemy_moved', data);

      // Delete the player
      delete this.queue.player1;
    }
  }

  /**
   * Player2 left the game, notify player1.
   */
  onLeaveGamePlayer2() {
    if (this.queue.player1.socket) {
      // Notify the enemy
      this.queue.player1.socket.emit('enemy_left_game');

      // Delete the player
      delete this.queue.player2;
    }
  }
}
