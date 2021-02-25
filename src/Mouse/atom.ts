import { atom, useAtom } from "jotai";

const dragDataAtom = atom<Event>({} as Event);

export type Event = React.MouseEvent<SVGSVGElement, MouseEvent> & {
  position: { x: number; y: number };
};
export const dragAtom = atom(
  (get) => get(dragDataAtom),
  (_get, set, e: Event) => {
    set(dragDataAtom, e);
  }
);

export const useDragAtom = () => {
  const [drag, setDrag] = useAtom(dragAtom);

  return [drag, setDrag] as const;
};
