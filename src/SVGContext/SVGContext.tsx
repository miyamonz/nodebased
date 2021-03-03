import React, { useContext } from "react";
import { useSVGMouse } from "./useSvgMouse";
import { useSetMousePosition } from "./atoms";
import { atom, useAtom } from "jotai";

type Event = React.MouseEvent<SVGSVGElement, MouseEvent>;
const eventContext = React.createContext<Event>(null!);
export function useMouseEvent() {
  return useContext(eventContext);
}

const transformContext = React.createContext<ReturnType<typeof useSVGMouse>>(
  null!
);
export function useTransform() {
  return useContext(transformContext);
}
export const transformAtom = atom<ReturnType<typeof useSVGMouse>>({} as any);

type Props = {} & JSX.IntrinsicElements["svg"];
export const SVGProvider: React.FC<Props> = ({ children, ...props }) => {
  const [event, setEvent] = React.useState<Event>(null!);
  const ref = React.useRef<SVGSVGElement>(null);
  const transform = useSVGMouse(ref.current as any);
  const [, setTransform] = useAtom(transformAtom);
  React.useEffect(() => {
    if (transform !== null) {
      setTransform(() => transform);
    }
  }, [transform]);

  const setPos = useSetMousePosition();
  React.useEffect(() => {
    if (transform !== null && event !== null) {
      const pos = transform(event);
      setPos({ x: pos.x, y: pos.y });
    }
  }, [setPos, event, transform]);

  return (
    <eventContext.Provider value={event}>
      <transformContext.Provider value={transform}>
        <svg
          ref={ref}
          onMouseDown={setEvent}
          onMouseMove={setEvent}
          onMouseUp={setEvent}
          {...props}
        >
          {children}
        </svg>
      </transformContext.Provider>
    </eventContext.Provider>
  );
};
