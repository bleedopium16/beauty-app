import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { wishlistApi } from "../api";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]); // array of product objects

    useEffect(() => {
        async function load() {
            if (user) {
                try {
                    setWishlist(await wishlistApi.get());
                } catch {
                    setWishlist([]);
                }
            } else {
                setWishlist([]);
            }
        }
        load();
    }, [user]);

    const toggleWishlist = useCallback(async (productId) => {
        const updated = await wishlistApi.toggle(productId);
        setWishlist(updated);
    }, []);

    const isWishlisted = useCallback(
        (productId) => wishlist.some((p) => p._id === productId),
        [wishlist]
    );

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}