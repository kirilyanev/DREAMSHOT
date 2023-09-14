import { Container, Texture, Sprite } from "pixi.js";

export type BgConfig = {
  assets: string[];
};

export default class Background extends Container {
  name = "Background";

  layers: string[] = [];
  private background!: Sprite;

  constructor(
    protected config: BgConfig = {
      assets: [],
    }
  ) {
    super();

    this.init();
  }

  init() {
    const texture = Texture.from(this.config.assets[0]);
    this.background = Sprite.from(texture);
    const scaleFactor = window.innerHeight / texture.height;
    this.background.scale.set(scaleFactor);

    this.background.anchor.set(0.5);
    this.addChild(this.background);
  }
}
