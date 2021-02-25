import React from "react";
import { useAtom, WritableAtom } from "jotai";
import { useMouseEvent, useTransform } from "./SVGContext";

export type Event = React.MouseEvent<SVGSVGElement, MouseEvent> & {
  position: {
    x: number;
    y: number;
  };
};
export function useEvent(atom: WritableAtom<null, Event>) {
  const [, setDrag] = useAtom(atom);
  const e = useMouseEvent();
  const transform = useTransform();
  React.useEffect(() => {
    if (e === null || transform === null) return;
    const { x, y } = transform(e);
    const position = { x, y };
    setDrag(Object.assign(e, { position }));
  }, [e, transform, setDrag]);
}
