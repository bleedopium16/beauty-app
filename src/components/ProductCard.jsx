import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import "./ProductCard.css";

export function ProductCard({ product, onAdd, btnClass = "" }) {
    const { isWishlisted, toggleWishlist } = useWishlist();
    const { showToast } = useToast();
    const [busy, setBusy] = useState(false);

    const wished = isWishlisted(product._id);

    async function handleHeart() {
        if (busy) return;
        setBusy(true);
        try {
            await toggleWishlist(product._id);
            showToast(wished ? "Removed from wishlist" : "Added to wishlist");
        } catch {
            showToast("Please log in to save items", "error");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="product-card">
            <div className="image-box">
                <img src={product.image} alt={product.name} />
                <button
                    className={`heart-btn ${wished ? "wished" : ""}`}
                    onClick={handleHeart}
                    aria-label="Toggle wishlist"
                >
                    {wished ? "♥" : "♡"}
                </button>
            </div>

            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button className={btnClass} onClick={() => onAdd(product._id)}>
                Add to cart
            </button>
        </div>
    );
}

export function ProductSkeleton() {
    return (
        <div className="product-card skeleton-card">
            <div className="skeleton skeleton-img" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line short" />
            <div className="skeleton skeleton-btn" />
        </div>
    );
}