export default function ProductCard({ product, addToCart, openModal }) {
  return (
    <div className="card">
      <img
        src={product.image}
        alt={product.title}
        className="product-img"
        onClick={() => openModal(product)}
      />

      <h4>{product.title}</h4>
      <p>₹{product.price}</p>
      <p>{product.category}</p>
      <p>{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>

      <button
        disabled={product.stock === 0}
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
