import { atom, useAtom } from "jotai";
export const hovered = atom(false);

const CollisionArea = () => {
  const [, setHovered] = useAtom(hovered);

  return (
    <rect
      x={0}
      y={0}
      width={1000}
      height={1000}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      fill="transparent"
    />
  );
};

export default CollisionArea;
