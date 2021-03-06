import React from "react";
import { atom, useAtom } from "jotai";

import { selectedNodesAtom, useSetSelected } from "./atoms";
import { hovered } from "./SelectCollisionArea";

import { currentNodesAtom } from "../actions";
import { hoveredNodeAtom } from "../Node";
import { hoveredInputSocketAtom, hoveredOutputSocketAtom } from "../Socket";
import { intersect, rectFromPos } from "../Rect";
import type { Rect } from "../Rect";
import { useMouseStream } from "../SVGContext";

const selectRectAtom = atom<Rect | null>(null);
export function useSelectRectAtom() {
  const [rect] = useAtom(selectRectAtom);
  return rect;
}

const filteredRectAtomListAtom = atom((get) => {
  const currentNodes = get(currentNodesAtom);
  const selectRect = get(selectRectAtom);
  if (selectRect === null) return [];
  return currentNodes.filter((node) =>
    intersect(selectRect)(get(get(node).rect))
  );
});

const startConditionAtom = atom((get) => {
  const cond = [
    get(hoveredNodeAtom),
    get(hoveredInputSocketAtom),
    get(hoveredOutputSocketAtom),
  ].reduce((acc, next) => acc && next === null, true);
  const h = get(hovered);
  const isSelected = get(selectedNodesAtom).length > 0;

  return h && cond && !isSelected;
});

function useClickThenUnselect() {
  const setSelected = useSetSelected();
  const { start, drag, end } = useMouseStream();
  // on click
  const isClick = React.useMemo(() => {
    return start !== null && drag == null && end !== null;
  }, [start, drag, end]);
  React.useEffect(() => {
    if (isClick) {
      setSelected([]);
    }
  }, [isClick]);
}

export function useMouseToSelect() {
  useClickThenUnselect();

  const [startCond] = useAtom(startConditionAtom);
  const { start, drag, end } = useMouseStream(startCond);

  const setSelected = useSetSelected();
  const [, setSelectRect] = useAtom(selectRectAtom);

  //start
  React.useEffect(() => {
    if (start === null) return;
    setSelected([]);
  }, [start]);

  //drag
  React.useEffect(() => {
    if (start === null || drag === null) return;
    setSelectRect(rectFromPos(start)(drag));
  }, [drag]);

  const [filteredRectAtomList] = useAtom(filteredRectAtomListAtom);
  //end
  React.useEffect(() => {
    if (end === null) return;
    setSelected(filteredRectAtomList);
    setSelectRect(null);
  }, [end]);
}
