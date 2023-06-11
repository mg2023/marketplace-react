import Grid from '../../components/Grid/Grid';
import Slider from '../../components/Slider/Slider';
import PropTypes from 'prop-types';
import './Home.css'
import { imageUrls, imageAds } from '../../data/Data';

export default function Home({ addToCart, removeFromCart, products }) {

  // Filtrar los nuevos productos
  const nuevosProductos = products.filter(product => product.is_new);

  // Filtrar los nuevos productos
  const destacados = products.filter(product => product.is_special_offer);

  return (
    <div>
      <Slider urls={imageUrls} />
      
      <h3 className="text-center text-4xl uppercase mt-10 mb-6">Destacados</h3>
      <Grid products={destacados} addToCart={addToCart} removeFromCart={removeFromCart} showFilter={false} />
      <Slider urls={imageAds} />
      <h3 className="text-center text-4xl uppercase mt-16">Nuevos Productos</h3>
      <Grid products={nuevosProductos} addToCart={addToCart} removeFromCart={removeFromCart} showFilter={false} />
      <h3 className="text-center text-2xl uppercase mt-10 mb-6">Buscar:</h3>
      <Grid products={products} addToCart={addToCart} removeFromCart={removeFromCart} showFilter={true} />
    </div>
  );
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired, // Agrega la prop `products` al tipo de PropTypes
};