import { useParams, NavLink } from "react-router-dom";
import { useContext } from "react";
import Context from "../../context/Context";
import PropTypes from "prop-types";

export default function ProductDetail({ products }) {
  const { addToCart } = useContext(Context);

  const { id } = useParams();

  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <section className="body-font overflow-hidden bg-white text-gray-700">
      <div className="container mx-auto px-5 py-24">
        <div className="mx-auto flex flex-wrap lg:w-4/5">
          <img
            alt="ecommerce"
            className="max-h-72 w-full rounded border border-gray-200 object-contain object-center lg:w-1/2"
            src={product.url_img}
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
            <h2 className="title-font text-sm tracking-widest text-gray-500">
              {product.category}
            </h2>
            <h1 className="title-font mb-1 text-3xl font-medium text-gray-900">
              {product.product_name}
            </h1>

            <p className="leading-relaxed">{product.descrip}</p>
            <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-200 pb-5">
              {/* Opciones de color y tamaño */}
            </div>
            <div className="flex">
              <span className="title-font text-2xl font-medium text-gray-900">
                ${product.price}
              </span>
              <button
                onClick={handleAddToCart}
                className="ml-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Agregar al carrito
              </button>
              <NavLink
                to="/cart"
                className="ml-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Ir al carrito
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ProductDetail.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      product_name: PropTypes.string.isRequired,
      descrip: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      stock_quantity: PropTypes.number.isRequired,
      url_img: PropTypes.string.isRequired,
      stars_quantity: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      is_new: PropTypes.bool.isRequired,
      is_special_offer: PropTypes.bool.isRequired,
      created_at: PropTypes.string.isRequired,
      modified_at: PropTypes.string,
      deleted_at: PropTypes.string,
    })
  ).isRequired,
};
