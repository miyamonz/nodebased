import { atom } from "jotai";
import type { Atom } from "jotai";
import type { InputSocket, OutputSocket } from "./types";
import type { InputAtom } from "../Variable";
import type { AtomRef } from "../AtomRef";
import type { RectAtom } from "../Rect";
import type { PositionAtom } from "../Position";

import { connectionAtom } from "../Connect";
import type { Connection } from "../Connect";

export const createInputSocket = <IN>(
  defaultAtom: AtomRef<IN>,
  anchor: PositionAtom
): InputSocket<IN> => {
  return {
    type: "input",
    position: atom((get) => {
      const p = get(anchor);
      return { x: p.x, y: p.y };
    }),
    ref: defaultAtom,
    atom: atom((get) => get(get(defaultAtom))),
    connection: atom((get) => {
      const connections = get(connectionAtom);
      const ref = get(defaultAtom);
      const found = connections.find(({ from }) => from.atom === ref);
      return (found as Connection<IN>) || null;
    }),
  };
};

// input sockets depend on rect because they contain their own position.
export function createInputSockets(
  rect: RectAtom,
  inputsAtom: Atom<InputAtom<unknown>[]>
): Atom<InputSocket<unknown>[]> {
  const inputPositionAnchor = atom((get) => {
    const r = get(rect);
    return { x: r.x, y: r.y + r.height / 2 };
  });
  const inputSockets = atom((get) => {
    const inputs = get(inputsAtom);
    return inputs.map((inputAtom, i) => {
      const position = atom((get) => {
        const p = get(inputPositionAnchor);
        return { x: p.x, y: p.y + 25 * i };
      });
      return createInputSocket(inputAtom, position);
    });
  });
  return inputSockets;
}

export const createOutputSocket = <OUT>(
  position: PositionAtom,
  outAtom: OutputSocket<OUT>["atom"]
): OutputSocket<OUT> => {
  return {
    type: "output",
    position,
    atom: outAtom,
  };
};

export const createOutputSockets = (
  rectAtom: RectAtom,
  outsAtom: Atom<OutputSocket<unknown>["atom"][]>
): Atom<OutputSocket<unknown>[]> => {
  const anchor = atom((get) => {
    const rect = get(rectAtom);
    return { x: rect.x + rect.width, y: rect.y + rect.height / 2 };
  });
  return atom((get) => {
    return get(outsAtom).map((outAtom, i) => {
      const position = atom((get) => ({
        ...get(anchor),
        y: get(anchor).y + 25 * i,
      }));
      return createOutputSocket(position, outAtom);
    });
  });
};
