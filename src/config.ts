import type { BgConfig } from "./prefabs/Background";

type Config = {
  background: Record<string, BgConfig>;
  sprites: {
    [key: string]: string;
  };
};

export default {
  background: {
    vault: {
      assets: ["bg"],
    },
  },
  sprites: {
    closedDoor: "door",
    handleShadow: "handleShadow",
    handle: "handle",
    doorOpen: "doorOpen",
    doorOpenShadow: "doorOpenShadow",
    blink: "blink",
  },
} as Config;
