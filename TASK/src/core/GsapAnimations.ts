import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
gsap.registerPlugin(CSSPlugin);

let rotation: string;

export function handleRotate(
  handleShadow: any,
  handle: any,
  direction: string
) {
  if (direction === "right") {
    rotation = "+=1.047198";
  } else if (direction === "left") {
    rotation = "-=1.047198";
  }

  gsap.to([handleShadow, handle], {
    rotation: rotation,
    duration: 1.5,
  });
}

export function lockRotate(handleShadow: any, handle: any) {
  gsap.to([handleShadow, handle], {
    rotation: "+=72",
    ease: "power4.inOut",
    duration: 4.0,
  });
}

export function animation(
  openDoor: any,
  closedDoor: any,
  scaleFactor: number,
  blink: any,
  blink1: any,
  blink2: any
) {
  const closedDoorX = closedDoor.x;
  const targetX = closedDoorX + 1500 * scaleFactor;
  const tl = gsap.timeline();

  tl.to(closedDoor.scale, { x: -0.5, duration: 2, delay: 3 })
    .to(closedDoor, { x: targetX, duration: 2 }, "-=2")
    .to(closedDoor, { alpha: 0, duration: 0.2 }, "-=0.5")
    .from(openDoor.scale, { x: 0, duration: 2 }, "-=1.9")
    .to(openDoor, { alpha: 1, duration: 0.5 }, "-=1.5")
    .to(blink, { rotation: "3", ease: "power4.inOut", duration: 2 })
    .to(blink1, { rotation: "-4", ease: "power2.inOut", duration: 1 }, "-=1.5")
    .to(blink2, { rotation: "8", ease: "power3.inOut", duration: 2 }, "-=2.2");

  setTimeout(() => tl.reverse(), 10000);
  return tl;
}
