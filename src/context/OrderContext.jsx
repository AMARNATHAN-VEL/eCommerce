import React, { createContext, useState, useEffect, useCallback } from "react";
import * as api from "../services/api.js";
import { useAuth } from "../hooks/useAuth";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.id;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load orders when user changes
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setOrders([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const { success, data, error: apiError } = await api.getOrders(userId);

        if (success && Array.isArray(data)) {
          setOrders(data);
        } else {
          setError(apiError || "Failed to load orders");
          setOrders([]);
        }
      } catch (err) {
        console.error("Fetch orders error:", err);
        setError("Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const placeOrder = useCallback(
    async (orderPayload) => {
      if (!userId) {
        return { success: false, error: "Not logged in" };
      }

      try {
        setLoading(true);
        setError(null);

        const {
          success,
          data,
          error: apiError,
        } = await api.createOrder(userId, orderPayload);

        if (success) {
          // Refresh orders after placing new order
          const { success: refreshSuccess, data: refreshedOrders } =
            await api.getOrders(userId);
          if (refreshSuccess && Array.isArray(refreshedOrders)) {
            setOrders(refreshedOrders);
          }
          return { success: true, data };
        } else {
          setError(apiError || "Failed to place order");
          return { success: false, error: apiError };
        }
      } catch (err) {
        console.error("Place order error:", err);
        setError("Failed to place order");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [userId],
  );

  const value = {
    orders,
    loading,
    error,
    placeOrder,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export default OrderContext;
