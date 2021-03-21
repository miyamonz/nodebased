import type { GraphJSON } from "./types";

const uuid = () => Math.floor(Math.random() * 10 ** 12).toString();

export function replaceNodeIds(
  json: GraphJSON,
  replacer = (_: number) => uuid()
): GraphJSON {
  const idMap = Object.fromEntries(
    json.nodes.map((n, i) => [n.id, replacer(i)])
  );
  const nodes = json.nodes.map((n) => ({ ...n, id: idMap[n.id] }));

  return { nodes };
}
