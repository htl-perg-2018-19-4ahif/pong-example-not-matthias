import socket, { Socket } from 'socket.io';
import { lobbies } from '../store';
import { ILobby } from '../interfaces/lobby';

export class LobbyHandler {
  /**
   * Initializes the handlers.
   * @param io socket io
   * @param socket the client socket
   */
  constructor(private io: socket.Server, private socket: Socket) {
    socket.on('create_lobby', this.onCreateLobby.bind(this));
  }

  /**
   * Player wants to create a new lobby.
   * @param lobby the new lobby
   */
  private onCreateLobby(lobby: ILobby) {
    console.log(`[${this.socket.client.id}] onCreateLobby called.`);

    //
    // Check lobby name
    //
    if (!lobby.name) {
      this.socket.emit('invalid_lobby_name');
      return;
    }

    //
    // Check if lobby name already existing
    //
    if (lobbies.filter((lobby) => lobby.name === lobby.name).length !== 0) {
      this.socket.emit('lobby_existing');
      return;
    }

    //
    // Successfully created lobby in
    //
    this.socket.emit('created_lobby');

    // Add the user to the list
    lobbies.push(lobby);
  }
}
