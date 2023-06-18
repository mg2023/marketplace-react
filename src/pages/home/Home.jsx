import Grid from "../../components/Grid/Grid";
import Slider from "../../components/Slider/Slider";
import PropTypes from "prop-types";
import "./Home.css";
import { imageUrls, imageAds } from "../../data/Data";

export default function Home({ addToCart, removeFromCart, products }) {
  // Filtrar los nuevos productos
  const nuevosProductos = products.filter((product) => product.is_new);

  // Filtrar los nuevos productos
  const destacados = products.filter((product) => product.is_special_offer);

  return (
    <div>
      <Slider urls={imageUrls} />

      <h3 className="mb-6 mt-10 text-center text-4xl uppercase">Destacados</h3>
      <Grid
        products={destacados}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        showFilter={false}
      />
      <Slider urls={imageAds} />
      <h3 className="mt-16 text-center text-4xl uppercase">Nuevos Productos</h3>
      <Grid
        products={nuevosProductos}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        showFilter={false}
      />
      <h3 className="mb-6 mt-10 text-center text-2xl uppercase">Buscar:</h3>
      <Grid
        products={products}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        showFilter={true}
      />
    </div>
  );
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired, // Agrega la prop `products` al tipo de PropTypes
};
