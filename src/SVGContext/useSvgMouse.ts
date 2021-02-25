import React from "react";

const screenToSvg = (svg: SVGSVGElement) => (
  e: React.MouseEvent<SVGGraphicsElement>
) => {
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  return pt.matrixTransform(svg.getScreenCTM()?.inverse());
};

export function useSVGMouse(node: SVGSVGElement) {
  const fn = React.useCallback((e) => screenToSvg(node)(e), [node]);

  return fn;
}
