import React from "react";

import { useShortcutPaste } from "./shortcutHooks";
import { getClipboard } from "../util";
import { createNode } from "../Node";
import { useAppendNode } from "../actions";
import { useSetSelected } from "../Select";

import { connectByJson, useConnectSocket } from "../Connect/json";
import type { ConnectionJSON } from "../Connect/json";
import type { Node } from "../Node";

const Paste = () => {
  const setSelected = useSetSelected();
  const setConnect = useConnectSocket();

  const appendNode = useAppendNode();
  useShortcutPaste(
    React.useCallback(async () => {
      const text = await getClipboard();
      try {
        const json = JSON.parse(text);
        const nodes: Node[] = json.nodes.map(createNode);

        const cjsons: ConnectionJSON[] = json.connections;
        cjsons.map(connectByJson(nodes)).forEach((arg) => setConnect(arg));

        const modifyId = nodes.map((n) => ({
          ...n,
          id: Math.floor(Math.random() * 10 ** 12).toString(),
        }));
        modifyId.forEach(appendNode);
        setSelected(modifyId);
      } catch (e: unknown) {
        console.error(e);
      }
    }, [])
  );

  return <></>;
};

export default React.memo(Paste);
