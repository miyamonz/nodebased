import type { NodeComponent } from "../Node";
import type { Variable } from "../Variable";

export type CreateNodeProps = {
  variable: Variable;
  component: NodeComponent;
  saveData: boolean;
};
