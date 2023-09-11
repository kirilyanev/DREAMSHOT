import { utils } from "pixi.js";

export default class Mouse extends utils.EventEmitter {
  private static instance: Mouse;
  private isLeftButtonDown = false;

  private constructor() {
    super();
    this.listenToMouseEvents();
  }

  static getInstance(): Mouse {
    if (!Mouse.instance) {
      Mouse.instance = new Mouse();
    }
    return Mouse.instance;
  }

  private listenToMouseEvents() {
    document.addEventListener("mousedown", (e) => this.onMouseDown(e));
  }

  public isLeftButtonPressed(): boolean {
    return this.isLeftButtonDown;
  }

  public onMouseClick(callback: (clickLocation: "left" | "right") => void) {
    this.on("leftMouseClick", callback);
  }

  private onMouseDown(event: MouseEvent) {
    if (event.button === 0) {
      const centerX = window.innerWidth / 2;
      const clickLocation = event.clientX < centerX ? "left" : "right";

      this.emit("leftMouseClick", clickLocation);

      // Stop listening to mouse events after executing the code
      // this.stopListeningToMouseEvents();
    }
  }
}
