import { useAtom } from "jotai";
import type { Atom, PrimitiveAtom } from "jotai";
import type { NodeComponent } from "../Node";
import { usePushGraphJSON } from "../Graph";
import type { GraphJSON, Graph } from "../Graph";
import { ConnectAtomLogic } from "../Connect/ConnectionLine";

export function createComponent(
  jsonAtom: PrimitiveAtom<GraphJSON>,
  graphAtom: Atom<Graph>
) {
  const SubGraphNode: NodeComponent = ({ node }) => {
    const pushGraphJSON = usePushGraphJSON();
    const [rect] = useAtom(node.rect);

    const [json, setGraph] = useAtom(jsonAtom);
    const [graph] = useAtom(graphAtom);
    const [connections] = useAtom(graph.connections);

    return (
      <>
        {connections.map((c) => {
          return <ConnectAtomLogic key={c.to.atom.toString()} connection={c} />;
        })}
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
          onClick={() => pushGraphJSON(json, setGraph)}
        />
      </>
    );
  };
  return SubGraphNode;
}
