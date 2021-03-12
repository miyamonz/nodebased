import { useAtom } from "jotai";
import type { NodeComponent } from "../Node";
import { currentKeyAtom } from "../Graph";
import type { GraphJSON } from "../Graph";

export function createComponent(json: GraphJSON) {
  const GraphNode: NodeComponent = ({ node }) => {
    const [rect] = useAtom(node.rect);
    const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };

    return (
      <>
        <text {...center}>graph</text>
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
          onClick={() => alert(json)}
        />
      </>
    );
  };
  return GraphNode;
}
