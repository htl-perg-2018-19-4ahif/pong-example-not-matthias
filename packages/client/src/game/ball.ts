import { ICircle, IVector2, IRectangle, ISquare } from '@/utils/math';
import * as PIXI from 'pixi.js';
import { Player } from './player';

export class Ball {
  private player2!: Player;

  constructor(
    public graphics: PIXI.Graphics,
    public canvas: ISquare,
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

      // console.log(`Top: ${this.isIntersecting(this.player2, ballTop)}`);
      // console.log(`Bottom: ${this.isIntersecting(this.player2, ballBottom)}`);
      // console.log(`Left: ${this.isIntersecting(this.player2, ballLeft)}`);
      // console.log(`Right: ${this.isIntersecting(this.player2, ballRight)}`);
      this.isColliding(this.player2);
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

    this.player2 = player2;

    // if (this.isColliding(player1)) {
    //   console.log('player1 collision detected.');
    // } else if (this.isColliding(player2)) {
    //   console.log('player2 collision detected.');
    // }

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

    this.isIntersecting(player, ballTop);

    // if (
    //   this.isIntersecting(player, ballTop) ||
    //   this.isIntersecting(player, ballBottom) ||
    //   this.isIntersecting(player, ballLeft) ||
    //   this.isIntersecting(player, ballRight)
    // )
    //   console.log('collision detected');

    return false;
  }

  private isIntersecting(player: Player, ball: ICircle): boolean {
    const canvasX = 800;

    const playerTop = player.graphics.y - player.rectangle.height / 2;
    const playerBottom = player.graphics.y + player.rectangle.height / 2;
    const playerLeft = canvasX / 2 - player.graphics.x - player.rectangle.width - 10;
    const playerRight = canvasX / 2 - player.graphics.x - 10;

    console.log('isIntersecting:');
    console.log(`Top: ${playerTop < ball.y} - ${playerTop} > ${ball.y}`);
    console.log(`Bottom: ${playerBottom > ball.y} - ${playerBottom} < ${ball.y}`);
    console.log(`Left: ${playerLeft < ball.x} - ${playerLeft} > ${ball.x}`);
    console.log(`Right: ${playerRight > ball.x} - ${playerRight} > ${ball.x}`);

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
