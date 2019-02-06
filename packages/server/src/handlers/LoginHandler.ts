import socket, { Socket } from 'socket.io';
import { IPlayer } from '../interfaces/player';
import { players } from '../store';

export class LoginHandler {
  private player: IPlayer = { username: '' };

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
   * @param data the player data
   */
  onLogin(data: IPlayer) {
    console.log(`[${this.socket.client.id}] onLogin called.`);

    //
    // Check username
    //
    if (!data.username) {
      this.socket.emit('invalid_username');
      return;
    }

    //
    // Check if username in use
    //
    if (players.filter((player) => player.username === data.username).length !== 0) {
      this.socket.emit('username_existing');
      return;
    }

    //
    // Successfully logged in
    //
    this.socket.emit('logged_in');

    // Add the user to the list
    players.push((this.player = data));
  }

  /**
   * Player disconnected.
   */
  onDisconnect() {
    if (players.indexOf(this.player) !== -1) players.splice(players.indexOf(this.player), 1);
  }
}
