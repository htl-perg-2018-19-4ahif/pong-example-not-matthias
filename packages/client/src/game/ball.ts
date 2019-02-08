import { ICircle, IVector2, IRectangle, ISquare } from '@/utils/math';
import * as PIXI from 'pixi.js';
import { Player } from './player';

export class Ball {
  constructor(
    public graphics: PIXI.Graphics,
    public canvas: ISquare,
    public cirlce: ICircle,
    public velocity: IVector2
  ) {}

  public update(player1: Player, player2: Player) {
    this.move(this.velocity.x, this.velocity.y);
  }

  private move(x: number, y: number) {
    // Check for collision with:
    // - Player 1 (Pad)
    // - Player 2 (Pad)
    // - Border (top, bottom)

    // Check border collision
    const topBorder = -this.canvas.y / 2 + this.cirlce.radius / 2;
    const bottomBorder = this.canvas.y / 2 - this.cirlce.radius / 2;
    const leftBorder = -this.canvas.x / 2 + this.cirlce.radius / 2;
    const rightBorder = this.canvas.y / 2 - this.cirlce.radius / 2;

    // Top border
    if (this.graphics.y + y < topBorder) {
      // TODO: implement
    }
    // Bottom border
    else if (this.graphics.y + y > bottomBorder) {
      // TODO: implement
    }
    // Left border
    else if (this.graphics.x + x < leftBorder) {
      // TODO: implement
    }
    // Right border
    else if (this.graphics.x + x > topBorder) {
      // TODO: implement
    } else {
      this.graphics.x += x;
      this.graphics.y += y;
    }
  }
}
