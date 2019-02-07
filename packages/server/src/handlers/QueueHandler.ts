import socket, { Socket } from 'socket.io';
import { IPlayer } from '../interfaces/player';
import { queues } from '../store';
import { IQueue } from '../interfaces/queue';

export class QueueHandler {
  private player: IPlayer = {};

  /**
   * Initializes the handlers.
   * @param io socket io
   * @param socket the client socket
   */
  constructor(private io: socket.Server, private socket: Socket) {
    this.player.socket = socket;

    socket.on('join_queue', this.onJoinQueue.bind(this));
    socket.on('leave_queue', this.onLeaveQueue.bind(this));
  }

  /**
   * Player wants to join the queue.
   * @param player the player data
   */
  onJoinQueue(player: IPlayer) {
    console.log(`[${this.socket.client.id}] onJoinQueue called.`);

    // Set the player
    this.player = player;

    //
    // Find games with enemy
    //
    let filteredQueues = queues.filter((queue) => !queue.player2);

    if (filteredQueues.length > 0) {
      let queue = filteredQueues[0];

      // Set the player
      queue.player2 = player;

      // Notify the enemy
      if (queue.player1.socket) queue.player1.socket.emit('enemy_joined', player.name);

      // Notify the player
      this.socket.emit('queue_joined', queue);

      return;
    }

    //
    // Join empty queue (only when nothing else available)
    //
    filteredQueues = queues.filter((queue) => !queue.player1 && !queue.player2);

    if (filteredQueues.length > 0) {
      let queue = filteredQueues[0];

      // Set the player
      queue.player1 = player;

      // Notify the player
      this.socket.emit('queue_joined', queue);

      return;
    }

    //
    // Create new queue
    //
    const queue: IQueue = {
      player1: player,
      player2: {}
    };

    // Add the queue to the list
    queues.push(queue);

    // Notify the player
    this.socket.emit('queue_joined', queue);
  }

  /**
   * Player wants to leave the queue.
   * @param player the player data
   */
  onLeaveQueue(player: IPlayer) {
    console.log(`[${this.socket.client.id}] onLeaveQueue called.`);
  }

  /**
   * Player disconnected.
   */
  onDisconnect() {
    this.onLeaveQueue(this.player);
  }
}
