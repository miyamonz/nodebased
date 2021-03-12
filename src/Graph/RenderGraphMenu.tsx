import { useCurrentIsRoot, useSetRootGraph } from "./atoms";
const RenderGraphMenu = (props: JSX.IntrinsicElements["g"]) => {
  const isRoot = useCurrentIsRoot();
  const setRoot = useSetRootGraph();
  return <g {...props}>{isRoot || <text onMouseUp={setRoot}>back</text>}</g>;
};
export default RenderGraphMenu;
