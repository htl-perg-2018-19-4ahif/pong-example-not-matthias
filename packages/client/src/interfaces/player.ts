import { IVector2, IRectangle } from '@/utils/math';

export interface IPlayer {
  name: string;
}

export interface IPlayerMove {
  position: IVector2;
  screen: IRectangle;
}
