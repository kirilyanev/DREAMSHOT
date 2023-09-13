import config from "../config";
import { ClosedDoor } from "../prefabs/ClosedDoor";
import Scene from "../core/Scene";
import { Handle } from "../prefabs/Handle";
import { HandleShadow } from "../prefabs/HandleShadow";
import Background from "../prefabs/Background";
import { centerObjects } from "../utils/misc";
import { Container } from "pixi.js";
import { OpenDoor } from "../prefabs/OpenDoor";
import { OpenDoorShadow } from "../prefabs/OpenDoorShafow";
import { Blink } from "../prefabs/Blink";
import Mouse from "../core/Mouse";
import { updateCombinations } from "../core/InputsHandler";
import { lockRotate, handleRotate, animation } from "../core/GsapAnimations";

export default class Game2 extends Scene {
  name = "Game";

  private blink!: Blink;
  private blink1!: Blink;
  private blink2!: Blink;
  private closedDoor!: ClosedDoor;
  private handle!: Handle;
  private handleShadow!: HandleShadow;
  private openDoor!: OpenDoor;
  private openDoorShadow!: OpenDoorShadow;
  private background!: Background;
  private scaleFactor!: number;
  private closedDoorContainer!: any;
  private openDoorContainer!: any;
  private blinkContainer!: any;

  load() {
    // Create sprites
    this.background = new Background(config.backgrounds.vault);
    this.closedDoor = new ClosedDoor(config.objects.closedDoor);
    this.handle = new Handle(config.objects.closedDoor);
    this.handleShadow = new HandleShadow(config.objects.closedDoor);
    this.openDoor = new OpenDoor(config.objects.openDoor);
    this.openDoorShadow = new OpenDoorShadow(config.objects.openDoor);
    this.blink = new Blink(config.objects.openDoor);
    this.blink1 = new Blink(config.objects.openDoor);
    this.blink2 = new Blink(config.objects.openDoor);

    this.scaleFactor = this.background.scaleFactor;

    // Scale sprites
    this.closedDoor.scale.set(this.scaleFactor);
    this.handle.scale.set(this.scaleFactor);
    this.handleShadow.scale.set(this.scaleFactor);
    this.openDoor.scale.set(this.scaleFactor);
    this.openDoorShadow.scale.set(this.scaleFactor);
    this.blink.scale.set(this.scaleFactor);
    this.blink1.scale.set(this.scaleFactor);
    this.blink2.scale.set(this.scaleFactor);

    // Create containers
    this.closedDoorContainer = new Container();
    this.openDoorContainer = new Container();
    this.blinkContainer = new Container();

    this.closedDoorContainer.pivot.set(0.5);
    this.openDoorContainer.pivot.set(0.5);
    this.blinkContainer.pivot.set(0.5);

    centerObjects(
      this.closedDoorContainer,
      this.openDoorContainer,
      this.blinkContainer
    );

    // Set alpha to 0
    this.openDoor.alpha = 0;
    this.openDoorShadow.alpha = 0;
    this.blink.alpha = 0;
    this.blink1.alpha = 0;
    this.blink2.alpha = 0;

    // addChild to the stage
    this.blinkContainer.addChild(this.blink, this.blink1, this.blink2);

    this.closedDoorContainer.addChild(
      this.closedDoor,
      this.handleShadow,
      this.handle
    );

    this.openDoorContainer.addChild(this.openDoorShadow, this.openDoor);

    this.addChild(
      this.background,
      this.blinkContainer,
      this.closedDoorContainer,
      this.openDoorContainer
    );
  }

