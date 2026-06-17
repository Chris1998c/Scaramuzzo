"use client";

import { useEffect } from "react";
import { captureAttributionFromUrl } from "@/lib/tracking";

export default function AttributionBootstrap() {
  useEffect(() => {
    captureAttributionFromUrl();
  }, []);

  return null;
}
