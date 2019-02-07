import socket, { Socket } from 'socket.io';
import { IPlayer } from '../interfaces/player';
import { queues } from '../store';
import { IQueue, IQueueResponse } from '../interfaces/queue';

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

    //
    // Set the socket and name
    //
    player.socket = this.socket;
    this.player.name = player.name;

    //
    // Find games with enemy
    //
    let filteredQueues = queues.filter((queue) => queue.player1.name && !queue.player2.name);

    if (filteredQueues.length > 0) {
      console.log('Joining full queue');
      let queue = filteredQueues[0];

      // Set the player
      queue.player2 = player;

      // Notify the enemy
      if (queue.player1.socket) queue.player1.socket.emit('enemy_joined', { name: player.name });

      // Notify the player
      this.socket.emit('queue_joined', this.removeSocket(queue));

      return;
    }

    //
    // Join empty queue (only when nothing else available)
    //
    filteredQueues = queues.filter((queue) => !queue.player1.name && !queue.player2.name);

    if (filteredQueues.length > 0) {
      console.log('Joining empty queue');
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
    const queue: IQueue = {
      player1: player,
      player2: { name: '' }
    };

    console.log('Creating new queue');

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
    // Find enemy player
    //
    let player: IPlayer = { name: '' };

    // Check if player1 is current player
    let filteredQueue = queues.filter((queue) => queue.player1.name === this.player.name);
    if (filteredQueue.length > 0) player = filteredQueue[0].player2;

    // Check if player2 is current player
    filteredQueue = queues.filter((queue) => queue.player2.name === this.player.name);
    if (filteredQueue.length > 0) player = filteredQueue[0].player1;

    //
    // Notify enemy
    //
    if (player.socket) {
      player.socket.emit('enemy_left');
      console.log('Notified enemy');
    } else {
      console.log('Didnt notify enemy');
    }
  }

  /**
   * Player disconnected.
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
}
