import { atom } from "jotai";

import { connectTargetAtom, hoveredInputSocketAtom } from "../Socket";
import type { OutputSocket } from "../Socket";
import type { SimpleMouseEvent } from "../Mouse";

export const dragAtomToConnect = atom(null, (get, set, e: SimpleMouseEvent) => {
  // connect
  const connectTarget = get(connectTargetAtom);
  if (e.type === "up" && connectTarget) {
    set(dragConnectAtom, connectTarget);
  }
});

const dragConnectAtom = atom(
  null,
  (get, set, connectTarget: OutputSocket<unknown>) => {
    const hovered = get(hoveredInputSocketAtom);
    if (hovered) {
      console.log("connect", connectTarget, hovered);
      const newAtom = atom((get) => get(connectTarget.atom));
      hovered.from = connectTarget;
      // set new atom that will return target atom's value into hovered inputSocket
      set(hovered.atom, newAtom);
    }
    set(connectTargetAtom, null);
  }
);
