import { Socket } from 'socket.io';

export interface IPlayer {
  name: string;
  socket?: Socket;
}

export interface IPlayerResponse {
  name: string;
}
