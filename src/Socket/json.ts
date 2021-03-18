//import type { Getter } from "jotai/core/types";
import type { Socket, SocketJSON } from "./types";
export const socketsToJson = (sockets: Socket[]): SocketJSON[] => {
  return sockets.map((s) => {
    return {
      name: s.name,
    };
  });
};
