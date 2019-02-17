import { IVector2, IRectangle, ISquare } from '@/utils/math';
import * as PIXI from 'pixi.js';
import { IPlayerMove } from '@/interfaces/player';
import Hammer from 'hammerjs';

export class Player {
  private keysDown: boolean[] = [];

  constructor(
    private socket: SocketIOClient.Socket,
    public graphics: PIXI.Graphics,
    public canvas: IRectangle,
    public rectangle: IRectangle,
    public velocity: IVector2
  ) {
    window.addEventListener('keydown', event => (this.keysDown[event.keyCode] = true));
    window.addEventListener('keyup', event => delete this.keysDown[event.keyCode]);
  }

  public update(delta: number) {
    //
    // HammerJS
    //
    //     const hammertime = new Hammer(leftPaddle);
    //   hammertime
    //     .get("pan")
    //     .set({ direction: Hammer.DIRECTION_DOWN | Hammer.DIRECTION_UP });
    //   hammertime.on("pan", ev =>
    //     // Put center of paddle to the center of the user's finger
    //     {
    //       leftPaddle.style.top =
    //         ev.center.y - Number($("#leftPaddle").height()) + "px";
    //         socket.emit("paddle change", {
    //           direction: canvas.height / 20,
    //           position: canvas.height / $("#leftPaddle").position().top
    //         });
    //     }
    //   );
    // });
    const container = document.getElementById('container');

    if (container != null) {
      const canvas = container.getElementsByTagName('canvas')[0];

      if (canvas != null) {
        const hammertime = new Hammer(canvas);

        // Enable vertical and horizontal movement
        hammertime.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

        // Set movement event listener
        hammertime.on('pan', event => {
          // TODO: move paddle here
        });
      }
    }

    //
    // Keyboard
    //
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
    // FIXME: Performance improvement: Only send move_player when key pressed and released
    // => move it to the update function

    //
    // Check for top and bottom collision.
    //
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

    //
    // Send new position
    //
    const data: IPlayerMove = {
      position: { x: this.graphics.x, y: this.graphics.y },
      screen: this.canvas
    };

    this.socket.emit('move_player', data);
  }
}
