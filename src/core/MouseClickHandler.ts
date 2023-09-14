import { lockRotate, handleRotate, animation } from "./GsapAnimations";
import { updateCombinations } from "./InputsHandler";

export function handleMouseClick(clickLocation: "left" | "right", game: any) {
  const rotateDirection = clickLocation;

  const isHandleRotating =
    clickLocation === "right"
      ? updateCombinations("clockwise")
      : updateCombinations("counterclockwise");

  if (!isHandleRotating) {
    return lockRotate(
      game.closedDoorContainer.children[1],
      game.closedDoorContainer.children[2]
    );
  }

  if (isHandleRotating === "OPEN") {
    animation(
      game.openDoorContainer.children[1],
      game.openDoorContainer.children[0],
      game.closedDoorContainer,
      game.scaleFactor,
      game.blinkContainer.children[0],
      game.blinkContainer.children[1],
      game.blinkContainer.children[2]
    );

    setTimeout(() => lockRotate(game.handleShadow, game.handle), 15000);
    return updateCombinations(undefined);
  }

  handleRotate(
    game.closedDoorContainer.children[1],
    game.closedDoorContainer.children[2],
    rotateDirection
  );
}
