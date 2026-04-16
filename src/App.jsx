import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import LoginSignup from "./pages/LoginSignup.jsx";
import Orders from "./pages/Orders.jsx";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login-signup" element={<LoginSignup />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
