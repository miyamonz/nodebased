import type { InputSocket, InputSocketJSON } from "./types";
import type { OutputSocket, OutputSocketJSON } from "./types";
import type { InputSocketJSONParts, OutputSocketJSONParts } from "./types";
import type { PositionAtom } from "../Position";
import type { NodeJSON } from "../Node";

export const createInputSocket = (
  json: InputSocketJSONParts,
  nodeId: NodeJSON["id"],
  position: PositionAtom
): InputSocketJSON => {
  return {
    ...json,
    _nodeId: nodeId,
    _position: position,
  };
};

export const createOutputSocket = (
  json: OutputSocketJSONParts,
  nodeId: NodeJSON["id"],
  position: PositionAtom
): OutputSocketJSON => {
  return {
    ...json,
    _nodeId: nodeId,
    _position: position,
  };
};
