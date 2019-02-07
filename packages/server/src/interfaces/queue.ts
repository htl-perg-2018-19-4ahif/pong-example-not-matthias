import { IPlayer, IPlayerResponse } from './player';

export interface IQueue {
  player1: IPlayer;
  player2: IPlayer;
}

export interface IQueueResponse {
  player1: IPlayerResponse;
  player2: IPlayerResponse;
}
