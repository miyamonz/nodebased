import { useAtom } from "jotai";
import type { InputSocket } from "./types";
export function useConnected<T>(isocket: InputSocket<T>) {
  //const [connection] = useAtom(isocket.connection);
  //return connection !== null;
  return false;
}
