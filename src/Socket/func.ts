import type { InputSocket, InputSocketJSON } from "./types";
import type { OutputSocket, OutputSocketJSON } from "./types";
import type { PositionAtom } from "../Position";
import type { Node } from "../Node";

export const createInputSocket = <IN>(
  json: InputSocketJSON,
  position: PositionAtom,
  nodeId: Node["id"]
): InputSocket<IN> => {
  return {
    ...json,
    position,
    nodeId,
  };
};

export const createOutputSocket = <OUT>(
  json: OutputSocketJSON,
  position: PositionAtom,
  nodeId: Node["id"]
): OutputSocket<OUT> => {
  return {
    ...json,
    position,
    nodeId,
  };
};
