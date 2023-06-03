import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.jsx'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <div className="grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer className="mt-auto" />
      </BrowserRouter>
    </div>
  );
}