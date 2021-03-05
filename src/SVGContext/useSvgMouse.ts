import React from "react";

type Event = React.MouseEvent<SVGElement>;
const screenToSvg = (svg: SVGSVGElement) => (e: Event) => {
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const p = pt.matrixTransform(svg.getScreenCTM()?.inverse());
  return { x: p.x, y: p.y };
};

export function useSVGMouse(node: SVGSVGElement) {
  const fn = React.useCallback((e: Event) => screenToSvg(node)(e), [node]);

  return fn;
}
