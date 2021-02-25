export { SVGProvider, useMouseEvent, useTransform } from "./SVGContext";
export { useMousePosition } from "./atoms";

export { useEvent } from "./useEvent";
export type Event = React.MouseEvent<SVGSVGElement, MouseEvent> & {
  position: { x: number; y: number };
};
