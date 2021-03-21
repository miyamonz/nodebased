import type { InputSocket, InputSocketJSON } from "./types";
import type { OutputSocket, OutputSocketJSON } from "./types";
import type { PositionAtom } from "../Position";
import type { Node } from "../Node";

export const createInputSocket = (
  json: InputSocketJSON,
  nodeId: Node["id"]
): InputSocketJSON => {
  return {
    ...json,
    nodeId,
  };
};

export const createOutputSocket = (
  json: OutputSocketJSON,
  nodeId: Node["id"]
): OutputSocketJSON => {
  return {
    ...json,
    nodeId,
  };
};
