import { useState, useEffect } from "react";
import "./Skincare.css";
import { productApi } from "../api";
import { useToast } from "../context/ToastContext";
import { ProductCard, ProductSkeleton } from "../components/ProductCard";

function Skincare({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function load() {
      try {
        setProducts(await productApi.getAll("skincare"));
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
      <div className="skincare">
        <h1>Skincare Collection</h1>
        <div className="product-grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            : products.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
                onAdd={handleAdd}
                btnClass="btn-11"
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Skincare;