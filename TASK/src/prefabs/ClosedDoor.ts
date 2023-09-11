import { Container, Sprite, Texture } from "pixi.js";

export type ObjConfig = {
  assets: string[];
};

export class ClosedDoor extends Container {
  layers: string[] = [];
  door: Sprite;

  constructor(
    protected config: ObjConfig = {
      assets: [],
    }
  ) {
    super();

    this.door = Sprite.from(Texture.from(this.config.assets[0]));

    this.door.anchor.set(0.5);
    this.addChild(this.door);
  }
}
