import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { ProductCard } from "../components/ProductCard";
import "./Wishlist.css";

function Wishlist({ addToCart }) {
    const { user } = useAuth();
    const { wishlist } = useWishlist();
    const { showToast } = useToast();

    async function handleAdd(productId) {
        const ok = await addToCart(productId);
        showToast(ok ? "Added to cart" : "Please log in to add items", ok ? "success" : "error");
    }

    if (!user) {
        return (
            <div className="page fade-in">
                <div className="wishlist-empty">
                    <h2>Please log in to view your wishlist</h2>
                    <Link to="/login" className="wishlist-btn">Log In</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page fade-in">
            <div className="wishlist">
                <h1>Your Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div className="wishlist-empty">
                        <p className="wishlist-icon">♡</p>
                        <h2>Your wishlist is empty</h2>
                        <p className="wishlist-sub">Tap the heart on any product to save it here.</p>
                        <Link to="/" className="wishlist-btn">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="product-grid">
                        {wishlist.map((item) => (
                            <ProductCard key={item._id} product={item} onAdd={handleAdd} btnClass="btn-12" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Wishlist;    