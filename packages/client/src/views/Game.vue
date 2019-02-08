<template>
  <v-container style="text-align: center"></v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ICircle, IVector2, IRectangle, ISquare } from '@/utils/math';
import * as PIXI from 'pixi.js';

interface IBall {
  graphics: PIXI.Graphics;
  cirlce: ICircle;
  velocity: IVector2;
}

interface IPlayer {
  graphics: PIXI.Graphics;
  rectangle: IRectangle;
  velocity: IVector2;
}

@Component
export default class Game extends Vue {
  private window: ISquare = { x: 0, y: 0 };
  private canvas: ISquare = { x: 800, y: 800 };

  private ballCircle: ICircle = {
    x: 0,
    y: 0,
    radius: 10
  };

  private bgColor = 0x383838;
  private ballColor = 0xffffff;
  private player1Color = 0xffa500;
  private player2Color = 0x0000ff;

  private options = {
    antialias: false,
    backgroundColor: this.bgColor,
    transparent: false,
    resolution: 1
  };

  private app: PIXI.Application = new PIXI.Application(this.canvas.x, this.canvas.y, this.options);

  private player1: IPlayer = {
    graphics: new PIXI.Graphics(),
    rectangle: {
      x: 0,
      y: 0,
      width: 20,
      height: 150
    },
    velocity: { x: 0, y: 0 }
  };

  private player2: IPlayer = {
    graphics: new PIXI.Graphics(),
    rectangle: {
      x: 0,
      y: 0,
      width: 20,
      height: 150
    },
    velocity: { x: 0, y: 0 }
  };

  private ball: IBall = {
    graphics: new PIXI.Graphics(),
    cirlce: this.ballCircle,
    velocity: { x: 5, y: 0 }
  };

  /**
   * Initialize pixi and
   */
  private mounted() {
    this.$el.appendChild(this.app.view);

    // Set the coordinates
    this.player1.rectangle.x = 10;
    this.player1.rectangle.y = this.canvas.y / 2 - this.player1.rectangle.height / 2;

    this.player2.rectangle.x = this.canvas.x - this.player2.rectangle.width - 10;
    this.player2.rectangle.y = this.canvas.y / 2 - this.player2.rectangle.height / 2;

    this.ball.cirlce.x = this.canvas.x / 2 - this.ball.cirlce.radius;
    this.ball.cirlce.y = this.canvas.y / 2 - this.ball.cirlce.radius;

    // Draw the ball and pads
    this.player1.graphics
      .beginFill(this.player1Color)
      .drawRect(
        this.player1.rectangle.x,
        this.player1.rectangle.y,
        this.player1.rectangle.width,
        this.player1.rectangle.height
      )
      .endFill();

    this.player2.graphics
      .beginFill(this.player2Color)
      .drawRect(
        this.player2.rectangle.x,
        this.player2.rectangle.y,
        this.player2.rectangle.width,
        this.player2.rectangle.height
      )
      .endFill();

    this.ball.graphics
      .beginFill(this.ballColor)
      .drawCircle(this.ball.cirlce.x, this.ball.cirlce.y, this.ball.cirlce.radius)
      .endFill();

    // Create window resize listeners

    // Add them to the stage
    this.app.stage.addChild(this.player1.graphics);
    this.app.stage.addChild(this.player2.graphics);
    this.app.stage.addChild(this.ball.graphics);

    //Start the game loop
    this.app.ticker.add(delta => this.gameLoop(delta));
  }

  private gameLoop(delta: number) {}

  // TODO: keybind hooks
  // TODO: collision detection
  // TODO: countdown
}
</script>


<style>
</style>
