import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";
import ProductModal from "./ProductModal";
import { withStock } from "./data";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(withStock(data.slice(0, 20))));
  }, []);

 
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchText);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText]);

  
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);

      if (found) {
        if (found.qty < product.stock) {
          return prev.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return prev;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };


  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  };

  
  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="app">
      <h2>Mini E-Commerce</h2>

      
      <input
        placeholder="Search products"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men</option>
        <option value="women's clothing">Women</option>
      </select>

      
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort by price</option>
        <option value="low">Low → High</option>
        <option value="high">High → Low</option>
      </select>

      <ProductList
        products={products}
        search={search}
        category={category}
        sort={sort}
        addToCart={addToCart}
        openModal={setSelectedProduct}
      />

      
      <Cart cart={cart} updateQty={updateQty} removeItem={removeItem} />

      
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        addToCart={addToCart}
      />
    </div>
  );
}
