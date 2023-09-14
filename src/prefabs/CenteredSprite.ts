import { Container, Sprite } from "pixi.js";

export class CenteredSprite extends Container {
  sprite: Sprite;

  constructor(texture: string, targetContainer: Container) {
    super();

    this.sprite = Sprite.from(texture);

    this.sprite.anchor.set(0.5);
    targetContainer.addChild(this.sprite);
  }
}
