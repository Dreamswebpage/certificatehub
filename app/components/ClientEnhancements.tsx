"use client";

import { useSyncExternalStore } from "react";
import CustomCursor from "./CustomCursor";

export default function ClientEnhancements() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return null;
  }

  return <CustomCursor />;
}
