<template>
  <div id="container" class="pa-3" @resize="adjustCanvasSize()"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ICircle, IVector2, IRectangle, ISquare } from '@/utils/math';
import { Player } from '@/game/player';
import { Ball } from '@/game/ball';
import { IPlayer, IPlayerMove } from '@/interfaces/player';
import * as PIXI from 'pixi.js';

@Component
export default class Game extends Vue {
  private gameStarted: boolean = false;

  //
  // PixiJS
  //
  private window: ISquare = { x: 0, y: 0 };
  private canvas: IRectangle = { x: 0, y: 0, width: 800, height: 800 };

  private bgColor = 0x383838;

  private options = {
    backgroundColor: this.bgColor,
    antialias: true,
    autoResize: false
  };

  private app: PIXI.Application = new PIXI.Application(this.canvas.width, this.canvas.height, this.options);

  //
  // Game Objects
  //
  private ballColor = 0xffffff;
  private player1Color = 0xffa500;
  private player2Color = 0x0000ff;

  private rect1: IRectangle = {
    x: 0,
    y: 0,
    width: 20,
    height: 150
  };
  private rect2: IRectangle = {
    x: 0,
    y: 0,
    width: 20,
    height: 150
  };
  private ballCircle: ICircle = {
    x: this.canvas.width / 2,
    y: this.canvas.height / 2,
    radius: 10
  };

  // TODO: velocity should be a percentage of the screen
  private player1: Player = new Player(this.$socket, new PIXI.Graphics(), this.canvas, this.rect1, { x: 0, y: 5 });
  private player2: Player = new Player(this.$socket, new PIXI.Graphics(), this.canvas, this.rect2, { x: 0, y: 5 });
  private ball: Ball = new Ball(this.$socket, new PIXI.Graphics(), this.canvas, this.ballCircle, { x: 0, y: 0 });

  /**
   * Register event listeners and handlers.
   */
  private created() {
    // window.addEventListener('resize', this.adjustCanvasSize);

    this.$socket.on('count', this.onCount);
    this.$socket.on('start_game', this.onStartGame);
    this.$socket.on('enemy_moved', this.onEnemyMoved);
    this.$socket.on('enemy_left_game', this.onEnemyLeftGame);
  }

  /**
   * Initialize pixi and the game.
   */
  private mounted() {
    this.$el.appendChild(this.app.view);

    // Set the coordinates
    // TODO: use coordinates depending on the screen
    this.player1.rectangle.x = 10;
    this.player1.rectangle.y = this.canvas.height / 2 - this.player1.rectangle.height / 2;

    this.player2.rectangle.x = this.canvas.width - this.player2.rectangle.width - 10;
    this.player2.rectangle.y = this.canvas.height / 2 - this.player2.rectangle.height / 2;

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

    // TODO: Create window resize listeners

    // Add them to the stage
    this.app.stage.addChild(this.player1.graphics);
    this.app.stage.addChild(this.player2.graphics);
    this.app.stage.addChild(this.ball.graphics);

    // Start the game loop
    this.app.ticker.add(delta => this.gameLoop(delta));
  }

  /**
   * Removes the event listeners.
   */
  private destroyed() {
    // window.removeEventListener('resize', this.adjustCanvasSize);

    this.$socket.emit('leave_game');
  }

  /**
   * The main game loop.
   */
  private gameLoop(delta: number) {
    // Onlny update the position of the player and ball, when both clients are ready.
    if (this.gameStarted) {
      this.player1.update(delta);
      this.ball.update(delta, this.player1, this.player2);
    }
  }

  /**
   * Event handler for resizing the canvas.
   */
  adjustCanvasSize() {
    const container = document.getElementById('container');

    if (container != null) {
      const canvas = container.getElementsByTagName('canvas')[0];

      if (canvas != null) {
        // Update the canvas size
        const canvasWidth = window.innerWidth - canvas.offsetLeft * 2;
        const canvasHeight = window.innerHeight - canvas.offsetTop * 2;

        this.app.renderer.resize(canvasWidth, canvasHeight);

        this.canvas.width = this.app.renderer.width;
        this.canvas.height = this.app.renderer.height;

        // TODO: Update the paddle position

        // TODO: Vertical game if height > width
      }
    }
  }

  //
  // Server reponse handlers
  //
  private onEnemyMoved(data: IPlayerMove) {
    // TODO: use percentage instead
    this.player2.graphics.x = data.position.x;
    this.player2.graphics.y = data.position.y;
  }

  private onStartGame(ballVelocity: IVector2) {
    // Set the velocity for the ball
    this.ball.velocity = ballVelocity;

    // Start the game
    this.gameStarted = true;
  }

  private onCount(count: number) {
    this.$notify({
      group: 'pong',
      type: 'success',
      title: String(count),
      duration: 1000
    });
  }

  private onEnemyLeftGame() {
    this.$notify({
      group: 'pong',
      type: 'error',
      title: 'Enemy left the game.',
      text: 'You will be automatically redirected.',
      duration: 2000
    });

    // Go to the home screen after 3 seconds
    setTimeout(() => this.$router.push({ name: 'home' }), 3000);
  }
}
</script>

<style scoped>
#container {
  text-align: center;
}
</style>
