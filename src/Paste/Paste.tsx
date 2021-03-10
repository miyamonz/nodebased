import React from "react";
import { useAtomCallback } from "jotai/utils";

import { useShortcutPaste } from "./shortcutHooks";
import { getClipboard } from "../util";
import { useAppendNode } from "../actions";
import { useSetSelected } from "../Select";

import { useCreateGraph } from "../Graph";

const Paste = () => {
  const createGraph = useCreateGraph();

  const appendNode = useAppendNode();
  const setSelected = useSetSelected();

  const callback = useAtomCallback(
    React.useCallback(async (get) => {
      const text = await getClipboard();
      try {
        const json = JSON.parse(text);
        const graph = createGraph(json);
        const nodes = get(graph.nodes);

        nodes.forEach(appendNode);
        setSelected(nodes);
      } catch (e: unknown) {
        console.error(e);
      }
    }, [])
  );
  useShortcutPaste(callback);

  return <></>;
};

export default React.memo(Paste);
