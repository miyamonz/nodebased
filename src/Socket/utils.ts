import { useAtom } from "jotai";
import type { InputSocket } from "./types";
export function useConnected<T>(isocket: InputSocket<T>) {
  //const [edge] = useAtom(isocket.edge);
  //return edge !== null;
  return false;
}
