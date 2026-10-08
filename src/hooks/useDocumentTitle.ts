import { useEffect } from "react";

/** Sets `document.title` to `<title> | Sai Sree Enterprise`. */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = `${title} | Sai Sree Enterprise`;
  }, [title]);
}
