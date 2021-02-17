import React from "react";
import { useAtom } from "jotai";
import { addNodeAtom } from "../Node";
import { mousePosAtom } from "../atoms";
import { createOperator } from "../Operator";

const useKeyDown = (code: string, handler: any) => {
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

type Option = {
  name: string;
  fn?: (...args: any[]) => any;
};
const nodeOptions: Option[] = [
  { name: "slider" },
  { name: "add", fn: (a, b) => a + b },
  { name: "sub", fn: (a, b) => a - b },
  { name: "mul", fn: (a, b) => a * b },
  { name: "div", fn: (a, b) => a / b },
  { name: "minus", fn: (a) => -a },
];

const size = { width: 200, height: 300 };
const optionHeight = 20;

function NodeMenuList({
  option,
  onClick,
}: {
  option: Option;
  onClick: () => void;
}) {
  const [, addNode] = useAtom(addNodeAtom);
  const [pos] = useAtom(mousePosAtom);
  const _onClick = () => {
    onClick();
    const position = { x: pos[0], y: pos[1] };
    const op = createOperator(option.name, option?.fn ?? ((a) => a));
    addNode({ position, op });
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
