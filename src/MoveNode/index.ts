import { useDragSelected } from "./useDragSelected";
import { useDragHoveredNode } from "./useDragHoveredNode";

export function useDragMoveNode() {
  useDragSelected();
  useDragHoveredNode();
}
