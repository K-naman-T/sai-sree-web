import { useEffect } from "react";

/** Sets `document.title` to `<title> | Alankara`. */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = `${title} | Alankara`;
  }, [title]);
}
