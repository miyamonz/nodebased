import { useAtom } from "jotai";
import type { NodeComponent } from "../Node";
import type { GraphJSON } from "../Graph";

export function createComponent(json: GraphJSON) {
  const GraphNode: NodeComponent = ({ node }) => {
    const [rect] = useAtom(node.rect);
    const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };

    return (
      <>
        <text {...center}>graph</text>
      </>
    );
  };
  return GraphNode;
}
