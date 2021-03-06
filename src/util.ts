import type { Atom, PrimitiveAtom } from "jotai";

export const isPrimitive = <T>(a: Atom<T>): a is PrimitiveAtom<T> => {
  return a.hasOwnProperty("write");
};

const inputEl = document.createElement("textarea");
export function copyToClipboard(text: string) {
  document.body.appendChild(inputEl);
  inputEl.value = text;

  /* Select the text field */
  inputEl.select();
  inputEl.setSelectionRange(0, 99999); /* For mobile devices */

  try {
    document.execCommand("copy");
  } catch (err) {
    console.log("Oops, unable to copy");
  }

  document.body.removeChild(inputEl);
}
