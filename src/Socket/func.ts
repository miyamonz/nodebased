import { atom } from "jotai";
import type { InputSocket, InputSocketJSON } from "./types";
import type { OutputSocket, OutputSocketJSON } from "./types";
import type { PositionAtom } from "../Position";
import type { Node } from "../Node";

export const createInputSocket = <IN>(
  json: InputSocketJSON,
  nodeId: Node["id"],
  position: PositionAtom
): InputSocket<IN> => {
  return {
    ...json,
    position,
    nodeId,
  };
};

export const createOutputSocket = <OUT>(
  json: OutputSocketJSON,
  nodeId: Node["id"],
  position: PositionAtom
): OutputSocket<OUT> => {
  return {
    ...json,
    position,
    nodeId,
  };
};
