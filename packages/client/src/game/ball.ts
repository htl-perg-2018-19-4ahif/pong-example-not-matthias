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
    // Check for collision with:
    // - Player 1 (Pad)
    // - Player 2 (Pad)
    // - Border (top, bottom)

    //
    // Check player collision
    //

    if (this.isColliding(player1)) {
      console.log('player1 collision detected.');
    } else if (this.isColliding(player2)) {
      console.log('player2 collision detected.');
    }

    console.log(this.graphics);

    //
    // Check border collision
    //
    const topBorder = -this.canvas.y / 2 + this.cirlce.radius;
    const bottomBorder = this.canvas.y / 2 - this.cirlce.radius;
    const leftBorder = -this.canvas.x / 2 + this.cirlce.radius;
    const rightBorder = this.canvas.y / 2 - this.cirlce.radius;

    // Top border
    if (this.graphics.y + this.velocity.y - this.cirlce.radius <= topBorder) {
      this.velocity.y *= -1;
    }
    // Bottom border
    else if (this.graphics.y + this.velocity.y - this.cirlce.radius >= bottomBorder) {
      this.velocity.y *= -1;
    }
    // Left border
    else if (this.graphics.x + this.velocity.x - this.cirlce.radius <= leftBorder) {
      this.velocity.x *= -1;
    }
    // Right border
    else if (this.graphics.x + this.velocity.x - this.cirlce.radius >= rightBorder) {
      this.velocity.x *= -1;
    }

    //
    // Move the ball
    //
    this.move(this.velocity.x, this.velocity.y);
  }

  private move(x: number, y: number) {
    this.graphics.x += x;
    this.graphics.y += y;
  }

  private isColliding(player: Player): boolean {
    // if(pointX > rectX && pointX < rectX + rectWidth && pointY > rectY && pointY < rectY + rectHeight){
    if (
      this.graphics.x > player.graphics.x &&
      this.graphics.x < player.graphics.x + player.graphics.width &&
      this.graphics.y > player.graphics.y &&
      this.graphics.y < player.graphics.y + player.graphics.height
    ) {
      //the point is inside the rectangle
    }

    if (
      player.graphics.x < this.cirlce.x + this.cirlce.radius &&
      player.graphics.x + player.graphics.width > this.cirlce.x &&
      player.graphics.y < this.cirlce.y + this.cirlce.radius &&
      player.graphics.y + player.graphics.height > this.cirlce.y
    ) {
      return true;
    }

    return false;
  }
}
