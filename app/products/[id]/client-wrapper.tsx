"use client";

import ProductPageClient from "./ProductPageClient";

export default function ClientWrapper({ id }: { id: string }) {
  return <ProductPageClient id={id} />;
}
