import { Container, Sprite, Texture } from "pixi.js";

export type ObjConfig = {
  assets: string[];
};

export class OpenDoor extends Container {
  layers: string[] = [];
  openDoor: Sprite;

  constructor(
    protected config: ObjConfig = {
      assets: [],
    }
  ) {
    super();

    this.openDoor = Sprite.from(Texture.from(this.config.assets[0]));
    this.openDoor.anchor.set(0.5);
    this.addChild(this.openDoor);
  }
}
