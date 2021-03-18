import { InputSocket, OutputSocket } from "../Socket";
import type { Socket } from "../Socket/types";

export type ConnectionJSON = {
  from: {
    nodeIndex: number;
    socketName: Socket["name"];
  };
  to: {
    nodeIndex: number;
    socketName: Socket["name"];
  };
};

export type Connection<T> = {
  from: OutputSocket<T>;
  to: InputSocket<T>;
};
