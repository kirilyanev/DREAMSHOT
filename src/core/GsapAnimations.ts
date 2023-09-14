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
  openDoorShadow: any,
  closedDoor: any,
  scaleFactor: number,
  blink: any,
  blink1: any,
  blink2: any
) {
  const closedDoorX = closedDoor.x;
  const closedDoorTargetX = closedDoorX + 270 * scaleFactor;
  const tl = gsap.timeline();

  tl.to(closedDoor.scale, { x: -0.05, duration: 2.2, delay: 3 })
    .to(closedDoor, { x: closedDoorTargetX, duration: 2.2 }, "-=2.2")
    .to(closedDoor, { alpha: 0, duration: 0.1 }, "-=0.3")
    .fromTo(
      [openDoor, openDoorShadow],
      { x: -900, duration: 2 },
      { x: -165, duration: 2 },
      "-=1.5"
    )
    .fromTo(
      [openDoor.scale, openDoorShadow.scale],
      { x: 0.1, duration: 1.5 },
      { x: 1, duration: 1.5 },
      "-=1.5"
    )
    .to([openDoor, openDoorShadow], { alpha: 1, duration: 0.1 }, "-=1.6")
    .to([blink, blink1, blink2], {
      alpha: 1,
      rotation: "6",
      stagger: 0.1,
      duration: 0.5,
    })
    .fromTo(
      blink,
      { alpha: 0 },
      { rotation: "6", alpha: 1, ease: "power4.inOut", duration: 1.4 }
    )
    .fromTo(
      blink1,
      { alpha: 0 },
      { rotation: "-4", alpha: 1, ease: "power2.inOut", duration: 1.1 }
    )
    .fromTo(
      blink2,
      { alpha: 0 },
      { rotation: "9", alpha: 1, ease: "power3.inOut", duration: 2.2 },
      "-=2.2"
    );

  setTimeout(() => tl.reverse(), 10000);
  return tl;
}
