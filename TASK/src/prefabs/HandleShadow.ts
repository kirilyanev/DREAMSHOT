import { Container, Sprite, Texture } from "pixi.js";

export type ObjConfig = {
  assets: string[];
};

export class HandleShadow extends Container {
  handle: Sprite;

  constructor(
    protected config: ObjConfig = {
      assets: [],
    }
  ) {
    super();

    const texture = Texture.from(this.config.assets[1]);
    this.handle = Sprite.from(texture);

    this.handle.anchor.set(0.5);
    this.addChild(this.handle);
  }
}
