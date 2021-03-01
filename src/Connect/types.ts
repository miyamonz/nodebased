import { InputSocket, OutputSocket } from "../Socket";

export type Connection<T> = {
  from: OutputSocket<T>;
  to: InputSocket<T>;
};