  async start() {
    this.blink.x = -(this.closedDoorContainer.width * 25) / 100;
    this.blink.y = -(this.closedDoorContainer.height * 1.9) / 100;
    this.blink1.x = -(this.closedDoorContainer.width * 4) / 100;
    this.blink1.y = -(this.closedDoorContainer.height * 2) / 100;
    this.blink2.x = (this.closedDoorContainer.width * 8) / 100;
    this.blink2.y = (this.closedDoorContainer.height * 18) / 100;

    this.closedDoor.x = (this.closedDoorContainer.width * 2.5) / 100;
    this.closedDoor.y = -(this.closedDoorContainer.height * 1.9) / 100;
    this.handle.x = -(this.closedDoorContainer.width * 2.1) / 100;
    this.handle.y = -(this.closedDoorContainer.height * 2.2) / 100;
    this.handleShadow.x = -(this.closedDoorContainer.width * 1.2) / 100;
    this.handleShadow.y = -(this.closedDoorContainer.height * 0.2) / 100;

    this.openDoorShadow.x = (this.closedDoorContainer.width * 77) / 100;
    this.openDoorShadow.y = (this.openDoorContainer.height * 2) / 100;
    this.openDoor.x = this.openDoorShadow.x * 0.95;
    this.openDoor.y = -this.openDoorShadow.y * 0.8;


    const mouse = Mouse.getInstance();

    // Mouse click event listener
    mouse.onMouseClick((clickLocation: any) => {
      const rotateDirection = clickLocation;

      const isHandleRotating =
        clickLocation === "right"
          ? updateCombinations("clockwise")
          : updateCombinations("counterclockwise");

      if (!isHandleRotating) {
        return lockRotate(this.handleShadow, this.handle);
      }

      if (isHandleRotating === "OPEN") {
        animation(
          this.openDoor,
          this.openDoorShadow,
          this.closedDoorContainer,
          this.scaleFactor,
          this.blink,
          this.blink1,
          this.blink2
        );

        setTimeout(() => lockRotate(this.handleShadow, this.handle), 15000);
        return updateCombinations(undefined);
      }

      handleRotate(this.handleShadow, this.handle, rotateDirection);
    });
  }

  onResize(width: number, height: number) {
    if (this.background) {
      this.background.resize(width, height);
      this.scaleFactor = this.background.scaleFactor;
    }

    if (this.blinkContainer) {
      this.blinkContainer.x = window.innerWidth / 2;
      this.blinkContainer.y = window.innerHeight / 2;
    }

    if (this.closedDoorContainer) {
      this.closedDoorContainer.x = window.innerWidth / 2;
      this.closedDoorContainer.y = window.innerHeight / 2;
    }

    if (this.openDoorContainer) {
      this.openDoorContainer.x = window.innerWidth / 2;
      this.openDoorContainer.y = window.innerHeight / 2;
    }

    if (this.blink) {
      this.blink.scale.set(this.scaleFactor);
      this.blink.x = -(this.closedDoorContainer.width * 25) / 100;
      this.blink.y = -(this.closedDoorContainer.height * 1.9) / 100;
    }

    if (this.blink1) {
      this.blink1.scale.set(this.scaleFactor);
      this.blink1.x = -(this.closedDoorContainer.width * 4) / 100;
      this.blink1.y = -(this.closedDoorContainer.height * 2) / 100;
    }

    if (this.blink2) {
      this.blink2.scale.set(this.scaleFactor);
      this.blink2.x = (this.closedDoorContainer.width * 8) / 100;
      this.blink2.y = (this.closedDoorContainer.height * 18) / 100;
    }

    if (this.closedDoor) {
      this.closedDoor.scale.set(this.scaleFactor);
      this.closedDoor.x = (this.closedDoorContainer.width * 2.5) / 100;
      this.closedDoor.y = -(this.closedDoorContainer.height * 1.9) / 100;
    }

    if (this.handle) {
      this.handle.scale.set(this.scaleFactor);
      this.handle.x = -(this.closedDoorContainer.width * 2.1) / 100;
      this.handle.y = -(this.closedDoorContainer.height * 2.2) / 100;
    }

    if (this.handleShadow) {
      this.handleShadow.scale.set(this.scaleFactor);
      this.handleShadow.x = -(this.closedDoorContainer.width * 1.2) / 100;
      this.handleShadow.y = -(this.closedDoorContainer.height * 0.2) / 100;
    }

    if (this.openDoorShadow && this.openDoor) {
      this.openDoorShadow.scale.set(this.scaleFactor);
      this.openDoor.scale.set(this.scaleFactor);

      this.openDoorShadow.x = (this.closedDoorContainer.width * 77) / 100;
      this.openDoorShadow.y = (this.openDoorContainer.height * 2) / 100;
      this.openDoor.x = this.openDoorShadow.x * 0.95;
      this.openDoor.y = -this.openDoorShadow.y * 0.8;
    }
  }
}
