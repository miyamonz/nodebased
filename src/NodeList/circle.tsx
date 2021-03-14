import { atom } from "jotai";
import { useAtomValue } from "jotai/utils";
import type { Variable } from "../Variable";

const option = {
  name: "circle",
  init: () => {
    const x = atom(atom(0));
    const y = atom(atom(0));
    const r = atom(atom(10));
    const inputAtoms = [x, y, r];

    const outAtom = atom((get) => {
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
    });
    const variable: Variable = {
      inputAtoms: atom(() => inputAtoms as any),
      outputAtoms: atom(() => [outAtom]),
    };
    return { variable };
  },
};

export default option;
