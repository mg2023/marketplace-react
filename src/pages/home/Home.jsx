import { NavLink } from "react-router-dom";
import Grid from "../../components/Grid/Grid";
import PropTypes from "prop-types";
import "./Home.css";
import CategoryGrid from "../../components/Home/CategoryGrid/CategoryGrid";
import Hero from "../../components/Home/Hero/Hero";

export default function Home({ addToCart, removeFromCart, products }) {
  // Filtrar los nuevos productos
  //const nuevosProductos = products.filter((product) => product.is_new);

  // Filtrar los nuevos productos
  const destacados = products.filter((product) => product.is_special_offer);

  return (
    <div>
      <Hero />
      <CategoryGrid />
      <div className="py-12 text-center uppercase">
        <h1 className="text-3xl font-extrabold text-text sm:text-5xl">
          Destacados
          <strong className="mt-2 block font-extrabold text-primary">
            Del Mes
          </strong>
        </h1>
      </div>
      <Grid
        products={destacados}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        showFilter={false}
        maxResults={6}
      />
      <div className="py-12 text-center uppercase">
        <h1 className="text-2xl font-extrabold text-text sm:text-5xl">
          ¿Buscas una nueva Aventura?
          <strong className="mt-2 block font-extrabold text-primary">
            Encuentra los mejores juegos de PS4
          </strong>
        </h1>
      </div>
      <Grid
        products={products}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        showFilter={true}
        maxResults={12}
      />
      <div className="mb-12 flex justify-center">
        <NavLink
          to="/catalogo"
          className="m-12 rounded-md bg-primary px-24 py-8 text-xs font-semibold uppercase text-primaryText shadow hover:bg-primaryHover md:text-xl"
        >
          Ver Todos
        </NavLink>
      </div>
    </div>
  );
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired, // Agrega la prop `products` al tipo de PropTypes
};
