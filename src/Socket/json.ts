//import type { Getter } from "jotai/core/types";
import type {
  InputSocket,
  OutputSocket,
  InputSocketJSON,
  OutputSocketJSON,
  Socket,
} from "./types";

export function socketsToJson(
  sockets: InputSocket<unknown>[]
): InputSocketJSON[];

export function socketsToJson(
  sockets: OutputSocket<unknown>[]
): OutputSocketJSON[];

export function socketsToJson(
  sockets: Socket[]
): InputSocketJSON[] | OutputSocketJSON[] {
  return sockets.map((s: any) => {
    return {
      type: s.type,
      name: s.name,
    };
  });
}
