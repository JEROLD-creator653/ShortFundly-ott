"use client";

import { useEffect } from "react";

export function FilterCloser() {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const detailsElements = document.querySelectorAll("details[open]");
      detailsElements.forEach((details) => {
        if (!details.contains(event.target as Node)) {
          details.removeAttribute("open");
        }
      });
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return null;
}
