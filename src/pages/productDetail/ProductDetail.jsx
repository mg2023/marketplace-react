import { useParams, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import CarritoContext from "../../context/CarritoContext";
import PropTypes from 'prop-types';

export default function ProductDetail({ products }) {
  const { addToCart } = useContext(CarritoContext);

  const { id } = useParams();

  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full max-h-72 object-contain object-center rounded border border-gray-200"
            src={product.url_img}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.product_name}
            </h1>
            
            <p className="leading-relaxed">{product.descrip}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              {/* Opciones de color y tamaño */}
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}
              </span>
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Agregar al carrito
              </button>
              <NavLink
                to="/cart"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
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