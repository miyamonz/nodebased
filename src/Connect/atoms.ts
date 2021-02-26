import { atom, useAtom } from "jotai";
import type { OutputSocket } from "../Socket";

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
