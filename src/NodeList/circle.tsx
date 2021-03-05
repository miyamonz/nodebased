import { atom, useAtom } from "jotai";

const option = {
  name: "circle",
  init: () => {
    const x = atom(atom(0));
    const y = atom(atom(0));
    const r = atom(atom(0));
    const inputAtoms = [x, y, r];
    const isDownAtom = atom(false);
    let setter: any;
    isDownAtom.onMount = (set) => {
      setter = set;
    };

    const outputAtoms = [
      atom(() => {
        return ({
          onMouseDown,
          onMouseUp,
          onMouseMove,
        }: JSX.IntrinsicElements["circle"]) => {
          const [_x] = useAtom(x);
          const [cx] = useAtom(_x);
          const [_y] = useAtom(y);
          const [cy] = useAtom(_y);
          const [r_] = useAtom(r);
          const [_r] = useAtom(r_);
          return (
            <circle
              cx={cx}
              cy={cy}
              r={_r}
              onMouseDown={(e) => {
                onMouseDown?.(e);
                setter(true);
              }}
              onMouseUp={(e) => {
                onMouseUp?.(e);
                setter(false);
              }}
              onMouseMove={(e) => {
                onMouseMove?.(e);
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
