import SceneManager from "./core/SceneManager";
import { generateCombination } from "./core/Combination";

const sceneManager = new SceneManager();

await sceneManager.switchScene("Loading");
await sceneManager.switchScene("Game");

generateCombination();
