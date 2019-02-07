import socket, { Socket } from 'socket.io';
import { IPlayer } from '../interfaces/player';
import { players } from '../store';

export class LoginHandler {
  private player: IPlayer = { name: '' };

  /**
   * Initializes the handlers.
   * @param io socket io
   * @param socket the client socket
   */
  constructor(private io: socket.Server, private socket: Socket) {
    socket.on('login', this.onLogin.bind(this));
  }

  /**
   * Player wants to login.
   * @param player the player data
   */
  onLogin(player: IPlayer) {
    console.log(`[${this.socket.client.id}] onLogin called.`);

    //
    // Check username
    //
    if (!player.name) {
      this.socket.emit('invalid_username');
      return;
    }

    //
    // Check if username in use
    //
    if (players.filter((_player) => _player.name === player.name).length !== 0) {
      this.socket.emit('username_existing');
      return;
    }

    //
    // Successfully logged in
    //
    this.socket.emit('logged_in');

    // Add the user to the list
    players.push((this.player = player));
  }

  /**
   * Player disconnected.
   */
  onDisconnect() {
    if (players.indexOf(this.player) !== -1) players.splice(players.indexOf(this.player), 1);
  }
}
