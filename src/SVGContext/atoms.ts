import { atom, useAtom } from "jotai";

export const mouseAtom = atom({ x: 0, y: 0 });
export const useSetMousePosition = () => {
  const [, set] = useAtom(mouseAtom);

  return set;
};

export const useMousePosition = () => {
  const [pos] = useAtom(mouseAtom);

  return pos;
};
