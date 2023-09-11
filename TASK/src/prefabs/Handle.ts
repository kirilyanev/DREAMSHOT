import { Container, Sprite, Texture } from "pixi.js";

export type ObjConfig = {
  assets: string[];
};

export class Handle extends Container {
  handle: Sprite;

  constructor(
    protected config: ObjConfig = {
      assets: [],
    }
  ) {
    super();

    const texture = Texture.from(this.config.assets[2]);
    this.handle = Sprite.from(texture);

    this.handle.anchor.set(0.5);
    this.addChild(this.handle);
  }
}
