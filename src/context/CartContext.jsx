import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import * as api from "../services/api.js";
import { useAuth } from "../hooks/useAuth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.id;

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Computed values
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [cartItems],
  );
  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0,
      ),
    [cartItems],
  );

  // Load cart when user changes
  useEffect(() => {
    const loadCart = async () => {
      if (!userId) {
        setCartItems([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const { success, data, error: apiError } = await api.getCart(userId);

        if (success && Array.isArray(data)) {
          setCartItems(data);
        } else {
          setError(apiError || "Failed to load cart");
          setCartItems([]);
        }
      } catch {
        setError("Failed to load cart");
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [userId]);

  const addItem = useCallback(
    async (product, quantity = 1) => {
      if (!userId) {
        setError("Must be logged in to add to cart");
        return { success: false, error: "Not logged in" };
      }

      try {
        setLoading(true);
        setError(null);

        // Prepare item format for API (matches addToCart expectation)
        const item = {
          ...product,
          quantity,
          // Ensure required fields (API adds id if needed)
        };

        const { success, error: apiError } = await api.addToCart(userId, item);

        if (success) {
          // Update local state optimistically or from response
          setCartItems((prev) => {
            const existingIndex = prev.findIndex(
              (cartItem) => cartItem.id === item.id,
            );
            if (existingIndex > -1) {
              // Update quantity if exists
              const updated = [...prev];
              updated[existingIndex] = {
                ...updated[existingIndex],
                quantity: updated[existingIndex].quantity + quantity,
              };
              return updated;
            }
            return [...prev, { ...item, quantity }];
          });
          return { success: true };
        } else {
          setError(apiError || "Failed to add item");
          return { success: false, error: apiError };
        }
      } catch (err) {
        setError("Failed to add item");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [userId],
  );

  const updateItemQuantity = useCallback(
    async (itemId, quantity) => {
      if (!userId || quantity < 1)
        return { success: false, error: "Invalid quantity" };

      try {
        setLoading(true);
        setError(null);

        const { success, error: apiError } = await api.updateCartItem(
          userId,
          itemId,
          quantity,
        );

        if (success) {
          setCartItems((prev) =>
            prev.map((item) =>
              item.id == itemId ? { ...item, quantity } : item,
            ),
          );
          return { success: true };
        } else {
          setError(apiError || "Failed to update cart");
          return { success: false, error: apiError };
        }
      } catch (err) {
        setError("Failed to update cart");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [userId],
  );

  const removeItem = useCallback(
    async (itemId) => {
      if (!userId) return { success: false, error: "Not logged in" };

      try {
        setLoading(true);
        setError(null);

        const { success, error: apiError } = await api.removeFromCart(
          userId,
          itemId,
        );

        if (success) {
          setCartItems((prev) => prev.filter((item) => item.id != itemId));
          return { success: true };
        } else {
          setError(apiError || "Failed to remove item");
          return { success: false, error: apiError };
        }
      } catch (err) {
        setError("Failed to remove item");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [userId],
  );

  const clearCart = useCallback(async () => {
    if (!userId) return { success: false, error: "Not logged in" };

    try {
      setLoading(true);
      setError(null);

      const { success, error: apiError } = await api.clearCart(userId);

      if (success) {
        setCartItems([]);
        return { success: true };
      } else {
        setError(apiError || "Failed to clear cart");
        return { success: false, error: apiError };
      }
    } catch (err) {
      setError("Failed to clear cart");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartTotal,
      loading,
      error,
      addItem,
      updateItemQuantity,
      removeItem,
      clearCart,
    }),
    [
      cartItems,
      cartCount,
      cartTotal,
      loading,
      error,
      addItem,
      updateItemQuantity,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
