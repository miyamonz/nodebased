import React from "react";

import { useShortcutPaste } from "./shortcutHooks";
import { getClipboard } from "../util";
import { jsonToNode } from "../Node/json";
import { useAppendNode } from "../actions";
import { useSetSelected } from "../Select";

const Paste = () => {
  const setSelected = useSetSelected();

  const appendNode = useAppendNode();
  useShortcutPaste(
    React.useCallback(async () => {
      const text = await getClipboard();
      try {
        const json = JSON.parse(text);
        const nodes = json.nodes.map(jsonToNode);
        nodes.map(appendNode);
        setSelected(nodes);
      } catch (e: unknown) {
        console.error(e);
      }
    }, [])
  );

  return <></>;
};

export default React.memo(Paste);
