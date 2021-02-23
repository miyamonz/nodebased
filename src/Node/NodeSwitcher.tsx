import React from "react";

import type { NodeComponent } from "./types";

const NodeSwitcher: NodeComponent = ({ node }) => {
  return <>{node.component !== undefined && <node.component node={node} />}</>;
};

export default React.memo(NodeSwitcher);
