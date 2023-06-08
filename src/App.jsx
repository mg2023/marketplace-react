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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CarritoContext from "./context/CarritoContext";
import Contact from './pages/contact/Contact';
import Team from './pages/team/Team';
import DashBoard from './pages/dashBoard/DashBoard';


export default function App() {
  
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    toast.success('Producto agregado al carrito');
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    toast.error('Producto eliminado del carrito');
  };
  
  const [cartItems, setCartItems] = useState([]);

  const sharedCarritoContextState = { cartItems, setCartItems, addToCart, removeFromCart };

 

  return (
    <div className="flex flex-col min-h-screen">
    <CarritoContext.Provider value={sharedCarritoContextState}>
      <ToastContainer />

      <BrowserRouter>
      <Header cartItemCount={cartItems.length} />
        <div className="grow">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} removeFromCart={removeFromCart} />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/team" element={<Team />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail products={products} />} />
            <Route
              path="/cart"
              element={<Cart />}
            />
          </Routes>
        </div>
        <Footer className="mt-auto" />
      </BrowserRouter>
         </CarritoContext.Provider>  
    </div>
  );
}
