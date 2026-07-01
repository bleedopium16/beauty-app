import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar({ cart }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const popupRef = useRef(null);
    const burgerRef = useRef(null);

    const cartCount = Array.isArray(cart) ? cart.length : 0;

    function confirmLogout() {
        logout();
        setShowLogoutConfirm(false);
        setMenuOpen(false);
        navigate("/");
    }

    function handleSearch(e) {
        e.preventDefault();
        const q = search.trim();
        if (q) {
            navigate(`/search?q=${encodeURIComponent(q)}`);
            setSearch("");
        }
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                popupRef.current &&
                !popupRef.current.contains(e.target) &&
                burgerRef.current &&
                !burgerRef.current.contains(e.target)
            ) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="navbar">
            <h1 className="logo">Veloure</h1>

            <div className="nav-right">
                <form className="search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" aria-label="Search">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </button>
                </form>

                <div
                    className="menu"
                    ref={burgerRef}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {menuOpen && (
                <div className="menu-popup" ref={popupRef}>
                    {user && <p className="menu-greeting">Hi, {user.name}</p>}

                    <Link to="/cart" onClick={() => setMenuOpen(false)}>
                        <p>Cart ({cartCount})</p>
                    </Link>

                    <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                        <p>Wishlist</p>
                    </Link>

                    {user ? (
                        <>
                            <Link to="/orders" onClick={() => setMenuOpen(false)}>
                                <p>My Orders</p>
                            </Link>
                            <p
                                className="menu-action"
                                onClick={() => {
                                    setShowLogoutConfirm(true);
                                    setMenuOpen(false);
                                }}
                            >
                                Logout
                            </p>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setMenuOpen(false)}>
                                <p>Login</p>
                            </Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)}>
                                <p>Sign Up</p>
                            </Link>
                        </>
                    )}
                </div>
            )}

            {showLogoutConfirm && (
                <div className="logout-overlay">
                    <div className="logout-box">
                        <h3>Log out?</h3>
                        <p>Are you sure you want to log out?</p>
                        <div className="logout-actions">
                            <button
                                className="logout-cancel"
                                onClick={() => setShowLogoutConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button className="logout-confirm" onClick={confirmLogout}>
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;