import React from "react";
import { atom, useAtom } from "jotai";
import type { Atom } from "jotai";
import { useAtomValue } from "jotai/utils";
import type { Node } from "./types";
import { useSelectedNodes } from "../Select";
import { InputCircle, OutputCircle } from "../Socket";
import type { Position } from "../Position";

type NodeComponent = React.FC<{ node: Node }>;

const ShowSelect: NodeComponent = ({ node }) => {
  const rect = useAtomValue(node.rect);
  const selectedNodes = useSelectedNodes();
  const isSelected = selectedNodes.includes(node);

  if (isSelected) {
    return <rect {...rect} fill="lightpink" stroke="red" />;
  }
  return null;
};

export const hoveredNode = atom<Node | null>(null);
export function useHoveredNode() {
  return useAtomValue(hoveredNode);
}

const ShowHovered: NodeComponent = ({ node }) => {
  const rect = useAtomValue(node.rect);
  const [hovered, setHovered] = useAtom(hoveredNode);
  const isHovered = node === hovered;

  return (
    <>
      {isHovered && <rect {...rect} fill="none" stroke="red" />}
      <rect
        {...rect}
        fill="transparent"
        stroke={isHovered ? "none" : "black"}
        onMouseEnter={() => setHovered(node)}
        onMouseMove={() => setHovered(node)}
        onMouseLeave={() => setHovered(null)}
      />
    </>
  );
};

const RenderText = ({
  outputAtom,
  center,
}: {
  outputAtom: Atom<unknown>;
  center: Position;
}) => {
  const outValue = useAtomValue(outputAtom);
  return (
    <text {...center}>
      {(typeof outValue === "number" || typeof outValue === "string") &&
        outValue}
    </text>
  );
};

function useStream(node: Node) {
  const { stream } = node;
  const inputs = useAtomValue(stream?.inputAtoms ?? atom(0));
  const outputs = useAtomValue(stream?.outputAtoms ?? atom(0));
  return { inputs, outputs };
}

const RenderNode: NodeComponent = ({ node }) => {
  const rect = useAtomValue(node.rect);

  const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };

  const isockets = useAtomValue(node.isockets);
  const osockets = useAtomValue(node.osockets);

  const { outputs } = useStream(node);

  return (
    <>
      <ShowSelect node={node} />
      {outputs.length > 0 && (
        <RenderText outputAtom={outputs[0]} center={center} />
      )}
      <g transform={`translate(${rect.x} ${rect.y - 5} )`}>
        <text>{node.name}</text>
      </g>
      <ShowHovered node={node} />

      {node.component !== undefined && <node.component node={node} />}
      {node.name !== "inlet" &&
        isockets.map((input) => {
          return <InputCircle key={input.position.toString()} input={input} />;
        })}
      {node.name !== "outlet" &&
        osockets.map((output) => {
          return (
            <OutputCircle key={output.position.toString()} output={output} />
          );
        })}
    </>
  );
};

export default React.memo(RenderNode);
