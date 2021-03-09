import React from "react";

import { useShortcutPaste } from "./shortcutHooks";
import { getClipboard } from "../util";
import { useAppendNode } from "../actions";
import { useSetSelected } from "../Select";

import { useCreateGraph } from "../Graph";

const Paste = () => {
  const createGraph = useCreateGraph();

  const appendNode = useAppendNode();
  const setSelected = useSetSelected();

  useShortcutPaste(
    React.useCallback(async () => {
      const text = await getClipboard();
      try {
        const json = JSON.parse(text);
        const { nodes } = createGraph(json);

        nodes.forEach(appendNode);
        setSelected(nodes);
      } catch (e: unknown) {
        console.error(e);
      }
    }, [])
  );

  return <></>;
};

export default React.memo(Paste);
