import { atom } from "jotai";
import { createVariable } from "../Variable";
import { RenderButtonNode } from "./components";

const option = {
  name: "button",
  init: () => {
    const input = atom(atom(false));
    const buttonAtom = atom(false);
    const variable = createVariable(atom([input]) as any, (input_) => {
      return atom((get) => {
        const [in_] = get(input_);
        return Boolean(in_ || get(buttonAtom));
      });
    });
    return {
      component: RenderButtonNode,
      variable,
      state: atom(
        (get) => get(variable.outputAtoms[0]),
        (_get, set, arg: boolean) => set(buttonAtom, arg)
      ),
    };
  },
};
export default option;
