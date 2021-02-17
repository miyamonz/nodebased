import React from "react";
import { useAtom } from "jotai";
import { nodeAtomListAtom } from "./atoms";
import RenderNode from "./RenderNode";

const RenderAllNode: React.FC = () => {
  const [nodeAtomList] = useAtom(nodeAtomListAtom);

  return (
    <>
      {nodeAtomList.map((atom) => {
        return <RenderNode key={atom.toString()} atom={atom} />;
      })}
    </>
  );
};

export default React.memo(RenderAllNode);
