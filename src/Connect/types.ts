import { InputSocket, OutputSocket } from "../Socket";

export type Connection<T> = {
  from_: readonly [string, number]; //node index, socket index
  to_: readonly [string, number]; //node index, socket index
  from: OutputSocket<T>;
  to: InputSocket<T>;
};
