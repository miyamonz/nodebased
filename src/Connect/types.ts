import { InputSocket, OutputSocket } from "../Socket";

export type ConnectionJSON = {
  from: {
    node: string;
    socket: number;
  };
  to: {
    node: string;
    socket: number;
  };
};

export type Connection<T> = {
  from: OutputSocket<T>;
  to: InputSocket<T>;
};
