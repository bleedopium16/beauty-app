import { useRef, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import BestSellers from "./components/BestSellers";
import Categories from "./components/Categories";
import Featured from "./components/Featured";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Testimonials from "./components/Testimonials";
import Skincare from "./pages/Skincare";
import Makeup from "./pages/Makeup";
import Haircare from "./pages/Haircare";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import SearchResults from "./pages/SearchResults";
import Wishlist from "./pages/Wishlist";
import Intro from "./components/Intro";

import { useAuth } from "./context/AuthContext";
import { cartApi } from "./api";

function App() {
  const categoryRef = useRef(null);
  const location = useLocation();
  const { user } = useAuth();

  const [cart, setCart] = useState([]);

  const [showIntro, setShowIntro] = useState(
    () => !sessionStorage.getItem("veloure_intro_shown")
  );

  function finishIntro() {
    sessionStorage.setItem("veloure_intro_shown", "1");
    setShowIntro(false);
  }

  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    async function loadCart() {
      if (user) {
        try {
          setCart(await cartApi.get());
        } catch {
          setCart([]);
        }
      } else {
        setCart([]);
      }
    }
    loadCart();
  }, [user]);

  const addToCart = async (productId) => {
    if (!user) return false;
    const updated = await cartApi.add(productId, 1);
    setCart(updated);
    return true;
  };

  const decreaseQty = async (productId) => {
    const updated = await cartApi.decrease(productId);
    setCart(updated);
  };

  const removeFromCart = async (productId) => {
    const updated = await cartApi.remove(productId);
    setCart(updated);
  };

  return (
    <>
      {showIntro && <Intro onFinish={finishIntro} />}

      {!hideNavbar && <Navbar cart={cart} />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero
                scrollToCategory={() => {
                  categoryRef.current.scrollIntoView({ behavior: "smooth" });
                }}
              />
              <BestSellers addToCart={addToCart} />
              <Featured
                scrollToCategory={() => {
                  categoryRef.current.scrollIntoView({ behavior: "smooth" });
                }}
              />
              <Categories ref={categoryRef} />
              <Testimonials />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/skincare" element={<Skincare addToCart={addToCart} />} />
        <Route path="/makeup" element={<Makeup addToCart={addToCart} />} />
        <Route path="/haircare" element={<Haircare addToCart={addToCart} />} />
        <Route path="/search" element={<SearchResults addToCart={addToCart} />} />
        <Route path="/wishlist" element={<Wishlist addToCart={addToCart} />} />
        <Route path="/orders" element={<Orders />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              setCart={setCart}
              addToCart={addToCart}
              decreaseQty={decreaseQty}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;