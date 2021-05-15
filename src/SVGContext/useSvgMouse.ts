import React from "react";

type Event = React.MouseEvent<SVGElement>;
const screenToSvg = (svg: SVGSVGElement) => (
  e: Event,
  element: SVGGraphicsElement = svg
) => {
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const p = pt.matrixTransform(element.getScreenCTM()?.inverse());
  return { x: p.x, y: p.y };
};

export function useSVGMouse(node: SVGSVGElement) {
  const fn = React.useCallback(
    (...args: [Event, SVGGraphicsElement?]) => screenToSvg(node)(...args),
    [node]
  );

  return fn;
}
