import { useAtom } from "jotai";
import { connectionAtom } from "./atoms";
import ConnectionLine from "./ConnectionLine";

const RenderConnectionLines: React.FC = () => {
  const [connections] = useAtom(connectionAtom);

  return (
    <>
      {connections.map((c) => {
        return <ConnectionLine key={c.to.atom.toString()} connection={c} />;
      })}
    </>
  );
};

export default RenderConnectionLines;
