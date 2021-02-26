import { useEffect } from "react";
import { atom, useAtom } from "jotai";

import {
  hoveredInputSocketAtom,
  hoveredOutputSocketAtom,
  connectTargetAtom,
} from "../Socket";
import type { InputSocket, OutputSocket } from "../Socket";
import { useMouseStream } from "../SVGContext";

export function useMouseToConnect() {
  const [hoveredOutput] = useAtom(hoveredOutputSocketAtom);
  const [hovered] = useAtom(hoveredInputSocketAtom);
  const { start, end } = useMouseStream(hoveredOutput !== null, true);

  const [connectTarget, setConnectTarget] = useAtom(connectTargetAtom);

  useEffect(() => {
    if (start === null) return;
    if (hoveredOutput === null) return;
    setConnectTarget(hoveredOutput);
  }, [start]);

  const [, setConnect] = useAtom(connectAtom);
  useEffect(() => {
    if (end === null) return;
    if (hovered === null) {
      setConnectTarget(null);
      return;
    }
    if (connectTarget === null) return;
    setConnect([connectTarget, hovered]);
  }, [end]);
}

const connectAtom = atom(
  null,
  (
    _get,
    set,
    [connectTarget, hovered]: [OutputSocket<unknown>, InputSocket<unknown>]
  ) => {
    console.log("connect", connectTarget, hovered);
    const newAtom = atom((get) => get(connectTarget.atom));
    hovered.from = connectTarget;
    // set new atom that will return target atom's value into hovered inputSocket
    set(hovered.atom, newAtom);
    set(connectTargetAtom, null);
  }
);
