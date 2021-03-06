import React from "react";
import { atom, useAtom } from "jotai";
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

const width = 200;
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

    const props = {
      name: option.name,
      position,
      ...option.init(),
    };
    appendNode(props);
  };

  return (
    <>
      <rect width={width} height={optionHeight} fill="white"></rect>
      <text y={optionHeight - 3}>{option.name}</text>
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
  useKeyDown("Space", () => setOpen((prev) => !prev));

  const [text] = useAtom(textAtom);

  if (!open) return null;
  const filtered = nodeOptions.filter((option) => option.name.includes(text));
  const height = filtered.length * optionHeight;
  const rect = {
    ...posWhenOpen,
    width,
    height,
  };
  return (
    <>
      <rect {...rect} fill="white" stroke="black"></rect>
      {filtered.map((option, i) => {
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
