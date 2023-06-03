// App.js
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import Register from './pages/Register/Register';
import ProductDetail from './pages/productDetail/ProductDetail';
import { products } from "./data/Data"

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <div className="grow p-4">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} />} />
          </Routes>
        </div>
        <Footer className="mt-auto" />
      </BrowserRouter>
    </div>
  );
}
