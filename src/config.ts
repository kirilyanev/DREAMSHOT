import type { BgConfig } from "./prefabs/Background";
import type { ObjConfig } from "./prefabs/ClosedDoor";

type Config = {
  backgrounds: Record<string, BgConfig>;
  objects: Record<string, ObjConfig>;
};

export default {
  backgrounds: {
    vault: {
      layers: ["bg"],
      panSpeed: 0.2,
    },
  },
  objects: {
    closedDoor: {
      assets: ["door", "handleShadow", "handle"],
    },
    openDoor: {
      assets: ["doorOpen", "doorOpenShadow", "blink"],
    },
  },
} as Config;
