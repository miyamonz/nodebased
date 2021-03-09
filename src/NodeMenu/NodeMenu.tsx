import React from "react";
import { atom, useAtom } from "jotai";
import { useAppendNodeByName } from "../actions";
import { useMousePosition } from "../SVGContext";
import { nodeNames } from "../NodeList/nodes";

import { useKeyDown } from "./useKeyDown";

const width = 200;
const optionHeight = 20;

function NodeMenuList({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) {
  const appendNodeByName = useAppendNodeByName();
  const position = useMousePosition();
  const _onClick = () => {
    onClick();

    appendNodeByName({ name, position });
  };

  return (
    <>
      <rect width={width} height={optionHeight} fill="white"></rect>
      <text y={optionHeight - 3}>{name}</text>
      <rect
        width={width}
        height={optionHeight}
        fill="transparent"
        stroke="black"
        onClick={_onClick}
      ></rect>
    </>
  );
}

function NodeMenu() {
  const [open, setOpen] = React.useState(false);
  const position = useMousePosition();
  const posWhenOpen = React.useMemo(() => {
    return position;
  }, [open]);
  useKeyDown(
    "Space",
    React.useCallback(() => setOpen((prev) => !prev), [])
  );

  const [text] = useAtom(textAtom);

  if (!open) return null;
  const filtered = nodeNames.filter((name) => name.includes(text));
  const height = filtered.length * optionHeight;
  const rect = {
    ...posWhenOpen,
    width,
    height,
  };
  return (
    <>
      <rect {...rect} fill="white" stroke="black"></rect>
      {filtered.map((name, i) => {
        return (
          <g
            transform={`translate(${rect.x} ${rect.y + optionHeight * i})`}
            key={name}
          >
            <NodeMenuList name={name} onClick={() => setOpen(false)} />
          </g>
        );
      })}
      <foreignObject {...rect} y={rect.y - 30} height={30}>
        <SearchInput />
      </foreignObject>
    </>
  );
}

const textAtom = atom("");
function SearchInput() {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current !== null) ref.current.focus();
    return () => {
      setText("");
    };
  }, []);

  const [text, setText] = useAtom(textAtom);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  return <input ref={ref} type="text" value={text} onChange={onChange} />;
}

export default NodeMenu;
