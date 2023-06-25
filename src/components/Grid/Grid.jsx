import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Grid({ products, addToCart, showFilter, maxResults }) {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(filter.toLowerCase())
  );

  const displayedProducts = filteredProducts.slice(0, maxResults);

  return (
    <div>
      {showFilter && (
        <div className="flex justify-center">
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Buscar por Nombre"
            className="mb-6 w-[90%] rounded border border-gray-300 p-4 text-bgfront"
          />
        </div>
      )}

      <div
        className="mb-8 grid grid-cols-2 gap-4 p-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
        style={{ gridAutoFlow: "row" }}
      >
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="mx-auto max-w-4xl"
          >
            <div className="max-w- rounded-lg bg-white shadow-md">
              <Link to={`/product/${product.id}`}>
                <img
                  className="rounded-t-lg"
                  src={product.url_img}
                  alt={product.product_name}
                />
              </Link>
              <div className="px-5 pb-5 ">
                <div>
                  <span className="rounded bg-secondary px-2.5 py-1.5 text-xs font-semibold">
                    {product.category}
                  </span>
                </div>
                <Link to={`/product/${product.id}`}>
                  <h3 className="my-4 w-full px-1 text-xl font-semibold tracking-tight text-bgback">
                    {product.product_name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between">
                  <span className="text-md xs:text-md font-bold tracking-tight text-gray-900 sm:text-2xl md:text-2xl lg:text-3xl ">
                    ${product.price}
                  </span>
                </div>

                <div className="flex-col md:flex xl:flex">
                  <Link
                    to={`/product/${product.id}`}
                    className="m-1 mt-4 flex items-center rounded-lg bg-bgfront p-2 text-center text-sm font-medium text-white hover:bg-secondary focus:ring-4 focus:ring-secondary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-file-info mr-2"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path
                        stroke="none"
                        d="M0 0h24v24H0z"
                        fill="none"
                      />
                      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                      <path d="M11 14h1v4h1" />
                      <path d="M12 11h.01" />
                    </svg>
                    <span className="ml-2 text-center">Ver Detalle</span>
                  </Link>
                  <button
                    onClick={() => addToCart(product)}
                    className="m-1 flex items-center rounded-lg bg-bgfront p-2 text-center text-sm font-medium text-white hover:bg-secondary focus:ring-4 focus:ring-secondary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-shopping-cart-plus"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path
                        stroke="none"
                        d="M0 0h24v24H0z"
                        fill="none"
                      />
                      <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M17 17h-11v-14h-2" />
                      <path d="M6 5l6 .429m7.138 6.573l-.143 1h-13" />
                      <path d="M15 6h6m-3 -3v6" />
                    </svg>
                    <span className="ml-4 text-center">Añadir al Carrito</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Grid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url_img: PropTypes.string.isRequired,
      product_name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      descrip: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
  showFilter: PropTypes.bool.isRequired,
  maxResults: PropTypes.number.isRequired,
};
