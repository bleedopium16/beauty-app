import { useState, useEffect } from "react";
import "./BestSellers.css";
import { productApi } from "../api";
import { useToast } from "../context/ToastContext";

function BestSellers({ addToCart }) {
    const [products, setProducts] = useState([]);
    const { showToast } = useToast();

    useEffect(() => {
        async function load() {
            try {
                const data = await productApi.getBestsellers();
                setProducts(data);
            } catch {
                setProducts([]);
            }
        }
        load();
    }, []);

    async function handleAdd(productId) {
        const ok = await addToCart(productId);
        if (ok) {
            showToast("Added to cart");
        } else {
            showToast("Please log in to add items", "error");
        }
    }

    return (
        <section className="bestsellers">
            <h2>Our BestSellers</h2>

            <div className="products">
                {products.map((item) => (
                    <div key={item._id} className="card">
                        <img src={item.image} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p>₹{item.price}</p>
                        <button onClick={() => handleAdd(item._id)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BestSellers;