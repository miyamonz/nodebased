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
  graphAtom: Atom<Graph>,
  exposedAtom: Atom<React.ReactElement | null>,
  innerSizeAtom: Atom<{ width: number; height: number } | null>
) {
  const SubGraphNode: NodeComponent = ({ node }) => {
    const pushGraphJSON = usePushGraphJSON();
    const [rect] = useAtom(node.rect);

    const [json] = useAtom(jsonAtom);
    const [graph] = useAtom(graphAtom);

    const [, setCurrentGraphJson] = useAtom(currentGraphJsonAtom);

    const [exposed] = useAtom(exposedAtom);
    const [size] = useAtom(innerSizeAtom);

    const editButton = {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: 25,
    };
    return (
      <>
        <GraphEffect graph={graph} />
        <rect {...editButton} fill="lightgreen" />
        <text x={rect.x + 20} y={editButton.y + 20}>
          edit
        </text>
        <rect
          {...editButton}
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
        {exposed && size && (
          <g
            transform={`translate(${rect.x} ${
              rect.y + rect.height - size.height
            })`}
          >
            {exposed}
          </g>
        )}
      </>
    );
  };
  return SubGraphNode;
}
