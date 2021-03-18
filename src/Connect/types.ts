import { InputSocket, OutputSocket } from "../Socket";
import type { Node } from "../Node";
import type { Socket } from "../Socket/types";

export type ConnectionJSON = {
  from: {
    nodeId: Node["id"];
    socketName: Socket["name"];
  };
  to: {
    nodeId: Node["id"];
    socketName: Socket["name"];
  };
};

export type Connection<T> = {
  from: OutputSocket<T>;
  to: InputSocket<T>;
};
