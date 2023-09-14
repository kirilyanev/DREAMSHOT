import config from "../config";
import Scene from "../core/Scene";
import Background from "../prefabs/Background";
import { centerObjects } from "../utils/misc";
import { Container } from "pixi.js";
import Mouse from "../core/Mouse";
import { CenteredSprite } from "../prefabs/CenteredSprite";
import { handleMouseClick } from "../core/MouseClickHandler";

export default class Game extends Scene {
  name = "Game";

  private initialWidth!: number;
  private initialHeight!: number;

  private background!: Background;
  private scaleFactor!: number;
  private closedDoorContainer!: any;
  private openDoorContainer!: any;
  private blinkContainer!: any;

  blink!: CenteredSprite;
  blink1!: CenteredSprite;
  blink2!: CenteredSprite;
  closedDoor!: CenteredSprite;
  handle!: CenteredSprite;
  handleShadow!: CenteredSprite;
  doorOpen!: CenteredSprite;
  doorOpenShadow!: CenteredSprite;

  load() {
    // Create containers
    this.closedDoorContainer = new Container();
    this.openDoorContainer = new Container();
    this.blinkContainer = new Container();

    this.closedDoorContainer.pivot.set(0.5);
    this.openDoorContainer.pivot.set(0.5);
    this.blinkContainer.pivot.set(0.5);

    // Create sprites
    this.background = new Background(config.background.vault);

    this.closedDoor = new CenteredSprite(
      config.sprites.closedDoor,
      this.closedDoorContainer
    );
    this.handleShadow = new CenteredSprite(
      config.sprites.handleShadow,
      this.closedDoorContainer
    );
    this.handle = new CenteredSprite(
      config.sprites.handle,
      this.closedDoorContainer
    );
    this.doorOpenShadow = new CenteredSprite(
      config.sprites.doorOpenShadow,
      this.openDoorContainer
    );
    this.doorOpen = new CenteredSprite(
      config.sprites.doorOpen,
      this.openDoorContainer
    );
    this.blink = new CenteredSprite(config.sprites.blink, this.blinkContainer);
    this.blink1 = new CenteredSprite(config.sprites.blink, this.blinkContainer);
    this.blink2 = new CenteredSprite(config.sprites.blink, this.blinkContainer);

    this.scaleFactor =
      window.innerHeight / this.background.children[0].texture.height;

    this.closedDoorContainer.scale.set(this.scaleFactor);
    this.openDoorContainer.scale.set(this.scaleFactor);
    this.blinkContainer.scale.set(this.scaleFactor);

    // Set alpha to 0
    this.openDoorContainer.children[0].alpha = 0;
    this.openDoorContainer.children[1].alpha = 0;

    this.addChild(
      this.background,
      this.blinkContainer,
      this.closedDoorContainer,
      this.openDoorContainer
    );
  }

  async start() {
    // Store the initial size of the window
    this.initialWidth = window.innerWidth;
    this.initialHeight = window.innerHeight;

    this.onResize(this.initialWidth, this.initialHeight);

    this.closedDoorContainer.x = 12;
    this.closedDoorContainer.y = -8;
    this.closedDoorContainer.children[1].x = -75;
    this.closedDoorContainer.children[1].y = 25;

    this.closedDoorContainer.children[2].x = -85;
    this.closedDoorContainer.children[2].y = -10;

    this.openDoorContainer.x = window.innerWidth / 3;
    this.openDoorContainer.children[0].x = -95;
    this.openDoorContainer.children[0].y = 30;

    this.openDoorContainer.children[1].x = -165;
    this.openDoorContainer.children[1].y = -20;

    this.blinkContainer.children[0].x = -500;
    this.blinkContainer.children[0].y = -10;

    this.blinkContainer.children[1].x = -100;
    this.blinkContainer.children[1].y = -30;

    this.blinkContainer.children[2].x = 150;
    this.blinkContainer.children[2].y = 350;

    const mouse = Mouse.getInstance();

    mouse.onMouseClick((clickLocation) => {
      handleMouseClick(clickLocation, this);
    });
  }

  onResize(width: number, height: number): void {
    const newScaleFactor = Math.min(
      window.innerWidth / this.initialWidth,
      window.innerHeight / this.initialHeight
    );

    this.scaleFactor = newScaleFactor;

    this.scale.set(this.scaleFactor);
    centerObjects(this);
  }
}
