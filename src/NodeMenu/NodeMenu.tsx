import React from "react";
import { atom, useAtom } from "jotai";
import { appendNodeAtom } from "../Node";
import { mousePosAtom } from "../atoms";
import { nodeOptions, Option } from "./nodeOptions";

import { createOutputAtom } from "./createOutputAtom";
import { InputAtom, createVariable } from "../Variable/types";

const useKeyDown = (code: string, handler: (e: KeyboardEvent) => void) => {
  const listener = React.useCallback(
    (e) => {
      if (e.code === code) handler(e);
    },
    [code, handler]
  );
  React.useEffect(() => {
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [listener]);

  return;
};

const size = { width: 200, height: 300 };
const optionHeight = 20;

function NodeMenuList({
  option,
  onClick,
}: {
  option: Option;
  onClick: () => void;
}) {
  const [, appendNode] = useAtom(appendNodeAtom);
  const [pos] = useAtom(mousePosAtom);
  const _onClick = () => {
    onClick();
    const position = { x: pos[0], y: pos[1] };
    const createOutput = <IN,>(inputs: InputAtom<IN>[]) =>
      createOutputAtom(inputs, option.fn);

    const num = option.fn.length;

    const inputAtoms: InputAtom<unknown>[] = [...Array(num).keys()].map(() => {
      return atom(atom(0)) as any; // TODO: PrimitiveAtom is not covariance
    });
    const variable = createVariable(inputAtoms, createOutput);
    const component = option?.component ?? (() => <></>);
    appendNode({
      position,
      variable,
      name: option.name,
      component,
    });
  };

  return (
    <>
      <rect
        width={size.width}
        height={optionHeight}
        fill="white"
        stroke="black"
        onClick={_onClick}
      ></rect>
      <text y={optionHeight - 3}>{option.name}</text>
    </>
  );
}

function NodeMenu() {
  const [open, setOpen] = React.useState(false);
  const [pos] = useAtom(mousePosAtom);
  const posWhenOpen = React.useMemo(() => {
    return { x: pos[0], y: pos[1] };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  useKeyDown("Space", () => setOpen((prev) => !prev));
  const rect = { ...posWhenOpen, ...size };

  if (!open) return null;
  return (
    <>
      <rect {...rect} fill="white" stroke="black"></rect>
      {nodeOptions.map((option, i) => {
        return (
          <g
            transform={`translate(${rect.x} ${rect.y + optionHeight * i})`}
            key={option.name}
          >
            <NodeMenuList option={option} onClick={() => setOpen(false)} />
          </g>
        );
      })}
      <foreignObject {...rect} y={rect.y - 30} height={30}>
        <input type="text" />
      </foreignObject>
    </>
  );
}

export default NodeMenu;
