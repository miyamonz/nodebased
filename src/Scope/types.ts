import { PrimitiveAtom } from "jotai";
import type { Node } from "../Node";

export type Scope = {
  name: string;
  nodes: PrimitiveAtom<Node[]>;
};
