import { InputSocket, OutputSocket } from "../Socket";
import { InputSocketJSON, OutputSocketJSON } from "../Socket";
import type { Node } from "../Node";
import type { Socket } from "../Socket/types";

export type EdgeJSON = {
  from: {
    nodeId: Node["id"];
    socketName: Socket["name"];
  };
  to: {
    nodeId: Node["id"];
    socketName: Socket["name"];
  };
};

export type Edge = {
  from: OutputSocketJSON;
  to: InputSocketJSON;
};
