import React from "react";
import { useAppendNode } from "../actions";
import { useMousePosition } from "../SVGContext";
import { nodeOptions } from "../NodeList/nodes";

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

type Option = typeof nodeOptions extends Array<infer T> ? T : never;

function NodeMenuList({
  option,
  onClick,
}: {
  option: Option;
  onClick: () => void;
}) {
  const appendNode = useAppendNode();
  const position = useMousePosition();
  const _onClick = () => {
    onClick();
    const component = option?.component ?? (() => <></>);
    const variable = option.variable();
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
  const position = useMousePosition();
  const posWhenOpen = React.useMemo(() => {
    return position;
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
