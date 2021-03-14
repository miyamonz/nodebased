import { useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import type { NodeComponent } from "../Node";
import { usePushGraphJSON } from "../Graph";
import type { GraphJSON } from "../Graph";

export function createComponent(jsonAtom: PrimitiveAtom<GraphJSON>) {
  const GraphNode: NodeComponent = ({ node }) => {
    const pushGraphJSON = usePushGraphJSON();
    const [rect] = useAtom(node.rect);

    const [json] = useAtom(jsonAtom);
    const [, setGraph] = useAtom(jsonAtom);

    return (
      <>
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
  return GraphNode;
}
