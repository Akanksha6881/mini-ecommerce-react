import { useMemo } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({
  products,
  search,
  category,
  sort,
  addToCart,
  openModal,
}) {
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, search, category, sort]);

  if (!filteredProducts.length) return <p>No products found</p>;

  return (
    <div className="grid">
      {filteredProducts.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          addToCart={addToCart}
          openModal={openModal}
        />
      ))}
    </div>
  );
}
