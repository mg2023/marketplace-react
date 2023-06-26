import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import ProductDetail from "./pages/productDetail/ProductDetail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./pages/contact/Contact";
import Team from "./pages/team/Team";
import DashBoard from "./pages/dashBoard/DashBoardV2";
import Context from "./context/Context";
import AuthProvider from "./middleware/AuthProvider";
import Category from "./pages/Category/Category";
import Catalogo from "./pages/Catalogo/Catalogo";
//import PrivatedRoute from "./middleware/PrivatedRoute";

export default function App() {
  useEffect(() => {
    fetch("https://market-express-git-main-mg2024.vercel.app/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Suponiendo que los datos de la API son un array de productos
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    toast.success("Producto agregado al carrito");
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
    toast.error("Producto eliminado del carrito");
  };

  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  return (
    <div className="flex min-h-screen flex-col bg-bgback text-text">
      <Context.Provider
        value={{
          cartItems,
          setCartItems,
          addToCart,
          removeFromCart,
          products,
        }}
      >
        <ToastContainer />

        <BrowserRouter>
          <AuthProvider>
            <Header cartItemCount={cartItems.length} />
            <div className="grow">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                      products={products}
                    />
                  }
                />
                <Route
                  path="/dashboard"
                  element={<DashBoard />}
                />
                <Route
                  path="/catalogo"
                  element={<Catalogo />}
                />
                <Route
                  path="/login"
                  element={<Login />}
                />
                <Route
                  path="/team"
                  element={<Team />}
                />
                <Route
                  path="/register"
                  element={<Register />}
                />
                <Route
                  path="/support"
                  element={<Contact />}
                />
                <Route
                  path="/product/:id"
                  element={<ProductDetail products={products} />}
                />
                <Route
                  path="/category/:category"
                  element={<Category products={products} />}
                />
                <Route
                  path="/cart"
                  element={<Cart />}
                />
              </Routes>
            </div>
            <Footer className="mt-auto" />
          </AuthProvider>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}
