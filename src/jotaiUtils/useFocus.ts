import { useMemo } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { focusAtom } from "jotai/optics";

function useFocus<S>(anAtom: PrimitiveAtom<S>, selector) {
  const focused = useMemo(() => focusAtom(anAtom, selector), [
    anAtom.toString(),
  ]);
  return useAtom(focused);
}
