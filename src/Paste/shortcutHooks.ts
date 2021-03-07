import React from "react";

export const useShortcutPaste = (handler: (e: KeyboardEvent) => void) => {
  const listener = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "KeyV" && e.ctrlKey) handler(e);
    },
    [handler]
  );
  React.useEffect(() => {
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [listener]);

  return;
};
