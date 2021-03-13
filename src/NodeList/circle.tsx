import { atom } from "jotai";
import { useAtomValue } from "jotai/utils";

const option = {
  name: "circle",
  init: () => {
    const x = atom(atom(0));
    const y = atom(atom(0));
    const r = atom(atom(10));
    const inputAtoms = [x, y, r];

    const outputAtoms = [
      atom((get) => {
        const xAtom = get(x);
        const yAtom = get(y);
        const rAtom = get(r);
        return (props: JSX.IntrinsicElements["circle"]) => {
          const cx = useAtomValue(xAtom);
          const cy = useAtomValue(yAtom);
          const r = useAtomValue(rAtom);
          return (
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="transparent"
              stroke="blue"
              {...props}
            />
          );
        };
      }),
    ];
    const variable = { inputAtoms, outputAtoms };
    return { variable };
  },
};

export default option;
