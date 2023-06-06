import Grid from '../../components/Grid/Grid';
import Slider from '../../components/Slider/Slider';
import { imageUrls, imageAds, products, destacados, nuevosProductos } from '../../data/Data';

export default function Home({ addToCart, removeFromCart }) {
  return (
    <>
      <Slider urls={imageUrls} />
      <h3 className="text-center text-2xl uppercase mt-10 mb-6">Buscar:</h3>
      <Grid products={products} addToCart={addToCart} removeFromCart={removeFromCart} showFilter={true} />
      <h3 className="text-center text-4xl uppercase">Destacados</h3>
      <Grid products={destacados} addToCart={addToCart} removeFromCart={removeFromCart} showFilter={false} />
      <Slider urls={imageAds} />
      <h3 className="text-center text-4xl uppercase mt-16">Nuevos Productos</h3>
      <Grid products={nuevosProductos} addToCart={addToCart} removeFromCart={removeFromCart} showFilter={false} />
    </>
  );
}
