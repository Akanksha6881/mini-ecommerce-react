export default function ProductModal({ product, onClose, addToCart }) {
  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>

        <img src={product.image} alt={product.title} className="modal-img" />

        <h3>{product.title}</h3>
        <p>₹{product.price}</p>
        <p>{product.category}</p>
        <p>{product.description}</p>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
