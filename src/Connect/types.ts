import { InputSocket, OutputSocket } from "../Socket";

export type Connection<T> = {
  from_: readonly [number, number]; //node index, socket index
  to_: readonly [number, number]; //node index, socket index
  from: OutputSocket<T>;
  to: InputSocket<T>;
};
