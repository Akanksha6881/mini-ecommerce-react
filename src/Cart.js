export default function Cart({ cart, updateQty, removeItem }) {
  if (!cart.length) return <p>Cart is empty</p>;

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <div>
      <h3>Cart</h3>

      {cart.map((i) => (
        <div key={i.id}>
          {i.title}

          <input
            type="number"
            min="1"
            max={i.stock}
            value={i.qty}
            onChange={(e) =>
              updateQty(i.id, Number(e.target.value))
            }
          />

          <button onClick={() => removeItem(i.id)}>
            Remove
          </button>
        </div>
      ))}

      <h4>Total: ₹{total.toFixed(2)}</h4>
    </div>
  );
}
