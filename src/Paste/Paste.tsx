import React from "react";
import { useAtomCallback } from "jotai/utils";

import { useHotkeys } from "react-hotkeys-hook";
import { getClipboard } from "../util";
import { useMergeGraph } from "../actions";
import { useSetSelected } from "../Select";

import { jsonToGraph, GraphJSON } from "../Graph";

const Paste = () => {
  const mergeGraph = useMergeGraph();
  const setSelected = useSetSelected();

  const callback = useAtomCallback(
    React.useCallback(async (get) => {
      const text = await getClipboard();
      try {
        const json = JSON.parse(text) as GraphJSON;
        const graph = jsonToGraph(get)(json);
        mergeGraph(graph);

        setSelected(get(graph.nodes));
      } catch (e: unknown) {
        console.error(e);
      }
    }, [])
  );
  useHotkeys("ctrl+v, command+v", () => {
    callback();
  });

  return <></>;
};

export default React.memo(Paste);
