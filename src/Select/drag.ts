import React from "react";
import { atom, useAtom } from "jotai";
import { useHoveredNode, nodeAtomListAtom } from "../Node";
import type { NodeAtom } from "../Node";
import { useConnectTarget } from "../Connect";
import { intersect, rectFromPos } from "../Rect";
import type { Rect } from "../Rect";
import { useMouseStream } from "../SVGContext";

const selectRectAtom = atom<Rect | null>(null);
export function useSelectRectAtom() {
  const [rect] = useAtom(selectRectAtom);
  return rect;
}

const filteredRectAtomListAtom = atom((get) => {
  const nodeAtomList = get(nodeAtomListAtom);
  const selectRect = get(selectRectAtom);
  if (selectRect === null) return [];
  return nodeAtomList.filter((node) =>
    intersect(selectRect)(get(get(node).rect))
  );
});
export const selectedRectAtomListAtom = atom<NodeAtom[]>([]);

function useStartCond() {
  const hoveredNode = useHoveredNode();
  const connectTarget = useConnectTarget();
  const [selectedRectAtomList] = useAtom(selectedRectAtomListAtom);
  const isSelected = selectedRectAtomList.length > 0;

  return React.useMemo(
    () => hoveredNode === null && connectTarget === null && !isSelected,
    [hoveredNode, connectTarget, isSelected]
  );
}

function useClickThenUnselect() {
  const [, setSelectedRectAtomList] = useAtom(selectedRectAtomListAtom);
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

  const startCond = useStartCond();
  const { start, drag, end } = useMouseStream(startCond);

  const [, setSelectedRectAtomList] = useAtom(selectedRectAtomListAtom);
  const [, setSelectRect] = useAtom(selectRectAtom);

  //start
  React.useEffect(() => {
    if (start === null) return;
    setSelectedRectAtomList([]);
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
    setSelectedRectAtomList(filteredRectAtomList);
    setSelectRect(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end]);
}
