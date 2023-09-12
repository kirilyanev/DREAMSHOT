import { Container, Sprite, Texture } from "pixi.js";

export type ObjConfig = {
  assets: string[];
};

export class OpenDoorShadow extends Container {
  layers: string[] = [];
  openDoorShadow: Sprite;

  constructor(
    protected config: ObjConfig = {
      assets: [],
    }
  ) {
    super();

    this.openDoorShadow = Sprite.from(Texture.from(this.config.assets[1]));
    this.openDoorShadow.anchor.set(0.5);
    this.addChild(this.openDoorShadow);
  }
}
