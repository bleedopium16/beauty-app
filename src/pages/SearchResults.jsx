import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { productApi } from "../api";
import { useToast } from "../context/ToastContext";
import { ProductCard, ProductSkeleton } from "../components/ProductCard";
import "./SearchResults.css";

function SearchResults({ addToCart }) {
    const [params] = useSearchParams();
    const query = params.get("q") || "";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                setProducts(await productApi.search(query));
            } catch {
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }
        if (query) load();
        else setLoading(false);
    }, [query]);

    async function handleAdd(productId) {
        const ok = await addToCart(productId);
        showToast(ok ? "Added to cart" : "Please log in to add items", ok ? "success" : "error");
    }

    return (
        <div className="page fade-in">
            <div className="search-results">
                <h1>
                    {query ? `Results for "${query}"` : "Search"}
                </h1>

                {loading ? (
                    <div className="product-grid">
                        {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
                    </div>
                ) : products.length === 0 ? (
                    <div className="search-empty">
                        <h2>No products found</h2>
                        <p>Try a different search term.</p>
                        <Link to="/" className="search-home-btn">Back to Home</Link>
                    </div>
                ) : (
                    <div className="product-grid">
                        {products.map((item) => (
                            <ProductCard key={item._id} product={item} onAdd={handleAdd} btnClass="btn-12" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResults;