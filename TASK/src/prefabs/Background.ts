import { Container, TilingSprite, Ticker, Texture, Sprite } from "pixi.js";
import { centerObjects } from "../utils/misc";

export type BgConfig = {
  layers: string[];
  panSpeed: number;
};

export default class Background extends Container {
  public scaleFactor = 1; // Initialize it with a default value

  name = "Background";

  layers: string[] = [];
  private background!: Sprite;

  constructor(
    protected config: BgConfig = {
      panSpeed: 1,
      layers: [],
    }
  ) {
    super();

    this.init();

    centerObjects(this);
  }

  init() {
    const texture = Texture.from(this.config.layers[0]);
    this.background = Sprite.from(texture);
    this.scaleFactor = window.innerHeight / texture.height;
    this.background.scale.set(this.scaleFactor);

    this.background.anchor.set(0.5);
    this.addChild(this.background);
  }

  resize(width: number, height: number) {
    const scaleFactor = height / this.background.texture.height;

    // ScaleFactor
    this.scaleFactor = scaleFactor;
    this.background.width = width / scaleFactor;
    this.background.scale.set(scaleFactor);

    centerObjects(this);
  }
}
