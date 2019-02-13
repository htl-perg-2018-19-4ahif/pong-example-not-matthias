import socket, { Socket } from 'socket.io';
import { IPlayer } from '../interfaces/player';
import { queues } from '../store';
import { IQueue, IQueueResponse } from '../interfaces/queue';
import { GameHandler } from '../handlers/GameHandler';
import { sleep } from '../utils/sleep';

export class QueueHandler {
  private player: IPlayer = { name: '' };

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

    // TODO: use this.player instead of creating a new player

    //
    // Set the socket and name
    //
    player.socket = this.socket;
    this.player.name = player.name;

    //
    // Find games with enemy
    //
    // Player 1 is set
    let filteredQueues = queues.filter((queue) => queue.player1.name && !queue.player2.name);

    if (filteredQueues.length > 0) {
      console.log(`[${this.socket.client.id}] Joining full queue.`);
      let queue = filteredQueues[0];

      // Set the player
      queue.player2 = player;

      // Set the enemy
      let enemy = queue.player1;

      // Join the full game (notify enemy, start countdown, change view)
      this.joinFullGame(queue, player, enemy);

      return;
    }

    // Player 2 is set
    filteredQueues = queues.filter((queue) => !queue.player1.name && queue.player2.name);

    if (filteredQueues.length > 0) {
      console.log(`[${this.socket.client.id}] Joining full queue.`);
      let queue = filteredQueues[0];

      // Set the player
      queue.player1 = player;

      // Set the enemy
      let enemy = queue.player2;

      // Join the full game (notify enemy, start countdown, change view)
      this.joinFullGame(queue, player, enemy);

      return;
    }

    //
    // Join empty queue (only when nothing else available)
    //
    filteredQueues = queues.filter((queue) => !queue.player1.name && !queue.player2.name);

    if (filteredQueues.length > 0) {
      console.log(`[${this.socket.client.id}] Joining empty queue.`);
      let queue = filteredQueues[0];

      // Set the player
      queue.player1 = player;

      // Notify the player
      this.socket.emit('queue_joined', this.removeSocket(queue));

      return;
    }

    //
    // Create new queue
    //
    const queue = {
      player1: player,
      player2: { name: '' }
    };

    console.log(`[${this.socket.client.id}] Creating new queue.`);

    // Add the queue to the list
    queues.push(queue);

    // Notify the player
    this.socket.emit('queue_joined', this.removeSocket(queue));
  }

  /**
   * Player wants to leave the queue.
   * @param player the player data
   */
  onLeaveQueue() {
    console.log(`[${this.socket.client.id}] onLeaveQueue called.`);

    //
    // Find enemy player and remove the player
    //
    let player: IPlayer = { name: '' };

    // Check if player1 is current player
    let index = queues.findIndex((queue) => queue.player1.name === this.player.name);
    if (index !== -1) {
      queues[index].player1 = { name: '' };
      player = queues[index].player2;
    }

    // Check if player2 is current player
    index = queues.findIndex((queue) => queue.player2.name === this.player.name);
    if (index !== -1) {
      player = queues[index].player1;
      queues[index].player2 = { name: '' };
    }

    //
    // Notify enemy
    //
    if (player.socket) {
      player.socket.emit('enemy_left');
    } else {
      console.log('[WARNING] Didnt notify enemy');
    }
  }

  /**
   * Player from the queue disconnected.
   */
  onDisconnect() {
    this.onLeaveQueue();
  }

  /**
   * Removes the sockets from the response (otherwise the program crashes)
   * @param queue the queue with the sockets
   */
  removeSocket(queue: IQueue): IQueueResponse {
    return { player1: { name: queue.player1.name }, player2: { name: queue.player2.name } };
  }

  /**
   * Notify enemy, start countdown, send change_view
   * @param queue the queue (SHOULD be full)
   * @param player the local player
   * @param enemy the enemy player
   */
  async joinFullGame(queue: IQueue, player: IPlayer, enemy: IPlayer) {
    // Notify the player and enemy
    this.socket.emit('queue_joined', this.removeSocket(queue));
    if (queue.player1.socket) queue.player1.socket.emit('enemy_joined', { name: player.name });

    // Wait 3 seconds before changing the view
    await sleep(3000);

    // Change the player and enemy view
    this.socket.emit('change_view');
    if (queue.player1.socket) queue.player1.socket.emit('change_view');

    // Start a new game and the countdown
    const gameHandler = new GameHandler(queue);
    gameHandler.startCountdown();
  }
}
