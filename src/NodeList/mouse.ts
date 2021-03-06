import { atom } from "jotai";
import { mouseAtom } from "../SVGContext";

const option = {
  name: "mouse",
  init: () => {
    const inputAtoms = [] as any;
    const outputAtoms = [atom((get) => get(mouseAtom))];
    const variable = { inputAtoms, outputAtoms };
    return { variable };
  },
};

export default option;
