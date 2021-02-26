import { PrimitiveAtom } from "jotai";
import type { NodeAtom } from "../Node";

export type Scope = {
  name: string;
  nodes: PrimitiveAtom<NodeAtom[]>;
};
