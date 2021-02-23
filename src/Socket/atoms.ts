import { atom, useAtom } from "jotai";
import type { InputSocket, OutputSocket } from "./types";

// output
export const connectTargetAtom = atom<OutputSocket<unknown> | null>(null);
export function useConnectTarget() {
  const [connectTarget] = useAtom(connectTargetAtom);
  return connectTarget;
}
export function useSetConnectFrom() {
  const [, setConnectTarget] = useAtom(connectTargetAtom);
  return setConnectTarget;
}

// input
export const hoveredInputSocketAtom = atom<InputSocket<unknown> | null>(null);
export function useHoveredInputSocket() {
  return useAtom(hoveredInputSocketAtom);
}
