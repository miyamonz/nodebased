import { atom, useAtom } from "jotai";
import type { Atom } from "jotai";

function useUseAtom<T>(a: Atom<Atom<T>>) {
  const [_a] = useAtom(a);
  const [_] = useAtom(_a);
  return _;
}
const option = {
  name: "rect",
  init: () => {
    const x = atom(atom(0));
    const y = atom(atom(0));
    const width = atom(atom(10));
    const height = atom(atom(10));
    const inputAtoms = [x, y, width, height];
    const isDownAtom = atom(false);
    let setter: any;
    isDownAtom.onMount = (set) => {
      setter = set;
    };

    const outputAtoms = [
      atom(() => {
        return ({ onMouseDown, onMouseUp, onMouseMove }) => {
          const cx = useUseAtom(x);
          const cy = useUseAtom(y);
          const _width = useUseAtom(width);
          const _height = useUseAtom(height);
          return (
            <rect
              x={cx}
              y={cy}
              width={_width}
              height={_height}
              onMouseDown={(e) => {
                onMouseDown(e);
                setter(true);
              }}
              onMouseUp={(e) => {
                onMouseUp(e);
                setter(false);
              }}
              onMouseMove={(e) => {
                onMouseMove(e);
              }}
              fill="blue"
            />
          );
        };
      }),
      isDownAtom,
    ];
    const variable = { inputAtoms, outputAtoms };
    return { variable };
  },
};

export default option;
