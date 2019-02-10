import { ICircle, IVector2, ISquare, IRectangle } from '@/utils/math';
import * as PIXI from 'pixi.js';
import { Player } from './player';

enum COLLISION {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
  NONE
}

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
      // tslint:disable-next-line:no-console
      console.log(this.graphics.x + ' | ' + this.graphics.y);
    };
  }

  public update(delta: number, player1: Player, player2: Player) {
    // Check for collision with:
    // - Player 1 (Pad)
    // - Player 2 (Pad)
    // - Border (top, bottom)

    //
    // Check player collision
    //
    switch (this.isColliding(player1)) {
      case COLLISION.TOP:
        this.velocity.y = -Math.abs(this.velocity.y);
        break;
      case COLLISION.BOTTOM:
        this.velocity.y = Math.abs(this.velocity.y);
        break;
      case COLLISION.LEFT:
        this.velocity.x = -Math.abs(this.velocity.x);
        break;
      case COLLISION.RIGHT:
        this.velocity.x = Math.abs(this.velocity.x);
        break;
    }

    switch (this.isColliding(player2)) {
      case COLLISION.TOP:
        this.velocity.y = -Math.abs(this.velocity.y);
        break;
      case COLLISION.BOTTOM:
        this.velocity.y = Math.abs(this.velocity.y);
        break;
      case COLLISION.LEFT:
        this.velocity.x = -Math.abs(this.velocity.x);
        break;
      case COLLISION.RIGHT:
        this.velocity.x = Math.abs(this.velocity.x);
        break;
    }

    //
    // Check border collision
    //
    const topBorder = -this.canvas.height / 2;
    const bottomBorder = this.canvas.height / 2;
    const leftBorder = -this.canvas.width / 2;
    const rightBorder = this.canvas.width / 2;

    // Top border
    if (this.graphics.y - this.cirlce.radius < topBorder) {
      this.velocity.y = Math.abs(this.velocity.y);
    }
    // Bottom border
    else if (this.graphics.y + this.cirlce.radius > bottomBorder) {
      this.velocity.y = -Math.abs(this.velocity.y);
    }
    // Left border
    else if (this.graphics.x - this.cirlce.radius < leftBorder) {
      this.velocity.x = Math.abs(this.velocity.x);
    }
    // Right border
    else if (this.graphics.x + this.cirlce.radius > rightBorder) {
      this.velocity.x = -Math.abs(this.velocity.x);
    }

    //
    // Move the ball
    //
    this.move(this.velocity.x * delta, this.velocity.y * delta);
  }

  private move(x: number, y: number) {
    this.graphics.x += x;
    this.graphics.y += y;
  }

  private isColliding(player: Player): COLLISION {
    // TODO: Check corners

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

    if (this.isIntersecting(player, ballTop)) {
      return COLLISION.TOP;
    }

    if (this.isIntersecting(player, ballBottom)) {
      return COLLISION.BOTTOM;
    }

    if (this.isIntersecting(player, ballLeft)) {
      return COLLISION.LEFT;
    }

    if (this.isIntersecting(player, ballRight)) {
      return COLLISION.RIGHT;
    }

    return COLLISION.NONE;
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
