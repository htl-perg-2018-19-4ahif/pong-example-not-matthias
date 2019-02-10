import { ICircle, IVector2, ISquare, IRectangle } from '@/utils/math';
import * as PIXI from 'pixi.js';
import { Player } from './player';

export class Ball {
  private player1!: Player;
  private player2!: Player;

  constructor(
    public graphics: PIXI.Graphics,
    public canvas: IRectangle,
    public cirlce: ICircle,
    public velocity: IVector2
  ) {
    document.onmousemove = event => {
      const container = document.getElementById('container');

      if (container != null) {
        const canvas = container.getElementsByTagName('canvas')[0];

        if (canvas != null) {
          const canvasMouseY = event.clientY - (canvas.offsetTop - window.pageYOffset);
          const canvasMouseX = event.clientX - (canvas.offsetLeft - window.pageXOffset);

          this.graphics.x = canvasMouseX - 400;
          this.graphics.y = canvasMouseY - 400;
        }
      }
    };

    document.onmousedown = e => {
      console.log(this.graphics.x + ' | ' + this.graphics.y);
    };
  }

  public update(player1: Player, player2: Player) {
    // Check for collision with:
    // - Player 1 (Pad)
    // - Player 2 (Pad)
    // - Border (top, bottom)

    //
    // Check player collision
    //

    this.player1 = player1;
    this.player2 = player2;

    if (this.isColliding(player1)) {
      console.log('player1 collision detected.');
    } else if (this.isColliding(player2)) {
      console.log('player2 collision detected.');
    }

    //
    // Check border collision
    //
    const topBorder = -this.canvas.y / 2 + this.cirlce.radius;
    const bottomBorder = this.canvas.y / 2;
    const leftBorder = -this.canvas.x / 2 + this.cirlce.radius;
    const rightBorder = this.canvas.y / 2;

    // Top border
    if (this.graphics.y + this.velocity.y - this.cirlce.radius <= topBorder) {
      this.velocity.y *= -1;
    }
    // Bottom border
    else if (this.graphics.y + this.velocity.y >= bottomBorder) {
      this.velocity.y *= -1;
    }
    // Left border
    else if (this.graphics.x + this.velocity.x - this.cirlce.radius <= leftBorder) {
      this.velocity.x *= -1;
    }
    // Right border
    else if (this.graphics.x + this.velocity.x >= rightBorder) {
      this.velocity.x *= -1;
    }

    //
    // Move the ball
    //
    // this.move(this.velocity.x, this.velocity.y);
  }

  private move(x: number, y: number) {
    this.graphics.x += x;
    this.graphics.y += y;
  }

  private isColliding(player: Player): boolean {
    const ballTop: ICircle = {
      x: this.graphics.x,
      y: this.graphics.y + this.cirlce.radius,
      radius: this.cirlce.radius
    };
    const ballBottom: ICircle = {
      x: this.graphics.x,
      y: this.graphics.y - this.cirlce.radius,
      radius: this.cirlce.radius
    };
    const ballLeft: ICircle = {
      x: this.graphics.x + this.cirlce.radius,
      y: this.graphics.y,
      radius: this.cirlce.radius
    };
    const ballRight: ICircle = {
      x: this.graphics.x - this.cirlce.radius,
      y: this.graphics.y,
      radius: this.cirlce.radius
    };

    // TODO: Check corners
    if (
      this.isIntersecting(player, ballTop) ||
      this.isIntersecting(player, ballBottom) ||
      this.isIntersecting(player, ballLeft) ||
      this.isIntersecting(player, ballRight)
    )
      return true;

    return false;
  }

  private isIntersecting(player: Player, ball: ICircle): boolean {
    // Canvas (Game.vue): 0|0 to 800|800
    // Canvas (here): -400|-400 to 400|400
    // Pads: -370 to -390 | 370 to 390
    const playerX = player.rectangle.x - this.canvas.width / 2;

    const playerTop = player.graphics.y - player.rectangle.height / 2;
    const playerBottom = player.graphics.y + player.rectangle.height / 2;
    const playerLeft = playerX;
    const playerRight = playerX + player.rectangle.width;

    // console.log('isIntersecting:');
    // console.log(`Top: ${playerTop < ball.y} - ${playerTop} > ${ball.y}`);
    // console.log(`Bottom: ${playerBottom > ball.y} - ${playerBottom} < ${ball.y}`);
    // console.log(`Left: ${playerLeft < ball.x} - ${playerLeft} > ${ball.x}`);
    // console.log(`Right: ${playerRight > ball.x} - ${playerRight} > ${ball.x}`);

    if (
      playerTop < ball.y && // Top
      playerBottom > ball.y && // Bottom
      playerLeft < ball.x && // Left
      playerRight > ball.x // Right
    )
      return true;

    return false;
  }
}
