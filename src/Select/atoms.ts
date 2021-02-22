import { atom, useAtom } from "jotai";

import type { SimpleMouseEvent } from "../Mouse";

type Pos = readonly [number, number];

export const dragAtomToSelect = atom((get, set, pos: SimpleMouseEvent) => {});
