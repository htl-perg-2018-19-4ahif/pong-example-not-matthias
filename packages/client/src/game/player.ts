import { IVector2, IRectangle, ISquare } from '@/utils/math';
import * as PIXI from 'pixi.js';

export class Player {
  private keysDown: boolean[] = [];

  constructor(
    public graphics: PIXI.Graphics,
    public canvas: IRectangle,
    public rectangle: IRectangle,
    public velocity: IVector2
  ) {
    window.addEventListener('keydown', event => (this.keysDown[event.keyCode] = true));
    window.addEventListener('keyup', event => delete this.keysDown[event.keyCode]);
  }

  public update(delta: number) {
    for (const key in this.keysDown) {
      // Down
      if (parseInt(key, 10) === 40) {
        this.move(0, this.velocity.y * delta);
      }
      // Up
      else if (parseInt(key, 10) === 38) {
        this.move(0, -this.velocity.y * delta);
      }
    }
  }

  public move(x: number, y: number) {
    // TODO (mobile): move to a the position where the user is touching

    const topBorder = -this.canvas.height / 2 + this.rectangle.height / 2;
    const bottomBorder = this.canvas.height / 2 - this.rectangle.height / 2;

    // Top border
    if (this.graphics.y + y < topBorder) {
      this.graphics.y = topBorder;
    }
    // Bottom border
    else if (this.graphics.y + y > bottomBorder) {
      this.graphics.y = bottomBorder;
    } else {
      this.graphics.x += x;
      this.graphics.y += y;
    }
  }
}
