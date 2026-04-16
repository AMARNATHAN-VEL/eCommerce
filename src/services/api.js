// src/services/api.js
// Custom API service for eCommerce app using JSON-server (db.json)
// Base URL: http://localhost:3000 (run: json-server --watch db.json --port 3000)

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://json-server-api-1-labd.onrender.com";

async function apiCall(method, endpoint, body = null, userId = null) {
  const url = userId
    ? `${API_BASE_URL}${endpoint.replace(":userId", userId)}`
    : `${API_BASE_URL}${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return { success: true, data: await response.json() };
  } catch (error) {
    console.error("API Call Error:", error);
    return { success: false, error: error.message };
  }
}

// ========== PRODUCT APIs ==========
export async function getAllProducts() {
  return apiCall("GET", "/products");
}

export async function getProductById(id) {
  return apiCall("GET", `/products/${id}`);
}

export async function searchProducts(query) {
  return apiCall("GET", `/products?q=${encodeURIComponent(query)}`);
}

export async function getProductsByCategory(category) {
  return apiCall("GET", `/products?category=${encodeURIComponent(category)}`);
}

export async function getFeaturedProducts(limit = 8) {
  return apiCall("GET", `/products?_limit=${limit}&_sort=price&_order=desc`);
}

// ========== CART APIs (user-specific) ==========
export async function getCart(userId) {
  const response = await apiCall("GET", `/users/${userId}`);
  if (!response.success) {
    return response;
  }
  return { success: true, data: response.data?.cart || [] };
}

export async function addToCart(userId, item) {
  const userResponse = await apiCall("GET", `/users/${userId}`);
  if (!userResponse.success) {
    return { success: false, error: "Failed to fetch cart" };
  }

  const user = userResponse.data;
  const currentCart = Array.isArray(user.cart) ? user.cart : [];
  const existingIndex = currentCart.findIndex(
    (cartItem) => cartItem.id === item.id,
  );

  let updatedCart;
  if (existingIndex > -1) {
    // Update quantity if item exists
    updatedCart = [...currentCart];
    updatedCart[existingIndex] = {
      ...updatedCart[existingIndex],
      quantity: updatedCart[existingIndex].quantity + (item.quantity || 1),
    };
  } else {
    // Add new item
    updatedCart = [
      ...currentCart,
      { ...item, id: item.id, quantity: item.quantity || 1 },
    ];
  }

  return apiCall("PATCH", `/users/${userId}`, { cart: updatedCart });
}

export async function updateCartItem(userId, itemId, quantity) {
  const userResponse = await apiCall("GET", `/users/${userId}`);
  if (!userResponse.success) {
    return { success: false, error: "Failed to fetch cart" };
  }

  const user = userResponse.data;
  const currentCart = Array.isArray(user.cart) ? user.cart : [];
  const updatedCart = currentCart.map((item) =>
    item.id == itemId ? { ...item, quantity } : item,
  );
  return apiCall("PATCH", `/users/${userId}`, { cart: updatedCart });
}

export async function removeFromCart(userId, itemId) {
  const userResponse = await apiCall("GET", `/users/${userId}`);
  if (!userResponse.success) {
    return { success: false, error: "Failed to fetch cart" };
  }

  const user = userResponse.data;
  const currentCart = Array.isArray(user.cart) ? user.cart : [];
  const updatedCart = currentCart.filter((item) => item.id != itemId);
  return apiCall("PATCH", `/users/${userId}`, { cart: updatedCart });
}

export async function clearCart(userId) {
  return apiCall("PATCH", `/users/${userId}`, { cart: [] });
}

// ========== ORDER APIs ==========
export async function getOrders(userId) {
  const response = await apiCall("GET", `/users/${userId}`);
  if (!response.success) {
    return response;
  }
  return { success: true, data: response.data?.orders || [] };
}

export async function createOrder(userId, orderData) {
  const userResponse = await apiCall("GET", `/users/${userId}`);
  if (!userResponse.success) {
    return { success: false, error: "Failed to fetch orders" };
  }

  const user = userResponse.data;
  const currentOrders = Array.isArray(user.orders) ? user.orders : [];
  const newOrder = {
    orderId: Date.now(),
    date: new Date().toISOString().split("T")[0],
    status: "Processing",
    ...orderData,
  };
  const updatedOrders = [...currentOrders, newOrder];
  return apiCall("PATCH", `/users/${userId}`, { orders: updatedOrders });
}

// ========== AUTH APIs ==========
export async function login(email, password) {
  // Search users by exact email using JSON Server query params
  const {
    success,
    data: users,
    error,
  } = await apiCall("GET", "/users?email=" + encodeURIComponent(email));

  if (!success) {
    return { success: false, error: error || "Login failed" };
  }

  const user = Array.isArray(users) ? users[0] : null;
  if (user && user.password === password) {
    return {
      success: true,
      data: { userId: user.id, name: user.name, email: user.email },
    };
  }

  return { success: false, error: "Invalid credentials" };
}

export async function register(userData) {
  // Prevent duplicate registration by email
  const {
    success,
    data: existingUsers,
    error,
  } = await apiCall(
    "GET",
    "/users?email=" + encodeURIComponent(userData.email),
  );

  if (!success) {
    return { success: false, error: error || "Registration failed" };
  }

  if (Array.isArray(existingUsers) && existingUsers.length > 0) {
    return { success: false, error: "Email already in use" };
  }

  return apiCall("POST", "/users", {
    ...userData,
    id: Date.now().toString(),
    cart: [],
    orders: [],
  });
}

export async function getCurrentUser(userId) {
  return apiCall("GET", `/users/${userId}`);
}

// Export all for easy import
export default {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  getFeaturedProducts,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getOrders,
  createOrder,
  login,
  register,
  getCurrentUser,
};
