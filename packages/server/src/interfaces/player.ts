import { Socket } from 'socket.io';
import { IVector2, IRectangle } from './math';

export interface IPlayer {
  name: string;
  socket?: Socket;
}

export interface IPlayerResponse {
  name: string;
}

export interface IPlayerMove {
  position: IVector2;
  screen: IRectangle;
}
