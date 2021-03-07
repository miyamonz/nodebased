import type { Node, NodeComponent } from "./types";

import { createInputSockets, createOutputSockets } from "../Socket";
import { RectAtom } from "../Rect";
import type { Variable } from "../Variable";

export const createNode = ({
  rect,
  variable,
  name,
  component,
  id,
}: {
  rect: RectAtom;
  variable: Variable;
  name: string;
  component: NodeComponent;
  id?: string;
}): Node => {
  const inputSockets = createInputSockets(rect, variable.inputAtoms);
  const outputSockets = createOutputSockets(rect, variable.outputAtoms);

  id = id ?? Math.floor(Math.random() * 10 ** 12).toString();

  return {
    rect,
    inputs: inputSockets,
    outputs: outputSockets,
    name,
    component,
    id,
  };
};
