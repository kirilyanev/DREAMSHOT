import { Container, Sprite, Texture } from "pixi.js";

export type ObjConfig = {
  assets: string[];
};

export class Blink extends Container {
  layers: string[] = [];
  blink: Sprite;

  constructor(
    protected config: ObjConfig = {
      assets: [],
    }
  ) {
    super();

    this.blink = Sprite.from(Texture.from(this.config.assets[2]));
    this.blink.anchor.set(0.5);
    this.addChild(this.blink);
  }
}
