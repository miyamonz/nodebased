import { atom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import type { NodeAtom, NodeComponent } from "./types";

import { createInputSockets, createOutputSockets } from "../Socket";
import { RectAtom } from "../Rect";
import type { Variable } from "../Variable";

export const createNodeAtom = ({
  rect,
  variable,
  name,
  component,
  state,
}: {
  rect: RectAtom;
  variable: Variable;
  name: string;
  component: NodeComponent;
  state?: PrimitiveAtom<unknown>;
}): NodeAtom => {
  const inputSockets = createInputSockets(rect, variable.inputAtoms);
  const outputSockets = createOutputSockets(rect, variable.outputAtoms);

  const inputValues = atom((get) => {
    return variable.inputAtoms.map(get).map(get);
  });

  return atom({
    rect,
    inputs: inputSockets,
    inputValues,
    outputs: outputSockets,
    name,
    component,
    state,
  });
};
