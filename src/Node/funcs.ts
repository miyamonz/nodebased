import { atom } from "jotai";
import type { NodeAtom, NodeComponent } from "./types";

import { createInputSockets, createOutputSocket } from "../Socket";
import { RectAtom } from "../Rect";
import type { Variable } from "../Variable";

export const createNodeAtom = <IN extends unknown[], OUT>({
  rect,
  variable,
  name,
  component,
}: {
  rect: RectAtom;
  variable: Variable<IN, OUT>;
  name: string;
  component: NodeComponent;
}): NodeAtom => {
  const inputSockets = createInputSockets<IN>(rect, variable.inputsAtom);
  const outputSocket = createOutputSocket(rect, variable.outputAtom);

  const inputValues = atom((get) => {
    return get(variable.inputsAtom).map(get).map(get);
  });

  return atom({
    rect,
    inputs: inputSockets,
    inputValues,
    output: outputSocket,
    name,
    component,
  });
};
