import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { orderApi } from "../api";
import "./Orders.css";

function Orders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                const data = await orderApi.history();
                setOrders(data);
            } catch {
                setOrders([]);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [user]);

    function formatDate(iso) {
        return new Date(iso).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }

    if (!loading && !user) {
        return (
            <div className="orders-page">
                <div className="orders-empty">
                    <h2>Please log in to view your orders</h2>
                    <Link to="/login" className="orders-link-btn">Log In</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <h1>Your Orders</h1>

            {loading ? (
                <p className="orders-loading">Loading your orders...</p>
            ) : orders.length === 0 ? (
                <div className="orders-empty">
                    <h2>No orders yet</h2>
                    <p>Looks like you haven't placed an order. Time to treat yourself.</p>
                    <Link to="/" className="orders-link-btn">Start Shopping</Link>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div className="order-card" key={order._id}>
                            <div className="order-head">
                                <div>
                                    <span className="order-label">Order placed</span>
                                    <span className="order-date">{formatDate(order.createdAt)}</span>
                                </div>
                                <span className={`order-status status-${order.status}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="order-items">
                                {order.items.map((item, i) => (
                                    <div className="order-item" key={i}>
                                        <span className="order-item-name">{item.name}</span>
                                        <span className="order-item-qty">x{item.qty}</span>
                                        <span className="order-item-price">₹{item.price * item.qty}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="order-foot">
                                <span>Total</span>
                                <span className="order-total">₹{order.total}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Orders;