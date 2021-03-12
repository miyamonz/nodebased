import React from "react";
import { atom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";

import { selectedNodesAtom, useSetSelected } from "./atoms";
import { hovered } from "./SelectCollisionArea";

import { currentNodesAtom } from "../actions";
import { hoveredNode } from "../Node";
import { hoveredInputSocketAtom, hoveredOutputSocketAtom } from "../Socket";
import { intersect, rectFromPos } from "../Rect";
import { useMouseStream } from "../SVGContext";

import type { Rect } from "../Rect";

//drag rect
const selectRectAtom = atom<Rect | null>(null);
export function useSelectRectAtom() {
  return useAtomValue(selectRectAtom);
}

const filteredRectAtomListAtom = atom((get) => {
  const currentNodes = get(currentNodesAtom);
  const selectRect = get(selectRectAtom);
  if (selectRect === null) return [];
  return currentNodes.filter((node) => intersect(selectRect)(get(node.rect)));
});

const startConditionAtom = atom((get) => {
  const cond = [
    get(hoveredNode),
    get(hoveredInputSocketAtom),
    get(hoveredOutputSocketAtom),
  ].reduce((acc, next) => acc && next === null, true);
  const h = get(hovered);
  const isSelected = get(selectedNodesAtom).length > 0;

  return h && cond && !isSelected;
});

export function useMouseToSelect() {
  const startCond = useAtomValue(startConditionAtom);
  const { start, drag, end } = useMouseStream(startCond);

  const setSelected = useSetSelected();
  const setSelectRect = useUpdateAtom(selectRectAtom);

  //start
  React.useEffect(() => {
    if (start === null) return;
    setSelected([]);
  }, [start?.x, start?.y]);

  //drag
  React.useEffect(() => {
    if (start === null || drag === null) return;
    setSelectRect(rectFromPos(start)(drag));
  }, [drag?.x, drag?.y]);

  const filteredRectAtomList = useAtomValue(filteredRectAtomListAtom);
  //end
  React.useEffect(() => {
    if (end === null) return;
    setSelected(filteredRectAtomList);
    setSelectRect(null);
  }, [end?.x, end?.y]);
}
