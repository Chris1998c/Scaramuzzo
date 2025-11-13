import ProductPageClient from "./ProductPageClient";

export type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  return <ProductPageClient id={params.id} />;
}
