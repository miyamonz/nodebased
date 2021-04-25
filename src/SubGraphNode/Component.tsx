import React from "react";
import { useAtom } from "jotai";
import type { Atom, PrimitiveAtom } from "jotai";
import type { NodeComponent } from "../Node";
import { usePushGraphJSON } from "../Graph";
import type { GraphJSON, Graph } from "../Graph";
import { currentGraphJsonAtom } from "../Graph";
import { GraphEffect } from "../Graph/effect";

export function createComponent(
  jsonAtom: PrimitiveAtom<GraphJSON>,
  graphAtom: Atom<Graph>
) {
  const SubGraphNode: NodeComponent = ({ node }) => {
    const pushGraphJSON = usePushGraphJSON();
    const [rect] = useAtom(node.rect);

    const [json] = useAtom(jsonAtom);
    const [graph] = useAtom(graphAtom);

    const [, setCurrentGraphJson] = useAtom(currentGraphJsonAtom);
    return (
      <>
        <GraphEffect graph={graph} />
        <rect
          x={rect.x}
          y={rect.y + rect.height / 2}
          width={rect.width}
          height={rect.height / 2}
          fill="lightgreen"
        />
        <text x={rect.x} y={rect.y + rect.height / 2 + 20}>
          edit
        </text>
        <rect
          x={rect.x}
          y={rect.y + rect.height / 2}
          width={rect.width}
          height={rect.height / 2}
          fill="transparent"
          onClick={() =>
            // TODO: don't want to depend current graph
            // node のidをjsonに保存したくないけど、入れないとここうごかなそう
            pushGraphJSON(json, (_json) => {
              setCurrentGraphJson((json) => {
                const found = json.nodes.find((n) => n.id === node.id);
                if (found !== undefined) {
                  found.data = _json;
                } else {
                  console.error("sub graph node not found");
                }
                return json;
              });
            })
          }
        />
      </>
    );
  };
  return SubGraphNode;
}
