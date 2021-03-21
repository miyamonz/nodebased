import React from "react";
import { useAtomCallback } from "jotai/utils";

import { useShortcutPaste } from "./shortcutHooks";
import { getClipboard } from "../util";
import { useMergeGraph } from "../actions";
import { useSetSelected } from "../Select";
import { GraphJSON } from "../Graph";

const Paste = () => {
  const mergeGraph = useMergeGraph();
  const setSelected = useSetSelected();

  const callback = useAtomCallback(
    React.useCallback(async (get) => {
      const text = await getClipboard();
      try {
        const graph = JSON.parse(text) as GraphJSON;
        console.log(graph);
        mergeGraph(graph);

        setSelected(graph.nodes);
      } catch (e: unknown) {
        console.error(e);
      }
    }, [])
  );
  useShortcutPaste(callback);

  return <></>;
};

export default React.memo(Paste);
