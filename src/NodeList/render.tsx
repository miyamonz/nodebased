import React from "react";
import { atom, useAtom } from "jotai";
import { createAtomRef } from "../AtomRef";

const option = {
  name: "render",
  init: () => {
    const componentAtomRef = createAtomRef(
      atom<React.ComponentType | null>(null)
    );
    const inputAtoms = [componentAtomRef];

    const Render = () => {
      const [componentAtom] = useAtom(componentAtomRef);
      const [Component] = useAtom(componentAtom);
      if (Component === null) return null;
      return <Component />;
    };
    const outputAtoms = [atom(() => undefined)];
    const variable = { inputAtoms, outputAtoms };
    return { variable, component: Render };
  },
};

export default option;
