import { atom, useAtom } from "jotai";

const option = {
  name: "render",
  init: () => {
    const componentAtomRef = atom(atom(null));
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
