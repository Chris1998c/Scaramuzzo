import ServicePageClient from "./[id]/ServicePageClient";

interface ServicePageProps {
  params: {
    id: string;
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  return <ServicePageClient id={params.id} />;
}
