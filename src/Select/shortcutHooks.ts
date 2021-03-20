import React from "react";

export const useShortcutCopy = (handler: (e: KeyboardEvent) => void) => {
  const listener = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "KeyC" && (e.ctrlKey || e.metaKey)) handler(e);
    },
    [handler]
  );
  React.useEffect(() => {
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [listener]);

  return;
};
