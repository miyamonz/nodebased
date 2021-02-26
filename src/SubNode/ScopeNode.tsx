import { useAtom } from "jotai";
import type { NodeComponent } from "../Node";
import { currentScopeNameAtom } from "../Scope";

export function createComponent(name: string) {
  const ScopeNode: NodeComponent = ({ node }) => {
    const [rect] = useAtom(node.rect);
    const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };

    const [, setScopeName] = useAtom(currentScopeNameAtom);
    return (
      <>
        <rect {...rect} fill="lightgreen" />
        <text {...center}>{name}</text>
        <rect
          {...rect}
          fill="transparent"
          onMouseDown={() => {
            setScopeName(name);
          }}
        />
      </>
    );
  };
  return ScopeNode;
}
