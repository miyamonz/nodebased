import type { Atom } from "jotai";
import type { NodeComponent } from "../Node";
import type { Stream } from "../Stream";

export type CreateNodeProps<T = unknown> = {
  stream: Stream;
  component?: NodeComponent;
  toSave?: Atom<unknown>;
} & (unknown extends T ? {} : { toSave: Atom<T> });

export type ValueType =
  | "number"
  | "boolean"
  | "Position"
  | "Json"
  | "ReactElement"
  | "any";

export type IOType = {
  type: ValueType;
  name?: string;
};
export type NodeDefinition<T = unknown> = {
  name: string;
  inputs?: readonly IOType[] | ((data: T) => readonly IOType[]);
  outputs?: readonly IOType[] | ((data: T) => readonly IOType[]);

  init: (args: unknown extends T ? {} : { data: T }) => CreateNodeProps<T>;
} & (unknown extends T
  ? {}
  : {
      save: T;
    });
