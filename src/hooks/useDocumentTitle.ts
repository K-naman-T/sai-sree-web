import { useEffect } from "react";

/** Sets `document.title` to `<title> | Alankaraaa`. */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = `${title} | Alankaraaa`;
  }, [title]);
}
