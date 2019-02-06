import socket, { Socket } from 'socket.io';
import { IPlayer } from '../interfaces/player';
import { players } from '../store';

export class LoginHandler {
  private player: IPlayer = { username: '' };

  constructor(private io: socket.Server, private socket: Socket) {
    socket.on('login', this.onLogin.bind(this));
  }

  /**
   * Gets called whenever a player wants to login.
   * @param data the player data
   */
  onLogin(data: IPlayer) {
    console.log(`[${this.socket.client.id}] onLogin called.`);

    // Check username
    if (!data.username) {
      this.socket.emit('invalid_username');
    }
    // Check if username in use
    else if (players.filter((player) => player.username === data.username).length !== 0) {
      this.socket.emit('username_existing');
    } else {
      this.socket.emit('logged_in');

      // Add the user to the list
      players.push((this.player = data));
    }
  }

  /**
   * Remove the player from the list
   */
  disconnect() {
    players.splice(players.indexOf(this.player), 1);
  }
}
