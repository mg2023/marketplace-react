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
import DashBoard from "./pages/dashBoard/DashBoard";
import Context from "./context/Context";

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

  const [usuario, setUsuario] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  return (
    <div className="flex min-h-screen flex-col">
      <Context.Provider
        value={{
          usuario,
          setUsuario,
          cartItems,
          setCartItems,
          addToCart,
          removeFromCart,
          products,
        }}
      >
        <ToastContainer />

        <BrowserRouter>
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
                path="/contact"
                element={<Contact />}
              />
              <Route
                path="/product/:id"
                element={<ProductDetail products={products} />}
              />
              <Route
                path="/cart"
                element={<Cart />}
              />
            </Routes>
          </div>
          <Footer className="mt-auto" />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}
