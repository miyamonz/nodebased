import { InputSocket, OutputSocket } from "../Socket";
import type { Node } from "../Node";

export type ConnectionJSON = {
  from: {
    node: Node["id"];
    socket: number;
  };
  to: {
    node: Node["id"];
    socket: number;
  };
};

export type Connection<T> = {
  from: OutputSocket<T>;
  to: InputSocket<T>;
};
