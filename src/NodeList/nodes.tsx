import { atom } from "jotai";
import type { Atom } from "jotai";
import { SliderNode, RenderElementNode, RenderButtonNode } from "./components";
import { NodeComponent } from "../Node";
import type { CreateNodeProps } from "../actions";
import { transformAtom } from "../SVGContext";

// variables
import { defaultNodeSizeVariable } from "../Node";
import { socketRadiusVariable } from "../Socket";
import { createVariable, Variable } from "../Variable";

import { createVariableFromFn } from "./funcs";

type OptionBase = {
  name: string;
  component?: NodeComponent;
};
type OptionFn = OptionBase & {
  fn: (...args: any[]) => unknown;
};

type Position = { x: number; y: number };

const fnNodes: OptionFn[] = [
  { name: "slider", fn: (x) => x, component: SliderNode },
  { name: "add", fn: (a, b) => a + b },
  { name: "sub", fn: (a, b) => a - b },
  { name: "mul", fn: (a, b) => a * b },
  { name: "div", fn: (a, b) => a / b },
  { name: "minus", fn: (a) => -a },
  { name: "sin", fn: (a) => Math.sin(a) },
  { name: "cos", fn: (a) => Math.cos(a) },
  { name: "clamp", fn: (a, min, max) => Math.max(min, Math.min(max, a)) },
  {
    name: "square",
    fn: (x, y, r) => <rect x={x} y={y} width={r} height={r} fill="blue" />,
  },
  { name: "render", fn: (_) => {}, component: RenderElementNode },
  {
    name: "console.log",
    fn: (_) => {
      console.log(_);
    },
  },
];

type Option = {
  name: string;
  init: () => Omit<CreateNodeProps, "position" | "name">;
};
const converted = fnNodes.map((option) => {
  const { name, fn, ...rest } = option;
  return {
    name,
    init: () => {
      const variable = createVariableFromFn(fn) as Variable<unknown[], unknown>;
      return {
        variable,
        ...rest,
      };
    },
  };
});

const _nodeOptions = [
  ...converted,
  {
    name: "nodeSize",
    init: () => ({
      variable: defaultNodeSizeVariable as Variable<unknown[], unknown>,
    }),
  },
  {
    name: "socketRadius",
    init: () => ({
      variable: socketRadiusVariable as Variable<unknown[], unknown>,
    }),
  },
  {
    name: "elapsed",
    init: () => {
      const variable = createVariable(atom([]), () => {
        const oscAtom = atom(0);
        oscAtom.onMount = (set) => {
          const id = setInterval(() => set((prev) => prev + 1));
          return () => clearInterval(id);
        };
        return oscAtom;
      });
      return {
        variable,
      };
    },
  },
  {
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
  },
  {
    name: "if",
    init: () => {
      const variable = createVariableFromFn((cond, a, b) =>
        cond ? a : b
      ) as Variable<unknown[], unknown>;
      return {
        variable,
      };
    },
  },
  {
    name: "circle",
    init: () => {
      const x = atom(atom(0));
      const y = atom(atom(0));
      const r = atom(atom(0));
      const inputsAtom = atom([x, y, r]);
      const isDownAtom = atom(false);
      let setter: any;
      isDownAtom.onMount = (set) => {
        setter = set;
      };
      const eventAtom = atom<React.MouseEvent<SVGElement>>(null!);
      let eventSetter: any;
      eventAtom.onMount = (set) => {
        eventSetter = set;
      };
      const mouseAtom = atom((get) => {
        const transform = get(transformAtom);
        const e = get(eventAtom);
        if (e !== null) return transform(e);
        return { x: 0, y: 0 };
      });

      const outputAtoms = [
        atom((get) => {
          const get_ = <T,>(a: Atom<Atom<T>>) => get(get(a));
          return (
            <circle
              cx={get_(x)}
              cy={get_(y)}
              r={get_(r)}
              onMouseDown={(e) => {
                eventSetter(e);
                setter(true);
              }}
              onMouseUp={(e) => {
                eventSetter(e);
                setter(false);
              }}
              onMouseMove={(e) => {
                eventSetter(e);
              }}
              fill="blue"
            />
          );
        }),
        isDownAtom,
        eventAtom,
        mouseAtom,
      ];
      const variable = { inputsAtom, outputAtoms } as any;
      return { variable };
    },
  },
  {
    name: "unpack",
    init: () => {
      const pos = atom(atom({ x: 0, y: 0 }));
      const inputsAtom = atom([pos]);
      const outputAtoms = [
        atom((get) => get(get(pos)).x),
        atom((get) => get(get(pos)).y),
      ];
      const variable = { inputsAtom, outputAtoms } as any;
      return { variable };
    },
  },
];
export const nodeOptions: Option[] = _nodeOptions.map((option) => ({
  name: option.name,
  init: () => ({ component: () => null, ...option.init() }),
}));
