import React from "react";
import { atom, useAtom } from "jotai";
import { currentNodesAtom } from "../actions";
import { hoveredNodeAtom } from "../Node";
import type { NodeAtom } from "../Node";
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
export const selectedNodesAtom = atom<NodeAtom[]>([]);
export function useSelectedNodes() {
  const [nodes] = useAtom(selectedNodesAtom);
  return nodes;
}

const startConditionAtom = atom((get) => {
  const cond = [
    get(hoveredNodeAtom),
    get(hoveredInputSocketAtom),
    get(hoveredOutputSocketAtom),
  ].reduce((acc, next) => acc && next === null, true);
  const isSelected = get(selectedNodesAtom).length > 0;

  return cond && !isSelected;
});

function useClickThenUnselect() {
  const [, setSelectedRectAtomList] = useAtom(selectedNodesAtom);
  const { start, drag, end } = useMouseStream();
  // on click
  const isClick = React.useMemo(() => {
    return start !== null && drag == null && end !== null;
  }, [start, drag, end]);
  React.useEffect(() => {
    if (isClick) {
      setSelectedRectAtomList([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClick]);
}

export function useMouseToSelect() {
  useClickThenUnselect();

  const [startCond] = useAtom(startConditionAtom);
  const { start, drag, end } = useMouseStream(startCond);

  const [, setSelectedNodes] = useAtom(selectedNodesAtom);
  const [, setSelectRect] = useAtom(selectRectAtom);

  //start
  React.useEffect(() => {
    if (start === null) return;
    setSelectedNodes([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  //drag
  React.useEffect(() => {
    if (start === null || drag === null) return;
    setSelectRect(rectFromPos(start)(drag));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drag]);

  const [filteredRectAtomList] = useAtom(filteredRectAtomListAtom);
  //end
  React.useEffect(() => {
    if (end === null) return;
    setSelectedNodes(filteredRectAtomList);
    setSelectRect(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end]);
}
