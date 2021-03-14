import { atom } from "jotai";
import { mouseAtom } from "../SVGContext";
import { createOneOutputVariable } from "../Variable";

const option = {
  name: "mouse",
  init: () => {
    const variable = createOneOutputVariable(atom((get) => get(mouseAtom)));
    return { variable };
  },
};

export default option;
