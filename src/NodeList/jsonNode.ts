import { atom } from "jotai";
import { createOneOutputVariable } from "../Variable";

const option = {
  name: "json",
  init: (args?: { data?: {} }) => {
    const jsonAtom = atom(args?.data ?? {});
    const variable = createOneOutputVariable(jsonAtom);
    return { variable, toSave: jsonAtom };
  },
};

export default option;
