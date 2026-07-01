import { useState, useEffect } from "react";
import "./Haircare.css";
import { productApi } from "../api";
import { useToast } from "../context/ToastContext";
import { ProductCard, ProductSkeleton } from "../components/ProductCard";

function Haircare({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function load() {
      try {
        setProducts(await productApi.getAll("haircare"));
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleAdd(productId) {
    const ok = await addToCart(productId);
    showToast(ok ? "Added to cart" : "Please log in to add items", ok ? "success" : "error");
  }

  return (
    <div className="page fade-in">
      <div className="haircare">
        <h1>Haircare Collection</h1>
        <div className="product-grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            : products.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
                onAdd={handleAdd}
                btnClass="btn-13"
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Haircare;