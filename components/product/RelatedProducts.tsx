import Image from "next/image";
import Link from "next/link";

interface RelatedProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

export default function RelatedProducts({
  products,
}: {
  products: RelatedProduct[];
}) {
  if (!products.length) return null;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <Link
          key={p.id}
          href={`/products/${p.id}`}
          className="group flex flex-col overflow-hidden rounded-3xl border border-border/40 bg-card/40 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
        >
          <div className="relative h-56 w-full">
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-base font-semibold">{p.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {p.description}
            </p>
            <span className="mt-3 text-lg font-semibold">
              € {p.price.toFixed(2)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
