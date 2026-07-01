import "./Cart.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { orderApi } from "../api";

function Cart({ cart, removeFromCart, setCart, addToCart, decreaseQty }) {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [error, setError] = useState("");

    const total = cart.reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.qty,
        0
    );

    async function handlePlaceOrder() {
        setError("");
        try {
            await orderApi.place();
            setOrderPlaced(true);
            setCart([]);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="cart">
            {cart.length > 0 && <h1>Your Cart</h1>}

            {cart.length === 0 ? (
                <div className="cart-empty">
                    <div className="cart-empty-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <path d="M3 6h18" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </div>
                    <h2>Your cart is empty</h2>
                    <p className="cart-empty-text">
                        Looks like you haven't added anything yet.
                    </p>
                    <Link to="/" className="cart-home-btn">
                        Back to Home
                    </Link>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div className="cart-card" key={item.product._id}>
                                <img src={item.product.image} alt={item.product.name} />
                                <h3>{item.product.name}</h3>
                                <p>₹{item.product.price}</p>

                                <div className="qty-controls">
                                    <button onClick={() => decreaseQty(item.product._id)}>−</button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => addToCart(item.product._id)}>+</button>
                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.product._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <h2 className="cart-total">Total: ₹{total}</h2>

                    {error && <p className="cart-error">{error}</p>}

                    <button className="order-btn" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </>
            )}

            {orderPlaced && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>🎉 Order Placed!</h2>
                        <p>Your order has been successfully placed.</p>
                        <Link to="/orders" className="popup-link">View your orders</Link>
                        <button onClick={() => setOrderPlaced(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;