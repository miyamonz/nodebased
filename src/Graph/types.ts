import type { Atom, PrimitiveAtom } from "jotai";
import type { Node, NodeJSON } from "../Node";
import type { Connection, ConnectionJSON } from "../Connect";

export type GraphJSON = {
  nodes: NodeJSON[];
  connections: ConnectionJSON[];
};

export type Graph = {
  nodes: PrimitiveAtom<Node[]>;
  connections: Atom<Connection<unknown>[]>;
};
export type GraphView = {
  nodes: Atom<Node[]>;
  connections: Atom<Connection<unknown>[]>;
};
