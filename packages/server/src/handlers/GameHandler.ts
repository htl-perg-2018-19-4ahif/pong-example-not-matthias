import { IQueue } from '../interfaces/queue';
import { IPlayerMove } from '../interfaces/player';
import { IVector2 } from '../interfaces/math';

interface Test {
  asdf: {
    asdf: number;
  };
}

export class GameHandler {
  constructor(private queue: IQueue) {
    if (queue.player1.socket) queue.player1.socket.on('move_player', this.onMovePlayer1.bind(this));
    if (queue.player2.socket) queue.player2.socket.on('move_player', this.onMovePlayer2.bind(this));

    // TODO: leave_game
  }

  /**
   * Start the countdown for the game.
   */
  startCountdown() {
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    // Countdown
    for (let i = 1; i < 4; i++) {
      if (this.queue.player1.socket) this.queue.player1.socket.emit('count', i);
      if (this.queue.player2.socket) this.queue.player2.socket.emit('count', i);

      sleep(2000);
    }

    // Start the game
    const ballVelocity: IVector2 = { x: -3, y: 5 };
    const ballVelocityInverted: IVector2 = { x: -ballVelocity.x, y: ballVelocity.y };

    if (this.queue.player1.socket) this.queue.player1.socket.emit('start_game', ballVelocity);
    if (this.queue.player2.socket) this.queue.player2.socket.emit('start_game', ballVelocityInverted);
  }

  /**
   * Player1 moves the paddle, notify player2.
   * @param data the new coordinates.
   */
  onMovePlayer1(data: IPlayerMove) {
    if (this.queue.player2.socket) this.queue.player2.socket.emit('enemy_moved', data);
  }

  /**
   * Player2 moves the paddle, notify player1.
   * @param data the new coordinates.
   */
  onMovePlayer2(data: IPlayerMove) {
    if (this.queue.player1.socket) this.queue.player1.socket.emit('enemy_moved', data);
  }
}
