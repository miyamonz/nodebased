import React from "react";
import { useAtom } from "jotai";
import {
  nodeAtomListAtom,
  addNodeAtom,
  dragTargetAtom,
  dragAtom,
} from "./atoms";
import type { NodeAtom } from "./atoms";

const RenderNode = ({ atom }: { atom: NodeAtom }) => {
  const [node] = useAtom(atom);
  const [target, setTarget] = useAtom(dragTargetAtom);
  const isTarget = atom === target;
  return (
    <>
      <rect
        {...node.rect}
        fill="transparent"
        stroke="black"
        onMouseDown={() => {
          setTarget(atom);
        }}
      />
      {isTarget && <rect {...node.rect} fill="none" stroke="red" />}
    </>
  );
};

const useKeyDown = (code: string, handler) => {
  const listener = React.useCallback(
    (e) => {
      if (e.code === code) handler(e);
    },
    [code]
  );
  React.useEffect(() => {
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [listener]);

  return;
};
function SvgCanvas({ width, height }: { width: number; height: number }) {
  const [nodeAtomList] = useAtom(nodeAtomListAtom);
  const [, addAtom] = useAtom(addNodeAtom);
  const [, drag] = useAtom(dragAtom);
  useKeyDown("Space", () => addAtom());
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      onMouseDown={(e) => {
        drag([e.clientX, e.clientY]);
      }}
      onMouseMove={(e) => {
        drag([e.clientX, e.clientY]);
      }}
      onMouseUp={() => {
        drag("end");
      }}
    >
      <text x={0} y={20}>
        nodebased
      </text>
      {nodeAtomList.map((atom) => {
        return <RenderNode key={atom.toString()} atom={atom} />;
      })}
    </svg>
  );
}

export default SvgCanvas;
